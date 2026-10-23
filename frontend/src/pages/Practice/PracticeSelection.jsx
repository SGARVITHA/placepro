import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Code2, BookOpen, Users, Sparkles } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const categories = [
  {
    id: 'aptitude',
    title: 'Aptitude',
    subtitle: 'Quantitative, Logical & Verbal Reasoning',
    description: 'Master time-speed-distance, percentages, profit & loss, number systems, and analytical puzzles.',
    icon: FlaskConical,
    iconBg: 'bg-[#Edf4F0]',
    iconColor: 'text-[#16793A]',
    targetUrl: '/practice/aptitude',
    badge: 'Interactive MCQ',
  },
  {
    id: 'coding',
    title: 'Coding',
    subtitle: 'Data Structures & Algorithms',
    description: 'Solve real interview coding problems with an in-browser editor, test cases, and time complexity analysis.',
    icon: Code2,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    targetUrl: '/practice/coding',
    badge: 'Code Runner',
  },
  {
    id: 'cs-subjects',
    title: 'CS Subjects',
    subtitle: 'Core Computer Science Concepts',
    description: 'Review Operating Systems, DBMS & SQL, Computer Networks, OOPS, Java, and C++ with Flashcards and MCQs.',
    icon: BookOpen,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    targetUrl: '/practice/cs-subjects',
    badge: 'Flashcard + MCQ',
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    subtitle: 'HR & Technical Question Rounds',
    description: 'Practice structured STAR behavioral responses, scenario-based questions, and live simulation answers.',
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    targetUrl: '/interview',
    badge: 'STAR & AI Feedback',
  },
];

export default function PracticeSelection() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Practice' },
        ]}
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A] border border-[#c3e6cb]">
              <Sparkles className="w-3.5 h-3.5" />
              General Practice Hub
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Practice by Category
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Choose a preparation domain to practice topic-wise questions, interactive tests, and flashcards.
          </p>
        </div>
      </div>

      {/* Categories 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              to={category.targetUrl}
              className="bg-white border border-border rounded-[14px] p-6 hover:shadow-card-hover hover:border-[#16793A]/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${category.iconBg} ${category.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {category.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-text-primary mb-1 group-hover:text-[#16793A] transition-colors">
                  {category.title}
                </h2>
                <p className="text-xs font-semibold text-[#16793A] mb-2 uppercase tracking-wide">
                  {category.subtitle}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
                <span className="text-sm font-semibold text-[#16793A] group-hover:underline">
                  Start Practice
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#16793A] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
