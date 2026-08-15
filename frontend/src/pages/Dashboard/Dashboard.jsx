import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import { ChevronRight, Calendar } from 'lucide-react';
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

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Company Specific spans 2 rows on large screens but here we'll use a standard layout that reflows nicely */}
          <div className="md:col-span-2 lg:col-span-1 xl:row-span-2 flex">
            <Card {...dashboardCards[0]} />
          </div>
          <div className="flex"><Card {...dashboardCards[1]} /></div>
          <div className="flex"><Card {...dashboardCards[2]} /></div>
          <div className="flex"><Card {...dashboardCards[3]} /></div>
          <div className="md:col-span-2 lg:col-span-2 xl:col-span-3 flex"><Card {...dashboardCards[4]} /></div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Companies */}
          <div className="bg-bg-primary rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Recent Companies</h3>
              <Link to="/companies" className="text-sm font-medium text-accent hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {recentCompanies.map(company => (
                <Link key={company.id} to={`/companies/${company.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-secondary transition-colors group">
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
