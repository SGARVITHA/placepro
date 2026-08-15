import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCompany } from '../../data/db';

export default function CompanyCategory() {
  const { companyId } = useParams();
  const company = getCompany(companyId);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Company Not Found</h2>
        <p className="text-text-secondary">The company you are looking for does not exist.</p>
        <Link to="/companies" className="text-accent hover:underline font-medium">Return to Companies</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full">
      {/* Back Button */}
      <div>
        <Link 
          to="/companies" 
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-accent font-semibold hover:bg-black/5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center gap-6 mt-2 mb-4">
        <div className="w-24 h-24 bg-white border border-border rounded-full shadow-sm flex items-center justify-center p-3 shrink-0">
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-full h-full object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-1">{company.name}</h1>
          <p className="text-text-secondary text-base">Choose a preparation category</p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {company.categories.map((category) => {
          const Icon = category.icon;
          const topicCount = category.topics.length;
          
          return (
            <Link 
              key={category.id} 
              to={`/companies/${companyId}/${category.id}`}
              className="bg-white border border-border rounded-[14px] p-6 hover:shadow-card-hover transition-all group flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${category.iconBg || 'bg-gray-100'} ${category.iconColor || 'text-gray-500'}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{category.name}</h3>
                  <p className="text-text-secondary font-medium">{topicCount} {topicCount === 1 ? 'topic' : 'topics'}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-accent transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
