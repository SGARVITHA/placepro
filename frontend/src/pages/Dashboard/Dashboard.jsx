import { useNavigate } from 'react-router-dom';
import { Building2, Brain, Code2, BookOpen, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import SectionCard from '../../components/cards/SectionCard';

function getFirstName(user) {
  if (user?.user_metadata?.full_name) {
    const name = user.user_metadata.full_name.trim();
    if (name && !name.includes('@')) {
      return name.split(' ')[0];
    }
  }

  if (user?.email) {
    const localPart = user.email.split('@')[0];
    const firstPart = localPart.split('.')[0];
    // Check if it's purely digits (like student register numbers "240175")
    if (firstPart && !/^\d+$/.test(firstPart)) {
      return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
    }
  }

  return '';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = getFirstName(user);

  const greeting = firstName ? `Good morning, ${firstName}` : 'Good morning';

  return (
    <div className="space-y-3">
      {/* Header / Greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          {greeting}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          Pick where you'd like to prepare today
        </p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-3">
        {/* Top Row: Featured Company Specific + Aptitude */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3">
          <SectionCard
            variant="featured"
            icon={Building2}
            title="Company specific"
            description="Prepare using real rounds, cut-offs and questions from companies visiting campus."
            tags={["Amazon", "TCS", "Google", "+3 more"]}
            ctaLabel="View all companies"
            onClick={() => navigate('/company')}
          />
          <SectionCard
            variant="standard"
            icon={Brain}
            title="Aptitude"
            description="Quant, logical and verbal reasoning, topic by topic."
            ctaLabel="Prepare now"
            meta="3 topics"
            onClick={() => navigate('/prep/aptitude')}
          />
        </div>

        {/* Bottom Row: Coding, CS Subjects, Interview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SectionCard
            variant="standard"
            icon={Code2}
            title="Coding"
            description="DSA and programming, organised by topic and difficulty."
            ctaLabel="Prepare now"
            meta="3 topics"
            onClick={() => navigate('/prep/coding')}
          />
          <SectionCard
            variant="standard"
            icon={BookOpen}
            title="CS subjects"
            description="OS, DBMS, CN and core computer science fundamentals."
            ctaLabel="Prepare now"
            meta="4 topics"
            onClick={() => navigate('/prep/cs-subjects')}
          />
          <SectionCard
            variant="standard"
            icon={Users}
            title="Interview"
            description="HR rounds and technical interview questions, with real experiences from past students."
            ctaLabel="Get started"
            meta="2 topics"
            onClick={() => navigate('/prep/interview')}
          />
        </div>
      </div>
    </div>
  );
}
