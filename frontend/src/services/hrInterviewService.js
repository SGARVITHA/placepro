import { UserService } from '../data/UserService';
import { mockCompanies } from './mockApiService';

/**
 * HR Interview Data & Service
 * 
 * Manages HR competency topics, behavioral questions, STAR responses,
 * model answers, and progress integration.
 */

export const HR_TOPICS = [
  {
    id: 'intro-background',
    name: 'Introduction and Background',
    shortName: 'Introduction',
    description: 'First impression, professional background, education, and summarizing your career narrative.',
    icon: 'user',
  },
  {
    id: 'strengths-weaknesses',
    name: 'Strengths and Weaknesses',
    shortName: 'Strengths',
    description: 'Self-awareness, technical competencies, areas of improvement, and overcoming setbacks.',
    icon: 'star',
  },
  {
    id: 'career-goals',
    name: 'Career Goals and Motivation',
    shortName: 'Career Goals',
    description: 'Long-term aspirations, learning velocity, and alignment with engineering roles.',
    icon: 'target',
  },
  {
    id: 'teamwork',
    name: 'Teamwork and Collaboration',
    shortName: 'Teamwork',
    description: 'Cross-functional collaboration, peer feedback, team sprint delivery, and difficult colleagues.',
    icon: 'users',
  },
  {
    id: 'conflict-resolution',
    name: 'Conflict Resolution',
    shortName: 'Conflict Resolution',
    description: 'Handling disagreements constructively, de-escalating tension, and technical compromise.',
    icon: 'shield-alert',
  },
  {
    id: 'leadership-ownership',
    name: 'Leadership and Ownership',
    shortName: 'Leadership',
    description: 'Taking initiative without being asked, mentoring teammates, and driving project completion.',
    icon: 'award',
  },
  {
    id: 'adaptability-problem-solving',
    name: 'Adaptability and Problem Solving',
    shortName: 'Adaptability',
    description: 'Navigating ambiguous requirements, pivoting on tech stacks, and quick learning.',
    icon: 'zap',
  },
  {
    id: 'time-management',
    name: 'Time Management',
    shortName: 'Time Management',
    description: 'Prioritizing deliverables, handling tight deadlines, and avoiding burnout.',
    icon: 'clock',
  },
  {
    id: 'failure-learning',
    name: 'Failure and Learning',
    shortName: 'Failure & Learning',
    description: 'Accountability for mistakes, post-mortem reflections, and resilience under pressure.',
    icon: 'rotate-ccw',
  },
  {
    id: 'company-role-motivation',
    name: 'Company and Role Motivation',
    shortName: 'Company Motivation',
    description: 'Demonstrating genuine company research, cultural alignment, and value-add.',
    icon: 'briefcase',
  },
];

