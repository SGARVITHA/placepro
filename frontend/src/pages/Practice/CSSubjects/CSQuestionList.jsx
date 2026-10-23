import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, AlertCircle, Search, Layers, BookOpen } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import FilterPill from '../../../components/ui/FilterPill';
import SearchInput from '../../../components/ui/SearchInput';
import CSModeSelector from './CSModeSelector';
import { findSubject, CS_SUBJECTS } from './csSubjectsData';
import { useQuestions, useCompanies } from '../../../hooks/useContentQuery';
import { bookmarkService } from '../../../services/bookmarkService';
import { useAuth } from '../../../hooks/useAuth';

const DIFFICULTIES = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function CSQuestionList() {
  const { subjectId, companyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [mode, setMode] = useState('flashcard');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [search, setSearch] = useState('');

  // Resolve subject
  const subject = useMemo(() => findSubject(subjectId) || CS_SUBJECTS[0], [subjectId]);

  // Resolve company name
  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });
  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Fetch questions using existing React Query hook
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuestions({
    topicId: subject.id,
    companyId: companyId || undefined,
  });

  // Bookmark synchronization
  const [bookmarks, setBookmarks] = useState(() => bookmarkService.getBookmarkIds(user));

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(bookmarkService.getBookmarkIds(user));
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [user]);

  // Filter questions by difficulty and search query
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
          (q.question_text || '').toLowerCase().includes(query) ||
          (q.company_name || '').toLowerCase().includes(query);
      }
      return passesDifficulty && passesSearch;
    });
  }, [questions, activeDifficulty, search]);

  // Breadcrumb Trail
  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: resolvedCompany, to: `/company/${companyId}` },
        { label: 'CS Subjects', to: `/company/${companyId}/cs-subjects` },
        { label: subject.name },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/dashboard' },
        { label: 'CS Subjects', to: '/practice/cs-subjects' },
        { label: subject.name },
      ];

  const handleSelectQuestion = (question) => {
    let targetUrl;
    if (mode === 'mcq') {
      targetUrl = companyId
        ? `/company/${companyId}/cs-subjects/${subject.id}/${question.id}/mcq`
        : `/practice/cs-subjects/${subject.id}/${question.id}/mcq`;
    } else {
      targetUrl = companyId
        ? `/company/${companyId}/cs-subjects/${subject.id}/${question.id}`
        : `/practice/cs-subjects/${subject.id}/${question.id}`;
    }

    navigate(targetUrl, {
      state: {
        subjectId: subject.id,
        subjectName: subject.name,
        questionId: question.id,
        questionText: question.question_text,
        difficulty: question.difficulty,
        companyId,
        companyName: resolvedCompany,
        mode,
      },
    });
  };

  const getDifficultyBadge = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d === 'easy') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Easy</span>;
    }
    if (d === 'medium') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
    }
    if (d === 'hard') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Hard</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">General</span>;
  };

  const SubjectIcon = subject.icon;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${subject.iconBg} ${subject.iconColor}`}>
            <SubjectIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                CS Subject
              </span>
              {companyId && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                  {resolvedCompany}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              {subject.name} {companyId ? `• ${resolvedCompany}` : ''}
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Select a question to practice core concepts and interview patterns.
            </p>
          </div>
        </div>

        {/* Practice Mode Selector [ Flashcard ] [ MCQ ] */}
        <div className="shrink-0 flex items-center gap-3">
          <CSModeSelector mode={mode} onChange={setMode} />
        </div>
      </div>

      {/* Question Selection Workspace (Shared for Flashcard and MCQ) */}
      <div className="flex flex-col gap-5">
          {/* Controls Bar: Search & Difficulty Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {DIFFICULTIES.map((filter) => (
                <FilterPill
                  key={filter.value}
                  label={filter.label}
                  active={activeDifficulty === filter.value}
                  onClick={() => setActiveDifficulty(filter.value)}
                />
              ))}
            </div>

            <div className="w-full sm:w-72">
              <SearchInput
                placeholder="Search questions..."
                value={search}
                onChange={setSearch}
              />
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-border rounded-xl px-5 py-4 flex items-center justify-between animate-pulse"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-6 bg-slate-200 rounded-full" />
                    <div className="h-5 w-2/3 bg-slate-200 rounded" />
                  </div>
                  <div className="w-6 h-6 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-white border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text-primary">Failed to load questions</h3>
              <p className="text-sm text-text-secondary max-w-sm">
                {error.message || 'An error occurred while fetching subject questions.'}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-[#16793A] hover:bg-[#12612e] text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredQuestions.length === 0 && (
            <div className="bg-white border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-text-primary mb-1">No questions found</h4>
              <p className="text-sm text-text-secondary max-w-md">
                {search.trim() || activeDifficulty !== 'all'
                  ? 'No questions matched your search and difficulty criteria. Try clearing your filters.'
                  : `No questions currently added for ${subject.name}.`}
              </p>
              {(search.trim() || activeDifficulty !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setActiveDifficulty('all');
                  }}
                  className="mt-4 text-xs font-semibold text-[#16793A] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          )}

          {/* Question List */}
          {!isLoading && !error && filteredQuestions.length > 0 && (
            <div className="flex flex-col gap-3">
              {filteredQuestions.map((q, idx) => {
                const isBookmarked = bookmarks.includes(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-border hover:border-[#16793A]/50 rounded-xl px-5 py-4 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex-1 flex items-start sm:items-center gap-3.5 min-w-0">
                      <div className="shrink-0 pt-0.5 sm:pt-0">
                        {getDifficultyBadge(q.difficulty)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-sm sm:text-base text-text-primary group-hover:text-[#16793A] transition-colors line-clamp-2">
                          {q.question_text}
                        </h3>

                        {q.company_name && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                              Asked at {q.company_name} {q.year_asked ? `(${q.year_asked})` : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {isBookmarked && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Bookmark className="w-3 h-3 fill-current" />
                          <span>Saved</span>
                        </span>
                      )}

                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16793A]">
                        <span>{mode === 'mcq' ? 'Practice MCQ' : 'Review Flashcard'}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
}
