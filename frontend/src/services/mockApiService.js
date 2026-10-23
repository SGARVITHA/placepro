/**
 * PlacePro Development Mock API Service
 * 
 * Provides isolated mock responses for frontend development when VITE_USE_MOCK_API=true.
 * Completely decoupled from production API client and backend code.
 */

export const mockCompanies = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Cloud computing, e-commerce, and digital streaming multinational.',
    total_questions: 48,
    active_drives: 1,
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: '/tcs-logo.png',
    description: 'IT services, consulting, and business solutions leader.',
    total_questions: 64,
    active_drives: 1,
  },
  {
    id: 'zoho',
    name: 'Zoho',
    logo: '/zoho-logo.png',
    description: 'Indian multinational SaaS and cloud business software suite.',
    total_questions: 42,
    active_drives: 1,
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '/accenture-logo.png',
    description: 'Global professional services company with leading capabilities in digital, cloud and security.',
    total_questions: 35,
    active_drives: 0,
  },
];

export const mockCategories = [
  { id: 'aptitude', name: 'Aptitude', is_common: true, topic_count: 5 },
  { id: 'coding', name: 'Coding', is_common: true, topic_count: 6 },
  { id: 'cs-subjects', name: 'CS Subjects', is_common: true, topic_count: 4 },
  { id: 'interview', name: 'Interview Prep', is_common: true, topic_count: 2 },
];

export const mockTopics = [
  // Aptitude
  { id: 'time-speed-distance', category_id: 'aptitude', name: 'Time, Speed & Distance', description: 'Train problems, relative velocity, boats & streams, and average speed.', question_count: 6 },
  { id: 'percentages', category_id: 'aptitude', name: 'Percentages', description: 'Successive percentage changes, population changes, and expenditure problems.', question_count: 5 },
  { id: 'profit-loss', category_id: 'aptitude', name: 'Profit & Loss', description: 'Cost price, selling price, discounts, marked price, and faulty weights.', question_count: 5 },
  { id: 'ratio-proportion', category_id: 'aptitude', name: 'Ratio & Proportion', description: 'Proportions, mixtures & alligations, partnerships, and age problems.', question_count: 5 },
  { id: 'number-system', category_id: 'aptitude', name: 'Number System', description: 'Divisibility rules, unit digits, remainders, and HCF & LCM.', question_count: 5 },
  { id: 'permutation-combination', category_id: 'aptitude', name: 'Permutation & Combination', description: 'Factorials, arrangements, circular permutations, and selections.', question_count: 4 },
  { id: 'time-and-work', category_id: 'aptitude', name: 'Time and Work', description: 'Work-rate formulas, pipes & cisterns, and efficiency comparisons.', question_count: 4 },
  { id: 'probability', category_id: 'aptitude', name: 'Probability', description: 'Dice, playing cards, conditional probability, and independent events.', question_count: 4 },

  // Coding
  { id: 'arrays', category_id: 'coding', name: 'Arrays & Two Pointers', description: 'Array rotations, two-pointer techniques, prefix sums, and sliding windows.', question_count: 4 },
  { id: 'strings', category_id: 'coding', name: 'Strings & Hashing', description: 'Substrings, palindromes, anagrams, and frequency hashing.', question_count: 2 },
  { id: 'trees', category_id: 'coding', name: 'Binary Trees & BST', description: 'Tree traversals, lowest common ancestor, height, and balanced BSTs.', question_count: 1 },
  { id: 'dynamic-programming', category_id: 'coding', name: 'Dynamic Programming', description: 'Knapsack, memoization, tabular dynamic programming, and optimization.', question_count: 1 },
  { id: 'linked-lists', category_id: 'coding', name: 'Linked Lists', description: 'Reversing lists, cycle detection, merging, and fast & slow pointers.', question_count: 1 },
  { id: 'graphs', category_id: 'coding', name: 'Graphs & BFS/DFS', description: 'Graph representations, BFS, DFS, shortest path, and connected components.', question_count: 1 },

  // CS Subjects
  { id: 'os', category_id: 'cs-subjects', name: 'Operating Systems', description: 'Processes, memory management, concurrency, CPU scheduling, and deadlocks.', question_count: 6 },
  { id: 'dbms', category_id: 'cs-subjects', name: 'DBMS and SQL', description: 'Relational databases, SQL queries, normalization, ACID, and transactions.', question_count: 6 },
  { id: 'cn', category_id: 'cs-subjects', name: 'Computer Networks', description: 'OSI & TCP/IP layers, routing, TCP/UDP, DNS, HTTP, and network security.', question_count: 6 },
  { id: 'oops', category_id: 'cs-subjects', name: 'OOPS', description: 'Object-oriented programming, classes, inheritance, polymorphism, and abstraction.', question_count: 4 },
  { id: 'java', category_id: 'cs-subjects', name: 'Java', description: 'Core Java, JVM internals, multithreading, collections, and exception handling.', question_count: 4 },
  { id: 'cpp', category_id: 'cs-subjects', name: 'C++', description: 'Pointers, memory management, STL, OOP in C++, and modern C++ concepts.', question_count: 4 },
];

