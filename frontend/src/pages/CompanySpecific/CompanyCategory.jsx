import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Code2, BookOpen, Users, Building2, AlertCircle } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { getCompanies } from '../../lib/apiClient';

const COMPANY_CATEGORIES = [
  {
    id: 'aptitude',
    title: 'Aptitude',
    subtitle: 'Quantitative, Logical & Verbal Reasoning',
    description: 'Master time-speed-distance, percentages, profit & loss, number systems, and analytical puzzles.',
    icon: FlaskConical,
    iconBg: 'bg-[#Edf4F0]',
    iconColor: 'text-[#16793A]',
    badge: 'Interactive MCQ',
    getPath: (companyId) => `/company/${companyId}/aptitude`,
  },
  {
    id: 'coding',
    title: 'Coding',
    subtitle: 'Data Structures & Algorithms',
    description: 'Solve real interview coding problems with an in-browser editor, test cases, and time complexity analysis.',
    icon: Code2,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    badge: 'Code Runner',
    getPath: (companyId) => `/company/${companyId}/coding`,
  },
  {
    id: 'cs-subjects',
    title: 'CS Subjects',
    subtitle: 'Core Computer Science Concepts',
    description: 'Review Operating Systems, DBMS & SQL, Computer Networks, OOPS, Java, and C++ with Flashcards and MCQs.',
    icon: BookOpen,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    badge: 'Flashcard + MCQ',
    getPath: (companyId) => `/company/${companyId}/cs-subjects`,
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    subtitle: 'HR & Technical Question Rounds',
    description: 'Practice structured STAR behavioral responses, scenario-based questions, and live simulation answers.',
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    badge: 'STAR & AI Feedback',
    getPath: (companyId) => `/company/${companyId}/interview`,
  },
];

export default function CompanyCategory() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const companiesData = await getCompanies();
      const matched = Array.isArray(companiesData)
        ? companiesData.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())
        : null;
      setCompany(matched || null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-4 pb-12 animate-pulse">
        <div className="w-48 h-5 bg-slate-200 rounded" />
        <div className="flex items-center gap-4 py-2 border-b border-[#eaedf1]">
          <div className="w-14 h-14 bg-slate-200 rounded-xl shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-44 bg-slate-200 rounded" />
            <div className="h-4 w-60 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-border rounded-[14px] p-6 h-56 flex flex-col justify-between" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center h-full gap-4 text-center py-16">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Failed to load company details</h2>
        <p className="text-text-secondary text-sm max-w-md">{error.message || 'Something went wrong while fetching data.'}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-[#16793A] text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
        <h2 className="text-2xl font-bold text-slate-900">Company Not Found</h2>
        <p className="text-text-secondary">The company you are looking for does not exist.</p>
        <Link to="/company" className="text-[#16793A] hover:underline font-semibold text-sm">
          Return to Companies
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/company' },
    { label: company.name },
  ];

  const logoUrl = company.logo || company.logo_url;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-16">
      {/* Navigation string (Breadcrumb) above everything */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header with Company Branding */}
      <div className="flex items-center gap-4 border-b border-[#eaedf1] pb-3.5">
        <div className="w-14 h-14 bg-white border border-border rounded-xl shadow-2xs flex items-center justify-center p-2.5 shrink-0">
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

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {company.name} Preparation
            </h1>
            {company.active_drives > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Drive
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Choose a preparation domain tailored to {company.name} recruitment patterns and past test rounds.
          </p>
        </div>
      </div>

      {/* Category Grid - Matching PracticeSelection IDENTICALLY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {COMPANY_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const targetUrl = category.getPath(companyId);

          return (
            <Link
              key={category.id}
              to={targetUrl}
              state={{ companyId, companyName: company.name, categoryName: category.title }}
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
