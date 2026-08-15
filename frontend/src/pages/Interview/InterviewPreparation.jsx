import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Link as LinkIcon, Target, Star, Users } from 'lucide-react';
import { interviewQuestions } from '../../data/db';
import Breadcrumb from '../../components/ui/Breadcrumb';

export default function InterviewPreparation() {
  const [activeTab, setActiveTab] = useState('HR');

  const filteredQuestions = interviewQuestions.filter(q => q.type === activeTab);

  const getIcon = (tags) => {
    if (tags.includes('Strengths')) return <Star className="w-[18px] h-[18px] text-purple-600" />;
    if (tags.includes('Self-Awareness')) return <LinkIcon className="w-[18px] h-[18px] text-orange-600" />;
    if (tags.includes('Career Goals')) return <Target className="w-[18px] h-[18px] text-pink-600" />;
    if (tags.includes('Communication')) return <User className="w-[18px] h-[18px] text-blue-600" />;
    return <Users className="w-[18px] h-[18px] text-green-600" />;
  };

  const getIconBg = (tags) => {
    if (tags.includes('Strengths')) return 'bg-purple-50';
    if (tags.includes('Self-Awareness')) return 'bg-orange-50';
    if (tags.includes('Career Goals')) return 'bg-pink-50';
    if (tags.includes('Communication')) return 'bg-blue-50';
    return 'bg-green-50';
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Interview' }
      ]} />

      <div className="mb-2">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight mb-1">
          Interview Preparation
        </h1>
        <p className="text-text-secondary text-base">Real experiences. Real questions.</p>
      </div>

      <div className="flex items-center gap-8 border-b border-border/60">
        <button
          onClick={() => setActiveTab('HR')}
          className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'HR' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}
        >
          HR Interview
          {activeTab === 'HR' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('Technical')}
          className={`pb-3 font-medium text-sm transition-colors relative ${activeTab === 'Technical' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}
        >
          Technical Interview
          {activeTab === 'Technical' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full"></div>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {filteredQuestions.map(q => (
          <Link 
            key={q.id}
            to={`/interview/${q.type.toLowerCase()}/${q.id}`}
            className="flex items-center bg-bg-primary border border-border rounded-xl p-5 hover:shadow-card-hover transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-5 shrink-0 ${getIconBg(q.tags)}`}>
              {getIcon(q.tags)}
            </div>
            
            <h3 className="font-bold text-[15px] text-text-primary group-hover:text-accent transition-colors flex-1">
              {q.title}
            </h3>
            
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </Link>
        ))}
        {filteredQuestions.length === 0 && (
          <div className="py-12 text-center text-text-secondary">
            No questions available for this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
