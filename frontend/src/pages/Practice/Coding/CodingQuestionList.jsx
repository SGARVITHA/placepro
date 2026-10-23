import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, AlertCircle, Search, Code2, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import FilterPill from '../../../components/ui/FilterPill';
import SearchInput from '../../../components/ui/SearchInput';
import { useQuestions, useTopics, useCompanies } from '../../../hooks/useContentQuery';
import { bookmarkService } from '../../../services/bookmarkService';
import { UserService } from '../../../data/UserService';
import { useAuth } from '../../../hooks/useAuth';

const DIFFICULTIES = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function CodingQuestionList() {
  const { topicId, companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [search, setSearch] = useState('');

  // Resolve Company
  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });
  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Resolve Topic
  const navTopicName = location.state?.topicName;
  const { data: topics } = useTopics({ categoryId: 'coding', companyId: companyId || undefined });
  const topic = useMemo(() => {
    return topics?.find((t) => t.id === topicId) || {
      id: topicId,
      name: navTopicName || (topicId ? topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Coding Topic'),
      description: 'Practice algorithmic problems for this topic.',
    };
  }, [topics, topicId, navTopicName]);

  // Fetch Questions
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuestions({
    topicId,
    companyId: companyId || undefined,
  });

  // Solved and Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => UserService.getBookmarks());
  const [solvedList, setSolvedList] = useState(() => UserService.getSolved());

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(UserService.getBookmarks());
    };
    const handleStorageChange = () => {
      setSolvedList(UserService.getSolved());
      setBookmarks(UserService.getBookmarks());
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleToggleBookmark = (e, q) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = UserService.toggleBookmark(q.id, {
      title: q.title || q.question_text,
      difficulty: q.difficulty,
      topic: topic.name,
      topicId: topic.id,
      company: q.company_name,
      companyId: companyId || undefined,
      category: 'Coding',
      categoryId: 'coding',
      route: companyId ? `/company/${companyId}/coding/${topic.id}/${q.id}` : `/practice/coding/${topic.id}/${q.id}`,
    });
    setBookmarks(updated);
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    if (!questions || !Array.isArray(questions)) return [];
    return questions.filter((q) => {
      let passesDifficulty = true;
      if (activeDifficulty !== 'all') {
        passesDifficulty = (q.difficulty || '').toLowerCase() === activeDifficulty.toLowerCase();
      }
      let passesSearch = true;
      if (search.trim()) {
        const query = search.toLowerCase();
        passesSearch =
          (q.title || '').toLowerCase().includes(query) ||
          (q.question_text || '').toLowerCase().includes(query) ||
          (q.company_name || '').toLowerCase().includes(query);
      }
      return passesDifficulty && passesSearch;
    });
  }, [questions, activeDifficulty, search]);

  // Breadcrumbs
  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: resolvedCompany, to: `/company/${companyId}` },
        { label: 'Coding', to: `/company/${companyId}/coding` },
        { label: topic.name },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice' },
        { label: 'Coding', to: '/practice/coding' },
        { label: topic.name },
      ];

  const pageTitle = companyId
    ? `${resolvedCompany} — ${topic.name}`
    : `${topic.name} Problems`;

  const getDifficultyBadge = (difficulty = '') => {
    const d = difficulty.toLowerCase();
    if (d === 'easy') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (d === 'hard') {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    return 'bg-[#ffedd5] text-[#c2410c] border-amber-200'; // Medium
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <Code2 className="w-3.5 h-3.5" />
              <span>{topic.name}</span>
            </span>
            {companyId && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {resolvedCompany}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{pageTitle}</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 max-w-2xl">
            {topic.description || 'Select an interview problem to open the interactive coding workspace.'}
          </p>
        </div>

        {/* Back Link */}
        <div>
          <Link
            to={companyId ? `/company/${companyId}/coding` : '/practice/coding'}
            state={{ companyName: resolvedCompany }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-[#16793A] bg-white border border-border rounded-lg hover:border-[#16793A]/40 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Topics</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Difficulty Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {DIFFICULTIES.map((diff) => (
            <FilterPill
              key={diff.value}
              label={diff.label}
              active={activeDifficulty === diff.value}
              onClick={() => setActiveDifficulty(diff.value)}
            />
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 shrink-0">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems..."
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between animate-pulse">
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-4 bg-slate-200 rounded-full" />
                  <div className="w-20 h-4 bg-slate-100 rounded-full" />
                </div>
                <div className="w-2/3 h-5 bg-slate-200 rounded" />
                <div className="w-1/2 h-3.5 bg-slate-100 rounded" />
              </div>
              <div className="w-24 h-9 bg-slate-100 rounded-xl shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">Failed to load coding questions</h3>
          <p className="text-sm text-text-secondary mt-1">{error.message || 'Please try again.'}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-[#16793A] text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredQuestions.length === 0 && (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">No coding questions match your criteria</h3>
          <p className="text-sm text-text-secondary mt-1">Try adjusting your difficulty filter or search keyword.</p>
          <button
            onClick={() => {
              setActiveDifficulty('all');
              setSearch('');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Questions List */}
      {!isLoading && !error && filteredQuestions.length > 0 && (
        <div className="space-y-3.5">
          {filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarks.includes(q.id);
            const isSolved = solvedList.includes(q.id);
            const questionTitle = q.title || q.question_text?.split('\n')[0] || `Problem ${idx + 1}`;
            const targetUrl = companyId
              ? `/company/${companyId}/coding/${topicId}/${q.id}`
              : `/practice/coding/${topicId}/${q.id}`;

            return (
              <div
                key={q.id}
                className="bg-white border border-border rounded-2xl p-5 hover:border-[#16793A]/40 hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex-1 space-y-2">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Difficulty */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyBadge(q.difficulty)}`}>
                      {q.difficulty || 'Medium'}
                    </span>

                    {/* Company */}
                    {(q.company_name || resolvedCompany) && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {q.company_name || resolvedCompany}
                      </span>
                    )}

                    {/* Year */}
                    {q.year_asked && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {q.year_asked}
                      </span>
                    )}

                    {/* Solved Status */}
                    {isSolved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Solved</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Preview */}
                  <Link
                    to={targetUrl}
                    state={{
                      companyId,
                      companyName: resolvedCompany,
                      topicId,
                      topicName: topic.name,
                      questionId: q.id,
                      difficulty: activeDifficulty,
                    }}
                    className="block"
                  >
                    <h3 className="text-base font-bold text-text-primary group-hover:text-[#16793A] transition-colors leading-snug">
                      {questionTitle}
                    </h3>
                  </Link>

                  <p className="text-xs text-text-secondary line-clamp-1">
                    {q.question_text?.replace(/\n/g, ' ')}
                  </p>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(e, q)}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                    className={`p-2 rounded-xl border transition-colors ${
                      isBookmarked
                        ? 'border-emerald-200 bg-emerald-50 text-[#16793A]'
                        : 'border-border text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#16793A]' : ''}`} />
                  </button>

                  {/* Solve Problem CTA */}
                  <Link
                    to={targetUrl}
                    state={{
                      companyId,
                      companyName: resolvedCompany,
                      topicId,
                      topicName: topic.name,
                      questionId: q.id,
                      difficulty: activeDifficulty,
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#16793A] hover:bg-[#126430] text-white text-xs font-semibold rounded-xl shadow-2xs hover:shadow transition-all group-hover:translate-x-0.5"
                  >
                    <span>Solve Problem</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
