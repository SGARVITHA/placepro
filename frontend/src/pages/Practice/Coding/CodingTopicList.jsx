import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Code2, Search, AlertCircle, Sparkles } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import SearchInput from '../../../components/ui/SearchInput';
import { useTopics, useCompanies } from '../../../hooks/useContentQuery';

export default function CodingTopicList() {
  const { companyId } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });

  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Fetch topics for Coding category
  const {
    data: topics,
    isLoading,
    error,
    refetch,
  } = useTopics({
    categoryId: 'coding',
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
        { label: 'Coding' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice' },
        { label: 'Coding' },
      ];

  const pageTitle = companyId
    ? `${resolvedCompany} — Coding Practice`
    : 'Coding Practice by Topic';

  const pageSubtitle = companyId
    ? `Algorithmic problems and data structure patterns frequently asked in ${resolvedCompany} technical assessment rounds.`
    : 'Select a data structure or algorithm topic to practice coding problems with real testcases and in-browser execution.';

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <Code2 className="w-3.5 h-3.5" />
              <span>Data Structures &amp; Algorithms Hub</span>
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

        {/* Search Bar */}
        <div className="w-full md:w-72 shrink-0">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coding topics..."
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-6 flex flex-col justify-between h-48 animate-pulse">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                <div className="w-36 h-5 bg-slate-200 rounded" />
                <div className="w-full h-3.5 bg-slate-100 rounded" />
                <div className="w-2/3 h-3.5 bg-slate-100 rounded" />
              </div>
              <div className="w-24 h-4 bg-slate-100 rounded mt-4" />
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
          <h3 className="text-base font-semibold text-text-primary">Failed to load coding topics</h3>
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
          <h3 className="text-base font-semibold text-text-primary">No matching coding topics found</h3>
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
              ? `/company/${companyId}/coding/${topic.id}`
              : `/practice/coding/${topic.id}`;

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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 text-orange-600 group-hover:scale-105 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    {topic.question_count !== undefined && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {topic.question_count} {topic.question_count === 1 ? 'Problem' : 'Problems'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-1.5 group-hover:text-[#16793A] transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {topic.description || 'Practice coding questions and algorithms for this topic.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs font-semibold text-[#16793A]">
                  <span>Solve Problems</span>
                  <div className="w-6 h-6 rounded-full bg-[#Edf4F0] flex items-center justify-center text-[#16793A] group-hover:bg-[#16793A] group-hover:text-white transition-colors">
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
