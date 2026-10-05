import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import FilterPill from '../../components/ui/FilterPill';
import { useQuestions, useCompanies, useCategories, useTopics } from '../../hooks/useContentQuery';

const DIFFICULTIES = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

export default function QuestionList() {
  const { companyId, categoryId, topicId } = useParams();
  const location = useLocation();

  // Resolve display names: prefer router navigation state, fallback to React Query cache/fetch
  const navCompanyName = location.state?.companyName;
  const navCategoryName = location.state?.categoryName;
  const navTopicName = location.state?.topicName;

  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName });
  const { data: categories } = useCategories(undefined, { enabled: !navCategoryName });
  const { data: topics } = useTopics({ categoryId, companyId }, { enabled: !navTopicName });

  const companyName =
    navCompanyName ||
    companies?.find((c) => String(c.id) === String(companyId))?.name ||
    'Company';

  const categoryName =
    navCategoryName ||
    categories?.find((c) => String(c.id) === String(categoryId))?.name ||
    'Category';

  const topicName =
    navTopicName ||
    topics?.find((t) => String(t.id) === String(topicId))?.name ||
    'Topic';

  // Structured query params (future-ready for parentTopicId / sectionId branches)
  const questionQueryParams = {
    topicId,
  };

  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuestions(questionQueryParams);

  const [search, setSearch] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState('all');

  const breadcrumbs = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/company' },
    { label: companyName, to: `/company/${companyId}` },
    { label: categoryName, to: `/company/${companyId}/${categoryId}` },
    { label: topicName }
  ];

  const filteredQuestions = useMemo(() => {
    if (!questions || !Array.isArray(questions)) return [];
    return questions.filter((q) => {
      let passesDifficulty = true;
      if (activeDifficulty !== 'all') {
        passesDifficulty = q.difficulty === activeDifficulty;
      }
      let passesSearch = true;
      if (search.trim()) {
        const query = search.toLowerCase();
        passesSearch = q.question_text?.toLowerCase().includes(query);
      }
      return passesDifficulty && passesSearch;
    });
  }, [questions, activeDifficulty, search]);

  const getDifficultyStyles = (diff) => {
    switch(diff) {
      case 'easy': return 'bg-green-50 text-green-700';
      case 'medium': return 'bg-orange-50 text-orange-600';
      case 'hard': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-2">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight mb-1">
          {topicName} — {companyName}
        </h1>
        <p className="text-text-secondary text-base">Practice questions based on {topicName}.</p>
      </div>

      <div className="flex flex-col gap-5 mb-2">
        <SearchInput 
          placeholder="Search questions..." 
          value={search} 
          onChange={setSearch} 
        />
        
        <div className="flex flex-wrap items-center gap-3">
          {DIFFICULTIES.map((filter) => (
            <FilterPill 
              key={filter.value}
              label={filter.label}
              active={activeDifficulty === filter.value}
              onClick={() => setActiveDifficulty(filter.value)}
            />
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-bg-primary border border-border rounded-xl px-5 py-4 flex items-center justify-between animate-pulse"
            >
              <div className="flex items-center gap-5 flex-1">
                <div className="w-16 h-6 bg-gray-200 rounded-full" />
                <div className="h-5 w-2/3 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="w-12 h-4 bg-gray-200 rounded" />
                <div className="w-5 h-5 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-bg-primary border border-border rounded-[14px] p-8 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-text-primary">Failed to load questions</h3>
          <p className="text-sm text-text-secondary max-w-sm">
            {error.message || 'An error occurred while fetching questions.'}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-accent text-white font-medium text-sm rounded-lg hover:bg-accent-dark transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredQuestions.length === 0 && (
        <div className="bg-bg-primary border border-border rounded-[14px] p-12 text-center flex flex-col items-center justify-center">
          <p className="text-text-secondary font-medium">
            {search.trim() || activeDifficulty !== 'all'
              ? 'No questions found matching your filter criteria.'
              : 'No questions added for this topic yet.'}
          </p>
          <Link
            to={`/company/${companyId}/${categoryId}`}
            className="mt-4 text-sm text-accent font-semibold hover:underline"
          >
            Return to Topics
          </Link>
        </div>
      )}

      {/* Questions List */}
      {!isLoading && !error && filteredQuestions.length > 0 && (
        <div className="flex flex-col gap-3">
          {filteredQuestions.map((q) => (
            <Link 
              key={q.id}
              to={`/company/${companyId}/${categoryId}/${topicId}/${q.id}`}
              state={{ companyName, categoryName, topicName, questionText: q.question_text }}
              className="flex items-center bg-bg-primary border border-border rounded-xl px-5 py-4 hover:shadow-card-hover transition-shadow group"
            >
              <div className="flex-1 flex items-center gap-5">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getDifficultyStyles(q.difficulty)}`}>
                  {q.difficulty}
                </span>
                <h3 className="font-medium text-[15px] text-text-primary group-hover:text-accent transition-colors line-clamp-1">{q.question_text}</h3>
              </div>
              
              <div className="flex items-center gap-6 ml-4 shrink-0">
                {q.company_name && <span className="text-sm font-medium text-text-secondary">{q.company_name}</span>}
                {q.year_asked && <span className="text-sm font-medium text-text-secondary">{q.year_asked}</span>}
                <ArrowRight className="w-5 h-5 text-accent transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
