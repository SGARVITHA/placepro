import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Info
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { hrInterviewService } from '../../services/hrInterviewService';

export default function InterviewSelection() {
  const { companyId } = useParams();
  const [techNotice, setTechNotice] = useState(false);

  const company = companyId ? hrInterviewService.getCompanyMeta(companyId) : null;
  const companyName = company?.name || (companyId ? companyId.toUpperCase() : null);

  // Construct breadcrumbs
  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: companyName, to: `/company/${companyId}` },
        { label: 'Interview' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview' },
      ];

  const hrPath = companyId 
    ? `/company/${companyId}/interview/hr` 
    : `/interview/hr`;

  const technicalPath = companyId
    ? `/company/${companyId}/interview/technical`
    : `/interview/technical`;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#16793A] border border-emerald-200/60">
              {companyName ? `${companyName} Interview Prep` : 'Campus Interview Preparation'}
            </span>
            <span className="text-xs text-text-secondary">• 2 Practice Formats</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Select Interview Format
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-2xl">
            Choose between behavioral HR rounds using the structured STAR method or technical interview rounds with in-depth freeform responses and confidence tracking.
          </p>
        </div>

        {company && company.logo && (
          <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-xs p-2 flex items-center justify-center shrink-0">
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      {/* Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* OPTION 1: HR Interview */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/20 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#EFF8F2] text-[#16793A] text-[11px] font-bold px-3 py-1 rounded-bl-xl border-b border-l border-emerald-200/60 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            STAR Method
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-emerald-50 text-[#16793A] border border-emerald-200/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Users className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-xl font-bold text-slate-900">HR Interview</h2>
              <span className="text-[11px] font-semibold bg-emerald-100 text-[#16793A] px-2 py-0.5 rounded-full">
                Behavioral
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Master behavioral questions, leadership principles, conflict resolution, and cultural fit. Formulate verified answers using Situation, Task, Action, and Result.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16793A] shrink-0" />
                <span>10 core behavioral competencies &amp; topics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16793A] shrink-0" />
                <span>Real top-tech patterns (Amazon LP, TCS, Zoho)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16793A] shrink-0" />
                <span>Model sample answers &amp; live validation</span>
              </li>
            </ul>
          </div>

          <Link
            to={hrPath}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#16793A] hover:bg-[#12612e] transition-colors shadow-sm"
          >
            <span>Start HR Interview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* OPTION 2: Technical Interview (Active Freeform Practice) */}
        <div className="bg-white rounded-2xl border-2 border-blue-500/20 hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-bl-xl border-b border-l border-blue-200/60 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Freeform Practice
          </div>

          <div>
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Code2 className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-xl font-bold text-slate-900">Technical Interview</h2>
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Engineering
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Explain project architecture, database optimizations, system design, and core computer science fundamentals with detailed technical responses and confidence tracking.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Projects, Architecture, OOP, DBMS, OS &amp; Networks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Explain architecture trade-offs &amp; engineering choices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Confidence rating (Confident vs Need Review)</span>
              </li>
            </ul>
          </div>

          <Link
            to={technicalPath}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#16793A] hover:bg-[#12612e] transition-colors shadow-sm"
          >
            <span>Start Technical Interview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
