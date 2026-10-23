import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import { ChevronRight, Calendar, Building2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardCards, recentCompanies, recentlyPracticed, userActivity, upcomingTests } from '../../data/dashboard';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Extract first name safely
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-1">
            Good morning, {firstName} 👋
          </h2>
          <p className="text-text-secondary">
            Pick up where you left off and keep preparing!
          </p>
        </div>

        {/* Flagship Preparation Hub: The 5 Core Tiles of PlacePro */}
        <div className="flex flex-col gap-4">
          {/* Row 1: Company Specific (Flagship Highlight Card, full column span, increased height) */}
          <Link
            to="/company"
            className="group relative overflow-hidden bg-gradient-to-r from-[#Edf4F0] via-white to-white border-2 border-[#16793A]/40 hover:border-[#16793A] rounded-2xl p-6 sm:p-8 min-h-[160px] md:min-h-[175px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#16793A] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#16793A] text-white shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Flagship Practice
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    Amazon • TCS • Zoho • Accenture
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-text-primary tracking-tight group-hover:text-[#16793A] transition-colors">
                  Company Specific Preparation
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mt-1">
                  Practice with real interview rounds, cut-offs, syllabus patterns, and technical questions from companies visiting campus.
                </p>
                <div className="flex items-center gap-3 mt-3 flex-wrap text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">✓ Past Drive Questions</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">✓ Topic & Difficulty Filter</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">✓ Role-Based Patterns</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 self-start md:self-center">
              <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16793A] hover:bg-[#12612e] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm group-hover:shadow group-hover:translate-x-1 transition-all">
                <span>Explore Companies</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Row 2: 4 Practice Domains (Each in 1 column, generous height, clear visibility) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardCards.slice(1).map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  to={card.to}
                  className="bg-white border border-border hover:border-[#16793A]/50 rounded-2xl p-5 sm:p-6 min-h-[190px] shadow-xs hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {card.footer && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {card.footer}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-text-primary mb-1 group-hover:text-[#16793A] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs font-semibold text-[#16793A]">
                    <span>{card.actionText || 'Continue'}</span>
                    <div className="w-6 h-6 rounded-full bg-[#Edf4F0] flex items-center justify-center text-[#16793A] group-hover:bg-[#16793A] group-hover:text-white transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Companies */}
          <div className="bg-bg-primary rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Recent Companies</h3>
              <Link to="/company" className="text-sm font-medium text-accent hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {recentCompanies.map(company => (
                <Link key={company.id} to={`/company/${company.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-secondary transition-colors group">
                  <div className="flex items-center gap-3">
                    <img src={company.logo} alt={company.name} className="w-6 h-6 object-contain" />
                    <span className="font-medium text-text-primary">{company.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recently Practiced */}
          <div className="bg-bg-primary rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Recently Practiced</h3>
              <Link to="/recent-practice" className="text-sm font-medium text-accent hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {recentlyPracticed.map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.id} to="/recent-practice" className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{item.title}</span>
                        <span className="text-xs text-text-secondary">{item.subtitle}</span>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary font-medium">{item.time}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
        {/* Your Activity */}
        <div className="bg-bg-primary rounded-card border border-border p-6 flex flex-col gap-6">
          <h3 className="font-semibold text-text-primary">Your Activity</h3>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center text-accent">
              {(() => {
                const ActivityIcon = userActivity.breakdown[0].icon;
                return <ActivityIcon className="w-6 h-6" />;
              })()}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-text-primary leading-none">{userActivity.total}</span>
              <span className="text-xs text-text-secondary font-medium mt-1">Questions Attended</span>
            </div>
          </div>

          <div className="h-px bg-border w-full" />

          <div className="flex flex-col gap-5">
            {userActivity.breakdown.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-primary">{stat.label}</span>
                    <span className="text-xs text-text-secondary">{stat.count} Questions Attended</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="bg-bg-primary rounded-card border border-border p-6">
          <h3 className="font-semibold text-text-primary mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Upcoming Tests
          </h3>
          <div className="flex flex-col gap-5 mb-5">
            {upcomingTests.map(test => (
              <div key={test.id} className="flex items-start gap-3">
                <div className="mt-0.5"><Calendar className="w-4 h-4 text-text-secondary" /></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text-primary">{test.title}</span>
                  <span className="text-xs text-text-secondary mt-0.5">{test.time}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/tests" className="text-sm font-medium text-accent hover:underline flex items-center">
            View All Tests <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
