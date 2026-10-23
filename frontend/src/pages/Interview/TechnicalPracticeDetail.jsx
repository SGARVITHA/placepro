import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Bookmark, 
  Check, 
  ArrowLeft, 
  Edit3, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ThumbsUp,
  RotateCcw
} from 'lucide-react';
import { technicalInterviewService } from '../../services/technicalInterviewService';

export default function TechnicalPracticeDetail() {
  const { topicId, questionId, companyId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [topic, setTopic] = useState(null);
  const [questionsInTopic, setQuestionsInTopic] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Field State
  const [response, setResponse] = useState('');
  const [confidence, setConfidence] = useState(null); // 'confident' | 'need_review' | null

  // UI Interactive States
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  const company = companyId ? technicalInterviewService.getCompanyMeta(companyId) : null;
  const companyName = company?.name || (companyId ? companyId.toUpperCase() : null);

  // Load question and topic context
  const loadQuestionData = useCallback(async () => {
    setLoading(true);
    const foundTopic = technicalInterviewService.getTopicById(topicId);
    const list = await technicalInterviewService.getTechnicalQuestions({ topicId, companyId });
    const currentQ = list.find((q) => q.id === questionId) || await technicalInterviewService.getTechnicalQuestionById(questionId);

    setTopic(foundTopic);
    setQuestionsInTopic(list);
    setQuestion(currentQ || null);

    if (currentQ) {
      // Check for previously saved response
      const saved = technicalInterviewService.getSavedTechnicalResponse(currentQ.id);
      if (saved) {
        setResponse(saved.response || '');
        setConfidence(saved.confidence || null);
      } else {
        setResponse('');
        setConfidence(null);
      }

      setIsBookmarked(technicalInterviewService.isQuestionBookmarked(currentQ.id));
      setIsPrepared(technicalInterviewService.isQuestionPrepared(currentQ.id));
    }

    setLoading(false);
    setSaveSuccessMsg('');
  }, [topicId, questionId, companyId]);

  useEffect(() => {
    loadQuestionData();
  }, [loadQuestionData]);

  useEffect(() => {
    const handleBookmarkChange = (e) => {
      if (question?.id && (e.detail?.questionId === question.id || !e.detail?.questionId)) {
        setIsBookmarked(technicalInterviewService.isQuestionBookmarked(question.id));
      }
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [question?.id]);

  // Determine current question index and prev/next links
  const { prevQuestion, nextQuestion } = useMemo(() => {
    if (!questionsInTopic.length || !question) {
      return { prevQuestion: null, nextQuestion: null };
    }
    const idx = questionsInTopic.findIndex((q) => q.id === question.id);
    return {
      prevQuestion: idx > 0 ? questionsInTopic[idx - 1] : null,
      nextQuestion: idx >= 0 && idx < questionsInTopic.length - 1 ? questionsInTopic[idx + 1] : null,
    };
  }, [questionsInTopic, question]);

  // Validation: meaningful text (> 3 chars) AND confidence is selected
  const hasText = response.trim().length > 3;
  const hasConfidence = confidence === 'confident' || confidence === 'need_review';
  const isFormValid = hasText && hasConfidence;

  // Toggle Bookmark
  const handleToggleBookmark = () => {
    if (!question) return;
    const updated = technicalInterviewService.toggleQuestionBookmark(question.id);
    setIsBookmarked(updated.includes(question.id));
  };

  // Toggle Prepared
  const handleTogglePrepared = () => {
    if (!question) return;
    const updated = technicalInterviewService.toggleQuestionPrepared(question.id);
    setIsPrepared(updated.includes(question.id));
  };

  // Quick prefill helper for demonstration and testing
  const handlePrefillDemo = () => {
    if (response) {
      setResponse('');
      setConfidence(null);
    } else {
      setResponse(
        'Our final-year project is an Automated Campus Placement & Career Preparation Portal built with a modular 3-tier architecture:\n\n' +
        '1. Frontend Layer: Single Page Application built with React 19, Vite, and Tailwind CSS. We implemented responsive layout drawers, client-side routing, and an isolated development mock mode to allow offline testing.\n\n' +
        '2. Backend API Layer: RESTful microservices written in Node.js (Express) with JWT-based authentication and role-based access control (Student vs Placement Officer).\n\n' +
        '3. Database & Caching: PostgreSQL for normalized relational schemas (students, drives, companies, questions) and Redis for caching leaderboard rankings and drive status.\n\n' +
        'Trade-offs: We evaluated MongoDB vs PostgreSQL and opted for PostgreSQL because strict foreign-key relations between student drive enrollments and question submissions prevented dangling references.'
      );
      setConfidence('confident');
    }
  };

  // Save response & advance to next question
  const handleSaveAndNext = async () => {
    if (!isFormValid || !question || isSaving) return;

    setIsSaving(true);
    setSaveSuccessMsg('');

    try {
      await technicalInterviewService.saveTechnicalResponse({
        questionId: question.id,
        response,
        confidence,
        companyId,
      });

      setIsPrepared(true);
      setSaveSuccessMsg('Response saved successfully!');

      setTimeout(() => {
        setIsSaving(false);
        if (nextQuestion) {
          const nextUrl = companyId
            ? `/company/${companyId}/interview/technical/${topicId}/${nextQuestion.id}`
            : `/interview/technical/${topicId}/${nextQuestion.id}`;
          navigate(nextUrl);
        } else {
          setShowFinishedModal(true);
        }
      }, 500);
    } catch (err) {
      setIsSaving(false);
      alert('Failed to save response. Please try again.');
    }
  };

  // Breadcrumbs
  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview', to: `/company/${companyId}/interview` },
        { label: 'Technical', to: `/company/${companyId}/interview/technical` },
        { label: topic?.shortName || topic?.name || 'Projects', to: `/company/${companyId}/interview/technical/${topicId}` },
        { label: question?.title || 'Question Detail' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview', to: '/interview' },
        { label: 'Technical', to: '/interview/technical' },
        { label: topic?.shortName || topic?.name || 'Projects', to: `/interview/technical/${topicId}` },
        { label: question?.title || 'Question Detail' },
      ];

  // Note link with encoded topic & title
  const noteHref = `/notes?topic=${encodeURIComponent(topic?.name || 'Technical Interview')}&title=${encodeURIComponent(question?.title || 'Technical Question')}`;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-6 py-6 animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="bg-white rounded-[14px] border border-slate-200 p-8 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-64 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Question Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested technical question could not be located in this topic.
        </p>
        <Link
          to={companyId ? `/company/${companyId}/interview/technical/${topicId}` : `/interview/technical/${topicId}`}
          className="px-5 py-2.5 bg-[#16793A] text-white text-xs font-semibold rounded-xl hover:bg-[#12612e] transition-colors"
        >
          Return to Question List
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] -mx-8 -my-6">
      {/* Scrollable Workspace Body */}
      <div className="flex-1 overflow-y-auto px-8 py-5 pb-28">
        {/* Compact Breadcrumbs matching Stitch */}
        <div className="text-[12.5px] text-slate-500 flex items-center gap-2 mb-4 flex-wrap">
          {breadcrumbItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-slate-300">›</span>}
              {item.to ? (
                <Link to={item.to} className="hover:text-slate-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-900 truncate">{item.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Technical Practice Card Container */}
        <section className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-6 sm:p-7 max-w-5xl w-full mx-auto">
          {/* Header Row of Card: Metadata Badges + Bookmark Icon */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
                {question.category || 'Technical Interview'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {topic?.shortName || question.topicName || 'Projects'}
              </span>
              {question.subtopic && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {question.subtopic}
                </span>
              )}
              {question.pattern && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-[#16793A] border border-emerald-100">
                  {question.pattern}
                </span>
              )}
              {companyName && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {companyName}
                </span>
              )}
            </div>

            {/* Ribbon Bookmark Action Button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              aria-label="Bookmark Question"
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? 'text-[#16793A] bg-emerald-50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-5 h-5 stroke-2 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Question Section Title */}
          <div className="mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              QUESTION
            </span>
          </div>

          {/* Question Statement */}
          <h2 className="text-[18px] sm:text-[19px] font-bold text-slate-900 leading-snug tracking-tight mb-6">
            {question.statement}
          </h2>

          {/* Technical Response Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Field: Your Response */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800" htmlFor="technicalResponseText">
                    YOUR RESPONSE
                  </label>
                  <button
                    type="button"
                    onClick={handlePrefillDemo}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
                  >
                    {response ? 'Clear input' : 'Auto-fill sample'}
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  {question.guidance || 'Explain your answer in your own words. Include relevant technical details, decisions, examples, or trade-offs where useful.'}
                </span>
              </div>
              <textarea
                id="technicalResponseText"
                rows={11}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full min-h-[280px] text-[13.5px] rounded-lg border border-slate-300 p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-3 focus:ring-[#16793A]/15 transition-all resize-y leading-relaxed bg-white"
              />
            </div>

            {/* Confidence Selection & Save Bar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              {/* Confidence Toggle Pill */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-slate-800">
                  How confident are you with this answer?
                </span>
                <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80 gap-1">
                  <button
                    type="button"
                    onClick={() => setConfidence('confident')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      confidence === 'confident'
                        ? 'bg-white text-[#16793A] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Confident
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfidence('need_review')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      confidence === 'need_review'
                        ? 'bg-white text-amber-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Need Review
                  </button>
                </div>
              </div>

              {/* Status Hint & Save Action */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`text-[11px] hidden sm:inline-block ${
                    isSaving
                      ? 'text-[#16793A] font-semibold animate-pulse'
                      : isFormValid
                      ? 'text-emerald-700 font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  {isSaving
                    ? 'Saving response...'
                    : isFormValid
                    ? 'Ready to submit!'
                    : !hasText
                    ? 'Write your answer to enable save'
                    : 'Select your confidence rating'}
                </span>

                <button
                  type="button"
                  disabled={!isFormValid || isSaving}
                  onClick={handleSaveAndNext}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                    isFormValid && !isSaving
                      ? 'bg-[#16793A] hover:bg-[#12612e] cursor-pointer'
                      : 'bg-[#16793A] opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span>{isSaving ? 'Saving...' : 'Save & Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-2" />
                </button>
              </div>
            </div>
          </form>

          {/* Success Banner */}
          {saveSuccessMsg && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16793A]" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}
        </section>
      </div>

      {/* Completion Modal when finishing all questions in topic */}
      {showFinishedModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16793A] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Topic Completed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              You have completed all technical questions in <strong>{topic?.name}</strong>. Your response and confidence selection have been saved.
            </p>
            <div className="flex items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowFinishedModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Review Current
              </button>
              <Link
                to={companyId ? `/company/${companyId}/interview/technical` : '/interview/technical'}
                className="px-5 py-2 bg-[#16793A] hover:bg-[#12612e] text-white text-xs font-semibold rounded-lg"
              >
                Browse Other Topics
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar matching Stitch chrome exactly */}
      <footer className="fixed bottom-0 left-[260px] right-0 h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between flex-shrink-0 z-20">
        {/* Left: Previous Question Navigation */}
        <div className="flex items-center">
          {prevQuestion ? (
            <Link
              to={
                companyId
                  ? `/company/${companyId}/interview/technical/${topicId}/${prevQuestion.id}`
                  : `/interview/technical/${topicId}/${prevQuestion.id}`
              }
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-2" />
              <span>Previous Question</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-not-allowed">
              <ArrowLeft className="w-4 h-4 stroke-2" />
              <span>Previous Question</span>
            </span>
          )}
        </div>

        {/* Center: Add Note Button (Pill shaped outlined button with pencil) */}
        <div className="flex items-center">
          <Link
            to={noteHref}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500 stroke-2" />
            <span>Add Note</span>
          </Link>
        </div>

        {/* Right: Mark Prepared and Next Question */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleTogglePrepared}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              isPrepared ? 'text-[#16793A]' : 'text-slate-700 hover:text-[#16793A]'
            }`}
          >
            <Check className={`w-4 h-4 stroke-2 ${isPrepared ? 'text-[#16793A]' : 'text-slate-400'}`} />
            <span>{isPrepared ? 'Prepared ✓' : 'Mark Prepared'}</span>
          </button>

          {nextQuestion ? (
            <Link
              to={
                companyId
                  ? `/company/${companyId}/interview/technical/${topicId}/${nextQuestion.id}`
                  : `/interview/technical/${topicId}/${nextQuestion.id}`
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#16793A] transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 stroke-2" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 cursor-not-allowed">
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 stroke-2" />
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
