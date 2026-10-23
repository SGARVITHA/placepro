import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  XCircle,
  Layers,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { mockQuestions } from '../../services/mockApiService';
import { UserService } from '../../data/UserService';

export default function MCQPractice() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const targetQId = searchParams.get('q') || location.state?.questionId;

  const isCs = location.pathname.includes('cs-subjects');
  const categoryFilter = isCs ? 'cs-subjects' : 'aptitude';
  const categoryTitle = isCs ? 'CS Subjects Practice' : 'Aptitude Practice';

  const questions = mockQuestions.filter(
    (q) => q.category_id === categoryFilter && q.options && q.options.length > 0
  );

  const initialIndex = targetQId
    ? Math.max(0, questions.findIndex((q) => q.id === targetQId))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIndex }
  const [bookmarks, setBookmarks] = useState(() => UserService.getBookmarks());

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(UserService.getBookmarks());
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, []);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx) => {
    if (!currentQ) return;
    if (selectedAnswers[currentQ.id] !== undefined) return; // lock after answer

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: idx,
    }));

    // If correct, record as solved in UserService
    if (idx === currentQ.correct_option) {
      if (!UserService.isSolved(currentQ.id)) {
        UserService.toggleSolved(currentQ.id);
      }
    }
  };

  const toggleBookmark = (id) => {
    const updated = UserService.toggleBookmark(id);
    setBookmarks(updated);
  };

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
        No questions available for this practice category.
      </div>
    );
  }

  const isAnswered = selectedAnswers[currentQ.id] !== undefined;
  const userSelected = selectedAnswers[currentQ.id];
  const isCorrect = userSelected === currentQ.correct_option;
  const isBookmarked = bookmarks.includes(currentQ.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Practice' },
          { label: categoryTitle },
        ]}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{categoryTitle}</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Interactive multiple-choice practice with instant answer evaluation and solutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/practice/flashcards"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Switch to Flashcards</span>
          </Link>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        {/* Top Meta */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#16793A] rounded-md uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </span>
            {currentQ.company_name && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                Asked at {currentQ.company_name} ({currentQ.year_asked})
              </span>
            )}
            <span className="px-2 py-0.5 border border-amber-200 text-amber-700 bg-amber-50 rounded-md text-[11px]">
              {currentQ.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Question Text */}
        <div className="text-slate-900 font-semibold text-lg leading-relaxed whitespace-pre-line">
          {currentQ.question_text}
        </div>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';

            if (isAnswered) {
              if (idx === currentQ.correct_option) {
                optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-medium ring-1 ring-emerald-500';
              } else if (idx === userSelected) {
                optionStyles = 'border-rose-500 bg-rose-50/80 text-rose-900 ring-1 ring-rose-500';
              } else {
                optionStyles = 'border-slate-200 opacity-60 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm cursor-pointer disabled:cursor-default ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 bg-white">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && idx === currentQ.correct_option && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                )}
                {isAnswered && idx === userSelected && idx !== currentQ.correct_option && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Answer Feedback */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border text-sm space-y-2 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer! Well done.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. Correct option is ({String.fromCharCode(65 + currentQ.correct_option)}).</span>
                </>
              )}
            </div>
            {currentQ.solution && (
              <div className="pt-2 border-t border-slate-200/50 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                <span className="font-bold text-slate-900">Explanation: </span>
                {currentQ.solution}
              </div>
            )}
          </div>
        )}

        {/* Question Navigation Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            {currentIndex + 1} of {questions.length}
          </span>

          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-xs"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
