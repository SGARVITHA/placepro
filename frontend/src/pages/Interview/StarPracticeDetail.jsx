import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Bookmark, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Info, 
  Eye, 
  EyeOff, 
  Edit3, 
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { hrInterviewService } from '../../services/hrInterviewService';

export default function StarPracticeDetail() {
  const { topicId, questionId, companyId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [topic, setTopic] = useState(null);
  const [questionsInTopic, setQuestionsInTopic] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields State
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

  // UI Interactive States
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  const company = companyId ? hrInterviewService.getCompanyMeta(companyId) : null;
  const companyName = company?.name || (companyId ? companyId.toUpperCase() : null);

  // Load question and topic context
  const loadQuestionData = useCallback(async () => {
    setLoading(true);
    const foundTopic = hrInterviewService.getTopicById(topicId);
    const list = await hrInterviewService.getHRQuestions({ topicId, companyId });
    const currentQ = list.find((q) => q.id === questionId) || await hrInterviewService.getHRQuestionById(questionId);

    setTopic(foundTopic);
    setQuestionsInTopic(list);
    setQuestion(currentQ || null);

    if (currentQ) {
      // Check for previously saved STAR response
      const saved = hrInterviewService.getSavedStarResponse(currentQ.id);
      if (saved) {
        setSituation(saved.situation || '');
        setTask(saved.task || '');
        setAction(saved.action || '');
        setResult(saved.result || '');
      } else {
        setSituation('');
        setTask('');
        setAction('');
        setResult('');
      }

      setIsBookmarked(hrInterviewService.isQuestionBookmarked(currentQ.id));
      setIsPrepared(hrInterviewService.isQuestionPrepared(currentQ.id));
    }

    setLoading(false);
    setShowSampleAnswer(false);
    setSaveSuccessMsg('');
  }, [topicId, questionId, companyId]);

  useEffect(() => {
    loadQuestionData();
  }, [loadQuestionData]);

  useEffect(() => {
    const handleBookmarkChange = (e) => {
      if (question?.id && (e.detail?.questionId === question.id || !e.detail?.questionId)) {
        setIsBookmarked(hrInterviewService.isQuestionBookmarked(question.id));
      }
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [question?.id]);

  // Determine current question index and prev/next links
  const { currentIndex, prevQuestion, nextQuestion } = useMemo(() => {
    if (!questionsInTopic.length || !question) {
      return { currentIndex: -1, prevQuestion: null, nextQuestion: null };
    }
    const idx = questionsInTopic.findIndex((q) => q.id === question.id);
    return {
      currentIndex: idx,
      prevQuestion: idx > 0 ? questionsInTopic[idx - 1] : null,
      nextQuestion: idx >= 0 && idx < questionsInTopic.length - 1 ? questionsInTopic[idx + 1] : null,
    };
  }, [questionsInTopic, question]);

  // Live STAR validation calculation (sections with > 3 non-whitespace chars)
  const completedCount = useMemo(() => {
    let count = 0;
    if (situation.trim().length > 3) count++;
    if (task.trim().length > 3) count++;
    if (action.trim().length > 3) count++;
    if (result.trim().length > 3) count++;
    return count;
  }, [situation, task, action, result]);

  const isFormValid = completedCount === 4;

  // Toggle Bookmark
  const handleToggleBookmark = () => {
    if (!question) return;
    const updated = hrInterviewService.toggleQuestionBookmark(question.id);
    setIsBookmarked(updated.includes(question.id));
  };

  // Toggle Prepared
  const handleTogglePrepared = () => {
    if (!question) return;
    const updated = hrInterviewService.toggleQuestionPrepared(question.id);
    setIsPrepared(updated.includes(question.id));
  };

  // Auto-fill template demo helper
  const handlePrefillDemo = () => {
    if (question?.modelAnswer) {
      if (situation && task && action && result) {
        // Clear if already filled
        setSituation('');
        setTask('');
        setAction('');
        setResult('');
      } else {
        setSituation(question.modelAnswer.situation);
        setTask(question.modelAnswer.task);
        setAction(question.modelAnswer.action);
        setResult(question.modelAnswer.result);
      }
    } else {
      setSituation('During our cloud migration team assignment in our 7th semester, our sprint was falling behind because one peer was unwilling to collaborate on database migration scripts.');
      setTask('As the project coordinator, I had to ensure the database schema got synchronized and tested before the Friday milestone without initiating formal complaints.');
      setAction('I set up a 1-on-1 pairing session to diagnose the roadblock. Discovered he lacked confidence with Docker commands, so I shared a quick reference cheat-sheet and split the PR into 3 manageable chunks.');
      setResult('All 3 pull requests were successfully merged 24 hours prior to deadline, avoiding point deductions and fostering a productive team dynamic.');
    }
  };

  // Save STAR response & advance to next question
  const handleSaveAndNext = async () => {
    if (!isFormValid || !question || isSaving) return;

    setIsSaving(true);
    setSaveSuccessMsg('');

    try {
      await hrInterviewService.saveStarResponse({
        questionId: question.id,
        situation,
        task,
        action,
        result,
        companyId,
      });

      setIsPrepared(true);
      setSaveSuccessMsg('STAR response saved successfully!');

      // Move to next question or show completion modal
      setTimeout(() => {
        setIsSaving(false);
        if (nextQuestion) {
          const nextUrl = companyId
            ? `/company/${companyId}/interview/hr/${topicId}/${nextQuestion.id}`
            : `/interview/hr/${topicId}/${nextQuestion.id}`;
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
        { label: 'HR', to: `/company/${companyId}/interview/hr` },
        { label: topic?.name || 'Topic', to: `/company/${companyId}/interview/hr/${topicId}` },
        { label: question?.title || 'Question Detail' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview', to: '/interview' },
        { label: 'HR', to: '/interview/hr' },
        { label: topic?.name || 'Topic', to: `/interview/hr/${topicId}` },
        { label: question?.title || 'Question Detail' },
      ];

  // Note link with encoded topic & title
  const noteHref = `/notes?topic=${encodeURIComponent(topic?.name || 'HR Interview')}&title=${encodeURIComponent(question?.title || 'HR Question')}`;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-6 py-6 animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="bg-white rounded-[14px] border border-slate-200 p-8 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-20 bg-slate-100 rounded" />
          <div className="h-32 bg-slate-100 rounded" />
          <div className="h-32 bg-slate-100 rounded" />
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
          The requested behavioral question could not be located in this topic.
        </p>
        <Link
          to={companyId ? `/company/${companyId}/interview/hr/${topicId}` : `/interview/hr/${topicId}`}
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
        {/* Compact Breadcrumbs */}
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

        {/* STAR Practice Card Container */}
        <section className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-6 sm:p-7 max-w-5xl w-full mx-auto">
          {/* Header Row of Card: Metadata Badges + Bookmark Icon */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
                {question.category || 'HR Interview'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {question.type || 'Behavioral'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {topic?.shortName || question.topicName || 'Teamwork'}
              </span>
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
          <h2 className="text-[18px] sm:text-[19px] font-bold text-slate-900 leading-snug tracking-tight mb-5">
            {question.statement}
          </h2>

          {/* Instructional Subtitle & Dynamic Progress Counter */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#16793A] shrink-0" />
              <span>
                Structure your response using the <strong>STAR</strong> method (Situation, Task, Action, Result). All four sections are required.
              </span>
            </div>

            {/* Real-time Progress Pill */}
            <div className="flex items-center gap-1.5 font-medium self-end sm:self-center shrink-0">
              <span className="text-slate-400">Progress:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                  completedCount === 4
                    ? 'bg-emerald-100 text-[#16793A]'
                    : completedCount > 0
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {completedCount}/4 Completed
              </span>
            </div>
          </div>

          {/* STAR Form Fields */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Field 1: S — Situation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5" htmlFor="starSituation">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-[#16793A] flex items-center justify-center text-[11px] font-bold">
                    S
                  </span>
                  <span>S — Situation</span>
                </label>
                <span className="text-[11px] text-slate-400 italic">
                  Describe the context. What was happening, when, and where?
                </span>
              </div>
              <textarea
                id="starSituation"
                rows={3}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Briefly describe the situation, team setting, or challenge you faced..."
                className="w-full text-[13.5px] rounded-lg border border-slate-300 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-3 focus:ring-[#16793A]/15 transition-all resize-y"
              />
            </div>

            {/* Field 2: T — Task */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5" htmlFor="starTask">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-[#16793A] flex items-center justify-center text-[11px] font-bold">
                    T
                  </span>
                  <span>T — Task</span>
                </label>
                <span className="text-[11px] text-slate-400 italic">
                  What was your specific responsibility or goal?
                </span>
              </div>
              <textarea
                id="starTask"
                rows={3}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Explain what you needed to accomplish, your role, or what was expected of you..."
                className="w-full text-[13.5px] rounded-lg border border-slate-300 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-3 focus:ring-[#16793A]/15 transition-all resize-y"
              />
            </div>

            {/* Field 3: A — Action (Taller rows as requested) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5" htmlFor="starAction">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-[#16793A] flex items-center justify-center text-[11px] font-bold">
                    A
                  </span>
                  <span>A — Action</span>
                </label>
                <span className="text-[11px] text-slate-400 italic">
                  What specifically did you do? (Focus on your own actions, initiatives, and communication)
                </span>
              </div>
              <textarea
                id="starAction"
                rows={5}
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Describe the specific steps and actions you personally took to address the problem..."
                className="w-full text-[13.5px] rounded-lg border border-slate-300 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-3 focus:ring-[#16793A]/15 transition-all resize-y"
              />
            </div>

            {/* Field 4: R — Result */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5" htmlFor="starResult">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-[#16793A] flex items-center justify-center text-[11px] font-bold">
                    R
                  </span>
                  <span>R — Result</span>
                </label>
                <span className="text-[11px] text-slate-400 italic">
                  What happened as a result of your actions? What was the outcome or measurable impact?
                </span>
              </div>
              <textarea
                id="starResult"
                rows={3}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Describe the outcome, positive impact, what was accomplished, or what you learned..."
                className="w-full text-[13.5px] rounded-lg border border-slate-300 p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-3 focus:ring-[#16793A]/15 transition-all resize-y"
              />
            </div>

            {/* Bottom Actions Bar of the Form */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Interactive Sample Answer Drawer Toggle */}
                <button
                  type="button"
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#16793A] bg-slate-50 hover:bg-emerald-50/60 px-3.5 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  {showSampleAnswer ? (
                    <EyeOff className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>{showSampleAnswer ? 'Hide sample answer' : 'See sample answer'}</span>
                </button>

                {/* Optional Helper Quick Pre-fill Button */}
                <button
                  type="button"
                  onClick={handlePrefillDemo}
                  className="text-[11px] text-slate-400 hover:text-slate-600 underline font-medium transition-colors cursor-pointer"
                >
                  {completedCount === 4 ? 'Clear inputs' : 'Auto-fill template'}
                </button>
              </div>

              {/* Primary Form Submission Block */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
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
                    ? 'All sections ready to submit!'
                    : 'All 4 STAR sections required to save'}
                </span>

                <button
                  type="button"
                  disabled={!isFormValid || isSaving}
                  onClick={handleSaveAndNext}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
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

          {/* Expandable Sample Answer Drawer */}
          {showSampleAnswer && (
            <div className="mt-6 overflow-hidden rounded-xl border border-emerald-200/80 bg-[#F0FDF4]/70 p-5 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex p-1 rounded bg-[#16793A] text-white">
                    <Check className="w-3.5 h-3.5 stroke-2" />
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#16793A]">
                    SAMPLE MODEL ANSWER (STAR Method)
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-700 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                  Recommended Approach
                </span>
              </div>

              {question.modelAnswer ? (
                <div className="space-y-3.5 text-[13px] text-slate-700">
                  {/* S Block */}
                  <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-xs text-[#16793A] uppercase tracking-wide mb-1">
                      S — Situation
                    </p>
                    <p className="leading-relaxed">
                      {question.modelAnswer.situation}
                    </p>
                  </div>

                  {/* T Block */}
                  <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-xs text-[#16793A] uppercase tracking-wide mb-1">
                      T — Task
                    </p>
                    <p className="leading-relaxed">
                      {question.modelAnswer.task}
                    </p>
                  </div>

                  {/* A Block */}
                  <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-xs text-[#16793A] uppercase tracking-wide mb-1">
                      A — Action
                    </p>
                    <p className="leading-relaxed">
                      {question.modelAnswer.action}
                    </p>
                  </div>

                  {/* R Block */}
                  <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-xs text-[#16793A] uppercase tracking-wide mb-1">
                      R — Result
                    </p>
                    <p className="leading-relaxed">
                      {question.modelAnswer.result}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 p-4 rounded-lg border border-emerald-100 text-xs text-slate-600 text-center">
                  Verified sample answer is currently being prepared for this question.
                </div>
              )}
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
              You have completed all behavioral questions in <strong>{topic?.name}</strong>. Your responses have been saved.
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
                to={companyId ? `/company/${companyId}/interview/hr` : '/interview/hr'}
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
                  ? `/company/${companyId}/interview/hr/${topicId}/${prevQuestion.id}`
                  : `/interview/hr/${topicId}/${prevQuestion.id}`
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
                  ? `/company/${companyId}/interview/hr/${topicId}/${nextQuestion.id}`
                  : `/interview/hr/${topicId}/${nextQuestion.id}`
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
