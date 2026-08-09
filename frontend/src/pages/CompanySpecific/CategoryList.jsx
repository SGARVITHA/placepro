import { useNavigate, useParams } from 'react-router-dom';
import { Brain, Code2, BookOpen, Users, Folder } from 'lucide-react';
import ListView from '../../components/cards/ListView';
import Card from '../../components/cards/Card';
import Breadcrumb from '../../components/layout/Breadcrumb';
import EmptyState from '../../components/common/EmptyState';
import { useCategories, useCompanies } from '../../hooks/useContentQuery';

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return Folder;
  const name = categoryName.toLowerCase();
  if (name.includes('aptitude')) return Brain;
  if (name.includes('coding')) return Code2;
  if (name.includes('cs') || name.includes('subject')) return BookOpen;
  if (name.includes('interview')) return Users;
  return Folder;
};

const toSlug = (name) => {
  return name ? name.toLowerCase().replace(/\s+/g, '-') : '';
};

export default function CategoryList() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  const { data: categories, isLoading: isCategoriesLoading, error, refetch } = useCategories();

  const company = companies?.find((c) => String(c.id) === String(companyId));
  const companyName = company ? company.name : isCompaniesLoading ? '...' : null;

  const breadcrumbPath = [
    { label: 'Dashboard', href: '/' },
    { label: 'Company Specific', href: '/company' },
    { label: companyName || 'Company', href: `/company/${companyId}` },
  ];

  if (!isCompaniesLoading && companies && !company) {
    return (
      <div className="space-y-3">
        <Breadcrumb path={[{ label: 'Dashboard', href: '/' }, { label: 'Company Specific', href: '/company' }]} />
        <EmptyState
          message="Company not found"
          actionLabel="Back to companies"
          onAction={() => navigate('/company')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Breadcrumb path={breadcrumbPath} />

      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          {companyName ? `${companyName} Preparation` : 'Company Preparation'}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          Select a category to view topic breakdown and questions
        </p>
      </div>

      <ListView
        items={categories || []}
        renderItem={(category) => (
          <Card
            key={category.id}
            variant="category"
            name={category.name}
            description={category.description}
            icon={getCategoryIcon(category.name)}
            onClick={() => navigate(`/company/${companyId}/${toSlug(category.name)}`)}
          />
        )}
        hideSearch={true}
        isLoading={isCategoriesLoading}
        error={error}
        onRetry={refetch}
        emptyMessage="No categories added yet"
      />
    </div>
  );
}
