import { UserService } from '../data/UserService';
import { mockCompanies } from './mockApiService';

/**
 * Technical Interview Service
 * 
 * Manages Technical Interview competency topics, technical questions,
 * freeform responses with confidence ratings, and persistence.
 */

export const TECHNICAL_TOPICS = [
  {
    id: 'projects',
    name: 'Projects and Technology Stack',
    shortName: 'Projects',
    description: 'Architecture diagrams, technology trade-offs, engineering decisions, and final-year capstone deep dives.',
    icon: 'cpu',
  },
  {
    id: 'oops',
    name: 'Object-Oriented Programming',
    shortName: 'OOPs',
    description: 'Core principles: Encapsulation, Abstraction, Inheritance, Polymorphism, SOLID principles, and design patterns.',
    icon: 'layers',
  },
  {
    id: 'dsa',
    name: 'Data Structures and Algorithms',
    shortName: 'DSA',
    description: 'Time/space complexity analysis, tree/graph traversal trade-offs, and algorithm selection rationale.',
    icon: 'git-branch',
  },
  {
    id: 'dbms-sql',
    name: 'DBMS and SQL',
    shortName: 'DBMS & SQL',
    description: 'ACID properties, database transactions, normalization, B-Tree indexing, and query optimization.',
    icon: 'database',
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    shortName: 'Operating Systems',
    description: 'Processes, threads, synchronization primitives, deadlocks, virtual memory, and page replacement.',
    icon: 'terminal',
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    shortName: 'Computer Networks',
    description: 'TCP/IP stack, HTTP/HTTPS handshakes, DNS resolution lifecycle, socket connections, and routing.',
    icon: 'network',
  },
  {
    id: 'system-design',
    name: 'System Design and Scalability',
    shortName: 'System Design',
    description: 'High-level architectures, load balancing, Redis caching strategies, rate limiting, and CAP theorem.',
    icon: 'server',
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing and DevOps',
    shortName: 'Cloud & DevOps',
    description: 'Containers, Docker vs VMs, CI/CD automated deployment pipelines, microservices, and serverless.',
    icon: 'cloud',
  },
  {
    id: 'programming-fundamentals',
    name: 'Programming Fundamentals',
    shortName: 'Fundamentals',
    description: 'Stack vs heap memory allocation, variable scope, garbage collection, and compilation lifecycles.',
    icon: 'code-2',
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering & Testing',
    shortName: 'Software Eng',
    description: 'Code review hygiene, Git branching models, Unit vs Integration testing, and Agile workflows.',
    icon: 'check-square',
  },
];

