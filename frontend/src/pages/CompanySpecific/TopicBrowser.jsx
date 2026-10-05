import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Folder, FileText, AlertCircle } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import Card from '../../components/cards/Card';
import { useTopics, useCompanies, useCategories } from '../../hooks/useContentQuery';

export default function TopicBrowser() {
  const { companyId, categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Current parent topic ID from URL search parameters (null = top-level sections)
  const parentTopicId = searchParams.get('parentTopicId') || null;

  // Breadcrumb navigation trail for nested sections: [{ id, name }, ...]
  const [trail, setTrail] = useState(location.state?.trail || []);
  const [search, setSearch] = useState('');

  // 1. Resolve Company and Category names for the header & breadcrumbs
  // First prefer router navigation state (instantaneous, passed from CompanyCategory)
  // Fall back to React Query cached or fetched data if navigated directly
  const navCompanyName = location.state?.companyName;
  const navCategoryName = location.state?.categoryName;

  const { data: companies } = useCompanies(undefined, { enabled: !navCompanyName });
  const { data: categories } = useCategories(undefined, { enabled: !navCategoryName });

  const companyName =
    navCompanyName ||
    companies?.find((c) => String(c.id) === String(companyId))?.name ||
    'Company';

  const categoryName =
    navCategoryName ||
    categories?.find((c) => String(c.id) === String(categoryId))?.name ||
    'Category';

  // 2. Fetch topics for current depth level
  const {
    data: topics,
    isLoading,
    error,
    refetch,
  } = useTopics({
    categoryId,
    companyId,
    parentTopicId: parentTopicId || undefined,
  });

  // Sync breadcrumb trail whenever parentTopicId changes (e.g. browser back/forward or breadcrumb link click)
  useEffect(() => {
    if (!parentTopicId) {
      setTrail([]);
    } else {
      setTrail((prevTrail) => {
        const existingIdx = prevTrail.findIndex((t) => t.id === parentTopicId);
        if (existingIdx >= 0) {
          return prevTrail.slice(0, existingIdx + 1);
        }
        return prevTrail;
      });
    }
  }, [parentTopicId]);

  // 3. Client-side search filtering across current level
  const filteredTopics = useMemo(() => {
    if (!topics || !Array.isArray(topics)) return [];
    if (!search.trim()) return topics;
    const query = search.toLowerCase();
    return topics.filter((t) => t.name?.toLowerCase().includes(query));
  }, [topics, search]);

  // Handle clicking a topic card
  const handleTopicClick = (topic) => {
    if (topic.has_children) {
      // Section has children -> drill down into subsection
      setTrail((prev) => [...prev, { id: topic.id, name: topic.name }]);
      setSearchParams({ parentTopicId: topic.id });
      setSearch('');
    } else {
      // Leaf topic -> navigate to Question List
      navigate(`/company/${companyId}/${categoryId}/${topic.id}`, {
        state: {
          companyName,
          categoryName,
          topicName: topic.name,
          trail,
        },
      });
    }
  };

  // Construct breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/company' },
    { label: companyName, to: `/company/${companyId}` },
  ];

  if (trail.length === 0) {
    breadcrumbItems.push({ label: categoryName });
  } else {
    breadcrumbItems.push({
      label: categoryName,
      to: `/company/${companyId}/${categoryId}`,
    });

    trail.forEach((crumb, index) => {
      const isLast = index === trail.length - 1;
      if (isLast) {
        breadcrumbItems.push({ label: crumb.name });
      } else {
        breadcrumbItems.push({
          label: crumb.name,
          to: `/company/${companyId}/${categoryId}?parentTopicId=${crumb.id}`,
        });
      }
    });
  }

  const currentTitle = trail.length > 0 ? trail[trail.length - 1].name : categoryName;
  const currentSubtitle =
    trail.length > 0
      ? `Browse topics in ${currentTitle}`
      : `Select a section or topic in ${companyName} • ${categoryName}`;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">{currentTitle}</h1>
          <p className="text-sm text-text-secondary mt-1">{currentSubtitle}</p>
        </div>

        <div className="w-full md:w-72">
          <SearchInput
            placeholder="Search topics..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-bg-primary rounded-card border border-border p-4 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-100 rounded mt-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-bg-primary border border-border rounded-[14px] p-8 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-text-primary">Failed to load topics</h3>
          <p className="text-sm text-text-secondary max-w-sm">
            {error.message || 'An error occurred while fetching topics for this section.'}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-accent text-white font-medium text-sm rounded-lg hover:bg-accent-dark transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredTopics.length === 0 && (
        <div className="bg-bg-primary border border-border rounded-[14px] p-12 text-center flex flex-col items-center justify-center">
          <p className="text-text-secondary font-medium">
            {search.trim()
              ? `No topics found matching "${search}".`
              : 'No topics or questions added for this section yet.'}
          </p>
          {trail.length > 0 && (
            <button
              onClick={() => {
                setSearchParams({});
                setSearch('');
              }}
              className="mt-4 text-sm text-accent font-semibold hover:underline"
            >
              Back to {categoryName}
            </button>
          )}
        </div>
      )}

      {/* Topics Grid */}
      {!isLoading && !error && filteredTopics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              variant="topic"
              name={topic.name}
              meta={topic.has_children ? 'Section • Click to explore' : 'Practice questions'}
              icon={
                topic.has_children ? (
                  <Folder className="w-5 h-5 text-accent" />
                ) : (
                  <FileText className="w-5 h-5 text-[#16793A]" />
                )
              }
              onClick={() => handleTopicClick(topic)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
