import { useState } from 'react';
import {
  Star,
  Save,
  Check,
  RotateCcw,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const STAR_PROMPTS = [
  'Describe a challenging project where you encountered a major technical bottleneck and how you solved it.',
  'Tell me about a time you had a disagreement with a team member on an engineering design decision.',
  'Give an example of a situation where you had to quickly learn an unfamiliar technology or framework to meet a deadline.',
  'Describe a situation where a software feature or system failed in production or testing, and how you responded.',
];

const STORAGE_KEY = 'placepro_star_responses';

function readSavedInterviewData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function InterviewPractice() {
  const [mode, setMode] = useState('star'); // 'star' | 'freeform'
  const [promptIndex, setPromptIndex] = useState(0);
  const [savedStatus, setSavedStatus] = useState(false);

  const [starData, setStarData] = useState(() => {
    const saved = readSavedInterviewData();
    return saved.star || { situation: '', task: '', action: '', result: '' };
  });

  const [freeformData, setFreeformData] = useState(() => {
    const saved = readSavedInterviewData();
    return saved.freeform || '';
  });

  const handleSave = () => {
    const toSave = {
      star: starData,
      freeform: freeformData,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const handleClear = () => {
    if (mode === 'star') {
      setStarData({ situation: '', task: '', action: '', result: '' });
    } else {
      setFreeformData('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Interview', to: '/interview' },
          { label: mode === 'star' ? 'STAR Practice' : 'Freeform Practice' },
        ]}
      />

      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Behavioral &amp; HR Practice
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Structure your campus interview responses using the industry standard STAR technique.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setMode('star')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'star'
                ? 'bg-white text-[#16793A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            STAR Method
          </button>
          <button
            type="button"
            onClick={() => setMode('freeform')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'freeform'
                ? 'bg-white text-[#16793A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Freeform Answer
          </button>
        </div>
      </div>

      {/* Interview Question Prompt Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Interview Question Prompt
          </span>
          <button
            type="button"
            onClick={() => setPromptIndex((prev) => (prev + 1) % STAR_PROMPTS.length)}
            className="text-xs text-[#16793A] hover:underline font-semibold cursor-pointer"
          >
            Try Another Prompt →
          </button>
        </div>
        <p className="text-base font-semibold text-slate-900 leading-snug">
          &ldquo;{STAR_PROMPTS[promptIndex]}&rdquo;
        </p>
      </div>

      {/* STAR Mode Form */}
      {mode === 'star' ? (
        <div className="space-y-4">
          {/* Situation */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                S
              </span>
              <h3 className="text-sm font-bold text-slate-900">Situation</h3>
              <span className="text-xs text-slate-400">Describe the context and background</span>
            </div>
            <textarea
              rows={3}
              value={starData.situation}
              onChange={(e) => setStarData((prev) => ({ ...prev, situation: e.target.value }))}
              placeholder="e.g. During my final year capstone project at RMKEC, our team was building an automated placement analytics dashboard..."
              className="w-full text-sm text-slate-800 p-3 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#16793A]"
            />
          </div>

          {/* Task */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center">
                T
              </span>
              <h3 className="text-sm font-bold text-slate-900">Task</h3>
              <span className="text-xs text-slate-400">What was your specific responsibility or goal?</span>
            </div>
            <textarea
              rows={3}
              value={starData.task}
              onChange={(e) => setStarData((prev) => ({ ...prev, task: e.target.value }))}
              placeholder="e.g. My responsibility was designing the API integration and reducing backend query latency below 200ms..."
              className="w-full text-sm text-slate-800 p-3 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#16793A]"
            />
          </div>

          {/* Action */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">
                A
              </span>
              <h3 className="text-sm font-bold text-slate-900">Action</h3>
              <span className="text-xs text-slate-400">What concrete steps did YOU take to address the issue?</span>
            </div>
            <textarea
              rows={4}
              value={starData.action}
              onChange={(e) => setStarData((prev) => ({ ...prev, action: e.target.value }))}
              placeholder="e.g. I profiled the database queries using EXPLAIN ANALYZE, added composite indexes on foreign keys, and implemented in-memory cache..."
              className="w-full text-sm text-slate-800 p-3 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#16793A]"
            />
          </div>

          {/* Result */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">
                R
              </span>
              <h3 className="text-sm font-bold text-slate-900">Result</h3>
              <span className="text-xs text-slate-400">Quantifiable outcome, metrics, and learnings</span>
            </div>
            <textarea
              rows={3}
              value={starData.result}
              onChange={(e) => setStarData((prev) => ({ ...prev, result: e.target.value }))}
              placeholder="e.g. As a result, query latency dropped by 65%, enabling concurrent access for 500+ active students during mock tests without downtime..."
              className="w-full text-sm text-slate-800 p-3 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#16793A]"
            />
          </div>
        </div>
      ) : (
        /* Freeform Mode */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Comprehensive Response
          </label>
          <textarea
            rows={10}
            value={freeformData}
            onChange={(e) => setFreeformData(e.target.value)}
            placeholder="Type your complete interview response here..."
            className="w-full text-sm text-slate-800 p-4 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#16793A] leading-relaxed"
          />
        </div>
      )}

      {/* Bottom Actions Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Response</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          {savedStatus ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedStatus ? 'Saved to Practice Record!' : 'Save Practice Response'}</span>
        </button>
      </div>
    </div>
  );
}
