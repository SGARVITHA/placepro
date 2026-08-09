import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/layout/Breadcrumb';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/questions/FilterBar';
import QuestionCard from '../../components/questions/QuestionCard';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { useQuestions, useCategories, useCompanies } from '../../hooks/useContentQuery';

export default function QuestionList() {
  const { companyId, categorySlug, sectionId, topicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuestions({
    topicId,
    difficulty: difficulty === 'all' ? undefined : difficulty,
    search: debouncedSearch,
  });

  const { data: categories } = useCategories();
  const category = categories?.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
  const categoryName = category?.name || 'Category';

  const { data: companies } = useCompanies();
  const company = companyId ? companies?.find((c) => String(c.id) === String(companyId)) : null;
  const companyName = company ? company.name : 'Company';

  const topicName = location.state?.topicName || 'Questions';
  const sectionName = location.state?.sectionName || 'Section';

  const isCompanyContext = Boolean(companyId);

  const breadcrumbPath = isCompanyContext
    ? [
        { label: 'Dashboard', href: '/' },
        { label: 'Company Specific', href: '/company' },
        { label: companyName, href: `/company/${companyId}` },
        { label: categoryName, href: `/company/${companyId}/${categorySlug}` },
        { label: sectionName, href: `/company/${companyId}/${categorySlug}/${sectionId}` },
        { label: topicName, href: location.pathname },
      ]
    : [
        { label: 'Dashboard', href: '/' },
        { label: categoryName, href: `/prep/${categorySlug}` },
        { label: sectionName, href: `/prep/${categorySlug}/${sectionId}` },
        { label: topicName, href: location.pathname },
      ];

  const handleQuestionClick = (question) => {
    const detailPath = `${location.pathname}/${question.id}`;
    navigate(detailPath, { state: { question, topicName, sectionName } });
  };

  const handleResetFilters = () => {
    setDifficulty('all');
    setSearchInput('');
  };

  const pageTitle = isCompanyContext ? `${topicName} — ${companyName}` : topicName;

  return (
    <div className="space-y-3">
      <Breadcrumb path={breadcrumbPath} />

      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          Practice questions curated for placement preparation
        </p>
      </div>

      <div className="space-y-2">
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(typeof e === 'string' ? e : e.target.value)}
          placeholder="Search questions..."
        />
        <FilterBar value={difficulty} onChange={setDifficulty} />
      </div>

      {isLoading ? (
        <LoadingState count={5} variant="row" />
      ) : error ? (
        <EmptyState
          message={typeof error === 'string' ? error : error.message || 'Failed to load questions'}
          actionLabel="Retry"
          onAction={refetch}
        />
      ) : !questions || questions.length === 0 ? (
        difficulty === 'all' && !debouncedSearch ? (
          <EmptyState message="No questions added yet" />
        ) : (
          <EmptyState
            message="No questions match your filters"
            actionLabel="Reset filters"
            onAction={handleResetFilters}
          />
        )
      ) : (
        <div className="space-y-2">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onClick={() => handleQuestionClick(q)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