export const mockQuestions = [
  // Coding
  {
    id: 'q1',
    topic_id: 'arrays',
    category_id: 'coding',
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The contiguous subarray [4, -1, 2, 1] has the largest sum = 6."
      },
      {
        id: 2,
        input: "nums = [1]",
        output: "1",
        explanation: "Single element subarray has sum = 1."
      }
    ],
    campus_tip: "Kadane's algorithm runs in linear O(N) time and O(1) space. Always discuss resetting currentSum vs keeping negative prefixes with the interviewer.",
    testcases: [
      { id: 1, label: "Case 1", input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { id: 2, label: "Case 2", input: "1\n1", expected: "1" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        \n        // Write Kadane's algorithm here\n        \n    }\n}",
      python: "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:n+1]]\n    \n    # Write Kadane's algorithm here\n    \nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    \n    // Write solution here\n    \n    return 0;\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int* nums = (int*)malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf(\"%d\", &nums[i]);\n    \n    // Write solution here\n    \n    free(nums);\n    return 0;\n}",
      javascript: "function solve(input) {\n    const tokens = input.trim().split(/\\s+/).map(Number);\n    const n = tokens[0];\n    const nums = tokens.slice(1, n + 1);\n    let maxSoFar = nums[0];\n    let curr = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        curr = Math.max(nums[i], curr + nums[i]);\n        maxSoFar = Math.max(maxSoFar, curr);\n    }\n    return String(maxSoFar);\n}"
    },
    solution: "Initialize maxSoFar and currentMax with nums[0]. Iterate through the array starting from index 1. Update currentMax = max(nums[i], currentMax + nums[i]) and maxSoFar = max(maxSoFar, currentMax). Return maxSoFar."
  },
  {
    id: 'q2',
    topic_id: 'arrays',
    category_id: 'coding',
    title: "Rotate an array to the right by k steps in-place.",
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: "Rotate an array to the right by k steps in-place.",
    constraints: [
      "1 ≤ n ≤ 10⁵",
      "0 ≤ k ≤ 10⁵",
      "-10⁹ ≤ nums[i] ≤ 10⁹"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
        output: "[5, 6, 7, 1, 2, 3, 4]",
        explanation: "rotate 1 steps: [7,1,2,3,4,5,6], 2 steps: [6,7,1,2,3,4,5], 3 steps: [5,6,7,1,2,3,4]"
      },
      {
        id: 2,
        input: "nums = [-1, -100, 3, 99], k = 2",
        output: "[3, 99, -1, -100]"
      }
    ],
    campus_tip: "In-place rotation requires O(1) extra space. Reversing array segments is the optimal approach for online coding rounds.",
    testcases: [
      { id: 1, label: "Case 1", input: "7\n1 2 3 4 5 6 7\n3", expected: "[5, 6, 7, 1, 2, 3, 4]" },
      { id: 2, label: "Case 2", input: "4\n-1 -100 3 99\n2", expected: "[3, 99, -1, -100]" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n        int k = sc.nextInt();\n        \n        // Write your solution here\n        \n    }\n}",
      python: "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    n = int(lines[0])\n    nums = [int(x) for x in lines[1:n+1]]\n    k = int(lines[n+1])\n    \n    # Write your solution here\n    \nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n    int k;\n    cin >> k;\n    \n    // Write your solution here\n    \n    return 0;\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int* nums = (int*)malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &nums[i]);\n    }\n    int k;\n    scanf(\"%d\", &k);\n    \n    // Write your solution here\n    \n    free(nums);\n    return 0;\n}",
      javascript: "function solve(input) {\n    const lines = input.trim().split(/\\s+/);\n    const n = parseInt(lines[0], 10);\n    const nums = lines.slice(1, n + 1).map(Number);\n    const k = parseInt(lines[n + 1], 10) % n;\n    \n    function reverse(arr, start, end) {\n        while (start < end) {\n            const temp = arr[start];\n            arr[start] = arr[end];\n            arr[end] = temp;\n            start++;\n            end--;\n        }\n    }\n    \n    reverse(nums, 0, n - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, n - 1);\n    return JSON.stringify(nums);\n}"
    },
    solution: "1. k = k % n.\n2. Reverse the entire array.\n3. Reverse the first k elements (0 to k-1).\n4. Reverse the remaining n-k elements (k to n-1)."
  },
  {
    id: 'q3',
    topic_id: 'arrays',
    category_id: 'coding',
    title: "Two Sum: Pair with Target Sum",
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Assume exactly one solution exists.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    campus_tip: "Use a Hash Map for O(N) lookup. Avoid the brute force O(N²) nested loops in screening rounds.",
    testcases: [
      { id: 1, label: "Case 1", input: "4\n2 7 11 15\n9", expected: "[0, 1]" },
      { id: 2, label: "Case 2", input: "3\n3 2 4\n6", expected: "[1, 2]" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        // Write solution here\n    }\n}",
      python: "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:n+1]]\n    target = int(data[n+1])\n    # Write solution here\n\nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int target;\n    cin >> target;\n    return 0;\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int* nums = (int*)malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf(\"%d\", &nums[i]);\n    int target;\n    scanf(\"%d\", &target);\n    free(nums);\n    return 0;\n}",
      javascript: "function solve(input) {\n    const tokens = input.trim().split(/\\s+/).map(Number);\n    const n = tokens[0];\n    const nums = tokens.slice(1, n + 1);\n    const target = tokens[n + 1];\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return JSON.stringify([map.get(complement), i]);\n        }\n        map.set(nums[i], i);\n    }\n    return '[]';\n}"
    },
    solution: "Use a Hash Map to store complement (target - nums[i]) and its index. Lookup time is O(1), giving an overall O(N) time complexity."
  },
  {
    id: 'q-arr-trap',
    topic_id: 'arrays',
    category_id: 'coding',
    title: "Trapping Rain Water",
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: [
      "n == height.length",
      "1 ≤ n ≤ 2 * 10⁴",
      "0 ≤ height[i] ≤ 10⁵"
    ],
    examples: [
      {
        id: 1,
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map traps 6 units of rain water."
      }
    ],
    campus_tip: "Two-pointer approach achieves O(N) time and O(1) space by tracking leftMax and rightMax.",
    testcases: [
      { id: 1, label: "Case 1", input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] h = new int[n];\n        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n    }\n}",
      python: "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data: return\n    n = int(data[0])\n    h = [int(x) for x in data[1:n+1]]\n\nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> h(n);\n    for (int i = 0; i < n; i++) cin >> h[i];\n    return 0;\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int* h = (int*)malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf(\"%d\", &h[i]);\n    free(h);\n    return 0;\n}",
      javascript: "function solve(input) {\n    const tokens = input.trim().split(/\\s+/).map(Number);\n    const n = tokens[0];\n    const h = tokens.slice(1, n + 1);\n    let left = 0, right = n - 1;\n    let leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n        if (h[left] < h[right]) {\n            if (h[left] >= leftMax) leftMax = h[left];\n            else water += leftMax - h[left];\n            left++;\n        } else {\n            if (h[right] >= rightMax) rightMax = h[right];\n            else water += rightMax - h[right];\n            right--;\n        }\n    }\n    return String(water);\n}"
    },
    solution: "Two pointers from left and right tracking leftMax and rightMax."
  },
  {
    id: 'q4',
    topic_id: 'strings',
    category_id: 'coding',
    title: "Longest Substring Without Repeating Characters",
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        id: 1,
        input: "s = 'abcabcbb'",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      },
      {
        id: 2,
        input: "s = 'bbbbb'",
        output: "1",
        explanation: "The answer is 'b', with the length of 1."
      }
    ],
    campus_tip: "Sliding window with hash map allows jumping the left pointer immediately to the previous character's next index.",
    testcases: [
      { id: 1, label: "Case 1", input: "abcabcbb", expected: "3" },
      { id: 2, label: "Case 2", input: "bbbbb", expected: "1" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // Write solution here\n    }\n}",
      python: "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    # Write solution here\n\nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    return 0;\n}",
      c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[50005];\n    if (fgets(s, sizeof(s), stdin)) {}\n    return 0;\n}",
      javascript: "function solve(input) {\n    const s = input.trim();\n    const map = new Map();\n    let maxLen = 0;\n    let left = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (map.has(s[right]) && map.get(s[right]) >= left) {\n            left = map.get(s[right]) + 1;\n        }\n        map.set(s[right], right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return String(maxLen);\n}"
    },
    solution: "Use a sliding window with a Set or Map storing the latest index of each character. Advance right pointer and shrink left pointer on duplicates."
  },
  {
    id: 'q-str-anagram',
    topic_id: 'strings',
    category_id: 'coding',
    title: "Valid Anagram",
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    constraints: [
      "1 ≤ s.length, t.length ≤ 5 * 10⁴",
      "s and t consist of lowercase English letters."
    ],
    examples: [
      {
        id: 1,
        input: "s = 'anagram', t = 'nagaram'",
        output: "true"
      }
    ],
    campus_tip: "Character frequency array of size 26 is much faster and uses less memory than sorting.",
    testcases: [
      { id: 1, label: "Case 1", input: "anagram\nnagaram", expected: "true" },
      { id: 2, label: "Case 2", input: "rat\ncar", expected: "false" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String t = sc.next();\n    }\n}",
      python: "import sys\n\ndef main():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2: return\n    s, t = lines[0], lines[1]\n\nif __name__ == '__main__':\n    main()",
      cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s, t;\n    if (cin >> s >> t) {}\n    return 0;\n}",
      c: "#include <stdio.h>\n\nint main() {\n    char s[50005], t[50005];\n    if (scanf(\"%s %s\", s, t) == 2) {}\n    return 0;\n}",
      javascript: "function solve(input) {\n    const [s, t] = input.trim().split(/\\s+/);\n    if (s.length !== t.length) return 'false';\n    const counts = new Array(26).fill(0);\n    for (let i = 0; i < s.length; i++) {\n        counts[s.charCodeAt(i) - 97]++;\n        counts[t.charCodeAt(i) - 97]--;\n    }\n    return String(counts.every(c => c === 0));\n}"
    },
    solution: "Count character frequencies using an array of size 26."
  },
  {
    id: 'q-tree-lca',
    topic_id: 'trees',
    category_id: 'coding',
    title: "Lowest Common Ancestor of a BST",
    company_name: 'Google',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    constraints: [
      "The number of nodes in the tree is in the range [2, 10⁵].",
      "-10⁹ ≤ Node.val ≤ 10⁹",
      "All Node.val are unique."
    ],
    examples: [
      {
        id: 1,
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
        explanation: "The LCA of nodes 2 and 8 is 6."
      }
    ],
    campus_tip: "Leverage BST properties: if both values are greater, go right; if smaller, go left; otherwise current node is split point (LCA).",
    testcases: [
      { id: 1, label: "Case 1", input: "6 2 8", expected: "6" }
    ],
    starter_templates: {
      java: "public class Solution {\n    // Lowest Common Ancestor in BST\n}",
      python: "def lowestCommonAncestor(root, p, q):\n    pass",
      cpp: "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q);\n};",
      c: "struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q);",
      javascript: "function solve(input) {\n    const [rootVal, p, q] = input.trim().split(/\\s+/).map(Number);\n    if (p < rootVal && q < rootVal) return 'Left Subtree';\n    if (p > rootVal && q > rootVal) return 'Right Subtree';\n    return String(rootVal);\n}"
    },
    solution: "Recurse left if both smaller than current node, recurse right if both greater, else return current node."
  },
  {
    id: 'q-dp-knapsack',
    topic_id: 'dynamic-programming',
    category_id: 'coding',
    title: "0/1 Knapsack Problem",
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.",
    constraints: [
      "1 ≤ n ≤ 1000",
      "1 ≤ W ≤ 1000"
    ],
    examples: [
      {
        id: 1,
        input: "W = 4, weights = [1, 2, 3], values = [10, 15, 40]",
        output: "55",
        explanation: "Take item 1 (weight 1, value 10) and item 3 (weight 3, value 40). Total weight = 4, value = 55."
      }
    ],
    campus_tip: "Space optimization reduces the 2D DP table to a 1D array of size W+1 traversed in reverse order.",
    testcases: [
      { id: 1, label: "Case 1", input: "3 4\n1 2 3\n10 15 40", expected: "55" }
    ],
    starter_templates: {
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // 0/1 Knapsack\n    }\n}",
      python: "def knapsack(W, wt, val, n):\n    pass",
      cpp: "int knapsack(int W, vector<int>& wt, vector<int>& val) {\n    return 0;\n}",
      c: "int knapsack(int W, int wt[], int val[], int n) {\n    return 0;\n}",
      javascript: "function solve(input) {\n    const tokens = input.trim().split(/\\s+/).map(Number);\n    const n = tokens[0], W = tokens[1];\n    const wt = tokens.slice(2, 2 + n);\n    const val = tokens.slice(2 + n, 2 + 2 * n);\n    const dp = new Array(W + 1).fill(0);\n    for (let i = 0; i < n; i++) {\n        for (let w = W; w >= wt[i]; w--) {\n            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);\n        }\n    }\n    return String(dp[W]);\n}"
    },
    solution: "1D DP table updated from W down to wt[i]."
  },
  {
    id: 'q-ll-reverse',
    topic_id: 'linked-lists',
    category_id: 'coding',
    title: "Reverse a Singly Linked List",
    company_name: 'Accenture',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 ≤ Node.val ≤ 5000"
    ],
    examples: [
      {
        id: 1,
        input: "head = [1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]"
      }
    ],
    campus_tip: "Track three pointers: prev, curr, and nextNode. Mention iterative O(1) space over recursion in interviews.",
    testcases: [
      { id: 1, label: "Case 1", input: "5\n1 2 3 4 5", expected: "[5, 4, 3, 2, 1]" }
    ],
    starter_templates: {
      java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Reverse list\n    }\n}",
      python: "def reverseList(head):\n    pass",
      cpp: "ListNode* reverseList(ListNode* head) {\n    return nullptr;\n}",
      c: "struct ListNode* reverseList(struct ListNode* head) {\n    return NULL;\n}",
      javascript: "function solve(input) {\n    const tokens = input.trim().split(/\\s+/).map(Number);\n    const n = tokens[0];\n    const nums = tokens.slice(1, n + 1);\n    return JSON.stringify(nums.reverse());\n}"
    },
    solution: "Iterate with prev, curr, next pointers."
  },
  {
    id: 'q-graph-islands',
    topic_id: 'graphs',
    category_id: 'coding',
    title: "Number of Islands",
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 300"
    ],
    examples: [
      {
        id: 1,
        input: "grid = [\n  ['1','1','0','0','0'],\n  ['1','1','0','0','0'],\n  ['0','0','1','0','0'],\n  ['0','0','0','1','1']\n]",
        output: "3"
      }
    ],
    campus_tip: "Sink visited land cells in-place by marking them '0' or '2' to achieve O(1) auxiliary space without a visited matrix.",
    testcases: [
      { id: 1, label: "Case 1", input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", expected: "3" }
    ],
    starter_templates: {
      java: "public class Solution {\n    public int numIslands(char[][] grid) {\n        // BFS or DFS\n    }\n}",
      python: "def numIslands(grid):\n    pass",
      cpp: "int numIslands(vector<vector<char>>& grid) {\n    return 0;\n}",
      c: "int numIslands(char** grid, int gridSize, int* gridColSize) {\n    return 0;\n}",
      javascript: "function solve(input) {\n    const lines = input.trim().split('\\n').map(l => l.trim().split(/\\s+/));\n    const [m, n] = lines[0].map(Number);\n    const grid = lines.slice(1, m + 1);\n    let count = 0;\n    function dfs(r, c) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    }\n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (grid[i][j] === '1') {\n                count++;\n                dfs(i, j);\n            }\n        }\n    }\n    return String(count);\n}"
    },
    solution: "DFS/BFS sinking visited land cells in-place."
  },

  // Aptitude / MCQ Questions
  {
    id: 'apt-tsd-1',
    topic_id: 'time-speed-distance',
    category_id: 'aptitude',
    title: 'Distance Covered by a Moving Train',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Medium',
    pattern: '2024 Pattern',
    question_text: 'A train travels at a uniform speed of 60 km/h and covers a certain journey duration in 2 hours. What is the total distance travelled by the train?',
    options: ['100 km', '120 km', '140 km', '160 km'],
    correct_option: 1, // '120 km'
    formula: 'Distance = Speed × Time',
    given_values: [
      { label: 'Uniform Speed (v)', value: '60 km/h' },
      { label: 'Time of Travel (t)', value: '2 hours' },
    ],
    solution_steps: [
      'Given: Uniform Speed (v) = 60 km/h and Time of Travel (t) = 2 hours.',
      'Calculation: Distance = 60 km/h × 2 h = 120 km.',
      'Therefore, the correct answer is Option B (120 km).',
    ],
    exam_tip: 'Always verify that speed and time units match (km/h with hours, or m/s with seconds) before carrying out direct multiplication.',
    solution: 'Distance = Speed × Time = 60 km/h × 2 hours = 120 km. Option B is correct.',
  },
  {
    id: 'apt-tsd-2',
    topic_id: 'time-speed-distance',
    category_id: 'aptitude',
    title: 'Average Speed of a Round Trip',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Easy',
    pattern: 'Standard Pattern',
    question_text: 'A motorist travels to a destination at 40 km/h and returns along the same route at 60 km/h. What is the average speed for the entire journey?',
    options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
    correct_option: 0, // '48 km/h'
    formula: 'Average Speed = (2 × s1 × s2) / (s1 + s2)',
    given_values: [
      { label: 'Outward Speed (s1)', value: '40 km/h' },
      { label: 'Return Speed (s2)', value: '60 km/h' },
    ],
    solution_steps: [
      'When distances are equal, Harmonic Mean formula applies: Average Speed = 2xy / (x + y).',
      'Average Speed = (2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/h.',
      'Therefore, the correct answer is Option A (48 km/h).',
    ],
    exam_tip: 'Do not simply take the arithmetic mean (40+60)/2 = 50 km/h when the distance is the same; time spent at lower speed is greater.',
    solution: 'Average Speed = 2 × 40 × 60 / (40 + 60) = 4800 / 100 = 48 km/h.',
  },
  {
    id: 'apt-tsd-3',
    topic_id: 'time-speed-distance',
    category_id: 'aptitude',
    title: 'Two Trains Crossing in Opposite Directions',
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Hard',
    pattern: '2024 Pattern',
    question_text: 'Two trains running in opposite directions cross a stationary pole in 27 seconds and 17 seconds respectively. If they cross each other in 23 seconds, what is the ratio of their speeds?',
    options: ['1 : 3', '3 : 2', '3 : 4', '2 : 3'],
    correct_option: 1, // '3 : 2'
    formula: 'Relative Speed = (Length1 + Length2) / Time',
    given_values: [
      { label: 'Pole crossing time (Train 1)', value: '27 s' },
      { label: 'Pole crossing time (Train 2)', value: '17 s' },
      { label: 'Mutual crossing time', value: '23 s' },
    ],
    solution_steps: [
      'Let speeds be x and y. Length of train 1 = 27x, length of train 2 = 17y.',
      'Total distance when crossing each other = 27x + 17y.',
      'Relative speed = x + y. Hence: (27x + 17y) / (x + y) = 23.',
      '27x + 17y = 23x + 23y => 4x = 6y => x/y = 3/2.',
    ],
    exam_tip: 'You can also solve this quickly using alligation: (23-17) / (27-23) = 6/4 = 3/2.',
    solution: 'Ratio of speeds is 3 : 2 (Option B).',
  },
  {
    id: 'apt-1',
    topic_id: 'number-system',
    category_id: 'aptitude',
    title: 'Unit Digit of Exponents Difference',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Easy',
    pattern: 'NQT Pattern',
    question_text: 'What is the unit digit of (7^95 - 3^58)?',
    options: ['0', '4', '6', '7'],
    correct_option: 1, // '4'
    formula: 'Unit Digit Cyclicity Rule: Cycle of 7 is (7, 9, 3, 1); Cycle of 3 is (3, 9, 7, 1)',
    solution_steps: [
      'Cyclicity of 7 is 4: 95 mod 4 = 3, so unit digit of 7^95 is 7^3 = 343 -> 3.',
      'Cyclicity of 3 is 4: 58 mod 4 = 2, so unit digit of 3^58 is 3^2 = 9.',
      'Since 3 < 9, borrow 1 from the tens place: 13 - 9 = 4.',
      'Therefore, the unit digit is 4 (Option B).',
    ],
    exam_tip: 'When the minuend unit digit is smaller than the subtrahend unit digit, always borrow 10 (e.g. 13 - 9 = 4).',
    solution: 'Unit digit is 4.',
  },
  {
    id: 'apt-2',
    topic_id: 'percentages',
    category_id: 'aptitude',
    title: 'Expenditure Balance on Price Increase',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    pattern: '2024 Pattern',
    question_text: 'If the price of petrol increases by 25%, by how much percent should a driver reduce consumption so that the total expenditure remains constant?',
    options: ['15%', '20%', '25%', '33.33%'],
    correct_option: 1, // '20%'
    formula: 'Consumption Reduction % = [r / (100 + r)] × 100%',
    solution_steps: [
      'Given price increase r = 25%.',
      'Reduction % = [25 / (100 + 25)] × 100% = [25 / 125] × 100% = (1/5) × 100% = 20%.',
      'Therefore, the driver must reduce consumption by 20% (Option B).',
    ],
    exam_tip: 'Remember the reciprocal fraction rule: a 25% increase (+1/4) requires a 1/5 decrease (-20%) to keep expenditure flat.',
    solution: 'Reduction % = [25 / 125] * 100 = 20%.',
  },
  {
    id: 'apt-3',
    topic_id: 'profit-loss',
    category_id: 'aptitude',
    title: 'Overall Gain or Loss on Same Selling Price',
    company_name: 'Accenture',
    year_asked: 2024,
    difficulty: 'Medium',
    pattern: '2024 Pattern',
    question_text: 'A shopkeeper sells two articles at Rs. 990 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage?',
    options: ['No gain, no loss', '1% gain', '1% loss', '2% loss'],
    correct_option: 2, // '1% loss'
    formula: 'Overall Loss % = (x / 10)^2 % when SP is identical and profit% = loss% = x%',
    solution_steps: [
      'When two items are sold at identical selling price, one at x% gain and another at x% loss, there is ALWAYS an overall loss.',
      'Loss % = (x/10)^2 = (10/10)^2 = 1% loss.',
      'Therefore, the shopkeeper incurs an overall loss of 1% (Option C).',
    ],
    exam_tip: 'Do not fall for the "No gain, no loss" trap. Cost prices are different, so the monetary loss on the second item exceeds the monetary gain on the first.',
    solution: 'Loss % = (10/10)^2 = 1% loss.',
  },
  {
    id: 'apt-rp-1',
    topic_id: 'ratio-proportion',
    category_id: 'aptitude',
    title: 'Compound Ratio Calculation',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Easy',
    pattern: '2024 Pattern',
    question_text: 'If A : B = 2 : 3 and B : C = 4 : 5, what is the ratio of A : C?',
    options: ['8 : 15', '2 : 5', '3 : 5', '8 : 9'],
    correct_option: 0, // '8 : 15'
    formula: '(A / C) = (A / B) × (B / C)',
    solution_steps: [
      'Given: A/B = 2/3 and B/C = 4/5.',
      'A/C = (A/B) × (B/C) = (2/3) × (4/5) = 8/15.',
      'Therefore, A : C = 8 : 15 (Option A).',
    ],
    exam_tip: 'Multiply the fractional ratios directly to cancel out the intermediate variable B.',
    solution: 'A : C = (2/3) * (4/5) = 8 : 15.',
  },

  // CS Subjects / Flashcards & Questions
  // Operating Systems
  {
    id: 'cs-os-1',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What is the difference between preemptive and non-preemptive scheduling?',
    solution: 'Preemptive scheduling allows the OS kernel to interrupt a running process and assign the CPU to a higher priority process (e.g. Round Robin, SRTF). In non-preemptive scheduling, a process retains CPU control until it terminates or voluntarily yields for I/O (e.g. FCFS, SJF).',
  },
  {
    id: 'cs-os-thread',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'Microsoft',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the fundamental difference between a process and a thread in an operating system?',
    solution: 'A process is an executing program instance with its own virtual address space, memory pages, file descriptors, and security context. A thread is an execution unit inside a process that shares the address space, heap, and open files with other threads, maintaining its own registers, program counter, and stack.',
  },
  {
    id: 'fc-1',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the Convoy Effect?',
    solution: 'A phenomenon in First-Come, First-Served (FCFS) scheduling where many short I/O-bound processes wait behind a single CPU-intensive long process, leading to high average waiting time and poor device utilization.',
  },
  {
    id: 'fc-os-deadlock',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
    solution: 'A deadlock occurs in multi-programmed systems when all four Coffman conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If any one condition is broken, deadlock cannot occur.',
  },
  {
    id: 'cs-os-rr',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'Explain Round Robin scheduling and how time quantum affects performance.',
    solution: 'Round Robin gives each process a fixed time slice (quantum) in rotation. If the quantum is extremely large, Round Robin degenerates into FCFS. If it is too small, context-switch overhead dominates execution time, reducing overall CPU throughput.',
  },
  {
    id: 'fc-os-virtual-memory',
    topic_id: 'os',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'What is Thrashing in Virtual Memory and how is it resolved?',
    solution: 'Thrashing occurs when the system spends more time servicing page faults and swapping pages in/out of disk than executing useful user instructions. It is resolved using the Working Set Model or Page Fault Frequency algorithm, suspending low-priority processes to free memory.',
  },

  // DBMS and SQL
  {
    id: 'fc-2',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What are the ACID properties in database transactions?',
    solution: 'ACID guarantees that database transactions are processed reliably: Atomicity (all-or-nothing execution), Consistency (moves database from one valid state to another), Isolation (concurrent transactions execute without interference), and Durability (committed changes persist permanently).',
  },
  {
    id: 'cs-dbms-pk',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'Wipro',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What is the purpose of a primary key and foreign key in relational databases?',
    solution: 'A primary key uniquely identifies each record in a table, enforcing entity integrity (no duplicate or null values). A foreign key points to the primary key of another table, establishing a relationship and enforcing referential integrity.',
  },
  {
    id: 'cs-dbms-norm',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'Accenture',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What anomalies does database normalization aim to prevent?',
    solution: 'Normalization minimizes redundancy and prevents three major anomalies: Insertion anomaly (inability to add data without unrelated attributes), Deletion anomaly (unintended loss of data when deleting a record), and Update anomaly (inconsistent data due to partial duplicate updates).',
  },
  {
    id: 'cs-dbms-2nf3nf',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the difference between 2NF and 3NF in database normalization?',
    solution: '2NF requires 1NF and ensures there are no partial dependencies (every non-prime attribute must depend on the whole candidate key). 3NF requires 2NF and additionally eliminates transitive dependencies (no non-prime attribute depends on another non-prime attribute).',
  },
  {
    id: 'fc-db-indexing',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the difference between a Clustered Index and a Non-Clustered Index?',
    solution: 'A Clustered Index dictates the physical ordering of actual data rows on disk (only 1 per table, typically on the Primary Key). A Non-Clustered Index creates a separate B-tree structure holding indexed columns and pointers back to data rows (multiple permitted).',
  },
  {
    id: 'cs-2',
    topic_id: 'dbms',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'Which normal form deals with removing multi-valued dependency (MVD)?',
    solution: '4NF (Fourth Normal Form) eliminates multi-valued dependencies where a table has two or more independent multi-valued facts about an entity. A relation is in 4NF if it is in BCNF and for every non-trivial MVD X ->-> Y, X is a superkey.',
  },

  // Computer Networks
  {
    id: 'cs-cn-tcpip',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'Cognizant',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'List the four layers of the TCP/IP model.',
    solution: 'The 4 layers of the TCP/IP model from top to bottom are: 1. Application Layer (HTTP, FTP, DNS), 2. Transport Layer (TCP, UDP), 3. Internet/Network Layer (IP, ICMP), 4. Link/Network Access Layer (Ethernet, Wi-Fi).',
  },
  {
    id: 'cs-cn-transport',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'IBM',
    year_asked: 2023,
    difficulty: 'Easy',
    question_text: 'What is the primary function of the Transport layer in computer networking?',
    solution: 'The Transport layer is responsible for end-to-end communication, process-to-process addressing using port numbers, flow control (windowing), error checking, and segmentation/reassembly.',
  },
  {
    id: 'cs-cn-tcpudp',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'Accenture',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the difference between TCP and UDP?',
    solution: 'TCP is connection-oriented, reliable, guarantees in-order packet delivery, and has flow/congestion control with overhead. UDP is connectionless, lightweight, and fast, but offers no delivery guarantee, making it ideal for streaming and real-time gaming.',
  },
  {
    id: 'fc-3',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'Cisco',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'Explain the 3-Way Handshake mechanism in TCP.',
    solution: 'TCP uses a 3-way handshake to synchronize sequence numbers before data exchange: 1. Client sends SYN (Synchronize) packet with initial sequence number ISN_c. 2. Server replies with SYN-ACK, acknowledging ISN_c + 1 and providing ISN_s. 3. Client responds with ACK, acknowledging ISN_s + 1.',
  },
  {
    id: 'cs-cn-network',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'Accenture',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the role of the Network layer in the TCP/IP model?',
    solution: 'The Network layer is responsible for host-to-host addressing and packet routing across heterogeneous networks. It handles logical IP addressing, packet fragmentation, and path determination using routing algorithms like OSPF and BGP.',
  },
  {
    id: 'cs-cn-subnet',
    topic_id: 'cn',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'How does CIDR subnetting optimize IP address allocation compared to classful addressing?',
    solution: 'Classless Inter-Domain Routing (CIDR) replaces fixed Class A, B, and C boundaries with arbitrary variable-length subnet masks (VLSM). It allows prefix aggregation (route summarization), drastically slowing routing table growth and preventing IPv4 address space waste.',
  },

  // OOPS
  {
    id: 'cs-oop-inherit',
    topic_id: 'oops',
    category_id: 'cs-subjects',
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What is the difference between inheritance and polymorphism?',
    solution: 'Inheritance allows a child class to inherit fields and methods from a parent class promoting code reuse (is-a relationship). Polymorphism allows objects of different types to be treated through a uniform interface, executing appropriate behavior at runtime (e.g. method overriding).',
  },
  {
    id: 'cs-oop-overload',
    topic_id: 'oops',
    category_id: 'cs-subjects',
    company_name: 'TCS',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'Explain method overloading vs method overriding.',
    solution: 'Method Overloading occurs in the same class when multiple methods share the same name with different parameters (compile-time/static polymorphism). Method Overriding occurs when a subclass provides a specific implementation of a method defined in its superclass (runtime/dynamic polymorphism).',
  },
  {
    id: 'cs-oop-abstract',
    topic_id: 'oops',
    category_id: 'cs-subjects',
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is the difference between abstraction and encapsulation?',
    solution: 'Abstraction focuses on hiding background details and exposing only essential interfaces to the user (e.g. interfaces, abstract classes). Encapsulation bundles data and methods together inside a class and restricts direct access to internal state using access specifiers (private, protected).',
  },
  {
    id: 'cs-oop-diamond',
    topic_id: 'oops',
    category_id: 'cs-subjects',
    company_name: 'Microsoft',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'What is the diamond problem in multiple inheritance, and how is it resolved?',
    solution: 'The diamond problem occurs when a class D inherits from two classes B and C, which both inherit from class A. If D calls a method from A, ambiguity arises as to which parent path to follow. C++ resolves this via virtual inheritance (`class B : virtual public A`). Languages like Java disallow multiple inheritance of classes, allowing it only through interfaces.',
  },

  // Java
  {
    id: 'cs-java-jvm',
    topic_id: 'java',
    category_id: 'cs-subjects',
    company_name: 'Infosys',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What is the fundamental difference between JVM, JRE, and JDK?',
    solution: 'JVM (Java Virtual Machine) executes compiled bytecode line-by-line and manages memory. JRE (Java Runtime Environment) bundles the JVM with core class libraries to run Java apps. JDK (Java Development Kit) includes the JRE plus development tools like the javac compiler and debugger.',
  },
  {
    id: 'cs-java-string',
    topic_id: 'java',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'Why is String immutable in Java and where are string literals stored in memory?',
    solution: 'String is immutable in Java for security (passwords/network URLs cannot be altered), thread-safety (safe across concurrent threads without locks), and performance caching. String literals are stored in the String Constant Pool (SCP) inside the heap, allowing identical string literals to share one memory address.',
  },
  {
    id: 'cs-java-hashmap',
    topic_id: 'java',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'How does HashMap work internally in Java and how are collisions handled?',
    solution: 'HashMap uses an array of Node buckets. A key is hashed using `hashCode() & (n - 1)` to determine its bucket index. Collisions are handled using a LinkedList of entries. Since Java 8, if a bucket contains more than 8 elements (TREEIFY_THRESHOLD), the LinkedList converts into a balanced Red-Black Tree, improving lookup from O(n) to O(log n).',
  },
  {
    id: 'cs-java-gc',
    topic_id: 'java',
    category_id: 'cs-subjects',
    company_name: 'Amazon',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'How does generational Garbage Collection work in the HotSpot JVM?',
    solution: 'The JVM heap is divided based on object lifetime: Young Generation (Eden and Survivor spaces S0/S1) and Old (Tenured) Generation. New objects allocate in Eden. Minor GC collects short-lived objects from Eden to Survivor. Surviving objects increment in age until threshold (tenuring threshold) and promote to the Old Generation, where Major/Full GC runs less frequently.',
  },

  // C++
  {
    id: 'cs-cpp-pointer',
    topic_id: 'cpp',
    category_id: 'cs-subjects',
    company_name: 'Infosys',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'What is the difference between a pointer and a reference in C++?',
    solution: 'A pointer is a variable holding a memory address; it can be reassigned, set to nullptr, and requires explicit dereferencing (*p). A reference is an alias to an existing variable; it must be initialized at creation, cannot be null, and cannot be reseated to refer to another object.',
  },
  {
    id: 'cs-cpp-malloc',
    topic_id: 'cpp',
    category_id: 'cs-subjects',
    company_name: 'Capgemini',
    year_asked: 2024,
    difficulty: 'Easy',
    question_text: 'Explain the difference between malloc() and new in C++ memory management.',
    solution: '`malloc()` is a C library function that allocates raw bytes of memory without calling constructors and returns `void*`. `new` is a C++ operator that allocates memory, calls the object constructor, returns a typed pointer, and throws `std::bad_alloc` on failure instead of returning NULL.',
  },
  {
    id: 'cs-cpp-destructor',
    topic_id: 'cpp',
    category_id: 'cs-subjects',
    company_name: 'Zoho',
    year_asked: 2024,
    difficulty: 'Medium',
    question_text: 'What is a Virtual Destructor in C++ and why is it essential for base classes?',
    solution: 'A virtual destructor ensures that when a derived class object is deleted via a base class pointer, the derived class destructor executes first, followed by the base class destructor. Without `virtual`, only the base destructor runs, leaking resources allocated by the derived class.',
  },
  {
    id: 'cs-cpp-vtable',
    topic_id: 'cpp',
    category_id: 'cs-subjects',
    company_name: 'Microsoft',
    year_asked: 2024,
    difficulty: 'Hard',
    question_text: 'Explain how the VTABLE and VPTR mechanism achieves dynamic dispatch in C++.',
    solution: 'For every class with virtual functions, the compiler creates a static virtual method table (VTABLE) containing function pointers to the most-derived implementations. Each object instance of that class receives a hidden pointer (VPTR) pointing to its class VTABLE. At runtime, calling a virtual function dereferences VPTR to locate the method address in VTABLE.',
  },
];

