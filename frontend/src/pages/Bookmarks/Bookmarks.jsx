import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bookmark,
  Search,
  X,
  ChevronRight,
  GraduationCap,
  Terminal,
  HelpCircle,
  Layers,
  Mic,
  PenTool,
  RotateCcw,
  SearchX,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { bookmarkService, formatSavedTime } from '../../services/bookmarkService';
import { useAuth } from '../../hooks/useAuth';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Primary state
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Removing state to avoid rapid repeated clicks
  const [removingIds, setRemovingIds] = useState(new Set());

  // Toast notification state
  const [toast, setToast] = useState({ visible: false, message: '', icon: null });

  const showToast = useCallback((message, icon = 'check') => {
    setToast({ visible: true, message, icon });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Fetch bookmarks
  const loadBookmarks = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const data = bookmarkService.getBookmarks(user);
      setBookmarks(data);
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
      setError('Unable to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  // Listen for global bookmark changes (e.g., from practice tabs)
  useEffect(() => {
    const handleBookmarkChange = () => {
      const fresh = bookmarkService.getBookmarks(user);
      setBookmarks(fresh);
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, [user]);

  // Dynamically derive company options from actual bookmark metadata
  const companyOptions = useMemo(() => {
    const set = new Set();
    bookmarks.forEach((b) => {
      if (b.company && b.company.trim() !== '' && b.company !== 'Campus Recruiter') {
        set.add(b.company);
      }
    });
    return Array.from(set).sort();
  }, [bookmarks]);

  // Is any filter currently active?
  const isFiltered = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedCategory !== 'All' ||
      selectedCompany !== 'All' ||
      selectedDifficulty !== 'All'
    );
  }, [searchQuery, selectedCategory, selectedCompany, selectedDifficulty]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCompany('All');
    setSelectedDifficulty('All');
  };

  // Filtered bookmark list
  const filteredBookmarks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return bookmarks.filter((item) => {
      // 1. Text Search across Title, Topic, Subtopic, Company, and Category
      if (query) {
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const topicMatch = (item.topic || '').toLowerCase().includes(query);
        const subtopicMatch = (item.subtopic || '').toLowerCase().includes(query);
        const compMatch = (item.company || '').toLowerCase().includes(query);
        const catMatch = (item.category || '').toLowerCase().includes(query);

        if (!titleMatch && !topicMatch && !subtopicMatch && !compMatch && !catMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        const catLower = (item.category || '').toLowerCase();
        if (selectedCategory === 'Coding' && !catLower.includes('coding')) return false;
        if (selectedCategory === 'Aptitude / MCQ' && !catLower.includes('aptitude') && !catLower.includes('mcq')) return false;
        if (selectedCategory === 'CS Subjects' && !catLower.includes('cs subject') && !catLower.includes('flashcard')) return false;
        if (selectedCategory === 'HR Behavioral' && !catLower.includes('hr')) return false;
        if (selectedCategory === 'Technical Interview' && !catLower.includes('technical')) return false;
      }

      // 3. Company Filter
      if (selectedCompany !== 'All') {
        if ((item.company || '').toLowerCase() !== selectedCompany.toLowerCase()) {
          return false;
        }
      }

      // 4. Difficulty Filter
      if (selectedDifficulty !== 'All') {
        const diffLower = (item.difficulty || '').toLowerCase();
        const selLower = selectedDifficulty.toLowerCase();
        if (diffLower !== selLower) {
          return false;
        }
      }

      return true;
    });
  }, [bookmarks, searchQuery, selectedCategory, selectedCompany, selectedDifficulty]);

  // Remove bookmark handler
  const handleRemoveBookmark = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = item.questionId || item.id;
    if (removingIds.has(targetId)) return;

    setRemovingIds((prev) => new Set(prev).add(targetId));

    try {
      const updated = bookmarkService.removeBookmark(targetId, user);
      setBookmarks(updated);
      showToast('Bookmark removed', 'remove');
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
      showToast('Unable to remove bookmark. Please try again.', 'error');
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(targetId);
        return next;
      });
    }
  };

  // Card click navigation
  const handleCardClick = (item) => {
    if (item.route) {
      navigate(item.route, {
        state: {
          questionId: item.questionId || item.id,
          topicId: item.topicId,
          companyId: item.companyId,
          categoryId: item.categoryId,
        },
      });
    } else {
      showToast('Opening practice route...', 'info');
    }
  };

  // Helper for practice icon
  const getPracticeIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('coding')) return <Terminal className="w-3.5 h-3.5" />;
    if (t.includes('mcq') || t.includes('aptitude')) return <HelpCircle className="w-3.5 h-3.5" />;
    if (t.includes('flashcard')) return <Layers className="w-3.5 h-3.5" />;
    if (t.includes('star') || t.includes('hr')) return <Mic className="w-3.5 h-3.5" />;
    return <PenTool className="w-3.5 h-3.5" />;
  };

  // Helper for difficulty badge styling
  const getDifficultyBadge = (diff = 'Medium') => {
    const d = diff.toLowerCase();
    if (d === 'easy') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200">
          Easy
        </span>
      );
    }
    if (d === 'hard') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-[#DC2626] border border-rose-200">
          Hard
        </span>
      );
    }
    if (d === 'behavioral') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          Behavioral
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
        Medium
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-16">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-slate-900 text-white ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>

      {/* Breadcrumb Navigation */}
      <div>
        <Breadcrumb
          items={[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Bookmarks' },
          ]}
        />
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#Edf4F0] text-[#16793A]">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Saved Revision Hub</span>
            </span>
            <span
              id="bookmark-badge-counter"
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
            >
              {isFiltered
                ? `${filteredBookmarks.length} of ${bookmarks.length} saved`
                : `${bookmarks.length} saved question${bookmarks.length === 1 ? '' : 's'}`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Bookmarks
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Your saved questions and concept cards, ready for quick revision before interviews.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-xl shadow-xs p-4 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bookmarked questions..."
              className="w-full h-9 pl-10 pr-9 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16793A]/20 focus:border-[#16793A] transition-all bg-white border border-slate-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns Container */}
          <div className="md:col-span-7 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Category Select */}
            <div className="relative flex-1 min-w-[130px]">
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16793A]/20 focus:border-[#16793A] cursor-pointer transition-colors appearance-none"
              >
                <option value="All">All Categories</option>
                <option value="Coding">Coding</option>
                <option value="Aptitude / MCQ">Aptitude / MCQ</option>
                <option value="CS Subjects">CS Subjects</option>
                <option value="HR Behavioral">HR Behavioral</option>
                <option value="Technical Interview">Technical Interview</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>

            {/* Company Select */}
            <div className="relative flex-1 min-w-[130px]">
              <select
                id="filter-company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16793A]/20 focus:border-[#16793A] cursor-pointer transition-colors appearance-none"
              >
                <option value="All">All Companies</option>
                {companyOptions.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>

            {/* Difficulty Select */}
            <div className="relative flex-1 min-w-[120px]">
              <select
                id="filter-difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16793A]/20 focus:border-[#16793A] cursor-pointer transition-colors appearance-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Behavioral">Behavioral</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button
                id="btn-reset-filters"
                type="button"
                onClick={handleResetFilters}
                className="h-9 px-3 shrink-0 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-xl p-5 border border-slate-200 animate-pulse space-y-3"
            >
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-200 rounded"></div>
                <div className="h-5 w-20 bg-slate-200 rounded"></div>
                <div className="h-5 w-12 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-white border border-rose-200 rounded-xl p-10 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-3 text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Unable to load bookmarks</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {error}
          </p>
          <button
            type="button"
            onClick={loadBookmarks}
            className="mt-4 px-4 py-2 rounded-lg bg-[#16793A] hover:bg-[#12632F] text-white text-xs font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State: No bookmarks saved yet */}
      {!loading && !error && bookmarks.length === 0 && (
        <div
          id="empty-state-view"
          className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs"
        >
          <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No bookmarks yet</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Tap the bookmark icon on any question to save it here for quick revision.
          </p>
          <div className="mt-6">
            <Link
              to="/practice/aptitude"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16793A] hover:bg-[#12632F] text-white text-sm font-semibold transition-colors shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Practice Questions</span>
            </Link>
          </div>
        </div>
      )}

      {/* No Search Results Found State */}
      {!loading && !error && bookmarks.length > 0 && filteredBookmarks.length === 0 && (
        <div
          id="no-search-results"
          className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-xs"
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No matching bookmarks found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search criteria or resetting filters.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Bookmarked Questions List */}
      {!loading && !error && filteredBookmarks.length > 0 && (
        <div id="bookmarks-container" className="space-y-3">
          {filteredBookmarks.map((item) => {
            const isRemoving = removingIds.has(item.questionId || item.id);
            const savedTimeLabel = formatSavedTime(item.savedAt);

            return (
              <article
                key={item.id || item.questionId}
                onClick={() => handleCardClick(item)}
                className={`bookmark-item group relative rounded-xl p-5 shadow-xs hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-border hover:border-[#16793A]/50 ${
                  isRemoving ? 'opacity-40 pointer-events-none' : ''
                }`}
              >
                <div className="flex-1 min-w-0 pr-2">
                  {/* Metadata Badges Row */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {item.difficulty && getDifficultyBadge(item.difficulty)}

                    {item.company && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {item.company}
                      </span>
                    )}

                    {item.year && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-500 border border-slate-200">
                        {item.year}
                      </span>
                    )}

                    {item.topic && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {item.topic}
                      </span>
                    )}

                    {item.subtopic && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {item.subtopic}
                      </span>
                    )}

                    {item.category && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Question Title */}
                  <h2 className="text-base font-semibold text-text-primary group-hover:text-[#16793A] transition-colors tracking-tight line-clamp-2">
                    {item.title}
                  </h2>

                  {/* Sub-row: Practice Type & Saved Timestamp */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 text-slate-700 font-medium border border-slate-200/80">
                      {getPracticeIcon(item.practiceType)}
                      <span>{item.practiceType || 'Practice Mode'}</span>
                    </span>

                    {savedTimeLabel && (
                      <>
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{savedTimeLabel}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleRemoveBookmark(item, e)}
                    aria-label="Remove bookmark"
                    title="Remove bookmark"
                    className="bookmark-action-btn w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-[#16793A] hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#16793A] transition-all" />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
