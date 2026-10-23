import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Search, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import { useCompanies } from '../../hooks/useContentQuery';

export default function CompanyList() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data: companies = [], isLoading, error, refetch } = useCompanies();

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    if (!companies || !Array.isArray(companies)) return [];
    if (!search.trim()) return companies;
    const q = search.toLowerCase();
    return companies.filter(
      (c) =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q)
    );
  }, [companies, search]);

  const breadcrumbItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific' },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      {/* Navigation string (Breadcrumb) above everything */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Recruitment Hub</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Company Specific Preparation
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 max-w-2xl">
            Select a visiting company to prepare with past drive questions, test patterns, cut-offs, and role-based rounds.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 shrink-0">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search companies (e.g. Amazon, TCS)..."
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-6 flex flex-col justify-between h-52 animate-pulse">
              <div className="space-y-3">
                <div className="w-14 h-14 bg-slate-100 rounded-xl" />
                <div className="w-36 h-5 bg-slate-200 rounded" />
                <div className="w-full h-3.5 bg-slate-100 rounded" />
              </div>
              <div className="w-28 h-4 bg-slate-100 rounded mt-4" />
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
          <h3 className="text-base font-semibold text-text-primary">Failed to load companies</h3>
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
      {!isLoading && !error && filteredCompanies.length === 0 && (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-text-primary">No companies matched your search</h3>
          <p className="text-sm text-text-secondary mt-1">Try clearing your search keyword to view all campus recruiters.</p>
          <button
            onClick={() => setSearch('')}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Companies Grid */}
      {!isLoading && !error && filteredCompanies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => {
            const logoUrl = company.logo || company.logo_url;

            return (
              <div
                key={company.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/company/${company.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/company/${company.id}`);
                  }
                }}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-card-hover hover:border-[#16793A]/50 transition-all duration-200 group flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#16793A]"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    {/* Company Logo Container */}
                    <div className="w-14 h-14 rounded-xl border border-slate-100 bg-white shadow-2xs flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform duration-200">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={company.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center text-[#16793A] font-bold text-lg ${logoUrl ? 'hidden' : ''}`}>
                        <Building2 className="w-7 h-7 text-[#16793A]" />
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-col items-end gap-1.5">
                      {company.active_drives > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {company.active_drives} Active Drive
                        </span>
                      )}
                      {company.total_questions > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                          {company.total_questions} Questions
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#16793A] transition-colors mb-1.5 tracking-tight">
                    {company.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {company.description || `Prepare for ${company.name} recruitment rounds, past test questions, and interview syllabus.`}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50 text-xs sm:text-sm font-semibold text-[#16793A]">
                  <span>Explore Syllabus &amp; Rounds</span>
                  <div className="w-7 h-7 rounded-full bg-[#Edf4F0] flex items-center justify-center text-[#16793A] group-hover:bg-[#16793A] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
