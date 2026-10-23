import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCw,
  Edit3,
  Shuffle,
  Check,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import CSModeSelector, { MCQComingSoon } from './CSModeSelector';
import { findSubject, CS_SUBJECTS } from './csSubjectsData';
import { mockFlashcards, mockQuestions } from '../../../services/mockApiService';
import { bookmarkService } from '../../../services/bookmarkService';
import { useAuth } from '../../../hooks/useAuth';
import { useCompanies, useQuestions } from '../../../hooks/useContentQuery';

export default function CSFlashcardPractice() {
  const { subjectId: rawSubjectId, questionId: paramQuestionId, companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mode state: 'flashcard' | 'mcq'
  const [mode, setMode] = useState('flashcard');

  // Resolve subject
  const subject = useMemo(() => {
    if (rawSubjectId) {
      const found = findSubject(rawSubjectId);
      if (found) return found;
    }
    // Check search params or fallback
    const querySub = new URLSearchParams(location.search).get('subject');
    if (querySub) {
      const found = findSubject(querySub);
      if (found) return found;
    }
    return CS_SUBJECTS[0]; // Default: Operating Systems
  }, [rawSubjectId, location.search]);

  // Resolve company
  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });
  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Build deck for active subject (and company if applicable)
  const initialDeck = useMemo(() => {
    // 1. Gather all flashcards for this subject
    let cards = mockFlashcards.filter(
      (fc) => (fc.subject || '').toLowerCase() === subject.name.toLowerCase()
    );

    // 2. Also check mockQuestions for any questions not already in flashcards
    const extraQuestions = mockQuestions.filter(
      (q) => q.topic_id === subject.id && !cards.some((c) => c.id === q.id)
    );

    extraQuestions.forEach((q) => {
      cards.push({
        id: q.id,
        subject: subject.name,
        topic: q.topic_name || subject.name,
        conceptLabel: q.company_name ? `Asked at ${q.company_name}` : 'Core Concept',
        difficulty: q.difficulty || 'Medium',
        company_name: q.company_name,
        year_asked: q.year_asked,
        front: q.question_text,
        hint: 'Review core concepts and definitions related to this problem.',
        back: q.solution_text || q.solution || 'No detailed solution provided.',
        keyPoints: [
          { label: 'Key Concept', text: q.question_text?.slice(0, 100) + '...' },
        ],
        placementNote: q.company_name
          ? `Asked in campus recruitment rounds at ${q.company_name}.`
          : 'High-frequency campus placement question.',
      });
    });

    // 3. Filter by company if requested and company questions exist
    if (companyId) {
      const compLower = companyId.toLowerCase();
      const compCards = cards.filter((c) => (c.company_name || '').toLowerCase().includes(compLower));
      if (compCards.length > 0) {
        cards = compCards;
      }
    }

    return cards.length > 0 ? cards : mockFlashcards.slice(0, 4);
  }, [subject, companyId]);

  const [deck, setDeck] = useState(initialDeck);

  // Sync initial deck when subject changes
  useEffect(() => {
    setDeck(initialDeck);
  }, [initialDeck]);

  // Resolve initial card index based on questionId in URL params or router state
  const initialCardIndex = useMemo(() => {
    const targetId = paramQuestionId || location.state?.questionId;
    if (!targetId) return 0;
    const idx = deck.findIndex((c) => String(c.id) === String(targetId));
    return idx >= 0 ? idx : 0;
  }, [paramQuestionId, location.state?.questionId, deck]);

  const [currentIndex, setCurrentIndex] = useState(initialCardIndex);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDeckCompleted, setIsDeckCompleted] = useState(false);

  // Session review counts (local only, no DB writes per spec)
  const [reviewedCount, setReviewedCount] = useState(0);
  const [gotItCount, setGotItCount] = useState(0);

  // Sync card index if URL param changes
  useEffect(() => {
    const targetId = paramQuestionId || location.state?.questionId;
    if (targetId) {
      const idx = deck.findIndex((c) => String(c.id) === String(targetId));
      if (idx >= 0 && idx !== currentIndex) {
        setCurrentIndex(idx);
        setIsFlipped(false);
      }
    }
  }, [paramQuestionId, location.state?.questionId, deck]);

  // Global bookmark state
  const [bookmarks, setBookmarks] = useState(() => bookmarkService.getBookmarkIds(user));

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(bookmarkService.getBookmarkIds(user));
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [user]);

  // Toast notification
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const currentCard = deck[currentIndex] || deck[0];
  const isCurrentBookmarked = currentCard ? bookmarks.includes(currentCard.id) : false;

  // Toggle Flip Handlers
  const toggleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const resetFlipToPrompt = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;

    const willBookmark = !isCurrentBookmarked;
    const route = companyId
      ? `/company/${companyId}/cs-subjects/${subject.id}/${currentCard.id}`
      : `/practice/cs-subjects/${subject.id}/${currentCard.id}`;

    if (willBookmark) {
      bookmarkService.addBookmark(
        currentCard.id,
        {
          title: currentCard.front,
          category: 'CS Subjects',
          practiceType: 'Flashcard Revision',
          route,
          difficulty: currentCard.difficulty || 'Medium',
          topic: currentCard.subject || subject.name,
          subtopic: currentCard.topic,
          company: currentCard.company_name || resolvedCompany || null,
        },
        user
      );
      showToast('Saved to Bookmarks');
    } else {
      bookmarkService.removeBookmark(currentCard.id, user);
      showToast('Removed from Bookmarks', 'info');
    }
  };

  // Navigation: Next Card
  const handleNextCard = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex < deck.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsDeckCompleted(true);
    }
  };

  // Navigation: Previous Card
  const handlePrevCard = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      setIsDeckCompleted(false);
    }
  };

  // Action: Shuffle Deck
  const handleShuffleDeck = (e) => {
    if (e) e.stopPropagation();
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsDeckCompleted(false);
    showToast('Deck shuffled', 'info');
  };

  // Action: Got It (Self-assessment: advances card session-locally)
  const handleGotIt = (e) => {
    if (e) e.stopPropagation();
    setGotItCount((prev) => prev + 1);
    handleNextCard(e);
  };

  // Action: Review Again (Self-assessment: flips back to front, keeps in deck)
  const handleReviewAgain = (e) => {
    if (e) e.stopPropagation();
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);
    showToast('Marked for revision', 'info');
  };

  // Action: Add Note
  const handleAddNote = (e) => {
    if (e) e.stopPropagation();
    const noteTopic = currentCard?.topic || subject.name;
    const noteTitle = currentCard?.front || currentCard?.conceptLabel || 'CS Concept';
    navigate(`/notes?topic=${encodeURIComponent(noteTopic)}&title=${encodeURIComponent(noteTitle)}`);
  };

  // Restart Deck
  const handleRestartDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsDeckCompleted(false);
    setReviewedCount(0);
    setGotItCount(0);
  };

  // Return to Question List
  const questionListUrl = companyId
    ? `/company/${companyId}/cs-subjects/${subject.id}`
    : `/practice/cs-subjects/${subject.id}`;

  // Breadcrumbs
  const questionSnippet = currentCard?.front
    ? currentCard.front.length > 40
      ? `${currentCard.front.substring(0, 40)}...`
      : currentCard.front
    : 'Question';

  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: resolvedCompany, to: `/company/${companyId}` },
        { label: 'CS Subjects', to: `/company/${companyId}/cs-subjects` },
        { label: subject.name, to: questionListUrl },
        { label: questionSnippet },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/dashboard' },
        { label: 'CS Subjects', to: '/practice/cs-subjects' },
        { label: subject.name, to: questionListUrl },
        { label: questionSnippet },
      ];

  const getDifficultyBadge = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d === 'easy') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (d === 'hard') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5 pb-24 relative min-h-[calc(100vh-6rem)]">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-24 right-6 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl bg-slate-900 text-white ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium">{toast.message}</span>
      </div>

      <Breadcrumb items={breadcrumbItems} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={questionListUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-[#16793A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {subject.name} Questions</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            {subject.name} Flashcard Revision
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Card {currentIndex + 1} of {deck.length} • Click card to reveal answer and key takeaways.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="shrink-0 flex items-center gap-3">
          <CSModeSelector mode={mode} onChange={setMode} />
        </div>
      </div>

      {/* When MCQ mode selected, display placeholder */}
      {mode === 'mcq' ? (
        <div className="py-12">
          <MCQComingSoon
            subjectName={subject.name}
            onSwitchToFlashcard={() => setMode('flashcard')}
          />
        </div>
      ) : isDeckCompleted ? (
        /* Deck Completed State */
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 text-center shadow-sm max-w-xl mx-auto my-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#16793A] border border-emerald-200/80 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            Deck Completed
          </span>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            You finished {subject.name}!
          </h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
            You reviewed all {deck.length} flashcards in this deck. You can restart to practice again or explore more questions.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartDeck}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16793A] hover:bg-[#12612e] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>Restart Deck</span>
            </button>

            <Link
              to={questionListUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-slate-50 text-text-primary text-sm font-semibold transition-colors"
            >
              <span>Question List</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Active 3D Flashcard Presentation */
        <div className="w-full flex flex-col items-center justify-center py-2">
          <div
            className="perspective-1000 w-full max-w-2xl cursor-pointer select-none"
            onClick={toggleCardFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCardFlip();
              }
            }}
            aria-label={`Flashcard: ${currentCard?.front}. Click to flip.`}
          >
            <div
              className={`card-flipper relative w-full min-h-[420px] rounded-2xl transition-transform duration-500 transform-style-3d shadow-md hover:shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ========================================================= */}
              {/* FRONT FACE (QUESTION) */}
              {/* ========================================================= */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                style={{ zIndex: isFlipped ? 1 : 2 }}
              >
                {/* Top Badges & Meta */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#Edf4F0] text-[#16793A] border border-[#16793A]/20">
                        {currentCard?.subject || subject.name}
                      </span>
                      {currentCard?.topic && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                          {currentCard.topic}
                        </span>
                      )}
                      {currentCard?.difficulty && (
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyBadge(currentCard.difficulty)}`}>
                          {currentCard.difficulty}
                        </span>
                      )}
                      {currentCard?.company_name && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          {currentCard.company_name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                        {currentIndex + 1} / {deck.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleToggleBookmark}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isCurrentBookmarked
                            ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title={isCurrentBookmarked ? 'Remove bookmark' : 'Bookmark flashcard'}
                      >
                        <Bookmark className={`w-4 h-4 ${isCurrentBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="my-auto py-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                      {currentCard?.front}
                    </h2>

                    {currentCard?.hint && (
                      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-900 leading-relaxed">
                        <span className="font-bold text-amber-800 mr-1.5">Hint:</span>
                        {currentCard.hint}
                      </div>
                    )}
                  </div>
                </div>

                {/* Flip Instruction Hint */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#16793A]" />
                    <span>Click anywhere on card to reveal answer</span>
                  </span>
                  <span className="hidden sm:inline text-[11px] text-slate-600">
                    Press Space to flip
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* BACK FACE (ANSWER) */}
              {/* ========================================================= */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar"
                style={{ zIndex: isFlipped ? 2 : 1 }}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Answer & Key Takeaways
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {currentCard?.conceptLabel || 'Core Concept'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={resetFlipToPrompt}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#16793A] hover:underline cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Back to Prompt</span>
                    </button>
                  </div>

                  {/* Core Answer Definition */}
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                      {currentCard?.back}
                    </p>

                    {/* Key Takeaways */}
                    {currentCard?.keyPoints && currentCard.keyPoints.length > 0 && (
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-2.5">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Key Takeaways
                        </h4>
                        <ul className="space-y-2">
                          {currentCard.keyPoints.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#16793A] mt-1.5 shrink-0" />
                              <span>
                                <strong className="text-slate-900 font-semibold">{pt.label}:</strong>{' '}
                                {pt.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Placement Note */}
                    {currentCard?.placementNote && (
                      <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900">
                        <strong className="font-semibold text-emerald-950">Placement Tip:</strong>{' '}
                        {currentCard.placementNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Self-assessment buttons on card back */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleReviewAgain}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Review again
                  </button>

                  <button
                    type="button"
                    onClick={handleGotIt}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#16793A] hover:bg-[#12612e] text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
                  >
                    Got it ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Bar */}
      {mode === 'flashcard' && !isDeckCompleted && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 z-20 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handlePrevCard}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer shadow-2xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddNote}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
                title="Add a note for this concept in Notes workspace"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Add Note</span>
              </button>

              <button
                type="button"
                onClick={handleShuffleDeck}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
                title="Shuffle deck cards"
              >
                <Shuffle className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Shuffle</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextCard}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#16793A] hover:bg-[#12612e] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>{currentIndex === deck.length - 1 ? 'Finish Deck' : 'Next Card'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
