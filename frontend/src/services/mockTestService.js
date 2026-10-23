/**
 * Mock Test Persistence Service Layer
 * 
 * Provides session restoration, timer preservation, and progress saving
 * in development mode so refreshing the browser never resets the timer
 * or erases answered/flagged questions.
 * 
 * Ready to be swapped with backend session endpoints:
 *   - POST /api/tests/start
 *   - PUT  /api/tests/:sessionId/progress
 *   - POST /api/tests/:sessionId/submit
 *   - GET  /api/tests/:sessionId/results
 */

const SESSION_KEY = 'placepro_mock_test_session';
const RESULTS_KEY = 'placepro_mock_test_results';

const defaultTestQuestions = [
  {
    id: 't-1',
    category: 'Aptitude',
    question: 'What is the unit digit of (7^95 - 3^58)?',
    options: ['0', '4', '6', '7'],
    correctOption: 1,
    explanation: 'Cyclicity of 7 is 4: 95 % 4 = 3, so unit digit is 3. Cyclicity of 3 is 4: 58 % 4 = 2, so unit digit is 9. (13 - 9) = 4.',
  },
  {
    id: 't-2',
    category: 'Aptitude',
    question: 'If petrol price rises by 25%, by what percentage must consumption be reduced to keep expenditure constant?',
    options: ['15%', '20%', '25%', '33.33%'],
    correctOption: 1,
    explanation: 'Formula: [r / (100 + r)] * 100 = [25 / 125] * 100 = 20%.',
  },
  {
    id: 't-3',
    category: 'CS Subjects',
    question: 'Which of the following conditions is NOT a prerequisite for deadlock to occur?',
    options: ['Mutual Exclusion', 'Preemption', 'Hold and Wait', 'Circular Wait'],
    correctOption: 1,
    explanation: 'The 4 Coffman conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlock cannot occur.',
  },
  {
    id: 't-4',
    category: 'CS Subjects',
    question: 'In relational databases, which normal form removes multi-valued dependencies?',
    options: ['1NF', '2NF', '3NF', '4NF'],
    correctOption: 3,
    explanation: '4NF (Fourth Normal Form) eliminates non-trivial multi-valued dependencies.',
  },
  {
    id: 't-5',
    category: 'Coding Fundamentals',
    question: "What is the worst-case time complexity of searching an element in a Red-Black Tree with N nodes?",
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctOption: 1,
    explanation: 'A Red-Black tree is height-balanced with height at most 2*log2(N+1). Worst-case search is O(log N).',
  },
  {
    id: 't-6',
    category: 'Aptitude',
    question: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take?',
    options: ['10 mins', '12 mins', '15 mins', '25 mins'],
    correctOption: 1,
    explanation: 'Part filled in 1 min = (1/20 + 1/30) = 5/60 = 1/12. Time taken = 12 minutes.',
  },
  {
    id: 't-7',
    category: 'CS Subjects',
    question: 'In TCP/IP, which protocol operates at the Transport Layer and provides connectionless, best-effort delivery?',
    options: ['TCP', 'UDP', 'IP', 'ICMP'],
    correctOption: 1,
    explanation: 'UDP (User Datagram Protocol) provides connectionless, lightweight, best-effort packet delivery without acknowledgments.',
  },
  {
    id: 't-8',
    category: 'Coding Fundamentals',
    question: 'Which algorithmic paradigm does Kadane’s algorithm for Maximum Subarray Sum employ?',
    options: ['Greedy / Dynamic Programming', 'Divide and Conquer', 'Backtracking', 'Branch and Bound'],
    correctOption: 0,
    explanation: 'Kadane algorithm utilizes 1D Dynamic Programming (local maximum state tracking) in O(N) time and O(1) space.',
  },
];