// Flashcards for CS Concepts
export const mockFlashcards = [
  // Operating Systems
  {
    id: 'cs-os-1',
    subject: 'Operating Systems',
    topic: 'Process Scheduling',
    conceptLabel: 'Core Concept',
    difficulty: 'Easy',
    company_name: 'TCS',
    year_asked: 2024,
    front: 'What is the difference between preemptive and non-preemptive scheduling?',
    hint: 'Think about whether the OS can forcibly context-switch a running process before it voluntarily yields.',
    back: 'Preemptive scheduling allows the OS kernel to interrupt a running process and assign the CPU to a higher priority process. Non-preemptive scheduling allows a process to run until it terminates or yields for I/O.',
    keyPoints: [
      { label: 'Preemption Capability', text: 'Preemptive schedulers can forcibly interrupt running tasks; non-preemptive schedulers cannot.' },
      { label: 'Common Algorithms', text: 'Preemptive: Round Robin, SRTF, Priority. Non-preemptive: FCFS, Shortest Job First (SJF).' },
      { label: 'Responsiveness', text: 'Preemptive scheduling offers superior response time for interactive, time-sharing user applications.' },
    ],
    placementNote: 'Standard operating systems question in TCS NQT and Cognizant technical rounds.',
  },
  {
    id: 'cs-os-thread',
    subject: 'Operating Systems',
    topic: 'Process Management',
    conceptLabel: 'Core Concept',
    difficulty: 'Medium',
    company_name: 'Microsoft',
    year_asked: 2024,
    front: 'What is the fundamental difference between a process and a thread in an operating system?',
    hint: 'Consider aspects of memory address space, context switching overhead, and resource allocation.',
    back: 'A process is an executing instance of a program with its own independent address space (code, data, heap, and stack). A thread is the smallest schedulable execution unit inside a process, sharing code, data, and resources with peer threads.',
    keyPoints: [
      { label: 'Memory Space', text: 'Processes are isolated with separate virtual memories; threads share the parent process\'s memory space and open file descriptors.' },
      { label: 'Context Switch Overhead', text: 'Process switching is heavy (requires flushing MMU/TLB); thread switching is lightweight and significantly faster.' },
      { label: 'Fault Tolerance', text: 'If one process crashes, others run unaffected; an unhandled exception in one thread can terminate the entire host process.' },
    ],
    placementNote: 'Frequently asked in core technical rounds at Microsoft, Amazon, Cisco, and Qualcomm.',
  },
  {
    id: 'fc-1',
    subject: 'Operating Systems',
    topic: 'Process Scheduling',
    conceptLabel: 'Scheduling Anomaly',
    difficulty: 'Medium',
    company_name: 'TCS',
    year_asked: 2024,
    front: 'What is the Convoy Effect?',
    hint: 'Think about FCFS scheduling when a CPU-bound process arrives before I/O-bound processes.',
    back: 'A phenomenon in First-Come, First-Served (FCFS) scheduling where many short I/O-bound processes wait behind a single CPU-intensive long process, leading to high average waiting time and poor device utilization.',
    keyPoints: [
      { label: 'Root Cause', text: 'Non-preemptive nature of FCFS where CPU-intensive task hogs execution.' },
      { label: 'Consequence', text: 'I/O devices remain idle while I/O tasks are blocked in the ready queue.' },
      { label: 'Mitigation', text: 'Use preemptive scheduling algorithms like Round Robin or Shortest Remaining Time First (SRTF).' },
    ],
    placementNote: 'Asked commonly in campus placement tests by TCS, Cognizant, and Infosys.',
  },
  {
    id: 'fc-os-deadlock',
    subject: 'Operating Systems',
    topic: 'Concurrency & Deadlock',
    conceptLabel: 'Interview Favorite',
    difficulty: 'Medium',
    company_name: 'Zoho',
    year_asked: 2024,
    front: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
    hint: 'All four must hold simultaneously for deadlock to persist.',
    back: 'A deadlock occurs in multi-programmed systems when all four Coffman conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
    keyPoints: [
      { label: 'Mutual Exclusion', text: 'At least one resource must be held in a non-shareable mode.' },
      { label: 'Hold and Wait', text: 'A process must be holding at least one resource and requesting additional resources held by others.' },
      { label: 'No Preemption', text: 'Resources cannot be forcibly confiscated from a process holding them.' },
      { label: 'Circular Wait', text: 'A closed chain of processes exists, where each process holds resources needed by the next.' },
    ],
    placementNote: 'Standard question in technical rounds at Microsoft, Zoho, and Oracle.',
  },
  {
    id: 'cs-os-rr',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    conceptLabel: 'Algorithm Design',
    difficulty: 'Medium',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'Explain Round Robin scheduling and how time quantum affects performance.',
    hint: 'Analyze the trade-off between frequent context-switching and degenerate FCFS behavior.',
    back: 'Round Robin allocates a fixed CPU time quantum to each process in FIFO order. If quantum is too small, context-switching overhead reduces throughput; if quantum is too large, it degenerates into FCFS.',
    keyPoints: [
      { label: 'Time Quantum Sizing', text: 'Typically chosen between 10ms to 100ms so context switches consume < 1% CPU.' },
      { label: 'Turnaround Time', text: 'Varies with quantum size; optimal when most processes finish within 1 quantum.' },
      { label: 'Starvation-Free', text: 'Guarantees fairness and bounds maximum waiting time for all ready processes.' },
    ],
    placementNote: 'High-frequency question in Amazon and Cisco operating systems rounds.',
  },
  {
    id: 'fc-os-virtual-memory',
    subject: 'Operating Systems',
    topic: 'Memory Management',
    conceptLabel: 'System Design',
    difficulty: 'Hard',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'What is Thrashing in Virtual Memory and how is it resolved?',
    hint: 'Related to page fault frequency and working set size.',
    back: 'Thrashing occurs when the system spends more time servicing page faults and swapping pages in/out of disk than executing useful user instructions. CPU utilization drops drastically.',
    keyPoints: [
      { label: 'Cause', text: 'Sum of working sets of all active processes exceeds physical RAM capacity.' },
      { label: 'Resolution', text: 'Use Working Set Model or Page Fault Frequency (PFF) algorithm, and suspend/swap out low-priority processes.' },
    ],
    placementNote: 'Popular in operating systems depth interviews at Qualcomm and Intel.',
  },

  // DBMS and SQL
  {
    id: 'fc-2',
    subject: 'DBMS and SQL',
    topic: 'Transactions',
    conceptLabel: 'Core Concept',
    difficulty: 'Easy',
    company_name: 'TCS',
    year_asked: 2024,
    front: 'What are the ACID properties in database transactions?',
    hint: 'Atomicity, Consistency, Isolation, and Durability.',
    back: 'ACID properties guarantee that database transactions are processed reliably, preserving database integrity even in the presence of concurrent execution, power failures, or crashes.',
    keyPoints: [
      { label: 'Atomicity', text: 'All operations succeed or the entire transaction is rolled back (all-or-nothing).' },
      { label: 'Consistency', text: 'Transaction transforms the database from one valid state to another valid state.' },
      { label: 'Isolation', text: 'Concurrent transactions execute as if they were running serially without interference.' },
      { label: 'Durability', text: 'Once committed, changes survive system reboots or power loss permanently.' },
    ],
    placementNote: 'Universal question across all campus IT and software interviews.',
  },
  {
    id: 'cs-dbms-pk',
    subject: 'DBMS and SQL',
    topic: 'Keys & Constraints',
    conceptLabel: 'Relational Model',
    difficulty: 'Easy',
    company_name: 'Wipro',
    year_asked: 2024,
    front: 'What is the purpose of a primary key and foreign key in relational databases?',
    hint: 'Consider entity integrity vs referential integrity between tables.',
    back: 'A primary key uniquely identifies rows in a table (non-null, unique). A foreign key creates a relationship referencing a primary key in another table, enforcing referential integrity.',
    keyPoints: [
      { label: 'Primary Key', text: 'Guarantees entity uniqueness, automatically indexed as clustered index in most engines.' },
      { label: 'Foreign Key', text: 'Prevents orphaned records and enforces parent-child referential constraints.' },
    ],
    placementNote: 'Asked across Wipro, TCS, and Infosys entry assessments.',
  },
  {
    id: 'cs-dbms-norm',
    subject: 'DBMS and SQL',
    topic: 'Normalization',
    conceptLabel: 'Schema Design',
    difficulty: 'Medium',
    company_name: 'Accenture',
    year_asked: 2024,
    front: 'What anomalies does database normalization aim to prevent?',
    hint: 'Insertion, Deletion, and Update anomalies resulting from data redundancy.',
    back: 'Database normalization decomposes relations to eliminate redundant data and avoid insertion, update, and deletion anomalies while maintaining data dependency.',
    keyPoints: [
      { label: 'Insertion Anomaly', text: 'Unable to insert certain data without inserting unrelated attributes.' },
      { label: 'Update Anomaly', text: 'Redundant copies lead to inconsistencies if only some records are updated.' },
      { label: 'Deletion Anomaly', text: 'Deleting one piece of information unintentionally removes other valid data.' },
    ],
    placementNote: 'Core interview question at Accenture and Cognizant.',
  },
  {
    id: 'cs-dbms-2nf3nf',
    subject: 'DBMS and SQL',
    topic: 'Normalization',
    conceptLabel: 'Normal Forms',
    difficulty: 'Medium',
    company_name: 'TCS',
    year_asked: 2024,
    front: 'What is the difference between 2NF and 3NF in database normalization?',
    hint: 'Focus on partial dependency vs transitive dependency.',
    back: '2NF eliminates partial dependencies where a non-prime attribute depends on part of a composite key. 3NF further eliminates transitive dependencies where a non-prime attribute depends on another non-prime attribute.',
    keyPoints: [
      { label: '2NF Rule', text: 'Relation must be in 1NF and have no partial dependencies on candidate keys.' },
      { label: '3NF Rule', text: 'Relation must be in 2NF and have no transitive dependencies (X -> Y requires X is superkey or Y is prime).' },
    ],
    placementNote: 'Standard database design round question at TCS and Infosys.',
  },
  {
    id: 'fc-db-indexing',
    subject: 'DBMS and SQL',
    topic: 'Indexing & Storage',
    conceptLabel: 'Performance',
    difficulty: 'Medium',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'What is the difference between a Clustered Index and a Non-Clustered Index?',
    hint: 'Think about physical row order on disk vs index pointer structures.',
    back: 'A Clustered Index dictates the physical ordering of actual data rows on the storage disk (only 1 per table). A Non-Clustered Index creates a separate structure containing index keys and row pointers (multiple allowed per table).',
    keyPoints: [
      { label: 'Physical Order', text: 'Clustered physically sorts data; non-clustered maintains logical pointers.' },
      { label: 'Leaf Nodes', text: 'Clustered leaf nodes contain data pages; non-clustered leaf nodes contain row locators.' },
      { label: 'Quantity', text: 'Only 1 clustered index per table (typically Primary Key); up to 999 non-clustered.' },
    ],
    placementNote: 'Extensively tested in DBA and backend rounds at Amazon and Zoho.',
  },
  {
    id: 'cs-2',
    subject: 'DBMS and SQL',
    topic: 'Normalization',
    conceptLabel: 'Advanced Theory',
    difficulty: 'Hard',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'Which normal form deals with removing multi-valued dependency (MVD)?',
    hint: 'Focus on relations with independent multiple values per entity.',
    back: '4NF (Fourth Normal Form) addresses and eliminates non-trivial multi-valued dependencies where one entity has two or more independent multivalued relationships.',
    keyPoints: [
      { label: 'Definition', text: 'A table is in 4NF if in BCNF and every non-trivial MVD X ->-> Y has X as superkey.' },
      { label: 'Resolution', text: 'Split into separate tables so each table represents one independent relationship.' },
    ],
    placementNote: 'Advanced database theory tested in Amazon technical interviews.',
  },

  // Computer Networks
  {
    id: 'cs-cn-tcpip',
    subject: 'Computer Networks',
    topic: 'Network Models',
    conceptLabel: 'Core Architecture',
    difficulty: 'Easy',
    company_name: 'Cognizant',
    year_asked: 2024,
    front: 'List the four layers of the TCP/IP model.',
    hint: 'From Application at the top to physical transmission at the bottom.',
    back: 'The TCP/IP model consists of four layers: Application, Transport, Internet/Network, and Link/Network Access layers, organizing network communication into standardized abstractions.',
    keyPoints: [
      { label: 'Application Layer', text: 'Protocols like HTTP, HTTPS, DNS, and SMTP directly interact with software.' },
      { label: 'Transport Layer', text: 'TCP and UDP provide end-to-end transport and port-to-port delivery.' },
      { label: 'Internet Layer', text: 'IP and ICMP handle logical addressing and packet routing across networks.' },
      { label: 'Link Layer', text: 'Handles physical media, MAC addressing, and frame transmission (Ethernet/Wi-Fi).' },
    ],
    placementNote: 'Frequent question in campus IT networking interviews.',
  },
  {
    id: 'cs-cn-transport',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    conceptLabel: 'Protocol Functions',
    difficulty: 'Easy',
    company_name: 'IBM',
    year_asked: 2023,
    front: 'What is the primary function of the Transport layer in computer networking?',
    hint: 'Distinguish between host-to-host and process-to-process delivery.',
    back: 'The Transport layer is responsible for process-to-process delivery using port numbers, managing segmentation, reliability, flow control, and connection establishment.',
    keyPoints: [
      { label: 'Port Addressing', text: 'Directs packet payloads to specific applications on the operating system.' },
      { label: 'Flow & Congestion', text: 'Prevents sender from overwhelming receiver buffers (sliding window).' },
    ],
    placementNote: 'Asked commonly in IBM and TCS technical rounds.',
  },
  {
    id: 'cs-cn-tcpudp',
    subject: 'Computer Networks',
    topic: 'Protocols',
    conceptLabel: 'Protocol Comparison',
    difficulty: 'Medium',
    company_name: 'Accenture',
    year_asked: 2024,
    front: 'What is the difference between TCP and UDP?',
    hint: 'Reliability and connection overhead vs speed and simplicity.',
    back: 'TCP is connection-oriented, reliable, and guarantees in-order delivery with flow/congestion control. UDP is connectionless and lightweight with no delivery guarantees, prioritizing speed.',
    keyPoints: [
      { label: 'Connection', text: 'TCP requires 3-way handshake; UDP sends datagrams without pre-established session.' },
      { label: 'Reliability', text: 'TCP uses ACKs and retransmissions; UDP provides best-effort delivery.' },
      { label: 'Use Cases', text: 'TCP: Web (HTTP), Email, File Transfer. UDP: Video streaming, VoIP, DNS, Gaming.' },
    ],
    placementNote: 'Asked across Accenture, Cognizant, and Wipro recruitment drives.',
  },
  {
    id: 'fc-3',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    conceptLabel: 'Protocols',
    difficulty: 'Medium',
    company_name: 'Cisco',
    year_asked: 2024,
    front: 'Explain the 3-Way Handshake mechanism in TCP.',
    hint: 'SYN, SYN-ACK, ACK sequence establishing sequence numbers.',
    back: 'The TCP 3-Way Handshake is the connection establishment protocol that synchronizes sequence numbers (ISN) and buffer allocations between client and server before data transfer begins.',
    keyPoints: [
      { label: 'Step 1 (SYN)', text: 'Client sends SYN packet with initial client sequence number (ISN_c).' },
      { label: 'Step 2 (SYN-ACK)', text: 'Server replies with SYN-ACK, acknowledging ISN_c + 1 and sending ISN_s.' },
      { label: 'Step 3 (ACK)', text: 'Client acknowledges ISN_s + 1 with ACK packet. Socket transitions to ESTABLISHED.' },
    ],
    placementNote: 'Mandatory networking topic for Cisco, Akamai, and Arista campus drives.',
  },
  {
    id: 'cs-cn-network',
    subject: 'Computer Networks',
    topic: 'Network Layer',
    conceptLabel: 'Routing',
    difficulty: 'Medium',
    company_name: 'Accenture',
    year_asked: 2024,
    front: 'What is the role of the Network layer in the TCP/IP model?',
    hint: 'Think about IP addressing, fragmentation, and packet routing across networks.',
    back: 'The Network layer handles logical addressing (IP) and routing, moving packets from source host to destination host across interconnected intermediate routers.',
    keyPoints: [
      { label: 'Logical Addressing', text: 'Assigns unique IPv4/IPv6 addresses to network interfaces.' },
      { label: 'Routing Protocols', text: 'Uses algorithms (Dijkstra/Bellman-Ford) to compute optimal forwarding paths.' },
    ],
    placementNote: 'High frequency in telecom and enterprise networks hiring.',
  },
  {
    id: 'cs-cn-subnet',
    subject: 'Computer Networks',
    topic: 'IP Addressing',
    conceptLabel: 'Subnetting',
    difficulty: 'Hard',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'How does CIDR subnetting optimize IP address allocation compared to classful addressing?',
    hint: 'Consider prefix masks (/24) and route aggregation.',
    back: 'Classless Inter-Domain Routing (CIDR) eliminates rigid Class A/B/C boundaries, enabling variable prefix lengths (/n) to match precise host needs and aggregate routing entries.',
    keyPoints: [
      { label: 'Prefix Representation', text: 'Uses /prefix notation representing network bits, allowing flexible subnet sizing.' },
      { label: 'Route Summarization', text: 'Enables multiple contiguous subnets to be advertised as a single route entry.' },
    ],
    placementNote: 'Cloud infrastructure interviews at Amazon AWS, Cisco, and Microsoft Azure.',
  },

  // OOPS
  {
    id: 'cs-oop-inherit',
    subject: 'OOPS',
    topic: 'OOP Fundamentals',
    conceptLabel: 'Core Principle',
    difficulty: 'Easy',
    company_name: 'Zoho',
    year_asked: 2024,
    front: 'What is the difference between inheritance and polymorphism?',
    hint: 'Code reuse and is-a hierarchy versus dynamic method execution.',
    back: 'Inheritance allows a derived class to acquire properties and behaviors of a base class. Polymorphism allows objects of different classes to be accessed through a common interface with behavior decided at runtime.',
    keyPoints: [
      { label: 'Inheritance Focus', text: 'Structural code reuse establishing hierarchical relationships.' },
      { label: 'Polymorphism Focus', text: 'Behavioral flexibility allowing different implementations under one method call.' },
    ],
    placementNote: 'Essential concept tested at Zoho, TCS, and Infosys.',
  },
  {
    id: 'cs-oop-overload',
    subject: 'OOPS',
    topic: 'Polymorphism',
    conceptLabel: 'Static vs Dynamic',
    difficulty: 'Medium',
    company_name: 'TCS',
    year_asked: 2024,
    front: 'Explain method overloading vs method overriding.',
    hint: 'Compile-time same class versus runtime subclass implementation.',
    back: 'Method Overloading occurs when methods in the same class share a name but differ in signature (compile-time polymorphism). Method Overriding occurs when a subclass redefines an inherited parent method (runtime polymorphism).',
    keyPoints: [
      { label: 'Overloading', text: 'Same class, different parameters, resolved at compile-time by compiler.' },
      { label: 'Overriding', text: 'Subclass redefinition, same signature, resolved at runtime using dynamic dispatch.' },
    ],
    placementNote: 'Universal question across technical software interviews.',
  },
  {
    id: 'cs-oop-abstract',
    subject: 'OOPS',
    topic: 'Encapsulation & Abstraction',
    conceptLabel: 'OOP Design',
    difficulty: 'Medium',
    company_name: 'Zoho',
    year_asked: 2024,
    front: 'What is the difference between abstraction and encapsulation?',
    hint: 'Hiding complexity (what it does) versus hiding internal data (how it stores).',
    back: 'Abstraction hides internal implementation complexity and exposes only essential interfaces. Encapsulation bundles data and methods together and protects internal state via access modifiers.',
    keyPoints: [
      { label: 'Abstraction', text: 'Solved using abstract classes and interfaces (outer view).' },
      { label: 'Encapsulation', text: 'Solved using private fields and public getters/setters (data hiding).' },
    ],
    placementNote: 'Key question in Zoho problem solving and OOP design rounds.',
  },
  {
    id: 'cs-oop-diamond',
    subject: 'OOPS',
    topic: 'Inheritance',
    conceptLabel: 'Advanced Pattern',
    difficulty: 'Hard',
    company_name: 'Microsoft',
    year_asked: 2024,
    front: 'What is the diamond problem in multiple inheritance, and how is it resolved?',
    hint: 'Ambiguity when class D inherits from B and C, which both inherit from base A.',
    back: 'The diamond problem arises when a class inherits from two parent classes that share a common grandparent. Calling grandparent methods causes ambiguity. Resolved in C++ using virtual inheritance; avoided in Java via interface contracts.',
    keyPoints: [
      { label: 'Ambiguity Cause', text: 'Derived class receives duplicate instances of the common grandparent class.' },
      { label: 'Resolution', text: 'Virtual base classes ensure only a single shared instance of the grandparent exists.' },
    ],
    placementNote: 'Popular technical question at Microsoft, Zoho, and Oracle.',
  },

  // Java
  {
    id: 'cs-java-jvm',
    subject: 'Java',
    topic: 'Java Architecture',
    conceptLabel: 'Architecture',
    difficulty: 'Easy',
    company_name: 'Infosys',
    year_asked: 2024,
    front: 'What is the fundamental difference between JVM, JRE, and JDK?',
    hint: 'Execution engine vs runtime environment vs complete development toolkit.',
    back: 'JVM executes Java bytecode and handles memory. JRE bundles JVM with standard class libraries to run applications. JDK is the full development kit containing JRE plus development tools (javac, javadoc).',
    keyPoints: [
      { label: 'JVM', text: 'Abstract computing machine that loads, verifies, and executes bytecode.' },
      { label: 'JRE', text: 'JVM + runtime libraries (rt.jar/modules); runtime-only bundle.' },
      { label: 'JDK', text: 'JRE + developer tools (javac compiler, debugger); needed to build Java software.' },
    ],
    placementNote: 'Standard question in Java developer interviews across campus drives.',
  },
  {
    id: 'cs-java-string',
    subject: 'Java',
    topic: 'Memory & Strings',
    conceptLabel: 'String Internals',
    difficulty: 'Medium',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'Why is String immutable in Java and where are string literals stored in memory?',
    hint: 'Security, thread-safety, String Constant Pool, and caching.',
    back: 'Strings in Java are immutable for security, thread safety, and memory caching. String literals are stored in the String Constant Pool (SCP) inside the Heap memory, enabling reuse of duplicate strings.',
    keyPoints: [
      { label: 'Security', text: 'Prevents tampering with parameters used in database connections, file paths, and network sockets.' },
      { label: 'Thread Safety', text: 'Immutable instances can be safely shared across threads without synchronization.' },
      { label: 'Memory Optimization', text: 'Identical literals share the same reference in the String Constant Pool.' },
    ],
    placementNote: 'Very popular in Amazon and Cognizant technical rounds.',
  },
  {
    id: 'cs-java-hashmap',
    subject: 'Java',
    topic: 'Collections Framework',
    conceptLabel: 'Data Structures',
    difficulty: 'Medium',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'How does HashMap work internally in Java and how are collisions handled?',
    hint: 'Array of buckets, hash codes, linked list chaining, and treeification at threshold 8.',
    back: 'HashMap uses an array of Node buckets. Keys are mapped to buckets using hash functions. Collisions are handled via linked list chaining, which converts to a Red-Black Tree when bucket size exceeds 8 (Java 8+).',
    keyPoints: [
      { label: 'Bucket Indexing', text: 'Calculated as `hash(key) & (n - 1)` where n is array capacity (power of 2).' },
      { label: 'Collision Resolution', text: 'Chaining with LinkedList, converting to Balanced Tree (O(log n)) if chain length > 8.' },
    ],
    placementNote: 'Standard question in Amazon SDE-1 and product company interviews.',
  },
  {
    id: 'cs-java-gc',
    subject: 'Java',
    topic: 'JVM Internals',
    conceptLabel: 'Memory Management',
    difficulty: 'Hard',
    company_name: 'Amazon',
    year_asked: 2024,
    front: 'How does generational Garbage Collection work in the HotSpot JVM?',
    hint: 'Young generation (Eden, Survivor) vs Old generation, and the weak generational hypothesis.',
    back: 'Generational GC partitions heap into Young Generation (Eden, S0, S1) and Old Generation based on the premise that most objects die young. Surviving objects promote to Old Generation after repeated collections.',
    keyPoints: [
      { label: 'Young Generation', text: 'Eden collects rapidly via Minor GC; survivors alternate between S0/S1.' },
      { label: 'Tenured Generation', text: 'Long-lived objects promoted here are collected during Major/Full GC.' },
    ],
    placementNote: 'Depth question in backend engineering interviews at Amazon, Oracle, and Goldman Sachs.',
  },

  // C++
  {
    id: 'cs-cpp-pointer',
    subject: 'C++',
    topic: 'Pointers & References',
    conceptLabel: 'Memory & Syntax',
    difficulty: 'Easy',
    company_name: 'Infosys',
    year_asked: 2024,
    front: 'What is the difference between a pointer and a reference in C++?',
    hint: 'Address variable that can be null/reassigned versus fixed variable alias.',
    back: 'A pointer is a variable that stores a memory address and can be null or reassigned. A reference is an immutable alias to an existing object that must be initialized upon declaration and cannot be null.',
    keyPoints: [
      { label: 'Nullability', text: 'Pointers can be `nullptr`; references must always refer to a valid object.' },
      { label: 'Reassignment', text: 'Pointers can point to new memory addresses; references cannot be reseated.' },
      { label: 'Syntax', text: 'Pointers require explicit dereferencing (*p); references use standard object syntax.' },
    ],
    placementNote: 'Standard screening question for C++ roles at Infosys, TCS, and Qualcomm.',
  },
  {
    id: 'cs-cpp-malloc',
    subject: 'C++',
    topic: 'Memory Management',
    conceptLabel: 'C vs C++',
    difficulty: 'Easy',
    company_name: 'Capgemini',
    year_asked: 2024,
    front: 'Explain the difference between malloc() and new in C++ memory management.',
    hint: 'C library function returning raw bytes versus C++ operator invoking constructors.',
    back: '`malloc()` is a C function allocating uninitialized bytes without invoking constructors. `new` is a C++ language operator that allocates memory, invokes object constructors, and returns typed pointers.',
    keyPoints: [
      { label: 'Constructors', text: '`new` automatically calls class constructors; `malloc()` allocates raw memory only.' },
      { label: 'Type Safety', text: '`new` returns exact pointer type; `malloc()` returns `void*` requiring casting.' },
      { label: 'Error Handling', text: '`new` throws `std::bad_alloc`; `malloc()` returns `NULL`.' },
    ],
    placementNote: 'Asked commonly in technical tests by Capgemini, TCS, and Wipro.',
  },
  {
    id: 'cs-cpp-destructor',
    subject: 'C++',
    topic: 'Polymorphism & Memory',
    conceptLabel: 'Virtual Functions',
    difficulty: 'Medium',
    company_name: 'Zoho',
    year_asked: 2024,
    front: 'What is a Virtual Destructor in C++ and why is it essential for polymorphic base classes?',
    hint: 'Deleting derived object through base class pointer.',
    back: 'A virtual destructor ensures that when a derived object is deleted via a base class pointer, the derived destructor is invoked first, properly cleaning up derived resources and preventing memory leaks.',
    keyPoints: [
      { label: 'Without Virtual', text: 'Only the base destructor is called, causing resource and memory leaks.' },
      { label: 'With Virtual', text: 'Dynamic dispatch guarantees derived destructor executes before base destructor.' },
    ],
    placementNote: 'Core C++ interview question at Zoho, Qualcomm, and Nvidia.',
  },
  {
    id: 'cs-cpp-vtable',
    subject: 'C++',
    topic: 'Dynamic Dispatch',
    conceptLabel: 'Compiler Internals',
    difficulty: 'Hard',
    company_name: 'Microsoft',
    year_asked: 2024,
    front: 'Explain how the VTABLE and VPTR mechanism achieves dynamic dispatch in C++.',
    hint: 'Compiler generated function pointer table and instance pointer for virtual methods.',
    back: 'The compiler generates a static VTABLE of virtual function pointers for each polymorphic class. Each object instance contains a VPTR pointing to its class VTABLE, resolving virtual calls dynamically at runtime.',
    keyPoints: [
      { label: 'VTABLE', text: 'Array of function pointers created once per class containing virtual methods.' },
      { label: 'VPTR', text: 'Hidden pointer added by compiler to each object instance, pointing to its VTABLE.' },
    ],
    placementNote: 'Advanced C++ round question at Microsoft, Qualcomm, and Cisco.',
  },
];

