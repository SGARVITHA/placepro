import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Search, AlertCircle, Sparkles } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import SearchInput from '../../../components/ui/SearchInput';
import { useTopics, useCompanies } from '../../../hooks/useContentQuery';

export default function AptitudeTopicList() {
  const { companyId } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });

  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Fetch topics for Aptitude category
  const {
    data: topics,
    isLoading,
    error,
    refetch,
  } = useTopics({
    categoryId: 'aptitude',
    companyId: companyId || undefined,
  });

  // Filter topics by search query
  const filteredTopics = useMemo(() => {
    if (!topics || !Array.isArray(topics)) return [];
    if (!search.trim()) return topics;
    const q = search.toLowerCase();
    return topics.filter((t) =>
      (t.name || '').toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q)
    );
  }, [topics, search]);

  // Breadcrumbs
  const breadcrumbItems = companyId
    ? [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Company Specific', to: '/company' },
      { label: resolvedCompany, to: `/company/${companyId}` },
      { label: 'Aptitude' },
    ]
    : [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Practice', to: '/practice' },
      { label: 'Aptitude' },
    ];

  const pageTitle = companyId
    ? `${resolvedCompany} — Aptitude Practice`
    : 'Quantitative & Logical Aptitude';

  const pageSubtitle = companyId
    ? `Aptitude question topics and reasoning patterns tested in ${resolvedCompany} recruitment rounds.`
    : 'Select an aptitude topic to practice topic-wise MCQs with step-by-step mathematical solutions.';

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Quantitative & Reasoning Hub</span>
            </span>
            {companyId && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {resolvedCompany}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{pageTitle}</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 max-w-2xl">{pageSubtitle}</p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72 shrink-0">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search topics (e.g. Train, Speed)..."
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="w-20 h-5 bg-gray-200 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="bg-white border border-rose-200 rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-3 text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">Unable to load topics</h3>
          <p className="text-sm text-text-secondary mt-1">{error.message || 'Please try again.'}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-[#16793A] text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty Search Results */}
      {!isLoading && !error && filteredTopics.length === 0 && (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">No matching aptitude topics found</h3>
          <p className="text-sm text-text-secondary mt-1">Try clearing your search query to see all topics.</p>
          <button
            onClick={() => setSearch('')}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Topics Grid */}
      {!isLoading && !error && filteredTopics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => {
            const targetUrl = companyId
              ? `/company/${companyId}/aptitude/${topic.id}`
              : `/practice/aptitude/${topic.id}`;

            return (
              <Link
                key={topic.id}
                to={targetUrl}
                state={{
                  companyId,
                  companyName: resolvedCompany,
                  topicId: topic.id,
                  topicName: topic.name,
                }}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-[#16793A]/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#Edf4F0] text-[#16793A] group-hover:scale-105 transition-transform">
                      <FlaskConical className="w-6 h-6" />
                    </div>
                    {topic.question_count ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16793A] border border-emerald-100">
                        {topic.question_count} Questions
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        Topic Deck
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-1.5 group-hover:text-[#16793A] transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {topic.description || 'Practice curated quantitative aptitude questions with detailed step-by-step explanations.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50 text-xs font-semibold text-[#16793A]">
                  <span>Practice Questions</span>
                  <div className="w-7 h-7 rounded-full bg-[#Edf4F0] flex items-center justify-center text-[#16793A] group-hover:bg-[#16793A] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
