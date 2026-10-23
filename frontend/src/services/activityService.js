import { UserService } from '../data/UserService';

/**
 * Activity & Progress Analytics Service
 * 
 * Aggregates practice history, evaluates performance metrics, accuracy rates,
 * topic proficiency, practice distributions, and chronological activity feeds.
 */

const STORAGE_KEY = 'placepro_activity_history_v1';

// Seed demo activity history matching the Stitch design reference
const SEED_ACTIVITIES = [
  {
    id: 'act-1',
    questionId: 'q1',
    title: 'Rotate an array to the right by k steps in-place',
    category: 'coding',
    categoryLabel: 'Coding',
    subcategory: 'Arrays & Two Pointers',
    company: 'Amazon',
    result: '100% (Passed all test cases)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    timeAgo: '2 hours ago',
    reviewUrl: '/practice/coding',
  },
  {
    id: 'act-2',
    questionId: 'q2',
    title: 'Two trains moving in opposite directions cross a pole in 27 seconds...',
    category: 'mcq',
    categoryLabel: 'Aptitude',
    subcategory: 'Speed, Time & Distance',
    company: 'TCS NQT',
    result: 'Correct (+1.0)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    timeAgo: 'Yesterday',
    reviewUrl: '/practice/aptitude',
  },
  {
    id: 'act-3',
    questionId: 'tech-os-1',
    title: 'What is the fundamental difference between a process and a thread?',
    category: 'flashcards',
    categoryLabel: 'CS Subjects',
    subcategory: 'Operating Systems',
    company: 'Core Fundamentals',
    result: 'Needs Review (45%)',
    isCorrect: false,
    score: 0.45,
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    timeAgo: 'Yesterday',
    reviewUrl: '/practice/flashcards',
  },
  {
    id: 'act-4',
    questionId: 'diff-teammate',
    title: 'STAR: Handling project deadline pressure with a difficult team member',
    category: 'interview',
    categoryLabel: 'HR Interview',
    subcategory: 'Behavioral & Teamwork',
    company: 'Amazon & Top Tech',
    result: 'Self-Assessed (Confident)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    timeAgo: '2 days ago',
    reviewUrl: '/interview/hr/teamwork/diff-teammate',
  },
  {
    id: 'act-5',
    questionId: 'proj-architecture',
    title: 'Explain the architecture of your final-year project and tech stack',
    category: 'interview',
    categoryLabel: 'Tech Interview',
    subcategory: 'Projects & Architecture',
    company: 'Amazon',
    result: 'Self-Assessed (Confident)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '3 days ago',
    reviewUrl: '/interview/technical/projects/proj-architecture',
  },
  {
    id: 'act-6',
    questionId: 'q3',
    title: 'Maximum Subarray Sum using Kadane\'s Algorithm',
    category: 'coding',
    categoryLabel: 'Coding',
    subcategory: 'Dynamic Programming',
    company: 'Amazon',
    result: '100% (Passed all test cases)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '3 days ago',
    reviewUrl: '/practice/coding',
  },
  {
    id: 'act-7',
    questionId: 'q4',
    title: 'Database Transactions & ACID Isolation Levels',
    category: 'mcq',
    categoryLabel: 'CS Subjects',
    subcategory: 'DBMS & SQL',
    company: 'Accenture',
    result: 'Correct (+1.0)',
    isCorrect: true,
    score: 1.0,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '4 days ago',
    reviewUrl: '/practice/cs-subjects',
  },
  {
    id: 'act-8',
    questionId: 'q5',
    title: 'Find the Intersection Node of Two Linked Lists',
    category: 'coding',
    categoryLabel: 'Coding',
    subcategory: 'Linked Lists',
    company: 'TCS',
    result: 'Wrong Answer (Test case 4 failed)',
    isCorrect: false,
    score: 0.0,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '5 days ago',
    reviewUrl: '/practice/coding',
  },
];

function getStoredActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
      return SEED_ACTIVITIES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ACTIVITIES;
  }
}

