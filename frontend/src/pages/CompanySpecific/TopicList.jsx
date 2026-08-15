import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import { getCompany, getCategory } from '../../data/db';

export default function TopicList() {
  const { companyId, categoryId } = useParams();
  const company = getCompany(companyId);
  const category = getCategory(companyId, categoryId);
  const [search, setSearch] = useState('');

  const breadcrumbs = company && category ? [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/companies' },
    { label: company.name, to: `/companies/${company.id}` },
    { label: category.name }
  ] : [];

  const filteredTopics = useMemo(() => {
    if (!category) return [];
    if (!search.trim()) return category.topics;
    const q = search.toLowerCase();
    return category.topics.filter(t => t.name.toLowerCase().includes(q));
  }, [search, category]);

  if (!company || !category) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <p className="text-text-secondary">The requested preparation category could not be found.</p>
        <Link to={`/companies/${companyId || ''}`} className="text-accent hover:underline font-medium">Return to Company</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-2">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight mb-1">
          {category.name} — {company.name}
        </h1>
        <p className="text-text-secondary text-base">Choose a topic to start practicing</p>
      </div>

      <div className="mb-2">
        <SearchInput 
          placeholder="Search topics..." 
          value={search} 
          onChange={setSearch} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTopics.map(topic => {
          const Icon = topic.icon;
          const qCount = topic.questions?.length || 0;
          return (
            <Link 
              key={topic.id}
              to={`/companies/${company.id}/${category.id}/${topic.id}`}
              className="bg-bg-primary border border-border rounded-[14px] p-5 hover:shadow-card-hover transition-all group flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <div className="w-10 h-10 bg-accent-light text-accent rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <h3 className="font-bold text-text-primary text-[15px] leading-tight mb-1">{topic.name}</h3>
                <p className="text-xs text-text-secondary font-medium">{qCount} questions</p>
              </div>
              <div className="flex justify-end mt-2">
                <ArrowRight className="w-5 h-5 text-accent transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
        {filteredTopics.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary">
            No topics found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
}
