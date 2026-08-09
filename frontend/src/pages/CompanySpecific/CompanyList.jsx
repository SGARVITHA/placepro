import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import ListView from '../../components/cards/ListView';
import Card from '../../components/cards/Card';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { useCompanies } from '../../hooks/useContentQuery';

export default function CompanyList() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, error, refetch } = useCompanies(debouncedSearch);

  const breadcrumbPath = [
    { label: 'Dashboard', href: '/' },
    { label: 'Company Specific', href: '/company' },
  ];

  return (
    <div className="space-y-3">
      <Breadcrumb path={breadcrumbPath} />

      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Company Specific
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          Select a company to prepare using real rounds and cut-offs
        </p>
      </div>

      <ListView
        items={data || []}
        renderItem={(company) => (
          <Card
            key={company.id}
            variant="company"
            name={company.name}
            icon={Building2}
            onClick={() => navigate(`/company/${company.id}`)}
          />
        )}
        searchPlaceholder="Search companies..."
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        emptyMessage="No companies added yet"
      />
    </div>
  );
}

