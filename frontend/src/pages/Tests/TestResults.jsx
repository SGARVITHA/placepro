import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { mockTestService } from '../../services/mockTestService';

export default function TestResults() {
  const navigate = useNavigate();
  const [results] = useState(() => mockTestService.getLatestResults());

  useEffect(() => {
    if (!results) {
      navigate('/tests', { replace: true });
    }
  }, [results, navigate]);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#16793A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const passRate = Math.round((results.score / results.totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Tests', to: '/tests' },
          { label: 'Results' },
        ]}
      />

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Assessment Report</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Detailed performance breakdown for {results.title}.
          </p>
        </div>

        <Link
          to="/tests"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Take Another Test</span>
        </Link>
      </div>

      {/* Score Summary Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Score
          </span>
          <div className="text-2xl font-bold text-slate-900">
            {results.score} / {results.totalQuestions}
          </div>
          <p className="text-xs text-slate-400">{passRate}% Score achieved</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Accuracy
          </span>
          <div className="text-2xl font-bold text-[#16793A]">{results.accuracy}%</div>
          <p className="text-xs text-slate-400">On attempted questions</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Time Taken
          </span>
          <div className="text-2xl font-bold text-slate-900">{results.timeTaken}</div>
          <p className="text-xs text-slate-400">Under 15m limit</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Status
          </span>
          <div className="text-2xl font-bold text-emerald-700">
            {passRate >= 60 ? 'Cleared' : 'Needs Practice'}
          </div>
          <p className="text-xs text-slate-400">College OA Benchmark: 60%</p>
        </div>
      </div>

      {/* Question-by-Question Review List */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Question-by-Question Analysis</h2>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> {results.correctCount} Correct
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              <XCircle className="w-3.5 h-3.5" /> {results.incorrectCount} Incorrect
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <HelpCircle className="w-3.5 h-3.5" /> {results.unattemptedCount} Skipped
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {results.reviewList.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 rounded-xl border space-y-3.5 transition-all ${
                item.isCorrect
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : item.isAttempted
                  ? 'bg-rose-50/40 border-rose-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question {idx + 1} · {item.category}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.isCorrect
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.isAttempted
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.isCorrect ? 'Correct ✓' : item.isAttempted ? 'Incorrect ✗' : 'Skipped'}
                </span>
              </div>

              <div className="font-semibold text-slate-900 text-sm leading-relaxed">
                {item.question}
              </div>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {item.options.map((opt, oIdx) => {
                  const isUserPick = item.userAnswer === oIdx;
                  const isRightAnswer = item.correctOption === oIdx;

                  let optClass = 'bg-white border-slate-200 text-slate-700';
                  if (isRightAnswer) {
                    optClass = 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isUserPick) {
                    optClass = 'bg-rose-100/70 border-rose-400 text-rose-900 font-bold';
                  }

                  return (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-lg border flex items-center justify-between ${optClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                      {isRightAnswer && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                      {isUserPick && !isRightAnswer && <XCircle className="w-3.5 h-3.5 text-rose-700" />}
                    </div>
                  );
                })}
              </div>

              {/* Solution / Explanation */}
              {item.explanation && (
                <div className="pt-2 border-t border-slate-200/50 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Explanation: </span>
                  {item.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
