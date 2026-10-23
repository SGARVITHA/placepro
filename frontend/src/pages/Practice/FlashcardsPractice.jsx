import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { mockFlashcards } from '../../services/mockApiService';
import { bookmarkService } from '../../services/bookmarkService';
import { useAuth } from '../../hooks/useAuth';

const SUBJECT_OPTIONS = [
  'Operating Systems',
  'DBMS',
  'Computer Networks',
  'Data Structures',
  'All Subjects',
];

export default function FlashcardsPractice() {
  const { subjectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Resolve active subject
  const initialSubject = useMemo(() => {
    if (subjectId) {
      const match = SUBJECT_OPTIONS.find(
        (s) => s.toLowerCase().replace(/\s+/g, '-') === subjectId.toLowerCase()
      );
      if (match) return match;
    }
    const querySub = searchParams.get('subject');
    if (querySub && SUBJECT_OPTIONS.includes(querySub)) {
      return querySub;
    }
    return 'Operating Systems'; // Default matching reference design
  }, [subjectId, searchParams]);

  const [activeSubject, setActiveSubject] = useState(initialSubject);

  // Deck State
  const initialDeck = useMemo(() => {
    if (activeSubject === 'All Subjects') {
      return [...mockFlashcards];
    }
    return mockFlashcards.filter(
      (fc) => (fc.subject || fc.topic || '').toLowerCase() === activeSubject.toLowerCase()
    );
  }, [activeSubject]);

  const [deck, setDeck] = useState(initialDeck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDeckCompleted, setIsDeckCompleted] = useState(false);
  const [reviewedIds, setReviewedIds] = useState(new Set());

  // Bookmark State
  const [bookmarks, setBookmarks] = useState(() => bookmarkService.getBookmarkIds(user));

  // Toast Notification
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Sync bookmarks with global store
  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(bookmarkService.getBookmarkIds(user));
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [user]);

  // Update deck when subject changes
  const handleSelectSubject = (subj) => {
    setActiveSubject(subj);
    const filtered =
      subj === 'All Subjects'
        ? [...mockFlashcards]
        : mockFlashcards.filter(
            (fc) => (fc.subject || fc.topic || '').toLowerCase() === subj.toLowerCase()
          );

    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsDeckCompleted(false);
    setReviewedIds(new Set());
    setSearchParams(subj === 'Operating Systems' ? {} : { subject: subj });
  };

  const currentCard = deck[currentIndex] || deck[0];
  const isCurrentBookmarked = currentCard ? bookmarks.includes(currentCard.id) : false;

  // Card Flip Handlers
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
    if (willBookmark) {
      bookmarkService.addBookmark(
        currentCard.id,
        {
          title: currentCard.front,
          category: 'CS Subjects',
          practiceType: 'Flashcard Revision',
          route: `/practice/flashcards?subject=${encodeURIComponent(activeSubject)}`,
          difficulty: currentCard.difficulty || 'Medium',
          topic: currentCard.subject || currentCard.topic,
          subtopic: currentCard.topic,
        },
        user
      );
      showToast('Bookmark saved');
    } else {
      bookmarkService.removeBookmark(currentCard.id, user);
      showToast('Bookmark removed');
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
    }
  };

  // Shuffle Deck Action
  const handleShuffleDeck = (e) => {
    if (e) e.stopPropagation();
    if (deck.length <= 1) return;

    // Fisher-Yates shuffle
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsDeckCompleted(false);
    showToast('Deck shuffled');
  };

  // Revision: Got it
  const handleGotIt = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;

    setReviewedIds((prev) => new Set(prev).add(currentCard.id));
    handleNextCard();
  };

  // Revision: Review Again
  const handleReviewAgain = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false); // Returns to question side for further review
    showToast('Card flagged for revision');
  };

  // Add Note: Links to existing Notes system
  const handleAddNote = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;

    const topicParam = currentCard.topic || activeSubject;
    const titleParam = currentCard.front || 'Flashcard Note';
    navigate(
      `/notes?topic=${encodeURIComponent(topicParam)}&title=${encodeURIComponent(titleParam)}`
    );
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      toggleCardFlip();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      handleNextCard();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      handlePrevCard();
    }
  };

  return (
    <div
      className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-hidden select-none outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Toast Notification */}
      <div
        className={`fixed bottom-20 right-8 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-slate-900 text-white ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>

      {/* Main Central Scrollable Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col">
        <div className="max-w-[820px] w-full mx-auto flex flex-col h-full">
          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-4 flex-wrap"
          >
            <Link to="/dashboard" className="hover:text-gray-800 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
            <Link to="/practice/aptitude" className="hover:text-gray-800 transition-colors">
              Practice
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
            <Link to="/practice/cs-subjects" className="hover:text-gray-800 transition-colors">
              CS Subjects
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
            <span className="text-gray-600 font-medium">{activeSubject}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 stroke-[2]" />
            <span className="font-semibold text-gray-900">Flashcard Revision</span>
          </nav>

          {/* Subject Deck Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
            {SUBJECT_OPTIONS.map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() => handleSelectSubject(subj)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeSubject === subj
                    ? 'bg-[#16793A] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Flashcard Area / Completion View */}
          <section className="flex-1 flex flex-col justify-center items-center pb-6">
            {deck.length === 0 ? (
              /* Empty Deck State */
              <div className="w-full max-w-[760px] bg-white border border-[#e5e7eb] rounded-2xl shadow-xs p-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#eef7ee] flex items-center justify-center text-[#16793A]">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Flashcards Found</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  There are currently no flashcards created for {activeSubject}. Select another
                  subject to continue practicing.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectSubject('Operating Systems')}
                    className="px-4 py-2 bg-[#16793A] hover:bg-[#12632F] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Load Operating Systems
                  </button>
                </div>
              </div>
            ) : isDeckCompleted ? (
              /* Session Deck Completed View */
              <div className="w-full max-w-[760px] bg-white border border-[#e5e7eb] rounded-2xl shadow-xs p-10 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#eef7ee] text-[#16793a] flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">Deck Revision Completed!</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    You have revised all {deck.length} flashcards in{' '}
                    <span className="font-semibold text-gray-700">{activeSubject}</span>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(0);
                      setIsFlipped(false);
                      setIsDeckCompleted(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16793A] hover:bg-[#12632F] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Restart Deck</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShuffleDeck}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-gray-500" />
                    <span>Shuffle & Repeat</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 3D Interactive Flip Card */
              <div className="w-full max-w-[760px] perspective-1000">
                <div
                  id="flashcard"
                  onClick={toggleCardFlip}
                  className={`card-flipper relative w-full min-h-[440px] transform-style-3d cursor-pointer select-none ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  data-purpose="interactive-flashcard"
                >
                  {/* ================= FRONT FACE (Prompt / Question) ================= */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-[#e5e7eb] rounded-2xl shadow-xs p-8 flex flex-col justify-between hover:border-gray-300 transition-colors">
                    {/* Card Header: Badges & Bookmark */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#eef7ee] text-[#16793a]">
                          {currentCard.subject || activeSubject}
                        </span>
                        {currentCard.topic && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                            {currentCard.topic}
                          </span>
                        )}
                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#fef3c7] text-[#92400e]">
                          {currentCard.conceptLabel || currentCard.difficulty || 'Core Concept'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-400 tracking-wide">
                          Card {currentIndex + 1} of {deck.length}
                        </span>
                        <button
                          type="button"
                          aria-label="Save bookmark"
                          title={isCurrentBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
                          onClick={handleToggleBookmark}
                          className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                            isCurrentBookmarked
                              ? 'bg-[#eef7ee] border-[#16793a]/30 text-[#16793a]'
                              : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 stroke-[1.8] ${
                              isCurrentBookmarked ? 'fill-current' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Card Front Body */}
                    <div className="py-8 my-auto">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Concept Prompt
                      </div>
                      <h2 className="text-[22px] md:text-[24px] font-semibold text-gray-900 leading-snug tracking-tight">
                        {currentCard.front || currentCard.title}
                      </h2>
                      {currentCard.hint && (
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                          {currentCard.hint}
                        </p>
                      )}
                    </div>

                    {/* Card Front Footer / Flip Trigger Note */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <RotateCw
                          className="w-3.5 h-3.5 animate-spin"
                          style={{ animationDuration: '4s' }}
                        />
                        <span>Click card to reveal answer</span>
                      </span>
                      <span className="text-gray-400 hidden sm:inline">Spacebar to flip</span>
                    </div>
                  </div>

                  {/* ================= BACK FACE (Explanation / Structured Answer) ================= */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-[#e5e7eb] rounded-2xl shadow-xs p-7 flex flex-col justify-between overflow-y-auto">
                    {/* Back Card Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#eef7ee] text-[#16793a]">
                            Answer
                          </span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded text-gray-500 bg-gray-100">
                            {currentCard.topic || 'Concept Details'}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-gray-400">
                          Card {currentIndex + 1} of {deck.length}
                        </div>
                      </div>

                      {/* Concise Definition */}
                      <div className="space-y-4 text-left">
                        <p className="text-[14px] text-gray-800 leading-relaxed">
                          {currentCard.back || currentCard.answer}
                        </p>

                        {/* Key Points / Differences List */}
                        {currentCard.keyPoints && currentCard.keyPoints.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 space-y-2 text-[13px]">
                            {currentCard.keyPoints.map((pt, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                                <span className="text-gray-700">
                                  <strong className="text-gray-900">{pt.label}:</strong> {pt.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Placement Relevance Note */}
                        {currentCard.placementNote && (
                          <div className="flex items-center gap-2 text-[12px] text-emerald-800 bg-emerald-50/70 border border-emerald-100 px-3 py-2 rounded-lg">
                            <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                            <span>{currentCard.placementNote}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post-Flip Revision Action Buttons (Strictly NO marks/scores) */}
                    <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
                      <button
                        type="button"
                        id="btnFlipBack"
                        onClick={resetFlipToPrompt}
                        className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 py-1 transition-colors cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip back to prompt</span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        {/* Review Again Button */}
                        <button
                          type="button"
                          onClick={handleReviewAgain}
                          className="px-3.5 py-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-gray-500" />
                          <span>Review again</span>
                        </button>

                        {/* Got It Button */}
                        <button
                          type="button"
                          onClick={handleGotIt}
                          className="px-4 py-1.5 bg-[#16793a] hover:bg-[#136a33] text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Got it</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <footer
        className="h-[65px] bg-white border-t border-[#e5e7eb] px-6 sm:px-8 flex items-center justify-between flex-shrink-0 z-20"
        data-purpose="bottom-nav-bar"
      >
        {/* Previous Action */}
        <button
          type="button"
          onClick={handlePrevCard}
          disabled={currentIndex === 0 || isDeckCompleted}
          className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
            currentIndex === 0 || isDeckCompleted
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-[#64748b] hover:text-gray-900'
          }`}
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
          <span>Previous Card</span>
        </button>

        {/* Center Tool Action: Add Note */}
        <button
          type="button"
          onClick={handleAddNote}
          title="Add personal study note for this topic"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] bg-white rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-gray-500" />
          <span>Add Note</span>
        </button>

        {/* Right Actions: Shuffle & Next Card */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleShuffleDeck}
            disabled={deck.length <= 1}
            className={`text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              deck.length <= 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-[#64748b] hover:text-gray-900'
            }`}
          >
            <Shuffle className="w-4 h-4 text-gray-400 stroke-[1.8]" />
            <span>Shuffle Deck</span>
          </button>

          <button
            type="button"
            onClick={handleNextCard}
            disabled={isDeckCompleted}
            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${
              isDeckCompleted
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-[#16793a] hover:text-emerald-800'
            }`}
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