export const HR_QUESTIONS = [
  // 1. Teamwork and Collaboration
  {
    id: 'diff-teammate',
    topicId: 'teamwork',
    topicName: 'Teamwork',
    title: 'Work with a Difficult Team Member',
    statement: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation and what was the outcome?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Amazon & Top Tech Pattern',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'During our final-year capstone project, our 4-person team had difficulty meeting weekly development milestones because a core teammate was unresponsive on Slack and consistently missed code review deadlines.',
      task: 'As the project lead, my responsibility was to ensure our deliverables stayed on track for faculty sprint reviews without alienating the teammate or causing resentment within the team.',
      action: 'Rather than confronting him in the group channel, I scheduled a 1-on-1 discussion over coffee to understand if he was facing academic or personal bottlenecks. I learned he was overwhelmed by an unfamiliar tech stack (Django/PostgreSQL). I re-architected our task breakdown into bite-sized 2-day sub-tasks, paired him with another member for initial setup, and established an asynchronous daily check-in board on Trello.',
      result: 'The teammate successfully shipped his modules 2 days before the final deadline, attendance in daily syncs increased to 100%, and our project received an \'A\' grade from the departmental panel.',
    },
  },
  {
    id: 'disagree-technical-approach',
    topicId: 'teamwork',
    topicName: 'Teamwork',
    title: 'Disagreement on Engineering Approach',
    statement: 'Describe a time when you strongly disagreed with a team member on an engineering design decision. How did you resolve it?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Amazon Have Backbone & Commit',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho'],
    modelAnswer: {
      situation: 'During a 36-hour national collegiate hackathon, my teammate wanted to build custom authentication from scratch 6 hours before the submission deadline, while I strongly advocated for integrating Supabase Auth.',
      task: 'We needed a secure and production-ready login system without risking failing the final demo or missing the hard code-freeze deadline.',
      action: 'Rather than debating abstractly, I presented a concise risk-reward comparison highlighting that custom auth would require at least 4 hours with potential edge cases in token invalidation. I suggested a 30-minute time-box: we would configure Supabase first, and if any blockers arose, we would pivot.',
      result: 'Supabase was fully operational in 20 minutes, saving us 3.5 hours. We utilized the extra time to polish the AI recommendation demo, ultimately winning 2nd place among 80 teams.',
    },
  },
  {
    id: 'cross-functional-collaboration',
    topicId: 'teamwork',
    topicName: 'Teamwork',
    title: 'Cross-Functional Collaboration Under Pressure',
    statement: 'Give an example of a situation where you had to collaborate with peers from different disciplines or skill levels to deliver a critical project.',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Collaborative Execution',
    difficulty: 'Medium',
    companyIds: ['tcs', 'accenture', 'zoho'],
    modelAnswer: {
      situation: 'For our inter-departmental IoT project, computer science students were paired with mechanical engineering students to build an automated energy-monitoring device with a web dashboard.',
      task: 'I had to integrate our frontend dashboard with sensor telemetry data from microcontroller firmware written by peers with limited web protocol experience.',
      action: 'I drafted a clear OpenAPI / JSON contract document specifying exact sensor payload formats and timestamp structures. I also built a mock API simulator so their hardware testing would not block frontend development.',
      result: 'Both systems integrated seamlessly on the very first hardware hookup trial, and the prototype was featured at the college tech symposium.',
    },
  },

  // 2. Introduction and Background
  {
    id: 'tell-me-about-yourself',
    topicId: 'intro-background',
    topicName: 'Introduction and Background',
    title: 'Professional Introduction',
    statement: 'Tell me about yourself, your technical journey, and why you are interested in software engineering.',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Core HR Opener',
    difficulty: 'Easy',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'I am a final-year Computer Science student at RMK Engineering College with a strong foundation in data structures, algorithms, and full-stack web applications.',
      task: 'My objective throughout college was not just passing exams, but shipping functional software that solves real user pain points.',
      action: 'Over the past two years, I built multiple production-level projects using React, Node.js, and PostgreSQL, including an automated placement readiness portal. I actively solved over 350 algorithmic problems on LeetCode and completed an engineering internship where I reduced API response latency by 25%.',
      result: 'These hands-on experiences have made me confident in building scalable, maintainable systems, and I am excited to contribute my engineering curiosity and discipline to your team.',
    },
  },
  {
    id: 'proudest-achievement',
    topicId: 'intro-background',
    topicName: 'Introduction and Background',
    title: 'Proudest Project Achievement',
    statement: 'Walk me through a software project or academic achievement that you are most proud of.',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Impact & Craftsmanship',
    difficulty: 'Medium',
    companyIds: ['amazon', 'zoho'],
    modelAnswer: {
      situation: 'In my third year, students struggled with scattered campus placement materials, syllabus schedules, and mock tests across various WhatsApp groups.',
      task: 'I wanted to build a centralized, single-pane portal where batch mates could practice questions, track progress, and review shared interview experiences.',
      action: 'I spearheaded the development of PlacePro, designing the normalized database schema, implementing responsive interfaces, and adding isolated client-side mock evaluation modes to allow testing before backend deployments.',
      result: 'The platform was piloted across 3 departments with 400+ active student signups and received commendation from our college placement cell.',
    },
  },

  // 3. Strengths and Weaknesses
  {
    id: 'greatest-strength',
    topicId: 'strengths-weaknesses',
    topicName: 'Strengths and Weaknesses',
    title: 'Greatest Technical Strength',
    statement: 'What is your greatest technical or professional strength, and how has it helped you succeed?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Self-Awareness',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'During an intensive cloud computing elective, our team had 48 hours to diagnose an intermittent database connection pool exhaustion error under simulated peak load.',
      task: 'My responsibility was identifying the root cause without randomly modifying production configurations.',
      action: 'My greatest strength is systematic debugging and analytical perseverance. Rather than guessing, I enabled query profiling, examined thread dumps, and traced connection lifecycle handlers, isolating an unclosed connection in an error callback.',
      result: 'Fixing the connection leak stabilized system throughput at 1,500 RPS without crashing, earning our team top marks in the system performance audit.',
    },
  },
  {
    id: 'greatest-weakness',
    topicId: 'strengths-weaknesses',
    topicName: 'Strengths and Weaknesses',
    title: 'Constructive Weakness & Growth',
    statement: 'What is a genuine weakness you have identified in yourself, and what concrete steps are you taking to improve it?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Growth Mindset',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'Early in my engineering projects, I often struggled to delegate tasks, feeling that doing everything myself was faster than explaining requirements to peers.',
      task: 'As project scope expanded into multi-service architectures, this habit created personal bottlenecks and slowed down sprint velocity.',
      action: 'I recognized this limitation and enrolled in student leadership workshops. I adopted structured agile practices: writing detailed issue descriptions on GitHub, breaking work into modular subtasks, and conducting 15-minute daily syncs.',
      result: 'Delegation allowed my peers to take ownership of UI components while I focused on backend optimization, accelerating our delivery timeline by 30%.',
    },
  },

  // 4. Career Goals and Motivation
  {
    id: 'five-year-vision',
    topicId: 'career-goals',
    topicName: 'Career Goals and Motivation',
    title: 'Five-Year Career Trajectory',
    statement: 'Where do you see yourself in 3 to 5 years, and how does this entry-level engineering position align with your goals?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Long-term Vision',
    difficulty: 'Easy',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'I am starting my career with a strong foundation in core engineering principles and algorithmic problem solving.',
      task: 'In the next 3 to 5 years, my goal is to evolve from an executing software engineer into a reliable technical owner who designs resilient distributed systems.',
      action: 'I plan to spend my first 18 months mastering your codebase, coding standards, CI/CD pipelines, and internal architecture. Simultaneously, I intend to learn from senior engineers and earn domain certifications in cloud infrastructure.',
      result: 'By year 4 or 5, I envision myself architecting end-to-end features, mentoring new graduate hires, and driving system reliability initiatives.',
    },
  },

  // 5. Conflict Resolution
  {
    id: 'peer-conflict-resolution',
    topicId: 'conflict-resolution',
    topicName: 'Conflict Resolution',
    title: 'Resolving Interpersonal Conflict',
    statement: 'Describe a situation where a disagreement or interpersonal tension arose during a group project. How did you handle it?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Emotional Intelligence',
    difficulty: 'Hard',
    companyIds: ['amazon', 'tcs', 'accenture'],
    modelAnswer: {
      situation: 'Two teammates clashed over who should present our project demo to college evaluators, leading to hostile comments in our group chat.',
      task: 'As team member, I wanted to de-escalate the tension before it impacted our project grading.',
      action: 'I initiated a private conversation with each member to hear their perspectives. I proposed splitting the presentation into two equal sections: architecture/backend for one member and product demo/live Q&A for the other.',
      result: 'Both teammates felt respected and valued. The presentation proceeded smoothly, and we scored top marks in the departmental review.',
    },
  },

  // 6. Leadership and Ownership
  {
    id: 'unassigned-initiative',
    topicId: 'leadership-ownership',
    topicName: 'Leadership and Ownership',
    title: 'Taking Initiative Without Being Asked',
    statement: 'Tell me about a time when you saw an opportunity or unaddressed problem and took initiative to fix it without being told.',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Ownership Principle',
    difficulty: 'Medium',
    companyIds: ['amazon', 'zoho'],
    modelAnswer: {
      situation: 'During our college database lab, students spent up to 20 minutes each session repeatedly configuring local MySQL instances that frequently crashed.',
      task: 'Although not part of the course curriculum, I wanted to eliminate this wasted lab time.',
      action: 'Over the weekend, I created a Docker Compose file with pre-seeded database schemas and test tables, along with a 1-page setup cheat sheet.',
      result: 'The lab instructor adopted the Docker configuration across the entire batch, reducing setup time from 20 minutes to under 60 seconds.',
    },
  },

  // 7. Adaptability and Problem Solving
  {
    id: 'unfamiliar-tech-stack',
    topicId: 'adaptability-problem-solving',
    topicName: 'Adaptability and Problem Solving',
    title: 'Learning an Unfamiliar Technology Under Deadline',
    statement: 'Give an example of a time when you had to rapidly learn an unfamiliar language, tool, or framework to meet an urgent deliverable.',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Rapid Learning',
    difficulty: 'Medium',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'For our smart campus contest, our team was required to deploy our microservices onto AWS ECS with Terraform, a tool none of us had used.',
      task: 'We had exactly 5 days before the live evaluation to package our container images and automate the infrastructure provisioning.',
      action: 'I dedicated the first 24 hours to reviewing official documentation and sample repositories. I wrote small, modular Terraform files step-by-step for VPC, security groups, and ECS task definitions, testing each module iteratively.',
      result: 'We successfully automated the entire cloud deployment on day 4, allowing 24 hours of buffer for load testing and demo preparation.',
    },
  },

  // 8. Time Management
  {
    id: 'juggling-priorities',
    topicId: 'time-management',
    topicName: 'Time Management',
    title: 'Juggling Competing Academic and Coding Deadlines',
    statement: 'How do you prioritize your time when facing semester exams, project submissions, and placement preparation simultaneously?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Execution & Discipline',
    difficulty: 'Easy',
    companyIds: ['tcs', 'accenture'],
    modelAnswer: {
      situation: 'During semester 7, campus recruitment drives coincided with mid-term examinations and capstone sprint deliverables.',
      task: 'I had to maintain a high CGPA while solving daily coding problems and attending interview rounds.',
      action: 'I implemented an Eisenhower matrix to categorize tasks by urgency and importance. I reserved early mornings (6 AM to 8 AM) for focused LeetCode practice, dedicated afternoons to coursework, and set aside evening hours for project sprints.',
      result: 'I cleared all university exams with an 8.8 GPA while successfully qualifying for multiple technical interview shortlists.',
    },
  },

  // 9. Failure and Learning
  {
    id: 'mistake-accountability',
    topicId: 'failure-learning',
    topicName: 'Failure and Learning',
    title: 'Handling an Engineering Mistake',
    statement: 'Tell me about a time you made a mistake or failed to meet an expectation on an engineering task. What happened and how did you respond?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Accountability & Learning',
    difficulty: 'Hard',
    companyIds: ['amazon', 'zoho'],
    modelAnswer: {
      situation: 'While pushing a last-minute hotfix for our team\'s web application right before a presentation, I accidentally merged an un-tested environment variable change.',
      task: 'The production build failed to load user profiles during the opening minutes of the evaluation.',
      action: 'Instead of blaming automated pipelines or external APIs, I immediately took ownership, explained the configuration issue to the panel, rolled back to the stable commit via git in 90 seconds, and initiated the demo.',
      result: 'The panel commended my calm composure under pressure and transparent ownership. Later that evening, I configured a branch protection rule and GitHub Actions check to prevent unvalidated config merges.',
    },
  },

  // 10. Company and Role Motivation
  {
    id: 'why-our-company',
    topicId: 'company-role-motivation',
    topicName: 'Company and Role Motivation',
    title: 'Company and Role Motivation',
    statement: 'Why do you want to join our organization specifically, and what sets you apart as a candidate?',
    category: 'HR Interview',
    type: 'Behavioral',
    pattern: 'Company Alignment',
    difficulty: 'Easy',
    companyIds: ['amazon', 'tcs', 'zoho', 'accenture'],
    modelAnswer: {
      situation: 'I have closely followed your engineering culture, customer-centric innovations, and investment in scalable engineering infrastructure.',
      task: 'I wanted to ensure that my career begins at an organization that fosters high ownership, continuous learning, and rigorous software craftsmanship.',
      action: 'I read your technical engineering blogs, analyzed your product architecture, and prepared by building full-stack applications with similar principles of performance and scalability.',
      result: 'I am ready to hit the ground running, contribute high-quality code from day one, and grow alongside your engineering team.',
    },
  },
];

