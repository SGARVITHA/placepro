import { mockQuestions, mockFlashcards } from './mockApiService';
import { HR_QUESTIONS } from './hrInterviewService';
import { TECHNICAL_QUESTIONS } from './technicalInterviewService';

const LEGACY_STORAGE_KEY = 'placepro_bookmarks';
const SEED_FLAG_KEY = 'placepro_bookmarks_seeded_v2';

/**
 * High-quality canonical questions corresponding to the PlacePro reference design.
 */
export const SEED_BOOKMARKED_QUESTIONS = [
  {
    id: 'bm-101',
    questionId: 'q2',
    title: 'Rotate an array to the right by k steps in-place.',
    difficulty: 'Medium',
    company: 'Amazon',
    companyId: 'amazon',
    year: '2024',
    topic: 'Arrays',
    topicId: 'arrays',
    category: 'Coding',
    categoryId: 'coding',
    practiceType: 'Coding Practice',
    route: '/practice/coding',
    savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'bm-102',
    questionId: 'apt-tsd',
    title: 'Two trains moving in opposite directions cross a pole in 27 sec and 17 sec...',
    difficulty: 'Easy',
    company: 'TCS',
    companyId: 'tcs',
    year: '2024',
    topic: 'Quantitative',
    subtopic: 'Time, Speed & Distance',
    topicId: 'time-speed-distance',
    category: 'Aptitude',
    categoryId: 'aptitude',
    practiceType: 'MCQ Practice',
    route: '/practice/aptitude',
    savedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    id: 'bm-103',
    questionId: 'cs-os-thread',
    title: 'What is the fundamental difference between a process and a thread in an operating system?',
    difficulty: 'Medium',
    company: 'Microsoft',
    companyId: 'microsoft',
    year: '2024',
    topic: 'Operating Systems',
    subtopic: 'Process Management',
    topicId: 'os',
    category: 'CS Subjects',
    categoryId: 'cs-subjects',
    practiceType: 'Flashcard Revision',
    route: '/practice/flashcards',
    savedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    id: 'bm-104',
    questionId: 'diff-teammate',
    title: 'Tell me about a time when you had to work with a difficult team member.',
    difficulty: 'Behavioral',
    company: 'Amazon',
    companyId: 'amazon',
    year: '2024',
    topic: 'Teamwork',
    subtopic: 'Amazon & Tech Pattern',
    topicId: 'teamwork',
    category: 'HR Interview',
    categoryId: 'hr-interview',
    practiceType: 'STAR Practice',
    route: '/interview/hr/teamwork/diff-teammate',
    savedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    id: 'bm-105',
    questionId: 'proj-architecture',
    title: 'Explain the architecture of your final-year project and the main technologies you used.',
    difficulty: 'Hard',
    company: 'Google',
    companyId: 'google',
    year: '2024',
    topic: 'Projects',
    subtopic: 'Architecture & Design',
    topicId: 'projects',
    category: 'Technical Interview',
    categoryId: 'technical-interview',
    practiceType: 'Freeform Practice',
    route: '/interview/technical/projects/proj-architecture',
    savedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
  },
];

/**
 * Format relative time (e.g., "Saved 2 days ago")
 */
