import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, 
  Layers, 
  GitBranch, 
  Database, 
  Terminal, 
  Network, 
  Server, 
  Cloud, 
  Code2, 
  CheckSquare, 
  Search, 
  ChevronRight, 
  ArrowLeft,
  FolderOpen
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { technicalInterviewService } from '../../services/technicalInterviewService';

export default function TechnicalTopicList() {
  const { companyId } = useParams();
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const company = companyId ? technicalInterviewService.getCompanyMeta(companyId) : null;
  const companyName = company?.name || (companyId ? companyId.toUpperCase() : null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const data = await technicalInterviewService.getTechnicalTopics({ companyId });
      if (isMounted) {
        setTopics(data);
        setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [companyId]);

  const breadcrumbItems = companyId
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Company Specific', to: '/company' },
        { label: companyName, to: `/company/${companyId}` },
        { label: 'Interview', to: `/company/${companyId}/interview` },
        { label: 'Technical Topics' },
      ]
    : [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Practice', to: '/practice/aptitude' },
        { label: 'Interview', to: '/interview' },
        { label: 'Technical Topics' },
      ];

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'cpu': return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'layers': return <Layers className="w-5 h-5 text-indigo-500" />;
      case 'git-branch': return <GitBranch className="w-5 h-5 text-blue-600" />;
      case 'database': return <Database className="w-5 h-5 text-amber-600" />;
      case 'terminal': return <Terminal className="w-5 h-5 text-slate-700" />;
      case 'network': return <Network className="w-5 h-5 text-sky-600" />;
      case 'server': return <Server className="w-5 h-5 text-purple-600" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-teal-600" />;
      case 'code-2': return <Code2 className="w-5 h-5 text-rose-500" />;
      case 'check-square': return <CheckSquare className="w-5 h-5 text-emerald-700" />;
      default: return <Code2 className="w-5 h-5 text-[#16793A]" />;
    }
  };

  const getIconBg = (iconName) => {
    switch (iconName) {
      case 'cpu': return 'bg-emerald-50';
      case 'layers': return 'bg-indigo-50';
      case 'git-branch': return 'bg-blue-50';
      case 'database': return 'bg-amber-50';
      case 'terminal': return 'bg-slate-100';
      case 'network': return 'bg-sky-50';
      case 'server': return 'bg-purple-50';
      case 'cloud': return 'bg-teal-50';
      case 'code-2': return 'bg-rose-50';
      case 'check-square': return 'bg-emerald-50';
      default: return 'bg-emerald-50';
    }
  };

  const filteredTopics = topics.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Top Header Row with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={companyId ? `/company/${companyId}/interview` : '/interview'}
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-[#16793A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Selection
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
              {companyName ? `${companyName} Technical Prep` : 'Engineering & Architecture'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Technical Interview Topics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Prepare comprehensive explanations for project architecture, database optimizations, system design, and core engineering concepts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64 self-start sm:self-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technical topics..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-[#16793A] focus:ring-2 focus:ring-[#16793A]/10 transition-all"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-5/6" />
                <div className="h-3 bg-slate-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
          <FolderOpen className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">No Technical Topics Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            No technical topics match your search query &ldquo;{search}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setSearch('')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Topics Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic) => {
            const topicUrl = companyId
              ? `/company/${companyId}/interview/technical/${topic.id}`
              : `/interview/technical/${topic.id}`;

            return (
              <Link
                key={topic.id}
                to={topicUrl}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-[#16793A]/50 p-5 hover:shadow-sm transition-all group flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(topic.icon)} group-hover:scale-105 transition-transform`}>
                    {getTopicIcon(topic.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#16793A] transition-colors truncate">
                        {topic.name}
                      </h2>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {topic.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
                        {topic.questionCount} {topic.questionCount === 1 ? 'Question' : 'Questions'}
                      </span>
                      <span>•</span>
                      <span className="text-[#16793A] font-semibold group-hover:underline">
                        Practice Questions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-slate-400 group-hover:text-[#16793A] transition-colors shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 stroke-2" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