export const mockTestService = {
  /**
   * Starts a new mock test session or replaces existing one
   */
  startTest: ({ title = 'Full-Length Campus Placement Mock Test', durationMinutes = 15, category = 'All Topics' } = {}) => {
    const startTime = Date.now();
    const durationSeconds = durationMinutes * 60;
    const endTime = startTime + durationSeconds * 1000;

    const session = {
      testId: `test-${Date.now()}`,
      title,
      category,
      durationMinutes,
      startTime,
      endTime,
      questions: defaultTestQuestions,
      answers: {}, // { [questionId]: selectedOptionIndex }
      flagged: [], // [questionId]
      currentIndex: 0,
      status: 'in_progress',
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Restores existing active test session, recalculating timer accurately across refreshes
   */
  getActiveSession: () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;

      const session = JSON.parse(raw);
      if (session.status !== 'in_progress') return null;

      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((session.endTime - now) / 1000));

      if (remainingSeconds <= 0) {
        // Time expired, auto-submit
        return mockTestService.submitTest();
      }

      return {
        ...session,
        remainingSeconds,
      };
    } catch (err) {
      console.error('Failed to restore test session:', err);
      return null;
    }
  },

  /**
   * Saves user answer for a question
   */
  saveAnswer: (questionId, optionIndex, nextIndex = null) => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);

      session.answers[questionId] = optionIndex;
      if (nextIndex !== null && nextIndex >= 0) {
        session.currentIndex = nextIndex;
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    } catch (err) {
      console.error('Failed to save test answer:', err);
      return null;
    }
  },

  /**
   * Toggles review flag on a question
   */
  toggleFlag: (questionId) => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);

      const exists = session.flagged.includes(questionId);
      if (exists) {
        session.flagged = session.flagged.filter((id) => id !== questionId);
      } else {
        session.flagged.push(questionId);
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    } catch (err) {
      console.error('Failed to toggle question flag:', err);
      return null;
    }
  },

  /**
   * Sets current active question index
   */
  setCurrentIndex: (index) => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const session = JSON.parse(raw);
      session.currentIndex = index;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (err) {
      console.error('Failed to update question index:', err);
    }
  },

  /**
   * Submits active test and computes score summary
   */
  submitTest: () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return mockTestService.getLatestResults();

      const session = JSON.parse(raw);
      const questions = session.questions || defaultTestQuestions;
      const answers = session.answers || {};

      let correctCount = 0;
      let incorrectCount = 0;
      let unattemptedCount = 0;

      const reviewList = questions.map((q) => {
        const userAnswer = answers[q.id];
        const isAttempted = userAnswer !== undefined && userAnswer !== null;
        const isCorrect = isAttempted && userAnswer === q.correctOption;

        if (!isAttempted) {
          unattemptedCount += 1;
        } else if (isCorrect) {
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }

        return {
          ...q,
          userAnswer: isAttempted ? userAnswer : null,
          isCorrect,
          isAttempted,
        };
      });

      const totalQuestions = questions.length;
      const score = correctCount; // 1 mark per correct answer
      const accuracy =
        correctCount + incorrectCount > 0
          ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
          : 0;

      const timeSpentSeconds = Math.floor((Date.now() - session.startTime) / 1000);
      const minutesTaken = Math.floor(timeSpentSeconds / 60);
      const secondsTaken = timeSpentSeconds % 60;

      const results = {
        testId: session.testId,
        title: session.title,
        category: session.category,
        totalQuestions,
        score,
        correctCount,
        incorrectCount,
        unattemptedCount,
        accuracy,
        timeTaken: `${minutesTaken}m ${secondsTaken}s`,
        submittedAt: new Date().toISOString(),
        reviewList,
      };

      localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
      localStorage.removeItem(SESSION_KEY);

      return results;
    } catch (err) {
      console.error('Failed to submit test:', err);
      return null;
    }
  },

  /**
   * Retrieves the most recent test results
   */
  getLatestResults: () => {
    try {
      const raw = localStorage.getItem(RESULTS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Clears saved results and session
   */
  clearAll: () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(RESULTS_KEY);
  },
};

export default mockTestService;