export function formatSavedTime(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null;

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays <= 0) {
    if (diffHours < 1) return 'Saved just now';
    return `Saved ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  if (diffDays === 1) return 'Saved yesterday';
  if (diffDays < 7) return `Saved ${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (weeks < 4) return `Saved ${weeks} week${weeks === 1 ? '' : 's'} ago`;
  const months = Math.floor(diffDays / 30);
  return `Saved ${months} month${months === 1 ? '' : 's'} ago`;
}

function getStorageKey(userId) {
  if (userId) {
    return `placepro_bookmarks_${userId}`;
  }
  return LEGACY_STORAGE_KEY;
}

export const bookmarkService = {
  /**
   * Resolves complete metadata for any questionId across all known catalogs.
   */
  resolveQuestionMetadata(questionId, customMeta = {}) {
    // 1. Check seed definitions
    const seed = SEED_BOOKMARKED_QUESTIONS.find(
      (s) => s.questionId === questionId || s.id === questionId
    );
    if (seed) {
      return { ...seed, ...customMeta };
    }

    // 2. Check Mock Coding / MCQ / CS Questions
    const mockQ = mockQuestions.find((q) => q.id === questionId);
    if (mockQ) {
      const isCoding = mockQ.category_id === 'coding';
      const isCs = mockQ.category_id === 'cs-subjects';
      const isApt = mockQ.category_id === 'aptitude';

      let practiceType = 'MCQ Practice';
      let route = '/practice/aptitude';
      let category = 'Aptitude';

      if (isCoding) {
        practiceType = 'Coding Practice';
        route = `/practice/coding?q=${questionId}`;
        category = 'Coding';
      } else if (isCs) {
        practiceType = 'MCQ Practice';
        route = `/practice/cs-subjects?q=${questionId}`;
        category = 'CS Subjects';
      } else if (isApt) {
        route = `/practice/aptitude?q=${questionId}`;
      }

      return {
        id: `bm-${questionId}`,
        questionId: mockQ.id,
        title: mockQ.title || mockQ.question_text?.split('\n')[0] || `Question #${questionId}`,
        difficulty: mockQ.difficulty || 'Medium',
        company: mockQ.company_name || customMeta.company || 'Campus Recruiter',
        companyId: mockQ.company_name?.toLowerCase(),
        year: mockQ.year_asked || 2024,
        topic: mockQ.topic || mockQ.topic_id || 'Practice',
        subtopic: mockQ.subtopic || null,
        category: customMeta.category || category,
        practiceType,
        route,
        savedAt: customMeta.savedAt || new Date().toISOString(),
        ...customMeta,
      };
    }

    // 3. Check HR Behavioral Questions
    const hrQ = HR_QUESTIONS.find((q) => q.id === questionId);
    if (hrQ) {
      return {
        id: `bm-${questionId}`,
        questionId: hrQ.id,
        title: hrQ.title || hrQ.statement || `HR Question: ${hrQ.id}`,
        difficulty: hrQ.type || hrQ.difficulty || 'Behavioral',
        company: customMeta.company || (hrQ.companyIds?.[0] ? hrQ.companyIds[0].toUpperCase() : 'Amazon'),
        companyId: hrQ.companyIds?.[0] || 'amazon',
        year: customMeta.year || 2024,
        topic: hrQ.topicName || 'HR Interview',
        subtopic: hrQ.pattern || 'STAR Pattern',
        category: 'HR Interview',
        practiceType: 'STAR Practice',
        route: `/interview/hr/${hrQ.topicId || 'teamwork'}/${hrQ.id}`,
        savedAt: customMeta.savedAt || new Date().toISOString(),
        ...customMeta,
      };
    }

    // 4. Check Technical Interview Questions
    const techQ = TECHNICAL_QUESTIONS.find((q) => q.id === questionId);
    if (techQ) {
      return {
        id: `bm-${questionId}`,
        questionId: techQ.id,
        title: techQ.title || techQ.statement || `Technical Question: ${techQ.id}`,
        difficulty: techQ.difficulty || 'Medium',
        company: customMeta.company || (techQ.companyIds?.[0] ? techQ.companyIds[0].toUpperCase() : 'Google'),
        companyId: techQ.companyIds?.[0] || 'google',
        year: customMeta.year || 2024,
        topic: techQ.topicName || 'Technical Interview',
        subtopic: techQ.subtopic || 'Architecture & Design',
        category: 'Technical Interview',
        practiceType: 'Freeform Practice',
        route: `/interview/technical/${techQ.topicId || 'projects'}/${techQ.id}`,
        savedAt: customMeta.savedAt || new Date().toISOString(),
        ...customMeta,
      };
    }

    // 5. Check Flashcards
    const flashcard = mockFlashcards.find((fc) => fc.id === questionId);
    if (flashcard) {
      return {
        id: `bm-${questionId}`,
        questionId: flashcard.id,
        title: flashcard.front || `Flashcard: ${flashcard.id}`,
        difficulty: flashcard.difficulty || 'Medium',
        company: customMeta.company || 'Tech Industry',
        companyId: 'tech',
        year: 2024,
        topic: flashcard.topic || 'CS Subjects',
        subtopic: 'Flashcard Revision',
        category: 'CS Subjects',
        practiceType: 'Flashcard Revision',
        route: '/practice/flashcards',
        savedAt: customMeta.savedAt || new Date().toISOString(),
        ...customMeta,
      };
    }

    // 6. Fallback generic question record
    return {
      id: `bm-${questionId}`,
      questionId,
      title: customMeta.title || customMeta.question_text || `Placement Practice Question #${questionId}`,
      difficulty: customMeta.difficulty || 'Medium',
      company: customMeta.company || customMeta.company_name || 'Campus Recruiter',
      companyId: customMeta.companyId || null,
      year: customMeta.year || customMeta.year_asked || 2024,
      topic: customMeta.topic || customMeta.topic_name || 'General Practice',
      subtopic: customMeta.subtopic || null,
      category: customMeta.category || 'Practice',
      practiceType: customMeta.practiceType || 'Practice Revision',
      route: customMeta.route || '/practice/aptitude',
      savedAt: customMeta.savedAt || new Date().toISOString(),
      ...customMeta,
    };
  },

  /**
   * Retrieves all bookmarked items for the given user (or active session).
   */
  getBookmarks(user = null) {
    const userId = user?.id || user?.email;
    const key = getStorageKey(userId);

    let raw = localStorage.getItem(key);

    // If key has never been initialized, seed with the 5 canonical reference items
    if (raw === null) {
      const isSeeded = localStorage.getItem(SEED_FLAG_KEY);
      if (!isSeeded) {
        const initial = SEED_BOOKMARKED_QUESTIONS;
        localStorage.setItem(key, JSON.stringify(initial));
        localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(initial.map((q) => q.questionId)));
        localStorage.setItem(SEED_FLAG_KEY, 'true');
        return initial;
      }
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      // If array of strings (legacy IDs), resolve them to full objects
      const resolved = parsed.map((item) => {
        if (typeof item === 'string') {
          return bookmarkService.resolveQuestionMetadata(item);
        }
        if (item && typeof item === 'object') {
          const qId = item.questionId || item.id;
          return bookmarkService.resolveQuestionMetadata(qId, item);
        }
        return null;
      }).filter(Boolean);

      return resolved;
    } catch {
      return [];
    }
  },

  /**
   * Returns an array of question ID strings for fast membership checks.
   */
  getBookmarkIds(user = null) {
    const list = bookmarkService.getBookmarks(user);
    return list.map((b) => b.questionId || b.id);
  },

  /**
   * Checks if a question ID is currently bookmarked.
   */
  isBookmarked(questionId, user = null) {
    if (!questionId) return false;
    const ids = bookmarkService.getBookmarkIds(user);
    return ids.includes(questionId) || ids.includes(`bm-${questionId}`);
  },

  /**
   * Adds a bookmark.
   */
  addBookmark(questionId, customMeta = {}, user = null) {
    if (!questionId) return bookmarkService.getBookmarks(user);

    const userId = user?.id || user?.email;
    const key = getStorageKey(userId);
    const current = bookmarkService.getBookmarks(user);

    // Prevent duplicates
    const alreadyExists = current.some(
      (b) => b.questionId === questionId || b.id === questionId
    );
    if (alreadyExists) return current;

    const newItem = bookmarkService.resolveQuestionMetadata(questionId, {
      ...customMeta,
      savedAt: new Date().toISOString(),
    });

    const updated = [newItem, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated.map((q) => q.questionId || q.id)));

    window.dispatchEvent(
      new CustomEvent('placepro_bookmark_changed', {
        detail: { questionId, isBookmarked: true, bookmark: newItem },
      })
    );

    return updated;
  },

  /**
   * Removes a bookmark by question ID or bookmark ID.
   */
  removeBookmark(idOrQuestionId, user = null) {
    if (!idOrQuestionId) return bookmarkService.getBookmarks(user);

    const userId = user?.id || user?.email;
    const key = getStorageKey(userId);
    const current = bookmarkService.getBookmarks(user);

    const updated = current.filter(
      (b) => b.questionId !== idOrQuestionId && b.id !== idOrQuestionId
    );

    localStorage.setItem(key, JSON.stringify(updated));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated.map((q) => q.questionId || q.id)));

    window.dispatchEvent(
      new CustomEvent('placepro_bookmark_changed', {
        detail: { questionId: idOrQuestionId, isBookmarked: false },
      })
    );

    return updated;
  },

  /**
   * Toggles bookmark state for a question.
   */
  toggleBookmark(questionId, customMeta = {}, user = null) {
    if (bookmarkService.isBookmarked(questionId, user)) {
      return bookmarkService.removeBookmark(questionId, user);
    } else {
      return bookmarkService.addBookmark(questionId, customMeta, user);
    }
  },
};
