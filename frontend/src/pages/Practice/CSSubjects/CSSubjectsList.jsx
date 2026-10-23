import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useCompanies } from '../../../hooks/useContentQuery';
import { CS_SUBJECTS } from './csSubjectsData';

export default function CSSubjectsList() {
  const { companyId } = useParams();
  const location = useLocation();

  const navCompanyName = location.state?.companyName;
  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName && Boolean(companyId) });

  const resolvedCompany = companyId
    ? (navCompanyName || companies?.find((c) => String(c.id).toLowerCase() === String(companyId).toLowerCase())?.name || companyId)
    : null;

  // Breadcrumbs
  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: resolvedCompany, to: `/company/${companyId}` },
        { label: 'CS Subjects' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/dashboard' },
        { label: 'CS Subjects' },
      ];

  const pageTitle = companyId
    ? `${resolvedCompany} — CS Subjects`
    : 'CS Subjects Practice';

  const pageSubtitle = companyId
    ? `Core computer science topics and technical questions asked in ${resolvedCompany} recruitment drives.`
    : 'Master core computer science fundamentals organized by subject, difficulty, and placement relevance.';

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3.5 sm:gap-4 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#eaedf1] pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Core Engineering Fundamentals</span>
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
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CS_SUBJECTS.map((subject) => {
          const Icon = subject.icon;
          const targetUrl = companyId
            ? `/company/${companyId}/cs-subjects/${subject.id}`
            : `/practice/cs-subjects/${subject.id}`;

          return (
            <Link
              key={subject.id}
              to={targetUrl}
              state={{
                companyId,
                companyName: resolvedCompany,
                subjectId: subject.id,
                subjectName: subject.name,
              }}
              className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-[#16793A]/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${subject.iconBg} ${subject.iconColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${subject.badgeBg} ${subject.badgeText}`}>
                    {subject.questionCount} Concepts
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1.5 group-hover:text-[#16793A] transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                  {subject.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#16793A]">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Explore Questions</span>
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
