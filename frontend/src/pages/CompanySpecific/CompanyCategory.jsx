import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FlaskConical, Code2, BookOpen, User, Folder, AlertCircle } from 'lucide-react';
import { getCompanies, getCategories } from '../../lib/apiClient';

const getCategoryStyle = (categoryName = '') => {
  const name = categoryName.toLowerCase();
  if (name.includes('aptitude')) return { icon: FlaskConical, iconBg: 'bg-[#Edf4F0]', iconColor: 'text-[#16793A]' };
  if (name.includes('coding')) return { icon: Code2, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' };
  if (name.includes('cs') || name.includes('subject')) return { icon: BookOpen, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' };
  if (name.includes('interview')) return { icon: User, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' };
  return { icon: Folder, iconBg: 'bg-gray-100', iconColor: 'text-gray-500' };
};

export default function CompanyCategory() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [companiesData, categoriesData] = await Promise.all([
        getCompanies(),
        getCategories()
      ]);
      const matched = Array.isArray(companiesData)
        ? companiesData.find((c) => String(c.id) === String(companyId))
        : null;
      setCompany(matched || null);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full animate-pulse">
        <div>
          <div className="w-20 h-9 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex items-center gap-6 mt-2 mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-border rounded-[14px] p-6 flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-gray-200 mb-6" />
              <div className="flex items-center justify-between">
                <div className="h-6 w-28 bg-gray-200 rounded" />
                <div className="w-6 h-6 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center h-full gap-4 text-center py-16">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">Failed to load details</h2>
        <p className="text-text-secondary text-sm max-w-md">{error.message || 'Something went wrong while fetching data.'}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Company Not Found</h2>
        <p className="text-text-secondary">The company you are looking for does not exist.</p>
        <Link to="/company" className="text-accent hover:underline font-medium">Return to Companies</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 h-full">
      {/* Back Button */}
      <div>
        <Link 
          to="/company" 
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
            src={company.logo || company.logo_url} 
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
        {categories.map((category) => {
          const { icon: Icon, iconBg, iconColor } = getCategoryStyle(category.name);
          
          return (
            <Link 
              key={category.id} 
              to={`/company/${companyId}/${category.id}`}
              state={{ companyName: company.name, categoryName: category.name }}
              className="bg-white border border-border rounded-[14px] p-6 hover:shadow-card-hover transition-all group flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${iconBg} ${iconColor}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{category.name}</h3>
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
