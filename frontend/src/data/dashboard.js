import { Building2, FlaskConical, Code2, BookOpen, User, GraduationCap } from 'lucide-react';

export const dashboardCards = [
  {
    id: 'company-specific',
    title: 'Company Specific',
    subtitle: 'Practice with real rounds, cut-offs and questions from companies visiting campus.',
    icon: Building2,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-light',
    actionText: 'Explore Companies',
    to: '/company',
    footer: null
  },
  {
    id: 'aptitude',
    title: 'Aptitude',
    subtitle: 'Quant, logical and verbal reasoning, topic by topic.',
    icon: FlaskConical,
    iconColor: 'text-accent',
    iconBg: 'bg-accent-light',
    actionText: 'Continue',
    to: '/practice/aptitude',
    footer: '5 topics'
  },
  {
    id: 'coding',
    title: 'Coding',
    subtitle: 'DSA and programming organised by topic and difficulty.',
    icon: Code2,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
    actionText: 'Continue',
    to: '/practice/coding',
    footer: '6 topics'
  },
  {
    id: 'cs-subjects',
    title: 'CS Subjects',
    subtitle: 'OS, DBMS, CN and core computer science fundamentals.',
    icon: BookOpen,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
    actionText: 'Continue',
    to: '/practice/cs-subjects',
    footer: '4 topics'
  },
  {
    id: 'interview',
    title: 'Interview',
    subtitle: 'HR rounds and technical interview questions, with real experiences from students.',
    icon: User,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    actionText: 'Continue',
    to: '/interview',
    footer: '2 topics'
  }
];

export const recentCompanies = [
  { id: 'amazon', name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { id: 'tcs', name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
  { id: 'zoho', name: 'Zoho', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Zoho_Logo.png' },
  { id: 'infosys', name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
];

export const recentlyPracticed = [
  { id: '1', title: 'Arrays', subtitle: 'Amazon • Coding', time: '2h ago', icon: Code2, iconColor: 'text-accent', iconBg: 'bg-accent-light' },
  { id: '2', title: 'Time and Work', subtitle: 'Aptitude', time: '5h ago', icon: GraduationCap, iconColor: 'text-purple-500', iconBg: 'bg-purple-50' },
  { id: '3', title: 'Operating Systems', subtitle: 'CS Subjects', time: '1d ago', icon: BookOpen, iconColor: 'text-orange-500', iconBg: 'bg-orange-50' },
  { id: '4', title: 'System Design Basics', subtitle: 'Interview', time: '2d ago', icon: User, iconColor: 'text-accent', iconBg: 'bg-accent-light' },
];

export const userActivity = {
  total: 142,
  breakdown: [
    { label: 'Aptitude', count: 42, icon: GraduationCap, iconColor: 'text-accent', iconBg: 'bg-accent-light' },
    { label: 'Coding', count: 68, icon: Code2, iconColor: 'text-orange-500', iconBg: 'bg-orange-50' },
    { label: 'CS Subjects', count: 22, icon: BookOpen, iconColor: 'text-purple-500', iconBg: 'bg-purple-50' },
    { label: 'Interview', count: 10, icon: User, iconColor: 'text-blue-500', iconBg: 'bg-blue-50' },
  ]
};

export const upcomingTests = [
  { id: 'test-1', title: 'Amazon SDE Mock Test', time: 'in 2 days' },
  { id: 'test-2', title: 'TCS NQT Aptitude', time: 'in 5 days' },
];
