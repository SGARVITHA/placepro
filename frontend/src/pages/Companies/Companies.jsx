import React, { useState, useMemo } from 'react';
import SearchInput from '../../components/ui/SearchInput';
import FilterPill from '../../components/ui/FilterPill';
import { companiesData } from '../../data/companies';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FILTERS = ['All', 'Visited', 'FTE', 'Internship'];

export default function Companies() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      // Filter logic
      let passesFilter = true;
      if (activeFilter === 'Visited') {
        passesFilter = company.visited;
      } else if (activeFilter === 'FTE') {
        passesFilter = company.tags.includes('FTE');
      } else if (activeFilter === 'Internship') {
        passesFilter = company.tags.includes('Internship');
      }

      // Search logic
      let passesSearch = true;
      if (search.trim()) {
        const query = search.toLowerCase();
        passesSearch = 
          company.name.toLowerCase().includes(query) ||
          company.tags.some(t => t.toLowerCase().includes(query));
      }

      return passesFilter && passesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-1">Company Specific</h2>
        <p className="text-text-secondary text-base">
          Practice with real rounds, cut-offs and questions from companies visiting our campus.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SearchInput 
          placeholder="Search companies..." 
          value={search} 
          onChange={setSearch} 
        />
        
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map(filter => (
            <FilterPill 
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCompanies.map(company => (
          <Link 
            key={company.id}
            to={`/companies/${company.id}`}
            className="flex items-center justify-between p-4 md:p-5 bg-bg-primary border border-border rounded-card hover:shadow-card-hover transition-shadow group h-[88px]"
          >
            <div className="flex items-center gap-4 h-full">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <span className="font-semibold text-text-primary text-base truncate">{company.name}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors shrink-0 ml-2" />
          </Link>
        ))}
        {filteredCompanies.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary">
            No companies found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