const STAR_RESPONSES_KEY = 'placepro_star_responses';

function getStoredResponses() {
  try {
    const raw = localStorage.getItem(STAR_RESPONSES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const hrInterviewService = {
  /**
   * Retrieves all HR topics with dynamic question count
   */
  getHRTopics: async ({ companyId } = {}) => {
    // Delay to simulate async service interface
    await new Promise((r) => setTimeout(r, 60));

    return HR_TOPICS.map((topic) => {
      const questionsInTopic = HR_QUESTIONS.filter((q) => {
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
    return HR_TOPICS.find((t) => t.id === topicId) || null;
  },

  /**
   * Get questions under a topic, optionally filtered by companyId
   */
  getHRQuestions: async ({ topicId, companyId } = {}) => {
    await new Promise((r) => setTimeout(r, 60));

    return HR_QUESTIONS.filter((q) => {
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
  getHRQuestionById: async (questionId) => {
    await new Promise((r) => setTimeout(r, 60));
    return HR_QUESTIONS.find((q) => q.id === questionId) || null;
  },

  /**
   * Save user's STAR response
   */
  saveStarResponse: async ({ questionId, situation, task, action, result, companyId }) => {
    await new Promise((r) => setTimeout(r, 150));
    const all = getStoredResponses();
    all[questionId] = {
      questionId,
      companyId: companyId || null,
      situation: situation || '',
      task: task || '',
      action: action || '',
      result: result || '',
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STAR_RESPONSES_KEY, JSON.stringify(all));

    // Also mark as solved/prepared in UserService so dashboard / activity registers it
    UserService.toggleSolved(questionId);

    return { success: true, savedAt: all[questionId].savedAt };
  },

  /**
   * Get previously saved STAR response for a question
   */
  getSavedStarResponse: (questionId) => {
    const all = getStoredResponses();
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