// Drive Alerts: Campus Placement Drives
export const mockDriveAlerts = [
  {
    id: 'drive-1',
    company: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    role: 'Software Development Engineer (SDE-1)',
    ctc: '28 - 44 LPA',
    date: '28 Oct 2026',
    status: 'Upcoming',
    branches: ['CSE', 'IT', 'ECE', 'ADS'],
    minCgpa: 8.0,
    rounds: ['Online Assessment (OA)', 'Technical Interview 1', 'Technical Interview 2', 'Bar Raiser (Behavioral)'],
    location: 'Virtual / Campus',
  },
  {
    id: 'drive-2',
    company: 'Zoho Corporation',
    logo: '/zoho-logo.png',
    role: 'Member Technical Staff (MTS)',
    ctc: '8.5 - 12 LPA',
    date: '04 Nov 2026',
    status: 'Upcoming',
    branches: ['All B.E / B.Tech'],
    minCgpa: 7.0,
    rounds: ['Round 1: C/Java Aptitude & Basic Coding', 'Round 2: Advanced Programming', 'Round 3: System Design / Problem Solving', 'Round 4: HR'],
    location: 'RMK Campus Auditorium',
  },
  {
    id: 'drive-3',
    company: 'Tata Consultancy Services (TCS)',
    logo: '/tcs-logo.png',
    role: 'TCS Digital / Prime',
    ctc: '7.5 - 9.0 LPA',
    date: '15 Nov 2026',
    status: 'Registration Open',
    branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
    minCgpa: 6.5,
    rounds: ['TCS NQT (Aptitude + Advanced Coding)', 'Technical Interview', 'MR + HR Interview'],
    location: 'Campus Labs',
  },
  {
    id: 'drive-4',
    company: 'Accenture',
    logo: '/accenture-logo.png',
    role: 'Advanced Associate Software Engineer',
    ctc: '6.5 LPA',
    date: '22 Nov 2026',
    status: 'Registration Open',
    branches: ['CSE', 'IT', 'ECE'],
    minCgpa: 6.5,
    rounds: ['Cognitive & Technical Assessment', 'Coding Assessment', 'Communication Assessment', 'Interview'],
    location: 'Virtual',
  },
];

