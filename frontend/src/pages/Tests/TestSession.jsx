import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Flag,
  X,
} from 'lucide-react';
import { mockTestService } from '../../services/mockTestService';

export default function TestSession() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => mockTestService.getActiveSession());
  const [currentIndex, setCurrentIndex] = useState(() => {
    const active = mockTestService.getActiveSession();
    return active?.currentIndex || 0;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const active = mockTestService.getActiveSession();
    return active?.remainingSeconds || 0;
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // If no active session, redirect to test setup
  useEffect(() => {
    if (!session) {
      navigate('/tests', { replace: true });
    }
  }, [session, navigate]);

  // Persistent Timer Countdown
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const active = mockTestService.getActiveSession();
      if (!active || active.remainingSeconds <= 0) {
        clearInterval(interval);
        // Time up, auto-submit
        mockTestService.submitTest();
        navigate('/tests/results', { replace: true });
        return;
      }
      setTimeLeft(active.remainingSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [session, navigate]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#16793A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const questions = session.questions || [];
  const currentQ = questions[currentIndex] || questions[0];
  const answers = session.answers || {};
  const flagged = session.flagged || [];

  const selectedOption = answers[currentQ.id];
  const isFlagged = flagged.includes(currentQ.id);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx) => {
    const updated = mockTestService.saveAnswer(currentQ.id, idx);
    if (updated) setSession(updated);
  };

  const handleClearResponse = () => {
    const updated = mockTestService.saveAnswer(currentQ.id, null);
    if (updated) setSession(updated);
  };

  const handleToggleFlag = () => {
    const updated = mockTestService.toggleFlag(currentQ.id);
    if (updated) setSession(updated);
  };

  const handleNavigateQuestion = (idx) => {
    setCurrentIndex(idx);
    mockTestService.setCurrentIndex(idx);
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      handleNavigateQuestion(currentIndex + 1);
    }
  };

  const handleConfirmSubmit = () => {
    mockTestService.submitTest();
    navigate('/tests/results', { replace: true });
  };

  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Test Application Top Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 text-base">{session.title}</h2>
          <span className="text-xs text-slate-400">Section 1: {currentQ.category}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div
            className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm flex items-center gap-2 border ${
              timeLeft < 180
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-emerald-50 text-[#16793A] border-emerald-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
            id="btn-submit-exam"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Test Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Area (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question {currentIndex + 1} of {questions.length}
              </span>

              <button
                type="button"
                onClick={handleToggleFlag}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isFlagged ? 'Flagged for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-slate-900 font-bold text-lg leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 text-sm cursor-pointer ${
                      isSelected
                        ? 'border-[#16793A] bg-[#E8F5E9]/60 text-slate-900 font-semibold ring-1 ring-[#16793A]'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'border-[#16793A] bg-[#16793A] text-white'
                          : 'border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavigateQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Previous
              </button>

              {selectedOption !== undefined && selectedOption !== null && (
                <button
                  type="button"
                  onClick={handleClearResponse}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Response
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveAndNext}
              disabled={currentIndex === questions.length - 1}
              className="px-5 py-2 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-bold transition-colors shadow-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              Save &amp; Next
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Question Palette
          </h3>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
              <span>Review ({flagged.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 shrink-0" />
              <span>Unanswered ({unansweredCount})</span>
            </div>
          </div>

          {/* Palette Numbers Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            {questions.map((q, qIdx) => {
              const isQAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
              const isQFlagged = flagged.includes(q.id);
              const isCurrent = qIdx === currentIndex;

              let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
              if (isQFlagged) {
                btnBg = 'bg-amber-500 text-white border-amber-600 font-bold';
              } else if (isQAnswered) {
                btnBg = 'bg-emerald-600 text-white border-emerald-700 font-bold';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleNavigateQuestion(qIdx)}
                  className={`h-11 rounded-xl border font-mono text-sm flex items-center justify-center transition-all cursor-pointer ${btnBg} ${
                    isCurrent ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                  }`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
            Persistent Session: Progress and remaining timer are saved locally. Refreshing does not reset the exam.
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Confirm Submission</h3>
                <p className="text-xs text-slate-500">
                  Are you ready to submit your assessment? You cannot modify answers after submission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="block text-slate-400">Total</span>
                <span className="font-bold text-slate-800 text-sm">{questions.length}</span>
              </div>
              <div>
                <span className="block text-slate-400">Answered</span>
                <span className="font-bold text-emerald-600 text-sm">{answeredCount}</span>
              </div>
              <div>
                <span className="block text-slate-400">Unanswered</span>
                <span className="font-bold text-rose-600 text-sm">{unansweredCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Continue Assessment
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-[#16793A] hover:bg-[#12632F] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                id="btn-confirm-submit"
              >
                Confirm &amp; View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