export const TECHNICAL_QUESTIONS = [
  // 1. Projects and Technology Stack (Matches Stitch Prompt Reference)
  {
    id: 'proj-architecture',
    topicId: 'projects',
    topicName: 'Projects',
    title: 'Architecture & Tech Stack of Final Year Project',
    statement: 'Explain the architecture of your final-year project and the main technologies you used.',
    category: 'Technical Interview',
    subtopic: 'Architecture & Design',
    pattern: 'System & Tech Stack',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    guidance: 'Explain your answer in your own words. Include relevant technical details, decisions, examples, or trade-offs where useful.',
    sampleGuidance: 'High-level diagram: Client (React SPA) communicating via REST/GraphQL with a Node.js/Go backend, authenticated through JWT, persisting to PostgreSQL with Redis for caching hot endpoints. Highlight why this stack was chosen over alternatives.',
  },
  {
    id: 'proj-complex-bug',
    topicId: 'projects',
    topicName: 'Projects',
    title: 'Toughest Technical Bug & Root Cause Analysis',
    statement: 'Describe the most complex technical bug or bottleneck you encountered during your project and the systematic approach you used to resolve it.',
    category: 'Technical Interview',
    subtopic: 'Debugging & Performance',
    pattern: 'Root Cause Analysis',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho'],
    guidance: 'Detail the symptoms, diagnostic tools (profilers, logs, network traces), hypothesis testing, and the permanent mitigation applied.',
  },
  {
    id: 'proj-db-tradeoffs',
    topicId: 'projects',
    topicName: 'Projects',
    title: 'Database Choice and Data Modeling Trade-offs',
    statement: 'Why did you choose SQL vs NoSQL for your project data storage? What indexing or schema optimization decisions did you make?',
    category: 'Technical Interview',
    subtopic: 'Database & Storage',
    pattern: 'Architectural Decisions',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho'],
    guidance: 'Discuss schema rigidity vs flexibility, relational integrity (foreign keys), read vs write throughput requirements, and indexing strategies.',
  },

  // 2. Object-Oriented Programming
  {
    id: 'oops-four-pillars',
    topicId: 'oops',
    topicName: 'Object-Oriented Programming',
    title: 'The 4 Pillars of OOPs with Real-World Examples',
    statement: 'Explain the 4 pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism) with real-world software examples.',
    category: 'Technical Interview',
    subtopic: 'Core OOP Principles',
    pattern: 'Core Concept',
    difficulty: 'Easy',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    guidance: 'Provide clear distinctions, such as how Abstraction hides complexity while Encapsulation binds data and methods with access modifiers.',
  },
  {
    id: 'oops-overload-override',
    topicId: 'oops',
    topicName: 'Object-Oriented Programming',
    title: 'Method Overloading vs Method Overriding',
    statement: 'What is the exact difference between Method Overloading (compile-time) and Method Overriding (runtime)? How does the JVM or runtime resolve them?',
    category: 'Technical Interview',
    subtopic: 'Polymorphism & JVM',
    pattern: 'Execution Model',
    difficulty: 'Medium',
    companyIds: ['tcs', 'accenture'],
    guidance: 'Discuss method signatures, dynamic dispatch / vtable lookups, and the use of the @Override annotation.',
  },

  // 3. Data Structures and Algorithms
  {
    id: 'dsa-hash-vs-bst',
    topicId: 'dsa',
    topicName: 'Data Structures and Algorithms',
    title: 'Hash Table vs Balanced BST Trade-offs',
    statement: 'When would you prefer a Hash Table over a Balanced Binary Search Tree (like a Red-Black Tree)? What are the respective time and space complexities?',
    category: 'Technical Interview',
    subtopic: 'Data Structure Selection',
    pattern: 'Algorithmic Trade-offs',
    difficulty: 'Medium',
    companyIds: ['amazon', 'zoho'],
    guidance: 'Compare average vs worst case lookups, ordered traversals, range queries (e.g. prefix searches), and memory overhead.',
  },
  {
    id: 'dsa-quicksort-analysis',
    topicId: 'dsa',
    topicName: 'Data Structures and Algorithms',
    title: 'QuickSort Mechanics and Worst-Case Prevention',
    statement: 'Explain how QuickSort works, under what circumstances it degrades to O(n²), and how Randomized Pivot Selection or Median-of-Three prevents this.',
    category: 'Technical Interview',
    subtopic: 'Sorting & Complexity',
    pattern: 'Algorithm Analysis',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs'],
    guidance: 'Detail partitioning algorithms (Lomuto vs Hoare), recursion stack depth, and in-place space requirements.',
  },

  // 4. DBMS and SQL
  {
    id: 'dbms-acid-properties',
    topicId: 'dbms-sql',
    topicName: 'DBMS and SQL',
    title: 'ACID Properties and Isolation Levels',
    statement: 'Explain the ACID properties of database transactions. How do SQL Isolation Levels prevent dirty reads, non-repeatable reads, and phantom reads?',
    category: 'Technical Interview',
    subtopic: 'Transactions & Concurrency',
    pattern: 'Database Reliability',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho'],
    guidance: 'Define Read Uncommitted, Read Committed, Repeatable Read, and Serializable with concrete table locking / MVCC examples.',
  },
  {
    id: 'dbms-btree-indexing',
    topicId: 'dbms-sql',
    topicName: 'DBMS and SQL',
    title: 'B-Tree Indexing and Query Performance',
    statement: 'How does a B-Tree / B+Tree index speed up SELECT queries? What is the computational and I/O cost during INSERT, UPDATE, and DELETE operations?',
    category: 'Technical Interview',
    subtopic: 'Indexing & Disk I/O',
    pattern: 'Query Optimization',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho'],
    guidance: 'Explain logarithmic search depth, sequential disk reads of leaf nodes in B+Trees, page splits, and when NOT to create an index.',
  },

  // 5. Operating Systems
  {
    id: 'os-process-vs-thread',
    topicId: 'operating-systems',
    topicName: 'Operating Systems',
    title: 'Process vs Thread and Context Switching',
    statement: 'What is the fundamental difference between a Process and a Thread? How does Context Switching differ between process switching and thread switching?',
    category: 'Technical Interview',
    subtopic: 'Concurrency & OS Architecture',
    pattern: 'Core OS Mechanics',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    guidance: 'Cover memory address spaces, PCB vs TCB, TLB cache invalidation during process switches, and thread synchronization overhead.',
  },
  {
    id: 'os-deadlock-conditions',
    topicId: 'operating-systems',
    topicName: 'Operating Systems',
    title: 'The 4 Coffman Conditions for Deadlock',
    statement: 'Explain the four Coffman conditions necessary for a Deadlock to occur. How can a system architect break one of these conditions to prevent deadlocks?',
    category: 'Technical Interview',
    subtopic: 'Resource Allocation',
    pattern: 'Deadlock Prevention',
    difficulty: 'Medium',
    companyIds: ['tcs', 'accenture'],
    guidance: 'Detail Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait, explaining resource ordering techniques.',
  },

  // 6. Computer Networks
  {
    id: 'net-url-to-page',
    topicId: 'computer-networks',
    topicName: 'Computer Networks',
    title: 'The Complete Lifecycle: From URL Entry to Page Render',
    statement: 'What happens under the hood from the moment a user enters a URL into their browser until the web page is fully rendered on screen?',
    category: 'Technical Interview',
    subtopic: 'Full-Stack Networking',
    pattern: 'End-to-End Networking',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho', 'accenture'],
    guidance: 'Trace DNS resolution (browser, OS cache, resolver, root, TLD), TCP 3-way handshake, TLS 1.3 negotiation, HTTP GET, DOM/CSSOM parsing, and painting.',
  },
  {
    id: 'net-tcp-vs-udp',
    topicId: 'computer-networks',
    topicName: 'Computer Networks',
    title: 'TCP vs UDP and the 3-Way Handshake',
    statement: 'Explain the fundamental differences between TCP and UDP. Describe the sequence of SYN, SYN-ACK, and ACK packets during a TCP connection establishment.',
    category: 'Technical Interview',
    subtopic: 'Transport Layer Protocols',
    pattern: 'Protocol Fundamentals',
    difficulty: 'Easy',
    companyIds: ['tcs', 'accenture'],
    guidance: 'Discuss reliability, ordering, flow control (sliding window), congestion control, and use cases like video streaming vs file transfer.',
  },

  // 7. System Design and Scalability
  {
    id: 'sd-url-shortener',
    topicId: 'system-design',
    topicName: 'System Design and Scalability',
    title: 'Design a Scalable URL Shortener (Bitly)',
    statement: 'How would you design a scalable URL shortener service like Bitly? Discuss URL encoding (Base62), collision resolution, and caching popular redirects.',
    category: 'Technical Interview',
    subtopic: 'System Architecture',
    pattern: 'High-Level System Design',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho'],
    guidance: 'Calculate QPS, storage requirements over 5 years, counter-based vs MD5 hash encoding, and read-through caching using Redis.',
  },

  // 8. Cloud Computing and DevOps
  {
    id: 'cloud-docker-vs-vm',
    topicId: 'cloud-computing',
    topicName: 'Cloud Computing and DevOps',
    title: 'Docker Containers vs Virtual Machines',
    statement: 'What is the architectural difference between a Docker container and a traditional Virtual Machine? How do Linux Namespaces and cgroups enable containerization?',
    category: 'Technical Interview',
    subtopic: 'Virtualization & Cloud',
    pattern: 'Cloud Infrastructure',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'accenture'],
    guidance: 'Contrast Guest OS overhead on Hypervisors (Type 1/2) with shared Host OS kernel isolation via namespaces (PID, net, mnt) and cgroup resource limits.',
  },

  // 9. Programming Fundamentals
  {
    id: 'fund-stack-vs-heap',
    topicId: 'programming-fundamentals',
    topicName: 'Programming Fundamentals',
    title: 'Stack vs Heap Memory Allocation',
    statement: 'Explain the difference between Stack and Heap memory. How do variable lifecycles work, and what causes a Stack Overflow vs a Memory Leak?',
    category: 'Technical Interview',
    subtopic: 'Memory Management',
    pattern: 'Core Systems Knowledge',
    difficulty: 'Easy',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    guidance: 'Contrast fast static LIFO memory with dynamic heap allocation, fragmentation, and pointer references remaining without garbage collection.',
  },

  // 10. Software Engineering & Testing
  {
    id: 'se-testing-pyramid',
    topicId: 'software-engineering',
    topicName: 'Software Engineering & Testing',
    title: 'The Testing Pyramid: Unit, Integration, and E2E',
    statement: 'Explain the Testing Pyramid. What are the differences in scope, speed, and cost between Unit Tests, Integration Tests, and End-to-End (E2E) Tests?',
    category: 'Technical Interview',
    subtopic: 'Quality Assurance & CI',
    pattern: 'Software Best Practices',
    difficulty: 'Easy',
    companyIds: ['tcs', 'accenture'],
    guidance: 'Discuss test isolation with mocks/stubs, API integration tests with test containers, and browser-driven E2E tests in a CI/CD pipeline.',
  },
];