// Helper delay
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeQuestion = (q) => {
  if (!q) return null;
  let options = q.options;
  let correct_option = q.correct_option ?? 1;
  if (!options || !Array.isArray(options) || options.length < 2) {
    options = [
      'Increases throughput while minimizing execution overhead.',
      q.solution ? (q.solution.length > 70 ? q.solution.slice(0, 68) + '...' : q.solution) : 'Correct fundamental design pattern and verification rule.',
      'Requires hardware-level atomic synchronization primitives.',
      'Degrades cache coherence across multi-core processors.',
    ];
    correct_option = 1;
  }
  return {
    ...q,
    title: q.title || (q.question_text ? (q.question_text.length > 55 ? q.question_text.slice(0, 52) + '...' : q.question_text) : 'Practice Question'),
    options,
    correct_option,
    formula: q.formula || 'Fundamental Principle & Verification Rule',
    solution_steps: q.solution_steps || [
      'Analyze the problem definition and identify core constraints.',
      q.solution || 'Verify the solution steps against theoretical principles.',
      `Therefore, the correct answer is Option ${String.fromCharCode(65 + correct_option)}.`,
    ],
    exam_tip: q.exam_tip || 'Focus on fundamental concepts and standard edge cases frequently tested in placement interviews.',
  };
};

