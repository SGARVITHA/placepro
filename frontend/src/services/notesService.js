/**
 * PlacePro Notes Service Layer
 * 
 * Architecture:
 * This service provides an abstraction layer between the Notes UI and data persistence.
 * Currently implemented with a temporary mock adapter using localStorage,
 * matching the expected backend API contract:
 *   - GET    /api/notes
 *   - POST   /api/notes
 *   - PUT    /api/notes/:id
 *   - DELETE /api/notes/:id
 * 
 * When backend endpoints are ready, swap the internal storage calls with fetchWithAuth()
 * from src/lib/apiClient without modifying the Notes UI or component logic.
 */

const STORAGE_KEY = 'placepro_notes_v2';
const SIMULATED_DELAY_MS = 150;

/**
 * Extracts plain text from HTML content and counts words accurately.
 */
export function countWordsFromHtml(html = '') {
  if (!html) return 0;
  // Convert HTML entities and tags to spaces
  const text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim();

  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Extracts a clean plain-text snippet for card previews.
 */
export function extractSnippetFromHtml(html = '', maxLength = 220) {
  if (!html) return '';
  const text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Formats relative time from an ISO timestamp.
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return 'Updated recently';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 45) return 'Updated just now';
    if (diffSeconds < 90) return 'Updated 1 min ago';
    if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `Updated ${minutes} mins ago`;
    }
    if (diffSeconds < 7200) return 'Updated 1 hour ago';
    if (diffSeconds < 86400) {
      const hours = Math.floor(diffSeconds / 3600);
      return `Updated ${hours} hours ago`;
    }
    if (diffSeconds < 172800) return 'Updated yesterday';
    if (diffSeconds < 604800) {
      const days = Math.floor(diffSeconds / 86400);
      return `Updated ${days} days ago`;
    }

    return `Updated ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  } catch {
    return 'Updated recently';
  }
}

/**
 * Initial seed notes matching the Stitch reference design for PlacePro.
 */
function getInitialSeedNotes() {
  const now = Date.now();
  return [
    {
      id: '1',
      title: 'Operating Systems — Process Scheduling',
      body: `<p>Process scheduling determines which process gets CPU time during multitasking execution. Key algorithms include:</p><ul class="list-disc pl-5 space-y-1"><li><strong>First-Come, First-Served (FCFS):</strong> Simple FIFO queue. Non-preemptive. High average waiting time (Convoy effect).</li><li><strong>Shortest Job First (SJF):</strong> Minimizes waiting time. Preemptive version is called <em>Shortest Remaining Time First (SRTF)</em>. Can lead to process starvation for long tasks.</li><li><strong>Round Robin (RR):</strong> Preemptive algorithm designed for time-sharing. Uses fixed time quantum (typically 10-100ms).</li><li><strong>Multi-Level Queue (MLQ):</strong> Partitions ready queue into separate queues based on priority (System, Interactive, Batch).</li></ul><p class="pt-2"><strong>Turnaround Time &amp; Waiting Time Formula:</strong></p><div class="bg-slate-100 p-3 rounded-md font-mono text-xs text-slate-800 border border-slate-200">Turnaround Time = Completion Time - Arrival Time\nWaiting Time = Turnaround Time - Burst Time</div><p class="text-slate-500 italic text-xs pt-2">Tip for RMK Campus Interviews: Be ready to draw the Gantt chart for SRTF and Round Robin when quantum is varied.</p>`,
      words: 420,
      createdAt: new Date(now - 120000).toISOString(), // 2 mins ago
      updatedAt: new Date(now - 120000).toISOString(),
    },
    {
      id: '2',
      title: 'Cloud Computing Revision — Core Architecture',
      body: `<p>IaaS, PaaS, and SaaS differ primarily in management ownership. Shared responsibility model: in IaaS customer controls OS, middleware, runtime, and apps; CSP controls virtualization, physical servers, and data centers.</p><p class="pt-2">Key Topics to review: AWS IAM Roles vs Policies, EC2 Auto-scaling groups, S3 storage tiers (Standard vs Glacier), and Serverless Lambda execution limits.</p>`,
      words: 280,
      createdAt: new Date(now - 86400000).toISOString(), // yesterday
      updatedAt: new Date(now - 86400000).toISOString(),
    },
    {
      id: '3',
      title: 'Java Technical Interview Cheat Sheet',
      body: `<p>Important concepts to revise:</p><ul class="list-disc pl-5 space-y-1"><li><strong>HashMap internal hashing:</strong> Collisions resolved via LinkedList; transforms to Red-Black tree when bucket count exceeds TREEIFY_THRESHOLD=8.</li><li><strong>ConcurrentHashMap:</strong> Segmented locks in Java 7; CAS + synchronized bin nodes in Java 8+.</li><li><strong>Garbage Collection:</strong> Eden, Survivor S0/S1, Tenured generations. G1GC vs ZGC.</li><li><strong>JVM Memory Layout:</strong> Heap, Stack, Method Area/Metaspace, Program Counter.</li></ul>`,
      words: 650,
      createdAt: new Date(now - 259200000).toISOString(), // 3 days ago
      updatedAt: new Date(now - 259200000).toISOString(),
    },
  ];
}

/**
 * Reads notes array from localStorage or seeds if first launch.
 */
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // First time initialization with seed data
      const initial = getInitialSeedNotes();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read notes from localStorage', err);
    return [];
  }
}

/**
 * Writes notes array to localStorage.
 */
function writeStorage(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to write notes to localStorage', err);
    throw new Error('Storage write failed. Local quota may be exceeded.', { cause: err });
  }
}

/**
 * Checks if a note was updated recently (e.g. within the last 1 hour).
 */
export function isRecentlyUpdated(dateString) {
  if (!dateString) return false;
  try {
    const time = new Date(dateString).getTime();
    return Date.now() - time < 3600000;
  } catch {
    return false;
  }
}

/**
 * Helper to simulate network latency for realistic loading/saving state workflows.
 */
function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global flag to optionally simulate error in development for testing save retry UI
let _simulateFailure = false;
export function setSimulateFailure(shouldFail) {
  _simulateFailure = Boolean(shouldFail);
}

/**
 * Retrieve all notes with optional search query filtering.
 * Contract: GET /api/notes?search=...
 * 
 * @param {Object} [params]
 * @param {string} [params.search] - Filter query matched against title or content
 * @returns {Promise<Array>}
 */
export async function getNotes(params = {}) {
  await delay();
  if (_simulateFailure) {
    throw new Error('Simulated network error while fetching notes');
  }

  const notes = readStorage();
  const search = (params.search || '').trim().toLowerCase();

  let filtered = notes;
  if (search) {
    filtered = notes.filter((n) => {
      const titleMatch = (n.title || '').toLowerCase().includes(search);
      const fullText = (n.body || '').replace(/<[^>]+>/g, ' ').toLowerCase();
      return titleMatch || fullText.includes(search);
    });
  }

  // Sort by updatedAt descending
  filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return JSON.parse(JSON.stringify(filtered));
}

/**
 * Retrieve a single note by ID.
 * Contract: GET /api/notes/:id
 * 
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getNoteById(id) {
  await delay();
  if (!id) throw new Error('Note ID is required');

  const notes = readStorage();
  const found = notes.find((n) => String(n.id) === String(id));
  if (!found) {
    throw new Error(`Note not found: ${id}`);
  }
  return JSON.parse(JSON.stringify(found));
}

/**
 * Create a new note.
 * Contract: POST /api/notes
 * 
 * @param {Object} noteData
 * @param {string} [noteData.title]
 * @param {string} [noteData.body]
 * @returns {Promise<Object>}
 */
export async function createNote(noteData = {}) {
  await delay();
  if (_simulateFailure) {
    throw new Error('Network error: Failed to create note on server');
  }

  const notes = readStorage();
  const now = new Date().toISOString();
  const title = (noteData.title !== undefined && noteData.title !== null) ? noteData.title : 'Untitled Note';
  const body = noteData.body || '<p></p>';
  const words = countWordsFromHtml(body);

  const newNote = {
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title: title,
    body: body,
    words: words,
    createdAt: now,
    updatedAt: now,
  };

  notes.unshift(newNote);
  writeStorage(notes);

  return JSON.parse(JSON.stringify(newNote));
}

/**
 * Update an existing note.
 * Contract: PUT /api/notes/:id
 * 
 * @param {string} id
 * @param {Object} updates
 * @param {string} [updates.title]
 * @param {string} [updates.body]
 * @returns {Promise<Object>}
 */
export async function updateNote(id, updates = {}) {
  await delay();
  if (!id) throw new Error('Note ID is required for update');

  if (_simulateFailure) {
    throw new Error('Network error: Failed to save changes to note');
  }

  const notes = readStorage();
  const index = notes.findIndex((n) => String(n.id) === String(id));

  if (index === -1) {
    throw new Error(`Note not found: ${id}`);
  }

  const current = notes[index];
  const updatedTitle = updates.title !== undefined ? updates.title : current.title;
  const updatedBody = updates.body !== undefined ? updates.body : current.body;
  const words = countWordsFromHtml(updatedBody);
  const now = new Date().toISOString();

  const updatedNote = {
    ...current,
    title: updatedTitle,
    body: updatedBody,
    words: words,
    updatedAt: now,
  };

  notes[index] = updatedNote;
  writeStorage(notes);

  return JSON.parse(JSON.stringify(updatedNote));
}

/**
 * Delete a note by ID.
 * Contract: DELETE /api/notes/:id
 * 
 * @param {string} id
 * @returns {Promise<{ success: boolean, id: string }>}
 */
export async function deleteNote(id) {
  await delay();
  if (!id) throw new Error('Note ID is required for deletion');

  if (_simulateFailure) {
    throw new Error('Network error: Failed to delete note');
  }

  const notes = readStorage();
  const remaining = notes.filter((n) => String(n.id) !== String(id));

  if (remaining.length === notes.length) {
    throw new Error(`Note not found: ${id}`);
  }

  writeStorage(remaining);
  return { success: true, id };
}

export const notesService = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  countWordsFromHtml,
  extractSnippetFromHtml,
  formatRelativeTime,
  isRecentlyUpdated,
  setSimulateFailure,
};

export default notesService;