const TECHNICAL_RESPONSES_KEY = 'placepro_technical_responses';

function getStoredTechnicalResponses() {
  try {
    const raw = localStorage.getItem(TECHNICAL_RESPONSES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const technicalInterviewService = {
  /**
   * Retrieves all Technical topics with dynamic question counts
   */
  getTechnicalTopics: async ({ companyId } = {}) => {
    await new Promise((r) => setTimeout(r, 60));

    return TECHNICAL_TOPICS.map((topic) => {
      const questionsInTopic = TECHNICAL_QUESTIONS.filter((q) => {
        if (q.topicId !== topic.id) return false;
        if (companyId) {
          return q.companyIds && q.companyIds.includes(companyId.toLowerCase());
        }
        return true;
      });

      return {
        ...topic,
        questionCount: questionsInTopic.length,
      };
    });
  },

  /**
   * Get topic by ID
   */
  getTopicById: (topicId) => {
    return TECHNICAL_TOPICS.find((t) => t.id === topicId) || null;
  },

  /**
   * Get questions under a topic, optionally filtered by companyId
   */
  getTechnicalQuestions: async ({ topicId, companyId } = {}) => {
    await new Promise((r) => setTimeout(r, 60));

    return TECHNICAL_QUESTIONS.filter((q) => {
      if (topicId && q.topicId !== topicId) return false;
      if (companyId) {
        return q.companyIds && q.companyIds.includes(companyId.toLowerCase());
      }
      return true;
    });
  },

  /**
   * Get question detail by ID
   */
  getTechnicalQuestionById: async (questionId) => {
    await new Promise((r) => setTimeout(r, 60));
    return TECHNICAL_QUESTIONS.find((q) => q.id === questionId) || null;
  },

  /**
   * Save user's Technical freeform response and confidence selection
   */
  saveTechnicalResponse: async ({ questionId, response, confidence, companyId }) => {
    await new Promise((r) => setTimeout(r, 150));
    const all = getStoredTechnicalResponses();
    all[questionId] = {
      questionId,
      companyId: companyId || null,
      response: response || '',
      confidence: confidence || 'confident', // 'confident' | 'need_review'
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(TECHNICAL_RESPONSES_KEY, JSON.stringify(all));

    // Also mark as solved/prepared in UserService
    UserService.toggleSolved(questionId);

    return { success: true, savedAt: all[questionId].savedAt };
  },

  /**
   * Get previously saved technical response for a question
   */
  getSavedTechnicalResponse: (questionId) => {
    const all = getStoredTechnicalResponses();
    return all[questionId] || null;
  },

  /**
   * Bookmark integration
   */
  isQuestionBookmarked: (questionId) => {
    return UserService.isBookmarked(questionId);
  },

  toggleQuestionBookmark: (questionId) => {
    return UserService.toggleBookmark(questionId);
  },

  /**
   * Prepared / Solved status
   */
  isQuestionPrepared: (questionId) => {
    return UserService.isSolved(questionId);
  },

  toggleQuestionPrepared: (questionId) => {
    return UserService.toggleSolved(questionId);
  },

  /**
   * Helper to find company object
   */
  getCompanyMeta: (companyId) => {
    if (!companyId) return null;
    return mockCompanies.find((c) => c.id.toLowerCase() === companyId.toLowerCase()) || {
      id: companyId,
      name: companyId.toUpperCase(),
      logo: null,
    };
  },
};
