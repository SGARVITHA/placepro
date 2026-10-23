import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  Edit3,
  Lightbulb,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { useQuestionDetail, useQuestions, useTopics, useCompanies } from '../../hooks/useContentQuery';
import { bookmarkService } from '../../services/bookmarkService';
import { UserService } from '../../data/UserService';
import { useAuth } from '../../hooks/useAuth';

export default function MCQQuestionPage({ practiceType = 'aptitude' }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const explanationRef = useRef(null);

  // Extract route params flexibly:
  // For Aptitude: /practice/aptitude/:topicId/:questionId (or /company/:companyId/aptitude/:topicId/:questionId)
  // For CS Subjects: /practice/cs-subjects/:subjectId/:questionId/mcq (or /company/:companyId/cs-subjects/:subjectId/:questionId/mcq)
  const companyId = params.companyId;
  const topicId = params.topicId || params.subjectId;
  const questionId = params.questionId;

  // Question detail query
  const {
    data: question,
    isLoading: isQuestionLoading,
    error: questionError,
  } = useQuestionDetail(questionId);

  // Sibling questions for sequence navigation
  const { data: siblingQuestions } = useQuestions({
    topicId,
    companyId: companyId || undefined,
  });

  // Navigation state backups
  const navCompanyName = location.state?.companyName;
  const navTopicName = location.state?.topicName || location.state?.subjectName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });
  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  const { data: topics } = useTopics({ categoryId: practiceType, companyId: companyId || undefined });
  const resolvedTopicName = useMemo(() => {
    if (navTopicName) return navTopicName;
    const match = topics?.find((t) => t.id === topicId);
    if (match) return match.name;
    return topicId ? topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Practice Topic';
  }, [navTopicName, topics, topicId]);

  // Interaction State
  const [selectedOption, setSelectedOption] = useState(null); // 0, 1, 2, 3
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Sync bookmark and solved status whenever questionId changes
  useEffect(() => {
    if (questionId) {
      setSelectedOption(null);
      setIsEvaluated(false);
      setIsBookmarked(bookmarkService.isBookmarked(questionId, user));
      setIsSolved(UserService.isSolved(questionId));
    }
  }, [questionId, user]);

  // Sibling question indices
  const currentIndex = useMemo(() => {
    if (!siblingQuestions || !Array.isArray(siblingQuestions)) return -1;
    return siblingQuestions.findIndex((q) => String(q.id) === String(questionId));
  }, [siblingQuestions, questionId]);

  const prevQuestion = currentIndex > 0 ? siblingQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex >= 0 && currentIndex < (siblingQuestions?.length || 0) - 1
    ? siblingQuestions[currentIndex + 1]
    : null;

  // Options and validation
  const options = useMemo(() => {
    if (!question || !Array.isArray(question.options)) return [];
    return question.options;
  }, [question]);

  const correctIndex = question?.correct_option ?? 1;

  // Handlers
  const handleSelectOption = (idx) => {
    if (isEvaluated) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isEvaluated) return;
    setIsEvaluated(true);

    // Auto mark solved if correct
    if (selectedOption === correctIndex) {
      if (!isSolved) {
        UserService.toggleSolved(questionId);
        setIsSolved(true);
      }
    }

    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleToggleBookmark = () => {
    if (!question) return;
    const updated = bookmarkService.toggleBookmark(
      {
        id: question.id,
        questionId: question.id,
        title: question.title || question.question_text?.slice(0, 60),
        difficulty: question.difficulty || 'Medium',
        topic: resolvedTopicName,
        topicId,
        category: practiceType === 'cs-subjects' ? 'CS Subjects' : 'Aptitude',
        practiceType: 'MCQ',
        company: resolvedCompany || question.company_name || 'Standard',
        route: location.pathname,
      },
      user
    );
    setIsBookmarked(updated);
  };

  const handleToggleSolved = () => {
    UserService.toggleSolved(questionId);
    setIsSolved((prev) => !prev);
  };

  const handleAddNote = () => {
    const qTitle = question?.title || question?.question_text?.slice(0, 50) || 'Question';
    navigate(`/notes?topic=${encodeURIComponent(resolvedTopicName)}&title=${encodeURIComponent(qTitle)}`);
  };

  const navigateToQuestion = (targetQ) => {
    if (!targetQ) {
      // Exit back to question list
      if (practiceType === 'cs-subjects') {
        navigate(companyId ? `/company/${companyId}/cs-subjects/${topicId}` : `/practice/cs-subjects/${topicId}`);
      } else {
        navigate(companyId ? `/company/${companyId}/aptitude/${topicId}` : `/practice/aptitude/${topicId}`);
      }
      return;
    }

    const nextUrl = practiceType === 'cs-subjects'
      ? (companyId
          ? `/company/${companyId}/cs-subjects/${topicId}/${targetQ.id}/mcq`
          : `/practice/cs-subjects/${topicId}/${targetQ.id}/mcq`)
      : (companyId
          ? `/company/${companyId}/aptitude/${topicId}/${targetQ.id}`
          : `/practice/aptitude/${topicId}/${targetQ.id}`);

    navigate(nextUrl, {
      state: {
        companyId,
        companyName: resolvedCompany,
        topicId,
        topicName: resolvedTopicName,
        questionId: targetQ.id,
      },
    });
  };

  // Breadcrumbs
  const breadcrumbItems = useMemo(() => {
    const root = [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Practice', to: '/practice' },
    ];
    if (companyId) {
      root[1] = { label: 'Company Specific', to: '/company' };
      root.push({ label: resolvedCompany, to: `/company/${companyId}` });
    }
    if (practiceType === 'cs-subjects') {
      root.push({
        label: 'CS Subjects',
        to: companyId ? `/company/${companyId}/cs-subjects` : '/practice/cs-subjects',
      });
      root.push({
        label: resolvedTopicName,
        to: companyId ? `/company/${companyId}/cs-subjects/${topicId}` : `/practice/cs-subjects/${topicId}`,
      });
    } else {
      root.push({
        label: 'Aptitude',
        to: companyId ? `/company/${companyId}/aptitude` : '/practice/aptitude',
      });
      root.push({
        label: resolvedTopicName,
        to: companyId ? `/company/${companyId}/aptitude/${topicId}` : `/practice/aptitude/${topicId}`,
      });
    }
    root.push({ label: question?.title || 'Practice Question' });
    return root;
  }, [companyId, resolvedCompany, practiceType, resolvedTopicName, topicId, question]);

  // Loading State
  if (isQuestionLoading) {
    return (
      <div className="max-w-4xl w-full mx-auto px-6 py-8 animate-pulse space-y-6">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 space-y-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="h-16 w-full bg-gray-200 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (questionError || !question) {
    return (
      <div className="max-w-4xl w-full mx-auto px-6 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">Question Not Found</h2>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          The requested question could not be loaded. Please return to the question list.
        </p>
        <button
          onClick={() => navigateToQuestion(null)}
          className="px-4 py-2 bg-[#16793A] text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Return to Question List
        </button>
      </div>
    );
  }

  const isUserCorrect = isEvaluated && selectedOption === correctIndex;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfd] text-[#1e293b]">
      {/* Central Practice Container */}
      <div className="max-w-4xl w-full mx-auto px-6 py-6 pb-28 flex-1">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* MCQ Practice Question Card */}
        <article className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 md:p-8">
          {/* Card Header: Title & Bookmark */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-xl md:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
              {question.title || question.question_text?.slice(0, 60)}
            </h1>
            <button
              id="bookmark-btn"
              onClick={handleToggleBookmark}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#16793A] hover:border-slate-300 transition-colors shrink-0"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#16793A] text-[#16793A]' : ''}`} />
            </button>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {question.difficulty && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  question.difficulty.toLowerCase() === 'easy'
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : question.difficulty.toLowerCase() === 'hard'
                    ? 'bg-[#fee2e2] text-[#991b1b]'
                    : 'bg-[#fef3c7] text-[#92400e]'
                }`}
              >
                {question.difficulty}
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#475569]">
              {practiceType === 'cs-subjects' ? 'CS Subjects' : 'Aptitude'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#475569]">
              {resolvedTopicName}
            </span>
            {question.company_name && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#475569]">
                {question.company_name}
              </span>
            )}
            {question.pattern && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#475569]">
                {question.pattern}
              </span>
            )}
          </div>

          {/* Question Content Block */}
          <div className="mb-7">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-2">
              Question
            </p>
            <p className="text-base text-[#1e293b] leading-relaxed font-normal whitespace-pre-wrap">
              {question.question_text}
            </p>
          </div>

          {/* Options Section */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-3">
              Select One Option
            </p>
            <div className="grid grid-cols-1 gap-3" id="options-group">
              {options.map((optText, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === correctIndex;

                let cardClass = 'option-card flex items-center justify-between p-3.5 rounded-lg border border-[#e2e8f0] cursor-pointer';
                if (!isEvaluated) {
                  if (isSelected) {
                    cardClass += ' selected border-[#16793A] bg-[#f0fdf4]';
                  }
                } else {
                  cardClass += ' locked pointer-events-none';
                  if (isCorrectOption) {
                    cardClass += ' correct border-[#16a34a] bg-[#f0fdf4] text-[#14532d]';
                  } else if (isSelected && !isCorrectOption) {
                    cardClass += ' incorrect border-[#dc2626] bg-[#fef2f2] text-[#7f1d1d]';
                  }
                }

                return (
                  <div
                    key={idx}
                    id={`option-${letter}`}
                    onClick={() => handleSelectOption(idx)}
                    className={cardClass}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Radio indicator */}
                      <div
                        className={`radio-indicator w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-[#16793A]'
                            : isEvaluated && isCorrectOption
                            ? 'border-[#16a34a]'
                            : 'border-slate-300'
                        }`}
                      >
                        <div
                          className={`radio-dot w-2.5 h-2.5 rounded-full transition-colors ${
                            isSelected
                              ? 'bg-[#16793A]'
                              : isEvaluated && isCorrectOption
                              ? 'bg-[#16a34a]'
                              : 'bg-transparent'
                          }`}
                        />
                      </div>

                      {/* Letter badge + Option text */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0">
                          {letter}
                        </span>
                        <span className="text-sm font-medium text-slate-800">
                          {optText}
                        </span>
                      </div>
                    </div>

                    {/* Feedback Badges */}
                    {isEvaluated && (
                      <div className="feedback-badge text-xs font-semibold">
                        {isCorrectOption ? (
                          <span className="text-emerald-700 font-bold">
                            {isSelected ? '✓ Correct' : '✓ Correct Answer'}
                          </span>
                        ) : isSelected ? (
                          <span className="text-rose-700 font-bold">✕ Incorrect</span>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Interaction Actions Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500" id="selection-status-hint">
              {!isEvaluated
                ? selectedOption !== null
                  ? `Option ${String.fromCharCode(65 + selectedOption)} selected. Ready to check.`
                  : 'Please choose an option to verify.'
                : 'Question evaluated. Review explanation below.'}
            </span>

            {!isEvaluated && (
              <button
                id="check-answer-btn"
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-[#16793A] hover:bg-[#15803d] cursor-pointer'
                    : 'bg-[#16793A] opacity-50 cursor-not-allowed'
                }`}
              >
                <span>Check Answer</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dynamic Solution & Explanation Container (Revealed upon submit) */}
          {isEvaluated && (
            <section
              ref={explanationRef}
              className="mt-8 pt-6 border-t border-slate-200 space-y-5"
              data-purpose="solution-section"
            >
              {/* Result Alert Banner */}
              <div
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  isUserCorrect
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border border-red-200 text-red-900'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold ${
                    isUserCorrect
                      ? 'bg-emerald-100 text-[#16793A]'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {isUserCorrect ? '✓' : '✕'}
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {isUserCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                  </p>
                  <p className="text-xs mt-0.5">
                    {isUserCorrect
                      ? `Excellent work! Option ${String.fromCharCode(65 + correctIndex)} is the accurate answer.`
                      : `The correct answer is Option ${String.fromCharCode(65 + correctIndex)} (${options[correctIndex]}). Review the step-by-step breakdown below.`}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                  Explanation & Step-by-Step Solution
                </p>

                {/* Core Formula Box */}
                {question.formula && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-800">
                    <span className="text-slate-500">Formula / Rule:</span>{' '}
                    <span className="font-bold text-[#16793A]">{question.formula}</span>
                  </div>
                )}

                {/* Mathematical or Conceptual Steps */}
                <div className="text-sm text-slate-700 space-y-2 leading-relaxed">
                  {question.given_values && question.given_values.length > 0 && (
                    <div>
                      <p className="font-medium text-slate-900 mb-1">1. Given Values:</p>
                      <ul className="list-disc list-inside pl-2 space-y-1 text-slate-600">
                        {question.given_values.map((gv, i) => (
                          <li key={i}>
                            {gv.label} = <strong className="text-slate-800">{gv.value}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {question.solution_steps && question.solution_steps.length > 0 ? (
                    <div>
                      <p className="font-medium text-slate-900 mb-1">
                        {question.given_values ? '2. Calculation / Derivation:' : 'Solution Steps:'}
                      </p>
                      <div className="pl-4 py-1 border-l-2 border-slate-300 font-mono text-xs text-slate-800 space-y-1.5">
                        {question.solution_steps.map((step, i) => (
                          <p key={i}>{step}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    question.solution && (
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{question.solution}</p>
                    )
                  )}

                  <p className="pt-1">
                    Therefore, the correct answer is{' '}
                    <span className="font-semibold text-slate-900">
                      Option {String.fromCharCode(65 + correctIndex)} ({options[correctIndex]})
                    </span>
                    .
                  </p>
                </div>

                {/* Placement Tip Box */}
                {question.exam_tip && (
                  <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exam Tip:</strong> {question.exam_tip}
                    </span>
                  </div>
                )}

                {/* In-Card Next Question Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => navigateToQuestion(nextQuestion)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16793A] hover:bg-[#15803d] text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
                  >
                    <span>{nextQuestion ? 'Next Question' : 'Complete Topic'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer
        className="fixed bottom-0 left-[260px] right-0 h-16 border-t border-[#e2e8f0] bg-white px-8 flex items-center justify-between shrink-0 select-none z-20 shadow-xs"
        data-purpose="bottom-bar"
      >
        {/* Previous Question Button */}
        <div>
          <button
            onClick={() => navigateToQuestion(prevQuestion)}
            disabled={!prevQuestion}
            className={`inline-flex items-center gap-2 text-sm font-medium py-2 px-1 transition-colors ${
              prevQuestion
                ? 'text-[#64748b] hover:text-[#0f172a] cursor-pointer'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>
        </div>

        {/* Centered Add Note Action Button */}
        <div>
          <button
            onClick={handleAddNote}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#cbd5e1] text-sm font-medium text-[#334155] bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-[#64748b]" />
            <span>Add Note</span>
          </button>
        </div>

        {/* Right Side: Mark Solved & Next Question */}
        <div className="flex items-center gap-6">
          <button
            id="mark-solved-btn"
            onClick={handleToggleSolved}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              isSolved ? 'text-[#16793A] font-bold' : 'text-[#475569] hover:text-[#16793A]'
            }`}
          >
            <Check className={`w-4 h-4 ${isSolved ? 'text-[#16793A] stroke-[2.5]' : 'text-slate-400'}`} />
            <span>{isSolved ? 'Solved' : 'Mark Solved'}</span>
          </button>

          <button
            onClick={() => navigateToQuestion(nextQuestion)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16793A] hover:text-[#15803d] transition-colors"
          >
            <span>{nextQuestion ? 'Next Question' : 'Complete Topic'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
