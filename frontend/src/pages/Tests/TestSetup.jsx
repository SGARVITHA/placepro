import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  FileQuestion,
  Play,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { mockTestService } from '../../services/mockTestService';

export default function TestSetup() {
  const navigate = useNavigate();
  const [activeSession] = useState(() => {
    const existing = mockTestService.getActiveSession();
    return existing && existing.remainingSeconds > 0 ? existing : null;
  });
  const [category, setCategory] = useState('Full-Length Campus Mock');
  const duration = 15;

  const handleStart = () => {
    mockTestService.startTest({
      title: `${category} Test`,
      category,
      durationMinutes: duration,
    });
    navigate('/tests/session');
  };

  const handleResume = () => {
    navigate('/tests/session');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Tests' },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Campus Placement Mock Tests
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Timed assessments simulating real campus drive online assessments (OA) with automated evaluation.
        </p>
      </div>

      {/* Resume Banner if Active Test Exists */}
      {activeSession && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                You have an active test in progress!
              </h3>
              <p className="text-xs text-amber-700">
                {Math.floor(activeSession.remainingSeconds / 60)}m {activeSession.remainingSeconds % 60}s remaining. Your answers and timer are preserved.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResume}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            Resume Test →
          </button>
        </div>
      )}

      {/* Test Setup Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Assessment Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Full-Length Campus Mock', desc: 'Aptitude, CS & Coding fundamentals' },
                { title: 'Quantitative Aptitude', desc: 'Numbers, Profit/Loss, Percentages' },
                { title: 'Technical CS Fundamentals', desc: 'OS, DBMS, Computer Networks' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => setCategory(opt.title)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    category === opt.title
                      ? 'border-[#16793A] bg-[#E8F5E9]/50 ring-1 ring-[#16793A]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 mb-1">{opt.title}</div>
                  <div className="text-xs text-slate-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Meta Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Question Count
              </span>
              <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-emerald-600" />
                <span>8 Questions</span>
              </div>
              <p className="text-xs text-slate-500">Multiple-choice format with 4 options each</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Test Duration
              </span>
              <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>15 Minutes</span>
              </div>
              <p className="text-xs text-slate-500">Persistent countdown with auto-submit</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Test Instructions
            </h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 leading-relaxed">
              <li>Each question carries 1 mark. There is no negative marking for incorrect answers.</li>
              <li>You can mark questions for review and navigate freely using the question palette.</li>
              <li>Refreshing the browser will not erase your timer or answers (persistent dev adapter active).</li>
              <li>Results with full explanations will be generated immediately upon submission.</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={handleStart}
            className="px-6 py-2.5 bg-[#16793A] hover:bg-[#12632F] text-white text-sm font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            id="btn-start-test"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
