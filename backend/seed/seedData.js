const seedData = {
  companies: [
    { name: "Amazon", logo_url: "https://logo.clearbit.com/amazon.com" },
    { name: "TCS", logo_url: "https://logo.clearbit.com/tcs.com" },
    { name: "Google", logo_url: "https://logo.clearbit.com/google.com" },
    { name: "Infosys", logo_url: "https://logo.clearbit.com/infosys.com" },
    { name: "Microsoft", logo_url: "https://logo.clearbit.com/microsoft.com" },
    { name: "Wipro", logo_url: "https://logo.clearbit.com/wipro.com" },
  ],
  categories: [
    { name: "Aptitude", is_common: true },
    { name: "Coding", is_common: true },
    { name: "CS Subjects", is_common: true },
    { name: "Interview", is_common: true }
  ],
  // topics use a temporary string key system for referencing parents before real UUIDs exist —
  // structure: { key, name, categoryName, companyName (or null for Common Prep), parentKey (or null) }
  topics: [
    // --- Aptitude, Company Specific (Amazon) ---
    { key: "amazon-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "Amazon", parentKey: null },
    { key: "amazon-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "Amazon", parentKey: "amazon-apt-quant" },

    // --- Coding, Company Specific (Amazon) ---
    { key: "amazon-coding-java", name: "Java", categoryName: "Coding", companyName: "Amazon", parentKey: null },
    { key: "amazon-coding-java-arrays", name: "Arrays", categoryName: "Coding", companyName: "Amazon", parentKey: "amazon-coding-java" },

    // --- Aptitude, Common Prep ---
    { key: "common-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-quant" },
    { key: "common-apt-logical", name: "Logical Reasoning", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-logical-puzzles", name: "Puzzles", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-logical" },

    // --- Coding, Common Prep ---
    { key: "common-coding-java", name: "Java", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-java-arrays", name: "Arrays", categoryName: "Coding", companyName: null, parentKey: "common-coding-java" },

    // --- CS Subjects, Common Prep ---
    { key: "common-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-dbms" },

    // --- Interview, Common Prep ---
    { key: "common-interview-hr", name: "HR", categoryName: "Interview", companyName: null, parentKey: null },
    { key: "common-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: null, parentKey: "common-interview-hr" },

    // --- Coding, Common Prep: add C++ and Python sections ---
    { key: "common-coding-cpp", name: "C++", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-cpp-strings", name: "Strings", categoryName: "Coding", companyName: null, parentKey: "common-coding-cpp" },
    { key: "common-coding-python", name: "Python", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-python-dictionaries", name: "Dictionaries", categoryName: "Coding", companyName: null, parentKey: "common-coding-python" },

    // --- CS Subjects, Common Prep: add OS, CN, OOP (DBMS already exists) ---
    { key: "common-cs-os", name: "OS", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-os-processscheduling", name: "Process Scheduling", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-os" },
    { key: "common-cs-cn", name: "CN", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-cn-tcpip", name: "TCP/IP Model", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-cn" },
    { key: "common-cs-oop", name: "OOP", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-oop-inheritance", name: "Inheritance & Polymorphism", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-oop" },

    // --- TCS, Company Specific: Coding + CS Subjects ---
    { key: "tcs-coding-cpp", name: "C++", categoryName: "Coding", companyName: "TCS", parentKey: null },
    { key: "tcs-coding-cpp-strings", name: "Strings", categoryName: "Coding", companyName: "TCS", parentKey: "tcs-coding-cpp" },
    { key: "tcs-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: "TCS", parentKey: null },
    { key: "tcs-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: "TCS", parentKey: "tcs-cs-dbms" },

    // --- Google, Company Specific: Coding + CS Subjects ---
    { key: "google-coding-java", name: "Java", categoryName: "Coding", companyName: "Google", parentKey: null },
    { key: "google-coding-java-trees", name: "Trees", categoryName: "Coding", companyName: "Google", parentKey: "google-coding-java" },
    { key: "google-cs-os", name: "OS", categoryName: "CS Subjects", companyName: "Google", parentKey: null },
    { key: "google-cs-os-processscheduling", name: "Process Scheduling", categoryName: "CS Subjects", companyName: "Google", parentKey: "google-cs-os" },

    // --- Aptitude, Common Prep: Verbal Ability (the last uncovered Aptitude section) ---
    { key: "common-apt-verbal", name: "Verbal Ability", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-verbal-synonyms", name: "Synonyms & Antonyms", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-verbal" },

    // --- Interview, Common Prep: Technical (the last uncovered Interview section) ---
    { key: "common-interview-technical", name: "Technical", categoryName: "Interview", companyName: null, parentKey: null },
    { key: "common-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: null, parentKey: "common-interview-technical" },

    // --- Infosys, Company Specific: Aptitude + Interview (Infosys drives are aptitude-heavy) ---
    { key: "infosys-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "Infosys", parentKey: null },
    { key: "infosys-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "Infosys", parentKey: "infosys-apt-quant" },
    { key: "infosys-interview-hr", name: "HR", categoryName: "Interview", companyName: "Infosys", parentKey: null },
    { key: "infosys-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Infosys", parentKey: "infosys-interview-hr" },

    // --- Microsoft, Company Specific: Coding + Interview ---
    { key: "microsoft-coding-java", name: "Java", categoryName: "Coding", companyName: "Microsoft", parentKey: null },
    { key: "microsoft-coding-java-trees", name: "Trees", categoryName: "Coding", companyName: "Microsoft", parentKey: "microsoft-coding-java" },
    { key: "microsoft-interview-technical", name: "Technical", categoryName: "Interview", companyName: "Microsoft", parentKey: null },
    { key: "microsoft-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: "Microsoft", parentKey: "microsoft-interview-technical" },

    // --- Wipro, Company Specific: Aptitude + CS Subjects ---
    { key: "wipro-apt-verbal", name: "Verbal Ability", categoryName: "Aptitude", companyName: "Wipro", parentKey: null },
    { key: "wipro-apt-verbal-synonyms", name: "Synonyms & Antonyms", categoryName: "Aptitude", companyName: "Wipro", parentKey: "wipro-apt-verbal" },
    { key: "wipro-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: "Wipro", parentKey: null },
    { key: "wipro-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: "Wipro", parentKey: "wipro-cs-dbms" },
  ],
  // questions reference their parent topic by the same key system
  questions: [
    { topicKey: "amazon-apt-quant-percentages", difficulty: "easy", question_text: "If 20% of a number is 50, find the number.", solution_text: "Let the number be x. 20% of x = 50, so 0.2x = 50, x = 250.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "amazon-apt-quant-percentages", difficulty: "medium", question_text: "A price is increased by 25% then decreased by 20%. What is the net change?", solution_text: "Net change = 25 - 20 - (25*20/100) = 5 - 5 = 0%. No net change.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "amazon-coding-java-arrays", difficulty: "medium", question_text: "Rotate an array to the right by k steps in-place.", solution_text: "Reverse the whole array, then reverse the first k elements, then reverse the remaining n-k elements. O(n) time, O(1) space.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "common-apt-quant-percentages", difficulty: "easy", question_text: "What is 15% of 200?", solution_text: "15% of 200 = 0.15 * 200 = 30.", company_name: null, year_asked: null },
    { topicKey: "common-apt-logical-puzzles", difficulty: "hard", question_text: "Five friends sit in a row. Given clues about their relative positions, determine the seating order.", solution_text: "Use the clues to build a constraint table and eliminate invalid arrangements one clue at a time until only one order fits all constraints.", company_name: null, year_asked: null },
    { topicKey: "common-coding-java-arrays", difficulty: "easy", question_text: "Find the maximum subarray sum using Kadane's algorithm.", solution_text: "Track a running sum, resetting to 0 whenever it goes negative, and keep a running maximum. O(n) time, O(1) space.", company_name: null, year_asked: null },
    { topicKey: "common-cs-dbms-normalization", difficulty: "medium", question_text: "Explain the difference between 2NF and 3NF.", solution_text: "2NF removes partial dependencies on a composite key. 3NF additionally removes transitive dependencies, where a non-key attribute depends on another non-key attribute.", company_name: null, year_asked: null },
    { topicKey: "common-interview-hr-general", difficulty: "easy", question_text: "Tell me about yourself.", solution_text: "Structure the answer around: current academic/professional context, key strengths relevant to the role, and why you're interested in this opportunity — kept to under two minutes.", company_name: null, year_asked: null },
    // --- common-coding-cpp-strings ---
    { topicKey: "common-coding-cpp-strings", difficulty: "easy", question_text: "Reverse a string in-place without using extra space.", solution_text: "Use two pointers starting at both ends, swapping characters and moving inward until they meet. O(n) time, O(1) space.", company_name: null, year_asked: null },
    { topicKey: "common-coding-cpp-strings", difficulty: "medium", question_text: "Check if a string is a palindrome, ignoring case and non-alphanumeric characters.", solution_text: "Filter to alphanumeric characters, lowercase them, then use two pointers from both ends comparing characters.", company_name: null, year_asked: null },
    { topicKey: "common-coding-cpp-strings", difficulty: "medium", question_text: "Find the first non-repeating character in a string.", solution_text: "Build a frequency map in one pass, then scan the string again in order and return the first character with count 1.", company_name: null, year_asked: null },
    { topicKey: "common-coding-cpp-strings", difficulty: "hard", question_text: "Find the longest palindromic substring in a given string.", solution_text: "Expand around each possible center (both single-character and between-character centers), tracking the longest palindrome found. O(n^2) time.", company_name: null, year_asked: null },

    // --- common-coding-python-dictionaries ---
    { topicKey: "common-coding-python-dictionaries", difficulty: "easy", question_text: "Count the frequency of each word in a list using a dictionary.", solution_text: "Iterate the list, using dict.get(word, 0) + 1 to increment counts, or use collections.Counter directly.", company_name: null, year_asked: null },
    { topicKey: "common-coding-python-dictionaries", difficulty: "medium", question_text: "Merge two dictionaries, summing values for keys that appear in both.", solution_text: "Iterate the second dictionary's items, using result[key] = result.get(key, 0) + value after copying the first dictionary as the starting result.", company_name: null, year_asked: null },
    { topicKey: "common-coding-python-dictionaries", difficulty: "medium", question_text: "Find all keys in a dictionary whose values exceed a given threshold.", solution_text: "Use a dictionary comprehension or list comprehension filtering items where value > threshold, returning the keys.", company_name: null, year_asked: null },

    // --- common-cs-os-processscheduling ---
    { topicKey: "common-cs-os-processscheduling", difficulty: "easy", question_text: "What is the difference between preemptive and non-preemptive scheduling?", solution_text: "Preemptive scheduling allows the OS to interrupt a running process to switch to another; non-preemptive scheduling lets a process run to completion or until it voluntarily yields the CPU.", company_name: null, year_asked: null },
    { topicKey: "common-cs-os-processscheduling", difficulty: "medium", question_text: "Explain the Shortest Job First (SJF) scheduling algorithm and its main drawback.", solution_text: "SJF selects the process with the smallest burst time next, minimizing average waiting time. Its main drawback is starvation of longer processes if short jobs keep arriving.", company_name: null, year_asked: null },
    { topicKey: "common-cs-os-processscheduling", difficulty: "medium", question_text: "What is a context switch, and why is it considered overhead?", solution_text: "A context switch saves the state of a running process and loads the state of the next one. It's overhead because the CPU does no useful work during the switch itself.", company_name: null, year_asked: null },

    // --- common-cs-cn-tcpip ---
    { topicKey: "common-cs-cn-tcpip", difficulty: "easy", question_text: "List the four layers of the TCP/IP model.", solution_text: "Application, Transport, Internet, and Network Access (Link) layers, from top to bottom.", company_name: null, year_asked: null },
    { topicKey: "common-cs-cn-tcpip", difficulty: "medium", question_text: "What is the difference between TCP and UDP?", solution_text: "TCP is connection-oriented, reliable, and ordered, with overhead for acknowledgments and retransmission. UDP is connectionless, faster, with no delivery guarantee — suited to real-time applications like video streaming.", company_name: null, year_asked: null },

    // --- common-cs-oop-inheritance ---
    { topicKey: "common-cs-oop-inheritance", difficulty: "easy", question_text: "What is the difference between inheritance and polymorphism?", solution_text: "Inheritance lets a class acquire properties/methods of another class. Polymorphism lets objects of different classes be treated through a common interface, typically via method overriding.", company_name: null, year_asked: null },
    { topicKey: "common-cs-oop-inheritance", difficulty: "medium", question_text: "Explain method overloading vs method overriding.", solution_text: "Overloading is defining multiple methods with the same name but different parameters within the same class (compile-time). Overriding is redefining a parent class's method in a child class (runtime).", company_name: null, year_asked: null },

    // --- tcs-coding-cpp-strings ---
    { topicKey: "tcs-coding-cpp-strings", difficulty: "easy", question_text: "Check if two strings are anagrams of each other.", solution_text: "Sort both strings and compare, or build character frequency counts for both and compare the counts. O(n log n) or O(n) respectively.", company_name: "TCS", year_asked: 2024 },
    { topicKey: "tcs-coding-cpp-strings", difficulty: "medium", question_text: "Remove all duplicate characters from a string while preserving order.", solution_text: "Iterate the string using a seen-set; append a character to the result only if it hasn't been seen before.", company_name: "TCS", year_asked: 2023 },

    // --- tcs-cs-dbms-normalization ---
    { topicKey: "tcs-cs-dbms-normalization", difficulty: "medium", question_text: "What anomalies does normalization aim to prevent?", solution_text: "Insertion, update, and deletion anomalies — situations where redundant data leads to inconsistency when only some copies of duplicated data get updated or removed.", company_name: "TCS", year_asked: 2024 },

    // --- google-coding-java-trees ---
    { topicKey: "google-coding-java-trees", difficulty: "medium", question_text: "Find the lowest common ancestor of two nodes in a binary search tree.", solution_text: "Starting at the root, if both target values are less than the current node, recurse left; if both are greater, recurse right; otherwise the current node is the LCA.", company_name: "Google", year_asked: 2024 },
    { topicKey: "google-coding-java-trees", difficulty: "hard", question_text: "Check if a binary tree is height-balanced.", solution_text: "Recursively compute the height of each subtree while checking the height difference at every node is at most 1, returning -1 early to signal imbalance and short-circuit further recursion.", company_name: "Google", year_asked: 2025 },

    // --- google-cs-os-processscheduling ---
    { topicKey: "google-cs-os-processscheduling", difficulty: "medium", question_text: "What is a race condition, and how can it be prevented?", solution_text: "A race condition occurs when multiple processes/threads access shared data concurrently and the outcome depends on timing. It's prevented using synchronization mechanisms like mutexes or semaphores to enforce mutual exclusion.", company_name: "Google", year_asked: 2024 },

    // --- common-apt-verbal-synonyms ---
    { topicKey: "common-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most similar in meaning to 'Benevolent'.", solution_text: "Kind. Benevolent means well-meaning and kindly, so 'Kind' is the closest synonym among typical options.", company_name: null, year_asked: null },
    { topicKey: "common-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most opposite in meaning to 'Frugal'.", solution_text: "Extravagant. Frugal means economical/thrifty, so its antonym describes wasteful or excessive spending.", company_name: null, year_asked: null },
    { topicKey: "common-apt-verbal-synonyms", difficulty: "medium", question_text: "Choose the word most similar in meaning to 'Ephemeral'.", solution_text: "Fleeting. Ephemeral means lasting for a very short time, so 'Fleeting' or 'Transient' are the closest synonyms.", company_name: null, year_asked: null },

    // --- common-interview-technical-projectdeepdive ---
    { topicKey: "common-interview-technical-projectdeepdive", difficulty: "easy", question_text: "Walk me through a project you're most proud of.", solution_text: "Structure the answer around: the problem it solved, your specific technical contribution, one challenge you overcame, and the measurable outcome or what you learned.", company_name: null, year_asked: null },
    { topicKey: "common-interview-technical-projectdeepdive", difficulty: "medium", question_text: "What would you do differently if you built this project again?", solution_text: "Pick one genuine technical or architectural decision, explain why it fell short in hindsight, and describe the specific alternative you'd choose now and why it's better.", company_name: null, year_asked: null },
    { topicKey: "common-interview-technical-projectdeepdive", difficulty: "medium", question_text: "How did you handle disagreements within your project team?", solution_text: "Describe a specific instance: the disagreement's technical or process root cause, how you facilitated resolution (data, compromise, or escalation), and the outcome.", company_name: null, year_asked: null },

    // --- infosys-apt-quant-percentages ---
    { topicKey: "infosys-apt-quant-percentages", difficulty: "easy", question_text: "A student scores 65% in an exam out of 800 marks. How many marks did they score?", solution_text: "65% of 800 = 0.65 * 800 = 520 marks.", company_name: "Infosys", year_asked: 2024 },
    { topicKey: "infosys-apt-quant-percentages", difficulty: "medium", question_text: "The population of a town increases by 10% every year. If the current population is 5000, what will it be in 2 years?", solution_text: "5000 * 1.10 * 1.10 = 6050.", company_name: "Infosys", year_asked: 2023 },

    // --- infosys-interview-hr-general ---
    { topicKey: "infosys-interview-hr-general", difficulty: "easy", question_text: "Why do you want to join Infosys?", solution_text: "Focus on specific, genuine reasons: the kind of projects/domains Infosys works in that interest you, growth/learning opportunities, and how your skills align — avoid generic praise with no substance.", company_name: "Infosys", year_asked: 2024 },
    { topicKey: "infosys-interview-hr-general", difficulty: "easy", question_text: "Where do you see yourself in 5 years?", solution_text: "Describe realistic growth within the field you're entering — deepening technical expertise, taking on more ownership/leadership — while showing awareness that plans evolve with experience.", company_name: "Infosys", year_asked: 2024 },

    // --- microsoft-coding-java-trees ---
    { topicKey: "microsoft-coding-java-trees", difficulty: "medium", question_text: "Given a binary tree, return its level order traversal.", solution_text: "Use a queue-based BFS: process each level fully before moving to the next, tracking level boundaries by recording the queue's size at the start of each level.", company_name: "Microsoft", year_asked: 2024 },
    { topicKey: "microsoft-coding-java-trees", difficulty: "hard", question_text: "Serialize and deserialize a binary tree.", solution_text: "Serialize using preorder traversal, marking null children with a sentinel value (e.g., '#'). Deserialize by reading tokens in the same order, recursively reconstructing left and right subtrees.", company_name: "Microsoft", year_asked: 2025 },

    // --- microsoft-interview-technical-projectdeepdive ---
    { topicKey: "microsoft-interview-technical-projectdeepdive", difficulty: "medium", question_text: "What was the most technically challenging part of your project, and how did you solve it?", solution_text: "Pick a genuine bottleneck (performance, a tricky algorithm, an integration issue), explain the debugging/design process concretely, and the specific fix rather than a vague description.", company_name: "Microsoft", year_asked: 2024 },

    // --- wipro-apt-verbal-synonyms ---
    { topicKey: "wipro-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most similar in meaning to 'Candid'.", solution_text: "Frank. Candid means truthful and straightforward, closest to 'Frank' or 'Honest'.", company_name: "Wipro", year_asked: 2024 },

    // --- wipro-cs-dbms-normalization ---
    { topicKey: "wipro-cs-dbms-normalization", difficulty: "easy", question_text: "What is the purpose of a primary key in a database table?", solution_text: "A primary key uniquely identifies each row in a table, enforcing entity integrity and preventing duplicate or null values in that column.", company_name: "Wipro", year_asked: 2023 },
  ]
};

export default seedData;
