import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle, 
  Bookmark, 
  HelpCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { hrInterviewService } from '../../services/hrInterviewService';

export default function HRQuestionList() {
  const { topicId, companyId } = useParams();
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const company = companyId ? hrInterviewService.getCompanyMeta(companyId) : null;
  const companyName = company?.name || (companyId ? companyId.toUpperCase() : null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const foundTopic = hrInterviewService.getTopicById(topicId);
      const list = await hrInterviewService.getHRQuestions({ topicId, companyId });
      if (isMounted) {
        setTopic(foundTopic);
        setQuestions(list);
        setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [topicId, companyId]);

  const topicName = topic?.name || 'Topic Questions';

  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: companyName, to: `/company/${companyId}` },
        { label: 'Interview', to: `/company/${companyId}/interview` },
        { label: 'HR', to: `/company/${companyId}/interview/hr` },
        { label: topicName },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview', to: '/interview' },
        { label: 'HR', to: '/interview/hr' },
        { label: topicName },
      ];

  const topicsBackUrl = companyId
    ? `/company/${companyId}/interview/hr`
    : '/interview/hr';

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Row */}
      <div className="border-b border-border/60 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <Link
            to={topicsBackUrl}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-[#16793A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-[#16793A] bg-[#EFF8F2] px-2.5 py-0.5 rounded-full border border-emerald-200/50">
            {topic?.shortName || 'HR Competency'}
          </span>
          {companyName && (
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              {companyName} Drive
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {topicName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          {topic?.description || 'Practice structuring your answers with Situation, Task, Action, and Result.'}
        </p>
      </div>

      {/* Question List Cards */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
              <div className="w-8 h-8 rounded bg-slate-100 shrink-0" />
            </div>
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
          <HelpCircle className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            No Questions Available Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            We are curating placement interview questions for this topic. Check back shortly or explore another competency.
          </p>
          <Link
            to={topicsBackUrl}
            className="px-4 py-2 bg-[#16793A] hover:bg-[#12612e] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Browse Other Topics
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, idx) => {
            const detailUrl = companyId
              ? `/company/${companyId}/interview/hr/${topicId}/${q.id}`
              : `/interview/hr/${topicId}/${q.id}`;

            const isBookmarked = hrInterviewService.isQuestionBookmarked(q.id);
            const isPrepared = hrInterviewService.isQuestionPrepared(q.id);
            const savedResponse = hrInterviewService.getSavedStarResponse(q.id);

            return (
              <Link
                key={q.id}
                to={detailUrl}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-[#16793A]/60 p-5 hover:shadow-sm transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                      Q{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {q.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {q.type}
                    </span>
                    {q.pattern && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-[#16793A] border border-emerald-100">
                        {q.pattern}
                      </span>
                    )}
                    {isPrepared && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Prepared
                      </span>
                    )}
                    {savedResponse && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 flex items-center gap-1">
                        <FileCheck2 className="w-3 h-3" />
                        STAR Saved
                      </span>
                    )}
                    {isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 text-[#16793A] fill-current" />
                    )}
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-[#16793A] transition-colors leading-snug mb-1">
                    {q.title}
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {q.statement}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-semibold text-[#16793A] group-hover:underline flex items-center gap-1">
                    <span>Practice STAR</span>
                    <ChevronRight className="w-4 h-4 stroke-2 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
