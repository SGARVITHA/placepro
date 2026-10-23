import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';

export default function CSModeSelector({ mode = 'flashcard', onChange }) {
  return (
    <div
      role="group"
      aria-label="Practice Mode Selector"
      className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs"
    >
      <button
        type="button"
        id="mode-selector-flashcard"
        onClick={() => onChange('flashcard')}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
          mode === 'flashcard'
            ? 'bg-[#Edf4F0] text-[#16793A] shadow-xs border border-[#16793A]/20'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
        }`}
      >
        <Layers className={`w-4 h-4 ${mode === 'flashcard' ? 'text-[#16793A]' : 'text-slate-500'}`} />
        <span>Flashcard</span>
      </button>

      <button
        type="button"
        id="mode-selector-mcq"
        onClick={() => onChange('mcq')}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
          mode === 'mcq'
            ? 'bg-[#Edf4F0] text-[#16793A] shadow-xs border border-[#16793A]/20'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
        }`}
      >
        <HelpCircle className={`w-4 h-4 ${mode === 'mcq' ? 'text-[#16793A]' : 'text-slate-500'}`} />
        <span>MCQ</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-700 tracking-wider uppercase">
          Soon
        </span>
      </button>
    </div>
  );
}

export function MCQComingSoon({ onSwitchToFlashcard, subjectName = 'CS Subjects' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mx-auto mb-5 shadow-2xs">
        <HelpCircle className="w-7 h-7" />
      </div>

      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-3">
        Feature In Development
      </span>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
        {subjectName} MCQ Practice Coming Soon
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
        Timed Multiple-Choice Question (MCQ) assessments for {subjectName} are currently being developed with campus-specific question patterns. In the meantime, you can test and reinforce your concepts with the interactive 3D Flashcard mode.
      </p>

      <button
        type="button"
        onClick={onSwitchToFlashcard}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16793A] hover:bg-[#12612e] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
      >
        <Layers className="w-4 h-4" />
        <span>Switch to Flashcard Mode</span>
      </button>
    </div>
  );
}
