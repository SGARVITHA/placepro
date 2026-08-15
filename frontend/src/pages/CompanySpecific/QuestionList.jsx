import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import FilterPill from '../../components/ui/FilterPill';
import { getCompany, getCategory, getTopic } from '../../data/db';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function QuestionList() {
  const { companyId, categoryId, topicId } = useParams();
  const company = getCompany(companyId);
  const category = getCategory(companyId, categoryId);
  const topic = getTopic(companyId, categoryId, topicId);
  
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const breadcrumbs = company && category && topic ? [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/companies' },
    { label: company.name, to: `/companies/${company.id}` },
    { label: category.name, to: `/companies/${company.id}/${category.id}` },
    { label: topic.name }
  ] : [];

  const filteredQuestions = useMemo(() => {
    if (!topic) return [];
    return (topic.questions || []).filter(q => {
      let passesFilter = true;
      if (activeFilter !== 'All') {
        passesFilter = q.difficulty === activeFilter;
      }
      let passesSearch = true;
      if (search.trim()) {
        passesSearch = q.title.toLowerCase().includes(search.toLowerCase());
      }
      return passesFilter && passesSearch;
    });
  }, [search, activeFilter, topic]);

  if (!company || !category || !topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Topic Not Found</h2>
        <p className="text-text-secondary">The requested topic could not be found.</p>
        <Link to={`/companies/${companyId}/${categoryId}`} className="text-accent hover:underline font-medium">Return to Topics</Link>
      </div>
    );
  }

  const getDifficultyStyles = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-green-50 text-green-700';
      case 'Medium': return 'bg-orange-50 text-orange-600';
      case 'Hard': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-2">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight mb-1">
          {topic.name} — {company.name}
        </h1>
        <p className="text-text-secondary text-base">Practice questions based on {topic.name}.</p>
      </div>

      <div className="flex flex-col gap-5 mb-2">
        <SearchInput 
          placeholder="Search questions..." 
          value={search} 
          onChange={setSearch} 
        />
        
        <div className="flex flex-wrap items-center gap-3">
          {DIFFICULTIES.map(filter => (
            <FilterPill 
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredQuestions.map(q => (
          <Link 
            key={q.id}
            to={`/companies/${company.id}/${category.id}/${topic.id}/${q.id}`}
            className="flex items-center bg-bg-primary border border-border rounded-xl px-5 py-4 hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex-1 flex items-center gap-5">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getDifficultyStyles(q.difficulty)}`}>
                {q.difficulty}
              </span>
              <h3 className="font-medium text-[15px] text-text-primary group-hover:text-accent transition-colors line-clamp-1">{q.title}</h3>
            </div>
            
            <div className="flex items-center gap-6 ml-4 shrink-0">
              <span className="text-sm font-medium text-text-secondary">{q.year}</span>
              <ArrowRight className="w-5 h-5 text-accent transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
        
        {filteredQuestions.length === 0 && (
          <div className="py-12 text-center text-text-secondary">
            No questions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
