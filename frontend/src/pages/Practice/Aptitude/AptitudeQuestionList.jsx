import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, AlertCircle, Search, FlaskConical, CheckCircle2 } from 'lucide-react';
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

export default function AptitudeQuestionList() {
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
  const { data: topics } = useTopics({ categoryId: 'aptitude', companyId: companyId || undefined });
  const topic = useMemo(() => {
    return topics?.find((t) => t.id === topicId) || {
      id: topicId,
      name: navTopicName || (topicId ? topicId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Aptitude Topic'),
      description: 'Practice questions for this aptitude section.',
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

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => bookmarkService.getBookmarkIds(user));

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(bookmarkService.getBookmarkIds(user));
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [user]);

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
      { label: 'Aptitude', to: `/company/${companyId}/aptitude` },
      { label: topic.name },
    ]
    : [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Practice', to: '/practice' },
      { label: 'Aptitude', to: '/practice/aptitude' },
      { label: topic.name },
    ];

  const handleSelectQuestion = (q) => {
    const targetUrl = companyId
      ? `/company/${companyId}/aptitude/${topicId}/${q.id}`
      : `/practice/aptitude/${topicId}/${q.id}`;

    navigate(targetUrl, {
      state: {
        topicId,
        topicName: topic.name,
        questionId: q.id,
        questionTitle: q.title,
        difficulty: q.difficulty,
        companyId,
        companyName: resolvedCompany,
      },
    });
  };

  const handleToggleBookmark = (e, q) => {
    e.stopPropagation();
    bookmarkService.toggleBookmark(
      {
        id: q.id,
        questionId: q.id,
        title: q.title || q.question_text?.slice(0, 50),
        difficulty: q.difficulty || 'Medium',
        topic: topic.name,
        topicId,
        category: 'Aptitude',
        practiceType: 'MCQ',
        route: companyId
          ? `/company/${companyId}/aptitude/${topicId}/${q.id}`
          : `/practice/aptitude/${topicId}/${q.id}`,
        company: resolvedCompany || q.company_name || 'Standard',
      },
      user
    );
  };

  const getDifficultyBadge = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d === 'easy') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Easy</span>;
    }
    if (d === 'hard') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Hard</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#Edf4F0] text-[#16793A]">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Aptitude Topic
              </span>
              {companyId && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                  {resolvedCompany}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {topic.name}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
              Select a question to practice interactive multiple-choice verification.
            </p>
          </div>
        </div>

        <Link
          to={companyId ? `/company/${companyId}/aptitude` : '/practice/aptitude'}
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-[#16793A] transition-colors self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Topic
        </Link>
      </div>

      {/* Controls Bar: Search & Difficulty Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-border shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {DIFFICULTIES.map((d) => (
            <FilterPill
              key={d.value}
              label={d.label}
              active={activeDifficulty === d.value}
              onClick={() => setActiveDifficulty(d.value)}
            />
          ))}
        </div>

        <div className="w-full sm:w-64">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search questions..."
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
                <div className="h-5 w-24 bg-gray-200 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="bg-white border border-rose-200 rounded-xl p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-3 text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">Failed to load questions</h3>
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
        <div className="bg-white border border-border rounded-xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">No questions found</h3>
          <p className="text-sm text-text-secondary mt-1">
            {search || activeDifficulty !== 'all'
              ? 'Try relaxing your difficulty filter or search query.'
              : 'There are currently no practice questions in this section.'}
          </p>
          {(search || activeDifficulty !== 'all') && (
            <button
              onClick={() => {
                setActiveDifficulty('all');
                setSearch('');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Question List */}
      {!isLoading && !error && filteredQuestions.length > 0 && (
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarks.includes(q.id);
            const isSolved = UserService.isSolved(q.id);
            const questionTitle = q.title || q.question_text?.slice(0, 60) || `Question ${idx + 1}`;

            return (
              <div
                key={q.id}
                onClick={() => handleSelectQuestion(q)}
                className="bg-white border border-border rounded-xl p-5 hover:border-[#16793A]/50 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {getDifficultyBadge(q.difficulty)}
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      Aptitude
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      {topic.name}
                    </span>
                    {q.company_name && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {q.company_name}
                      </span>
                    )}
                    {q.pattern && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {q.pattern}
                      </span>
                    )}
                    {isSolved && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-[#16793A] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Solved
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-text-primary group-hover:text-[#16793A] transition-colors line-clamp-1 mb-1">
                    {questionTitle}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {q.question_text}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(e, q)}
                    className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#16793A] hover:border-slate-300 transition-colors"
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#16793A] text-[#16793A]' : ''}`} />
                  </button>

                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#Edf4F0] text-[#16793A] group-hover:bg-[#16793A] group-hover:text-white text-xs font-semibold transition-all">
                    <span>Practice MCQ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
