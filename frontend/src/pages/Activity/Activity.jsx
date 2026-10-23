import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Target,
  Flame,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Check,
  X,
  Smile,
  ArrowRight,
  RotateCcw,
  CloudOff,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { activityService } from '../../services/activityService';

export default function Activity() {
  // State for date range: '7d' | '30d' | 'all'
  const [dateRange, setDateRange] = useState('7d');

  // Preview simulator state: 'populated' | 'empty' | 'loading' | 'error'
  const [dashboardState, setDashboardState] = useState('populated');

  // Real fetch states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active filter tab for Recent Activity feed
  const [activeTab, setActiveTab] = useState('all');

  // Interactive Chart Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    date: '',
    accuracy: '',
    attempts: '',
    x: 0,
    y: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await activityService.getActivityData({ range: dateRange });
      setData(res);
    } catch (err) {
      setError(err.message || 'Unable to load activity data');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Chart Tooltip handlers
  const handlePointHover = (e, pt) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    setTooltip({
      visible: true,
      date: pt.date,
      accuracy: `${pt.accuracy}%`,
      attempts: `(${pt.attempts} attempts)`,
      x: xPos + 10,
      y: yPos - 45,
    });
  };

  const handlePointLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Filtered Activity List
  const filteredActivities = useMemo(() => {
    if (!data?.recentActivity) return [];
    if (activeTab === 'all') return data.recentActivity;
    return data.recentActivity.filter((a) => a.category === activeTab);
  }, [data, activeTab]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] max-w-7xl w-full mx-auto pb-16">
      {/* 1. Page Header, Date Range & Dev State Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          {/* Breadcrumbs matching Stitch */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <Link to="/dashboard" className="hover:text-slate-800 transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">My Activity</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#16793A] font-semibold">Progress</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Activity &amp; Progress
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            See how your practice is progressing over time.
          </p>
        </div>

        {/* Controls: Date Range + State Simulator */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Toggle Pills */}
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-lg shadow-xs text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setDateRange('7d')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                dateRange === '7d'
                  ? 'bg-emerald-50 text-[#16793A] font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setDateRange('30d')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                dateRange === '30d'
                  ? 'bg-emerald-50 text-[#16793A] font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setDateRange('all')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                dateRange === 'all'
                  ? 'bg-emerald-50 text-[#16793A] font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              All Time
            </button>
          </div>

          {/* Dev State Selector Pills (Matching Stitch reference for demo) */}
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
            <span className="px-2 py-1 text-slate-400 select-none text-[11px] font-semibold uppercase tracking-wider">
              Preview:
            </span>
            <button
              type="button"
              onClick={() => setDashboardState('populated')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                dashboardState === 'populated'
                  ? 'bg-white text-[#16793A] shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Populated
            </button>
            <button
              type="button"
              onClick={() => setDashboardState('empty')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                dashboardState === 'empty'
                  ? 'bg-white text-[#16793A] shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Empty
            </button>
            <button
              type="button"
              onClick={() => setDashboardState('loading')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                dashboardState === 'loading'
                  ? 'bg-white text-[#16793A] shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Loading
            </button>
            <button
              type="button"
              onClick={() => setDashboardState('error')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                dashboardState === 'error'
                  ? 'bg-white text-[#16793A] shadow-xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Error
            </button>
          </div>
        </div>
      </div>

      {/* 2. LOADING SKELETON STATE */}
      {(loading || dashboardState === 'loading') && (
        <div className="flex flex-col gap-6 animate-pulse">
          {/* 4 Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 h-28 flex flex-col justify-between">
                <div className="w-24 h-3 bg-slate-200 rounded" />
                <div className="w-16 h-7 bg-slate-200 rounded" />
                <div className="w-32 h-3 bg-slate-100 rounded" />
              </div>
            ))}
          </div>

          {/* Hero Chart Skeleton */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 h-64 flex flex-col justify-between">
            <div className="w-48 h-4 bg-slate-200 rounded" />
            <div className="w-full h-36 bg-slate-100 rounded-lg flex items-center justify-center">
              <div className="w-1/2 h-1 bg-slate-200" />
            </div>
            <div className="w-32 h-3 bg-slate-100 rounded" />
          </div>

          {/* Two Column Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 h-72 flex flex-col gap-4">
              <div className="w-40 h-4 bg-slate-200 rounded" />
              <div className="w-full h-4 bg-slate-100 rounded mt-4" />
              <div className="w-full h-4 bg-slate-100 rounded" />
              <div className="w-full h-4 bg-slate-100 rounded" />
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 h-72 flex flex-col gap-4">
              <div className="w-40 h-4 bg-slate-200 rounded" />
              <div className="w-full h-24 bg-slate-100 rounded mt-4" />
              <div className="w-full h-16 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      )}

      {/* 3. ERROR STATE */}
      {(!loading && (error || dashboardState === 'error')) && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <CloudOff className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Unable to load your activity</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            There was an issue communicating with the student performance analytics service. Please verify your intranet connection and retry.
          </p>
          <button
            type="button"
            onClick={() => {
              setDashboardState('populated');
              fetchData();
            }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium text-sm transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}

      {/* 4. REALISTIC EMPTY STATE */}
      {(!loading && dashboardState === 'empty') && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#16793A] flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Start building your progress</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            Complete your first practice question and your activity, accuracy charts, and weak topic insights will appear here.
          </p>
          <Link
            to="/practice/aptitude"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16793A] text-white font-medium text-sm hover:bg-[#13632f] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Start Practicing
          </Link>
        </div>
      )}

      {/* 5. POPULATED STATE CONTAINER */}
      {(!loading && !error && dashboardState === 'populated' && data) && (
        <div className="flex flex-col gap-6">
          {/* PERFORMANCE SNAPSHOT: 4 Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Questions Attempted */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Questions Attempted
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16793A] flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 stroke-2" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {data.summary.questionsAttempted}
                  </span>
                  <span className="text-xs font-medium text-[#16793A] bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {data.summary.weeklyDelta}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Real practice attempts</p>
              </div>
            </div>

            {/* Card 2: Overall Accuracy */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Overall Accuracy
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Target className="w-5 h-5 stroke-2" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {data.summary.overallAccuracy}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Target {data.summary.targetAccuracy}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {data.summary.solvedCount}/{data.summary.questionsAttempted} solved correctly
                </p>
              </div>
            </div>

            {/* Card 3: Current Streak */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Current Streak
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 stroke-2" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {data.summary.currentStreak} Days
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {data.summary.streakStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Active daily practice</p>
              </div>
            </div>

            {/* Card 4: Topics Practiced */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Topics Practiced
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Layers className="w-5 h-5 stroke-2" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {data.summary.topicsPracticed} Topics
                  </span>
                  <span className="text-xs font-medium text-slate-500">Covered</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Across {data.summary.categoriesCount} categories
                </p>
              </div>
            </div>
          </div>

          {/* 3. PERFORMANCE OVER TIME (Hero Line Chart) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Performance Over Time</h2>
                <p className="text-xs text-slate-500">Daily accuracy percentage across practice sessions</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-3 h-1 bg-[#16793A] rounded-full inline-block" />
                  <span>Accuracy Rate (%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 border-b-2 border-dashed border-slate-400 inline-block" />
                  <span>Overall Avg ({data.dailyPerformance.averageAccuracy}%)</span>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative w-full pt-2">
              <svg className="w-full h-56 overflow-visible" viewBox="0 0 800 240">
                <defs>
                  <linearGradient id="emeraldGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#16793A" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#16793A" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines & Labels */}
                <line x1="50" y1="20" x2="780" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <text x="42" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-medium">100%</text>

                <line x1="50" y1="65" x2="780" y2="65" stroke="#f1f5f9" strokeWidth="1" />
                <text x="42" y="69" textAnchor="end" className="text-[10px] fill-slate-400 font-medium">75%</text>

                <line x1="50" y1="110" x2="780" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                <text x="42" y="114" textAnchor="end" className="text-[10px] fill-slate-400 font-medium">50%</text>

                <line x1="50" y1="155" x2="780" y2="155" stroke="#f1f5f9" strokeWidth="1" />
                <text x="42" y="159" textAnchor="end" className="text-[10px] fill-slate-400 font-medium">25%</text>

                <line x1="50" y1="200" x2="780" y2="200" stroke="#e2e8f0" strokeWidth="1" />
                <text x="42" y="204" textAnchor="end" className="text-[10px] fill-slate-400 font-medium">0%</text>

                {/* Average Dashed Reference Line (Y ~ 62.8) */}
                <line x1="50" y1="62.8" x2="780" y2="62.8" stroke="#94a3b8" strokeDasharray="4 3" strokeWidth="1.2" />
                <text x="735" y="58" textAnchor="start" className="text-[9px] fill-slate-500 font-medium">
                  {data.dailyPerformance.averageAccuracy}% avg
                </text>

                {/* Area Fill */}
                <polygon
                  fill="url(#emeraldGrad)"
                  points="80,200 80,88.4 190,74 300,77.6 410,65 520,59.6 630,52.4 740,56 740,200"
                />

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#16793A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="80,88.4 190,74 300,77.6 410,65 520,59.6 630,52.4 740,56"
                />

                {/* X-Axis Labels */}
                {data.dailyPerformance.points.map((pt) => (
                  <text
                    key={pt.date}
                    x={pt.x}
                    y="222"
                    textAnchor="middle"
                    className="text-[11px] fill-slate-500 font-medium"
                  >
                    {pt.isToday ? `${pt.date} (Today)` : pt.date}
                  </text>
                ))}

                {/* Interactive Points on Hover */}
                {data.dailyPerformance.points.map((pt) => (
                  <g
                    key={pt.date}
                    className="cursor-pointer group"
                    onMouseEnter={(e) => handlePointHover(e, pt)}
                    onMouseLeave={handlePointLeave}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={pt.isToday ? 5 : 4.5}
                      fill="#ffffff"
                      stroke="#16793A"
                      strokeWidth={pt.isToday ? 3 : 2.5}
                      className="transition-all"
                    />
                    <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />
                  </g>
                ))}
              </svg>

              {/* Floating Tooltip */}
              {tooltip.visible && (
                <div
                  className="pointer-events-none absolute bg-slate-900 text-white rounded-md px-2.5 py-1.5 shadow-lg text-xs z-30 transition-all duration-150"
                  style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                  <div className="font-semibold text-slate-200">{tooltip.date}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-400 font-bold">{tooltip.accuracy}</span>
                    <span className="text-slate-400 text-[11px]">{tooltip.attempts}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. TWO-COLUMN VISUAL GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Topic Performance */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Topic Performance</h2>
                    <p className="text-xs text-slate-500">Accuracy breakdown across attempted concepts</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {data.topicPerformance.length} active topics
                  </span>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {data.topicPerformance.map((topic) => (
                    <div key={topic.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{topic.name}</span>
                          {topic.status === 'Proficient' && (
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                              Proficient
                            </span>
                          )}
                          {topic.status === 'Needs Revision' && (
                            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full">
                              Needs Revision
                            </span>
                          )}
                          <span className="text-slate-400">• {topic.attempts} attempts</span>
                        </div>
                        <span
                          className={`font-bold ${
                            topic.accuracy < 50 ? 'text-amber-700' : 'text-slate-900'
                          }`}
                        >
                          {topic.accuracy}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${topic.accuracy}%`,
                            backgroundColor: topic.barColor,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark helper note */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-6">
                <span>Benchmark: &gt;70% Proficient, &lt;50% Flagged for revision</span>
                <Link
                  to="/practice/coding"
                  className="text-[#16793A] font-semibold hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Practice Weak Topics</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Practice Distribution & Company Practice */}
            <div className="flex flex-col gap-6">
              {/* Sub-block 1: Practice Distribution (Donut Chart) */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Practice Distribution</h2>
                    <p className="text-xs text-slate-500">Breakdown of practice time and question volume</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {data.practiceDistribution.total} Total
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                  {/* Donut SVG Ring (circumference ~ 238.76 for r=38) */}
                  <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" fill="transparent" r="38" stroke="#f1f5f9" strokeWidth="12" />
                      {/* Coding: 40% (95.5) */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#16793A"
                        strokeWidth="12"
                        strokeDasharray="95.5 143.2"
                        strokeDashoffset="0"
                      />
                      {/* CS Subjects: 25% (59.7) */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#0ea5e9"
                        strokeWidth="12"
                        strokeDasharray="59.7 179"
                        strokeDashoffset="-95.5"
                      />
                      {/* Aptitude: 18% (43.0) */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#f59e0b"
                        strokeWidth="12"
                        strokeDasharray="43.0 195.7"
                        strokeDashoffset="-155.2"
                      />
                      {/* Technical Interview: 10% (23.9) */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#8b5cf6"
                        strokeWidth="12"
                        strokeDasharray="23.9 214.8"
                        strokeDashoffset="-198.2"
                      />
                      {/* HR / Behavioral: 7% (16.7) */}
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#ec4899"
                        strokeWidth="12"
                        strokeDasharray="16.7 222"
                        strokeDashoffset="-222.1"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-bold text-slate-900 leading-none">
                        {data.practiceDistribution.total}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">
                        Questions
                      </span>
                    </div>
                  </div>

                  {/* Compact Legend */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 flex-1 text-xs">
                    {data.practiceDistribution.categories.map((cat, idx) => (
                      <div
                        key={cat.name}
                        className={`flex items-center justify-between ${
                          idx === data.practiceDistribution.categories.length - 1
                            ? 'sm:col-span-2'
                            : ''
                        }`}
                      >
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          {cat.name}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {cat.percentage}%{' '}
                          <span className="text-slate-400 font-normal">({cat.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-block 2: Company Practice Performance */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Company Practice</h2>
                    <p className="text-xs text-slate-500">Performance on company-specific patterns</p>
                  </div>
                  <span className="text-xs text-[#16793A] font-semibold">
                    {data.companyPerformance.length} Companies
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {data.companyPerformance.map((comp) => (
                    <div key={comp.name} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{comp.name}</span>
                        <span
                          className={`font-bold ${
                            comp.accuracy < 70 ? 'text-slate-700' : 'text-[#16793A]'
                          }`}
                        >
                          {comp.accuracy}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${comp.accuracy}%`,
                            backgroundColor: comp.barColor,
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {comp.attempts} questions attempted
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. RECENT ACTIVITY FEED */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
                <p className="text-xs text-slate-500">Chronological feed of your practice attempts and evaluations</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium text-slate-600">
                {['all', 'coding', 'mcq', 'flashcards', 'interview'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer capitalize ${
                      activeTab === tab
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab === 'all' ? 'All Activity' : tab === 'mcq' ? 'MCQ' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Scannable Activity List Rows */}
            <div className="flex flex-col divide-y divide-slate-100 text-xs">
              {filteredActivities.length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  No activity found in this category for the selected range.
                </div>
              ) : (
                filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Result Icon */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          act.isCorrect
                            ? 'bg-emerald-100 text-[#16793A]'
                            : 'bg-rose-100 text-rose-600'
                        }`}
                      >
                        {act.category === 'interview' ? (
                          <Smile className="w-4 h-4 stroke-2" />
                        ) : act.isCorrect ? (
                          <Check className="w-4 h-4 stroke-2" />
                        ) : (
                          <X className="w-4 h-4 stroke-2" />
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-900 text-[13px]">
                          {act.title}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                            {act.categoryLabel}
                          </span>
                          <span>•</span>
                          <span className="text-slate-700 font-medium">{act.company || act.subcategory}</span>
                          <span>•</span>
                          <span
                            className={`font-semibold ${
                              act.isCorrect ? 'text-[#16793A]' : 'text-rose-600'
                            }`}
                          >
                            {act.result}
                          </span>
                          <span>•</span>
                          <span>{act.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                      <Link
                        to={act.reviewUrl}
                        className="text-[#16793A] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-2" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM STATUS BAR matching Stitch design */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PlacePro Portal Sync: Online (RMK Intranet Verified)</span>
        </div>
        <div className="text-slate-400">
          PlacePro v2.4.0 • RMK Placement Cell
        </div>
      </div>
    </div>
  );
}