export const mockApiService = {
  getCompanies: async (search) => {
    await delay();
    if (!search) return mockCompanies;
    const query = search.toLowerCase();
    return mockCompanies.filter((c) => c.name.toLowerCase().includes(query));
  },

  getCategories: async () => {
    await delay();
    return mockCategories;
  },

  getTopics: async ({ categoryId, search } = {}) => {
    await delay();
    let result = mockTopics;
    if (categoryId) {
      result = result.filter((t) => t.category_id === categoryId);
    }
    if (search) {
      const query = search.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(query));
    }
    return result;
  },

  getQuestions: async ({ topicId, difficulty, search, companyId } = {}) => {
    await delay();
    let result = mockQuestions;
    if (topicId) {
      result = result.filter((item) => item.topic_id === topicId);
    }
    if (difficulty && difficulty !== 'all') {
      result = result.filter((item) => item.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (companyId) {
      const compLower = companyId.toLowerCase();
      const companyFiltered = result.filter((item) => (item.company_name || '').toLowerCase().includes(compLower));
      if (companyFiltered.length > 0) {
        result = companyFiltered;
      }
    }
    if (search) {
      const query = search.toLowerCase();
      result = result.filter((item) =>
        (item.question_text || '').toLowerCase().includes(query) ||
        (item.company_name || '').toLowerCase().includes(query)
      );
    }
    return result.map(normalizeQuestion);
  },

  getQuestionById: async (id) => {
    await delay();
    const foundQ = mockQuestions.find((q) => String(q.id) === String(id));
    if (foundQ) return normalizeQuestion(foundQ);

    const foundFC = mockFlashcards.find((f) => String(f.id) === String(id));
    if (foundFC) {
      return normalizeQuestion({
        id: foundFC.id,
        title: foundFC.topic || foundFC.conceptLabel || 'Concept Question',
        difficulty: foundFC.difficulty,
        question_text: foundFC.front,
        solution_text: foundFC.back,
        company_name: foundFC.company_name,
        year_asked: foundFC.year_asked,
        topic_name: foundFC.topic,
        subject: foundFC.subject,
        exam_tip: foundFC.placementNote,
      });
    }

    return normalizeQuestion({
      id,
      title: 'Practice Question',
      question_text: 'Sample question content for frontend development and testing.',
      solution: 'Detailed step-by-step approach and solution explanation.',
      difficulty: 'Medium',
      year_asked: 2024,
      company_name: 'Campus Recruiter',
    });
  },

  getFlashcards: async (params) => {
    await delay();
    if (!params) return mockFlashcards;
    if (typeof params === 'string') {
      return mockFlashcards.filter((f) => (f.topic || '').toLowerCase().includes(params.toLowerCase()));
    }
    const { topic, subject, difficulty, companyId } = params;
    let result = mockFlashcards;
    if (subject && subject !== 'All Subjects') {
      result = result.filter((f) => (f.subject || '').toLowerCase() === subject.toLowerCase());
    }
    if (topic) {
      result = result.filter((f) => (f.topic || '').toLowerCase().includes(topic.toLowerCase()));
    }
    if (difficulty && difficulty !== 'all') {
      result = result.filter((f) => (f.difficulty || '').toLowerCase() === difficulty.toLowerCase());
    }
    if (companyId) {
      const compLower = companyId.toLowerCase();
      const compMatch = result.filter((f) => (f.company_name || '').toLowerCase().includes(compLower));
      if (compMatch.length > 0) {
        result = compMatch;
      }
    }
    return result;
  },

  getDriveAlerts: async () => {
    await delay();
    return mockDriveAlerts;
  },
};

export default mockApiService;
