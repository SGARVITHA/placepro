import { Cpu, Database, Network, Boxes, Coffee, Terminal } from 'lucide-react';

export const CS_SUBJECTS = [
  {
    id: 'os',
    name: 'Operating Systems',
    slug: 'operating-systems',
    description: 'Processes, CPU scheduling, deadlocks, memory management, and virtual memory.',
    icon: Cpu,
    color: 'blue',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    borderHover: 'hover:border-blue-300',
    iconBg: 'bg-blue-100/80',
    iconColor: 'text-blue-700',
    questionCount: 6,
  },
  {
    id: 'dbms',
    name: 'DBMS and SQL',
    slug: 'dbms',
    description: 'Relational database concepts, normalization, transactions, ACID, indexing, and SQL.',
    icon: Database,
    color: 'emerald',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    borderHover: 'hover:border-emerald-300',
    iconBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-700',
    questionCount: 6,
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    slug: 'computer-networks',
    description: 'OSI & TCP/IP layers, routing, TCP/UDP protocols, DNS, subnetting, and network security.',
    icon: Network,
    color: 'indigo',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    borderHover: 'hover:border-indigo-300',
    iconBg: 'bg-indigo-100/80',
    iconColor: 'text-indigo-700',
    questionCount: 6,
  },
  {
    id: 'oops',
    name: 'OOPS',
    slug: 'oops',
    description: 'Object-oriented programming, classes, inheritance, polymorphism, and abstraction.',
    icon: Boxes,
    color: 'purple',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    borderHover: 'hover:border-purple-300',
    iconBg: 'bg-purple-100/80',
    iconColor: 'text-purple-700',
    questionCount: 4,
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    description: 'Core Java, JVM internals, multithreading, collections framework, and memory model.',
    icon: Coffee,
    color: 'amber',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    borderHover: 'hover:border-amber-300',
    iconBg: 'bg-amber-100/80',
    iconColor: 'text-amber-700',
    questionCount: 4,
  },
  {
    id: 'cpp',
    name: 'C++',
    slug: 'cpp',
    description: 'Pointers, memory management, virtual destructors, dynamic dispatch, and modern C++.',
    icon: Terminal,
    color: 'teal',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    borderHover: 'hover:border-teal-300',
    iconBg: 'bg-teal-100/80',
    iconColor: 'text-teal-700',
    questionCount: 4,
  },
];

export function findSubject(identifier) {
  if (!identifier) return null;
  const target = String(identifier).toLowerCase().trim().replace(/[\s_]+/g, '-');
  return (
    CS_SUBJECTS.find(
      (s) =>
        s.id.toLowerCase() === target ||
        s.slug.toLowerCase() === target ||
        s.name.toLowerCase().replace(/[\s_]+/g, '-') === target ||
        s.name.toLowerCase().replace(/\s*and\s*/g, '&').replace(/[\s_]+/g, '-') === target
    ) || null
  );
}
