import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ListView from '../../components/cards/ListView';
import Card from '../../components/cards/Card';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { useTopics, useCategories, useCompanies } from '../../hooks/useContentQuery';

export default function TopicList() {
  const { companyId, categorySlug, sectionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch categories to resolve categorySlug -> categoryId and categoryName
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const category = categories?.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
  const categoryId = category?.id;
  const categoryName = category?.name || (isCategoriesLoading ? '...' : 'Category');

  // Fetch companies if in Company Specific context
  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  const company = companyId ? companies?.find((c) => String(c.id) === String(companyId)) : null;
  const companyName = company ? company.name : isCompaniesLoading ? '...' : 'Company';

  // Section name passed from state or fallback
  const sectionName = location.state?.sectionName || 'Section';

  // Fetch topics using categoryId, optional companyId, optional sectionId (as parentTopicId)
  const {
    data: topics,
    isLoading: isTopicsLoading,
    error,
    refetch,
  } = useTopics({
    categoryId,
    companyId: companyId || undefined,
    parentTopicId: sectionId || undefined,
    search: debouncedSearch,
  });

  // Construct Breadcrumb path
  const isCompanyContext = Boolean(companyId);
  const breadcrumbPath = isCompanyContext
    ? [
        { label: 'Dashboard', href: '/' },
        { label: 'Company Specific', href: '/company' },
        { label: companyName, href: `/company/${companyId}` },
        {
          label: categoryName,
          href: `/company/${companyId}/${categorySlug}`,
        },
      ]
    : [
        { label: 'Dashboard', href: '/' },
        { label: categoryName, href: `/prep/${categorySlug}` },
      ];

  if (sectionId) {
    const sectionHref = isCompanyContext
      ? `/company/${companyId}/${categorySlug}/${sectionId}`
      : `/prep/${categorySlug}/${sectionId}`;
    breadcrumbPath.push({ label: sectionName, href: sectionHref });
  }

  const handleCardClick = (topic) => {
    if (topic.has_children) {
      const nextPath = isCompanyContext
        ? `/company/${companyId}/${categorySlug}/${topic.id}`
        : `/prep/${categorySlug}/${topic.id}`;
      navigate(nextPath, { state: { sectionName: topic.name } });
    } else {
      const currentSectionId = sectionId || topic.parent_topic_id || topic.id;
      const questionListPath = isCompanyContext
        ? `/company/${companyId}/${categorySlug}/${currentSectionId}/${topic.id}`
        : `/prep/${categorySlug}/${currentSectionId}/${topic.id}`;
      navigate(questionListPath, { state: { topicName: topic.name, sectionName } });
    }
  };

  return (
    <div className="space-y-3">
      <Breadcrumb path={breadcrumbPath} />

      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          {sectionId ? sectionName : categoryName}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          {sectionId
            ? 'Select a topic to start practicing questions'
            : 'Select a section to view topic breakdown'}
        </p>
      </div>

      <ListView
        items={topics || []}
        renderItem={(topic) => (
          <Card
            key={topic.id}
            variant="topic"
            name={topic.name}
            description={topic.description}
            onClick={() => handleCardClick(topic)}
          />
        )}
        searchPlaceholder="Search topics..."
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        isLoading={isTopicsLoading || isCategoriesLoading}
        error={error}
        onRetry={refetch}
        emptyMessage={
          sectionId
            ? 'No topics added yet for this section'
            : 'No sections added yet for this category'
        }
      />
    </div>
  );
}
