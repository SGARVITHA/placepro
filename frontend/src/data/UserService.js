export const UserService = {
  getProfile: () => {
    const saved = localStorage.getItem('placepro_profile');
    if (saved) return JSON.parse(saved);
    return {
      firstName: '',
      lastName: '',
      phone: '',
      college: '',
      rollNumber: '',
      fatherName: '',
      memberSince: '',
      yearBranch: ''
    };
  },
  
  updateProfile: (profileData) => {
    const current = UserService.getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem('placepro_profile', JSON.stringify(updated));
    return updated;
  },

  getBookmarks: () => {
    const saved = localStorage.getItem('placepro_bookmarks');
    return saved ? JSON.parse(saved) : [];
  },

  toggleBookmark: (questionId) => {
    let bookmarks = UserService.getBookmarks();
    if (bookmarks.includes(questionId)) {
      bookmarks = bookmarks.filter(id => id !== questionId);
    } else {
      bookmarks.push(questionId);
    }
    localStorage.setItem('placepro_bookmarks', JSON.stringify(bookmarks));
    return bookmarks;
  },

  isBookmarked: (questionId) => {
    return UserService.getBookmarks().includes(questionId);
  },

  getSolved: () => {
    const saved = localStorage.getItem('placepro_solved');
    return saved ? JSON.parse(saved) : [];
  },

  toggleSolved: (questionId) => {
    let solved = UserService.getSolved();
    if (solved.includes(questionId)) {
      solved = solved.filter(id => id !== questionId);
    } else {
      solved.push(questionId);
    }
    localStorage.setItem('placepro_solved', JSON.stringify(solved));
    return solved;
  },

  isSolved: (questionId) => {
    return UserService.getSolved().includes(questionId);
  },

  getNotes: () => {
    const saved = localStorage.getItem('placepro_notes');
    if (saved) return JSON.parse(saved);
    
    // Initial mock notes if empty
    const initialNotes = [
      { id: '1', title: 'Array Rotation Logic', topic: 'Arrays', body: '<div>Given an array of integers, rotate the array to the right by k steps, where k is non-negative. Solve it in-place, without allocating extra space for another array.<br><br><b>Approach:</b><br>Reverse the entire array first, then reverse the first k elements, and finally reverse the remaining n - k elements.<br><br><b>Example:</b><br><b>Input:</b> nums = [1, 2, 3, 4, 5, 6, 7], k = 3<br><b>Output:</b> [5, 6, 7, 1, 2, 3, 4]</div>', updatedAt: '24 May 2024' },
      { id: '2', title: 'Graph BFS Template', topic: 'Graphs', body: 'Queue based approach.', updatedAt: '20 May 2024' },
      { id: '3', title: 'DP Patterns', topic: 'Dynamic Programming', body: 'Fibonacci, Knapsack, LCS', updatedAt: '18 May 2024' },
      { id: '4', title: 'System Design Basics', topic: 'System Design', body: 'CAP theorem, load balancers.', updatedAt: '15 May 2024' }
    ];
    localStorage.setItem('placepro_notes', JSON.stringify(initialNotes));
    return initialNotes;
  },

  saveNote: (noteData) => {
    const notes = UserService.getNotes();
    const existingIndex = notes.findIndex(n => n.id === noteData.id);
    
    // Simple date formatter (e.g. 25 Aug 2024)
    const d = new Date();
    const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    if (existingIndex >= 0) {
      notes[existingIndex] = { ...notes[existingIndex], ...noteData, updatedAt: dateStr };
    } else {
      notes.unshift({
        id: Date.now().toString(),
        ...noteData,
        updatedAt: dateStr
      });
    }
    
    localStorage.setItem('placepro_notes', JSON.stringify(notes));
    return notes;
  }
};
