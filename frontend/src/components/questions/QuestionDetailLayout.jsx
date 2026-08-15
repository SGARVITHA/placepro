import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowLeft, ArrowRight, Check, Edit3 } from 'lucide-react';
import { UserService } from '../../data/UserService';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb';

export default function QuestionDetailLayout({ 
  question, 
  breadcrumbs, 
  tags, 
  onPrevious, 
  onNext,
  disablePrevious,
  disableNext,
  topicName
}) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (question) {
      setIsBookmarked(UserService.isBookmarked(question.id));
      setIsSolved(UserService.isSolved(question.id));
    }
  }, [question]);

  if (!question) return null;

  const handleBookmark = () => {
    UserService.toggleBookmark(question.id);
    setIsBookmarked(!isBookmarked);
  };

  const handleSolve = () => {
    UserService.toggleSolved(question.id);
    setIsSolved(!isSolved);
  };

  const handleAddNote = () => {
    navigate(`/notes?topic=${encodeURIComponent(topicName || '')}&title=${encodeURIComponent(question.title)}`);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-full relative pb-24">
      <Breadcrumb items={breadcrumbs} />

      <div className="bg-bg-primary border border-border rounded-xl p-8 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight leading-tight">
            {question.title}
          </h1>
          <button 
            onClick={handleBookmark}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-black/5 transition-colors shrink-0"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-accent text-accent' : 'text-text-secondary'}`} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                tag.type === 'difficulty' && tag.label === 'Easy' ? 'bg-green-50 text-green-700' :
                tag.type === 'difficulty' && tag.label === 'Medium' ? 'bg-orange-50 text-orange-700' :
                tag.type === 'difficulty' && tag.label === 'Hard' ? 'bg-red-50 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Question</h4>
            <p className="text-[15px] text-text-primary leading-relaxed whitespace-pre-wrap">
              {question.questionText}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Solution</h4>
            <p className="text-[15px] text-text-primary leading-relaxed whitespace-pre-wrap">
              {question.solution}
            </p>
          </div>

          {(question.exampleInput || question.exampleOutput) && (
            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Example</h4>
              <div className="text-[15px] text-text-primary leading-relaxed font-mono bg-gray-50 p-4 rounded-lg">
                {question.exampleInput && <div><span className="font-bold">Input:</span> {question.exampleInput}</div>}
                {question.exampleOutput && <div><span className="font-bold">Output:</span> {question.exampleOutput}</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-[260px] right-0 bg-white border-t border-border p-4 px-8 flex items-center justify-between z-10">
        <div className="flex-1">
          <button 
            onClick={onPrevious}
            disabled={disablePrevious}
            className={`flex items-center gap-2 font-medium transition-colors ${disablePrevious ? 'text-gray-300 cursor-not-allowed' : 'text-accent hover:text-accent-dark'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Question
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <button 
            onClick={handleAddNote}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-medium text-text-primary hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Edit3 className="w-4 h-4 text-text-secondary" />
            Add Note
          </button>
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          <button 
            onClick={handleSolve}
            className={`flex items-center gap-2 font-medium transition-colors ${isSolved ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}
          >
            <Check className="w-5 h-5" />
            {isSolved ? 'Solved' : 'Mark Solved'}
          </button>

          <button 
            onClick={onNext}
            disabled={disableNext}
            className={`flex items-center gap-2 font-medium transition-colors ${disableNext ? 'text-gray-300 cursor-not-allowed' : 'text-accent hover:text-accent-dark'}`}
          >
            Next Question
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