export const activityService = {
  /**
   * Retrieves full activity and performance metrics for the requested date range
   */
  getActivityData: async ({ range = '7d' } = {}) => {
    // Simulated network latency
    await new Promise((r) => setTimeout(r, 80));

    const activities = getStoredActivities();

    // Range filtering
    const now = Date.now();
    let cutoff = 0;
    if (range === '7d') {
      cutoff = now - 7 * 24 * 60 * 60 * 1000;
    } else if (range === '30d') {
      cutoff = now - 30 * 24 * 60 * 60 * 1000;
    } else {
      cutoff = 0; // all time
    }

    const filtered = activities.filter((a) => {
      if (!cutoff) return true;
      return new Date(a.timestamp).getTime() >= cutoff;
    });

    // Check if user has practice solved in UserService
    const solvedIds = UserService.getSolved();
    const totalAttempted = Math.max(42, solvedIds.length + filtered.length);
    const solvedCount = Math.round(totalAttempted * 0.762);
    const overallAccuracy = 76.2;

    // Daily Performance Chart Points (Oct 18 to Oct 24)
    const dailyPoints = [
      { date: 'Oct 18', fullDate: '18 Oct 2024', accuracy: 62, attempts: 4, x: 80, y: 88.4 },
      { date: 'Oct 19', fullDate: '19 Oct 2024', accuracy: 70, attempts: 5, x: 190, y: 74 },
      { date: 'Oct 20', fullDate: '20 Oct 2024', accuracy: 68, attempts: 6, x: 300, y: 77.6 },
      { date: 'Oct 21', fullDate: '21 Oct 2024', accuracy: 75, attempts: 7, x: 410, y: 65 },
      { date: 'Oct 22', fullDate: '22 Oct 2024', accuracy: 78, attempts: 5, x: 520, y: 59.6 },
      { date: 'Oct 23', fullDate: '23 Oct 2024', accuracy: 82, attempts: 8, x: 630, y: 52.4 },
      { date: 'Oct 24', fullDate: '24 Oct 2024', accuracy: 80, attempts: 7, x: 740, y: 56, isToday: true },
    ];

    // Topic Performance Breakdown
    const topicPerformance = [
      {
        name: 'Arrays',
        attempts: 18,
        accuracy: 82,
        status: 'Proficient',
        statusColor: 'emerald',
        barColor: '#16793A',
      },
      {
        name: 'Data Structures & Algorithms',
        attempts: 12,
        accuracy: 75,
        status: null,
        barColor: '#16793A',
      },
      {
        name: 'DBMS & SQL',
        attempts: 6,
        accuracy: 67,
        status: null,
        barColor: '#0d9488', // teal-600
      },
      {
        name: 'Computer Networks',
        attempts: 5,
        accuracy: 58,
        status: null,
        barColor: '#94a3b8', // slate-400
      },
      {
        name: 'Operating Systems',
        attempts: 4,
        accuracy: 45,
        status: 'Needs Revision',
        statusColor: 'amber',
        barColor: '#f59e0b', // amber-500
      },
    ];

    // Practice Distribution (42 total)
    const practiceDistribution = {
      total: 42,
      categories: [
        { name: 'Coding', percentage: 40, count: 17, color: '#16793A' },
        { name: 'CS Subjects', percentage: 25, count: 11, color: '#0ea5e9' },
        { name: 'Aptitude', percentage: 18, count: 8, color: '#f59e0b' },
        { name: 'Tech Interview', percentage: 10, count: 4, color: '#8b5cf6' },
        { name: 'HR / Behavioral', percentage: 7, count: 2, color: '#ec4899' },
      ],
    };

    // Company Practice Performance
    const companyPerformance = [
      { name: 'TCS', accuracy: 78, attempts: 14, barColor: '#16793A' },
      { name: 'Amazon', accuracy: 81, attempts: 11, barColor: '#16793A' },
      { name: 'Infosys', accuracy: 64, attempts: 9, barColor: '#64748b' },
      { name: 'Accenture', accuracy: 80, attempts: 8, barColor: '#16793A' },
    ];

    return {
      summary: {
        questionsAttempted: totalAttempted,
        weeklyDelta: '+6 this week',
        overallAccuracy: overallAccuracy,
        solvedCount: solvedCount,
        targetAccuracy: '≥ 75%',
        currentStreak: 5,
        streakStatus: 'Active',
        topicsPracticed: 8,
        categoriesCount: 5,
      },
      dailyPerformance: {
        points: dailyPoints,
        averageAccuracy: 76.2,
      },
      topicPerformance,
      practiceDistribution,
      companyPerformance,
      recentActivity: filtered,
    };
  },

  /**
   * Log an activity record
   */
  logActivity: (activityItem) => {
    const list = getStoredActivities();
    const newItem = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      ...activityItem,
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newItem;
  },

  /**
   * Clear all activities (for testing empty state)
   */
  clearActivities: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },

  /**
   * Reset seed activities (for testing populated state)
   */
  resetSeedActivities: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
  },
};
