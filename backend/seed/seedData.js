// backend/seed/seedData.js
// Full Phase 1 seed dataset — 12 companies, all 4 categories, Common Prep + Company Specific.
// Structure: topics use a temporary string `key` to reference parents before real UUIDs exist.
// runSeed.js resolves these keys into real UUIDs in two passes (parents first, then children).

export default {
  companies: [
    { name: "Amazon", logo_url: "https://logo.clearbit.com/amazon.com" },
    { name: "TCS", logo_url: "https://logo.clearbit.com/tcs.com" },
    { name: "Google", logo_url: "https://logo.clearbit.com/google.com" },
    { name: "Infosys", logo_url: "https://logo.clearbit.com/infosys.com" },
    { name: "Microsoft", logo_url: "https://logo.clearbit.com/microsoft.com" },
    { name: "Wipro", logo_url: "https://logo.clearbit.com/wipro.com" },
    { name: "Cognizant", logo_url: "https://logo.clearbit.com/cognizant.com" },
    { name: "Accenture", logo_url: "https://logo.clearbit.com/accenture.com" },
    { name: "Capgemini", logo_url: "https://logo.clearbit.com/capgemini.com" },
    { name: "HCLTech", logo_url: "https://logo.clearbit.com/hcltech.com" },
    { name: "Zoho", logo_url: "https://logo.clearbit.com/zoho.com" },
    { name: "IBM", logo_url: "https://logo.clearbit.com/ibm.com" },
  ],

  categories: [
    { name: "Aptitude", is_common: true },
    { name: "Coding", is_common: true },
    { name: "CS Subjects", is_common: true },
    { name: "Interview", is_common: true },
  ],

  topics: [
    // =========================================================
    // COMMON PREP — full section coverage across all 4 categories
    // =========================================================

    // Aptitude
    { key: "common-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-quant" },
    { key: "common-apt-quant-timespeed", name: "Time, Speed & Distance", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-quant" },
    { key: "common-apt-logical", name: "Logical Reasoning", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-logical-puzzles", name: "Puzzles", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-logical" },
    { key: "common-apt-logical-seriescompletion", name: "Series Completion", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-logical" },
    { key: "common-apt-verbal", name: "Verbal Ability", categoryName: "Aptitude", companyName: null, parentKey: null },
    { key: "common-apt-verbal-synonyms", name: "Synonyms & Antonyms", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-verbal" },
    { key: "common-apt-verbal-rc", name: "Reading Comprehension", categoryName: "Aptitude", companyName: null, parentKey: "common-apt-verbal" },

    // Coding
    { key: "common-coding-c", name: "C", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-c-pointers", name: "Pointers", categoryName: "Coding", companyName: null, parentKey: "common-coding-c" },
    { key: "common-coding-cpp", name: "C++", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-cpp-strings", name: "Strings", categoryName: "Coding", companyName: null, parentKey: "common-coding-cpp" },
    { key: "common-coding-java", name: "Java", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-java-arrays", name: "Arrays", categoryName: "Coding", companyName: null, parentKey: "common-coding-java" },
    { key: "common-coding-python", name: "Python", categoryName: "Coding", companyName: null, parentKey: null },
    { key: "common-coding-python-dictionaries", name: "Dictionaries", categoryName: "Coding", companyName: null, parentKey: "common-coding-python" },

    // CS Subjects
    { key: "common-cs-os", name: "OS", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-os-processscheduling", name: "Process Scheduling", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-os" },
    { key: "common-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-dbms" },
    { key: "common-cs-cn", name: "CN", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-cn-tcpip", name: "TCP/IP Model", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-cn" },
    { key: "common-cs-oop", name: "OOP", categoryName: "CS Subjects", companyName: null, parentKey: null },
    { key: "common-cs-oop-inheritance", name: "Inheritance & Polymorphism", categoryName: "CS Subjects", companyName: null, parentKey: "common-cs-oop" },

    // Interview
    { key: "common-interview-hr", name: "HR", categoryName: "Interview", companyName: null, parentKey: null },
    { key: "common-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: null, parentKey: "common-interview-hr" },
    { key: "common-interview-technical", name: "Technical", categoryName: "Interview", companyName: null, parentKey: null },
    { key: "common-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: null, parentKey: "common-interview-technical" },

    // =========================================================
    // COMPANY SPECIFIC — Amazon
    // =========================================================
    { key: "amazon-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "Amazon", parentKey: null },
    { key: "amazon-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "Amazon", parentKey: "amazon-apt-quant" },
    { key: "amazon-coding-java", name: "Java", categoryName: "Coding", companyName: "Amazon", parentKey: null },
    { key: "amazon-coding-java-arrays", name: "Arrays", categoryName: "Coding", companyName: "Amazon", parentKey: "amazon-coding-java" },
    { key: "amazon-cs-os", name: "OS", categoryName: "CS Subjects", companyName: "Amazon", parentKey: null },
    { key: "amazon-cs-os-processscheduling", name: "Process Scheduling", categoryName: "CS Subjects", companyName: "Amazon", parentKey: "amazon-cs-os" },
    { key: "amazon-interview-hr", name: "HR", categoryName: "Interview", companyName: "Amazon", parentKey: null },
    { key: "amazon-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Amazon", parentKey: "amazon-interview-hr" },

    // TCS
    { key: "tcs-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "TCS", parentKey: null },
    { key: "tcs-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "TCS", parentKey: "tcs-apt-quant" },
    { key: "tcs-coding-cpp", name: "C++", categoryName: "Coding", companyName: "TCS", parentKey: null },
    { key: "tcs-coding-cpp-strings", name: "Strings", categoryName: "Coding", companyName: "TCS", parentKey: "tcs-coding-cpp" },
    { key: "tcs-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: "TCS", parentKey: null },
    { key: "tcs-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: "TCS", parentKey: "tcs-cs-dbms" },
    { key: "tcs-interview-hr", name: "HR", categoryName: "Interview", companyName: "TCS", parentKey: null },
    { key: "tcs-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "TCS", parentKey: "tcs-interview-hr" },

    // Google
    { key: "google-apt-logical", name: "Logical Reasoning", categoryName: "Aptitude", companyName: "Google", parentKey: null },
    { key: "google-apt-logical-puzzles", name: "Puzzles", categoryName: "Aptitude", companyName: "Google", parentKey: "google-apt-logical" },
    { key: "google-coding-java", name: "Java", categoryName: "Coding", companyName: "Google", parentKey: null },
    { key: "google-coding-java-trees", name: "Trees", categoryName: "Coding", companyName: "Google", parentKey: "google-coding-java" },
    { key: "google-cs-os", name: "OS", categoryName: "CS Subjects", companyName: "Google", parentKey: null },
    { key: "google-cs-os-processscheduling", name: "Process Scheduling", categoryName: "CS Subjects", companyName: "Google", parentKey: "google-cs-os" },
    { key: "google-interview-technical", name: "Technical", categoryName: "Interview", companyName: "Google", parentKey: null },
    { key: "google-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: "Google", parentKey: "google-interview-technical" },

    // Infosys
    { key: "infosys-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "Infosys", parentKey: null },
    { key: "infosys-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "Infosys", parentKey: "infosys-apt-quant" },
    { key: "infosys-coding-c", name: "C", categoryName: "Coding", companyName: "Infosys", parentKey: null },
    { key: "infosys-coding-c-pointers", name: "Pointers", categoryName: "Coding", companyName: "Infosys", parentKey: "infosys-coding-c" },
    { key: "infosys-interview-hr", name: "HR", categoryName: "Interview", companyName: "Infosys", parentKey: null },
    { key: "infosys-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Infosys", parentKey: "infosys-interview-hr" },

    // Microsoft
    { key: "microsoft-coding-java", name: "Java", categoryName: "Coding", companyName: "Microsoft", parentKey: null },
    { key: "microsoft-coding-java-trees", name: "Trees", categoryName: "Coding", companyName: "Microsoft", parentKey: "microsoft-coding-java" },
    { key: "microsoft-cs-oop", name: "OOP", categoryName: "CS Subjects", companyName: "Microsoft", parentKey: null },
    { key: "microsoft-cs-oop-inheritance", name: "Inheritance & Polymorphism", categoryName: "CS Subjects", companyName: "Microsoft", parentKey: "microsoft-cs-oop" },
    { key: "microsoft-interview-technical", name: "Technical", categoryName: "Interview", companyName: "Microsoft", parentKey: null },
    { key: "microsoft-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: "Microsoft", parentKey: "microsoft-interview-technical" },

    // Wipro
    { key: "wipro-apt-verbal", name: "Verbal Ability", categoryName: "Aptitude", companyName: "Wipro", parentKey: null },
    { key: "wipro-apt-verbal-synonyms", name: "Synonyms & Antonyms", categoryName: "Aptitude", companyName: "Wipro", parentKey: "wipro-apt-verbal" },
    { key: "wipro-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: "Wipro", parentKey: null },
    { key: "wipro-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: "Wipro", parentKey: "wipro-cs-dbms" },
    { key: "wipro-interview-hr", name: "HR", categoryName: "Interview", companyName: "Wipro", parentKey: null },
    { key: "wipro-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Wipro", parentKey: "wipro-interview-hr" },

    // Cognizant
    { key: "cognizant-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "Cognizant", parentKey: null },
    { key: "cognizant-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "Cognizant", parentKey: "cognizant-apt-quant" },
    { key: "cognizant-coding-python", name: "Python", categoryName: "Coding", companyName: "Cognizant", parentKey: null },
    { key: "cognizant-coding-python-dictionaries", name: "Dictionaries", categoryName: "Coding", companyName: "Cognizant", parentKey: "cognizant-coding-python" },
    { key: "cognizant-interview-hr", name: "HR", categoryName: "Interview", companyName: "Cognizant", parentKey: null },
    { key: "cognizant-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Cognizant", parentKey: "cognizant-interview-hr" },

    // Accenture
    { key: "accenture-apt-logical", name: "Logical Reasoning", categoryName: "Aptitude", companyName: "Accenture", parentKey: null },
    { key: "accenture-apt-logical-puzzles", name: "Puzzles", categoryName: "Aptitude", companyName: "Accenture", parentKey: "accenture-apt-logical" },
    { key: "accenture-cs-cn", name: "CN", categoryName: "CS Subjects", companyName: "Accenture", parentKey: null },
    { key: "accenture-cs-cn-tcpip", name: "TCP/IP Model", categoryName: "CS Subjects", companyName: "Accenture", parentKey: "accenture-cs-cn" },
    { key: "accenture-interview-hr", name: "HR", categoryName: "Interview", companyName: "Accenture", parentKey: null },
    { key: "accenture-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Accenture", parentKey: "accenture-interview-hr" },

    // Capgemini
    { key: "capgemini-apt-verbal", name: "Verbal Ability", categoryName: "Aptitude", companyName: "Capgemini", parentKey: null },
    { key: "capgemini-apt-verbal-synonyms", name: "Synonyms & Antonyms", categoryName: "Aptitude", companyName: "Capgemini", parentKey: "capgemini-apt-verbal" },
    { key: "capgemini-coding-c", name: "C", categoryName: "Coding", companyName: "Capgemini", parentKey: null },
    { key: "capgemini-coding-c-pointers", name: "Pointers", categoryName: "Coding", companyName: "Capgemini", parentKey: "capgemini-coding-c" },
    { key: "capgemini-interview-hr", name: "HR", categoryName: "Interview", companyName: "Capgemini", parentKey: null },
    { key: "capgemini-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "Capgemini", parentKey: "capgemini-interview-hr" },

    // HCLTech
    { key: "hcltech-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "HCLTech", parentKey: null },
    { key: "hcltech-apt-quant-timespeed", name: "Time, Speed & Distance", categoryName: "Aptitude", companyName: "HCLTech", parentKey: "hcltech-apt-quant" },
    { key: "hcltech-cs-dbms", name: "DBMS", categoryName: "CS Subjects", companyName: "HCLTech", parentKey: null },
    { key: "hcltech-cs-dbms-normalization", name: "Normalization", categoryName: "CS Subjects", companyName: "HCLTech", parentKey: "hcltech-cs-dbms" },
    { key: "hcltech-interview-hr", name: "HR", categoryName: "Interview", companyName: "HCLTech", parentKey: null },
    { key: "hcltech-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "HCLTech", parentKey: "hcltech-interview-hr" },

    // Zoho
    { key: "zoho-coding-cpp", name: "C++", categoryName: "Coding", companyName: "Zoho", parentKey: null },
    { key: "zoho-coding-cpp-strings", name: "Strings", categoryName: "Coding", companyName: "Zoho", parentKey: "zoho-coding-cpp" },
    { key: "zoho-cs-oop", name: "OOP", categoryName: "CS Subjects", companyName: "Zoho", parentKey: null },
    { key: "zoho-cs-oop-inheritance", name: "Inheritance & Polymorphism", categoryName: "CS Subjects", companyName: "Zoho", parentKey: "zoho-cs-oop" },
    { key: "zoho-interview-technical", name: "Technical", categoryName: "Interview", companyName: "Zoho", parentKey: null },
    { key: "zoho-interview-technical-projectdeepdive", name: "Project Deep-dive", categoryName: "Interview", companyName: "Zoho", parentKey: "zoho-interview-technical" },

    // IBM
    { key: "ibm-apt-quant", name: "Quantitative", categoryName: "Aptitude", companyName: "IBM", parentKey: null },
    { key: "ibm-apt-quant-percentages", name: "Percentages", categoryName: "Aptitude", companyName: "IBM", parentKey: "ibm-apt-quant" },
    { key: "ibm-coding-python", name: "Python", categoryName: "Coding", companyName: "IBM", parentKey: null },
    { key: "ibm-coding-python-dictionaries", name: "Dictionaries", categoryName: "Coding", companyName: "IBM", parentKey: "ibm-coding-python" },
    { key: "ibm-cs-cn", name: "CN", categoryName: "CS Subjects", companyName: "IBM", parentKey: null },
    { key: "ibm-cs-cn-tcpip", name: "TCP/IP Model", categoryName: "CS Subjects", companyName: "IBM", parentKey: "ibm-cs-cn" },
    { key: "ibm-interview-hr", name: "HR", categoryName: "Interview", companyName: "IBM", parentKey: null },
    { key: "ibm-interview-hr-general", name: "General Questions", categoryName: "Interview", companyName: "IBM", parentKey: "ibm-interview-hr" },
  ],

  questions: [
    // =========================================================
    // COMMON PREP QUESTIONS
    // =========================================================
    { topicKey: "common-apt-quant-percentages", difficulty: "easy", question_text: "What is 15% of 200?", solution_text: "15% of 200 = 0.15 * 200 = 30.", company_name: null, year_asked: null },
    { topicKey: "common-apt-quant-percentages", difficulty: "medium", question_text: "A price is increased by 25% then decreased by 20%. What is the net change?", solution_text: "Net change = 25 - 20 - (25*20/100) = 5 - 5 = 0%. No net change.", company_name: null, year_asked: null },
    { topicKey: "common-apt-quant-percentages", difficulty: "easy", question_text: "If 20% of a number is 50, find the number.", solution_text: "Let the number be x. 0.2x = 50, so x = 250.", company_name: null, year_asked: null },

    { topicKey: "common-apt-quant-timespeed", difficulty: "easy", question_text: "A car travels 60 km in 1.5 hours. What is its speed in km/h?", solution_text: "Speed = Distance / Time = 60 / 1.5 = 40 km/h.", company_name: null, year_asked: null },
    { topicKey: "common-apt-quant-timespeed", difficulty: "medium", question_text: "Two trains 120 km apart move toward each other at 40 km/h and 20 km/h. How long until they meet?", solution_text: "Relative speed = 40 + 20 = 60 km/h. Time = 120 / 60 = 2 hours.", company_name: null, year_asked: null },

    { topicKey: "common-apt-logical-puzzles", difficulty: "hard", question_text: "Five friends sit in a row. Given clues about their relative positions, determine the seating order.", solution_text: "Use the clues to build a constraint table and eliminate invalid arrangements one clue at a time until only one order fits all constraints.", company_name: null, year_asked: null },
    { topicKey: "common-apt-logical-puzzles", difficulty: "medium", question_text: "In a family of 6, given relationship clues, determine how two members are related.", solution_text: "Draw a family tree from the given clues one relationship at a time, then trace the path between the two members in question.", company_name: null, year_asked: null },

    { topicKey: "common-apt-logical-seriescompletion", difficulty: "easy", question_text: "Find the next number in the series: 2, 6, 12, 20, 30, ?", solution_text: "Differences are 4, 6, 8, 10, 12 — the next term is 30 + 12 = 42.", company_name: null, year_asked: null },
    { topicKey: "common-apt-logical-seriescompletion", difficulty: "medium", question_text: "Find the odd one out: 4, 9, 16, 25, 30, 36.", solution_text: "All others are perfect squares (2²,3²,4²,5²,6²) except 30.", company_name: null, year_asked: null },

    { topicKey: "common-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most similar in meaning to 'Benevolent'.", solution_text: "Kind. Benevolent means well-meaning and kindly.", company_name: null, year_asked: null },
    { topicKey: "common-apt-verbal-synonyms", difficulty: "medium", question_text: "Choose the word most similar in meaning to 'Ephemeral'.", solution_text: "Fleeting. Ephemeral means lasting for a very short time.", company_name: null, year_asked: null },

    { topicKey: "common-apt-verbal-rc", difficulty: "medium", question_text: "Given a short passage, identify the author's main argument.", solution_text: "Read the topic sentence of each paragraph first — these usually carry the core claim — then confirm against the passage's concluding lines.", company_name: null, year_asked: null },

    { topicKey: "common-coding-c-pointers", difficulty: "easy", question_text: "What is the difference between a pointer and a reference?", solution_text: "A pointer stores a memory address and can be reassigned or set to null; in languages with references (like C++), a reference is an alias to an existing variable and cannot be null or reassigned.", company_name: null, year_asked: null },
    { topicKey: "common-coding-c-pointers", difficulty: "medium", question_text: "Write a function to swap two integers using pointers.", solution_text: "void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; } — dereference both pointers to swap the actual values they point to.", company_name: null, year_asked: null },

    { topicKey: "common-coding-cpp-strings", difficulty: "easy", question_text: "Reverse a string in-place without using extra space.", solution_text: "Use two pointers starting at both ends, swapping characters and moving inward until they meet. O(n) time, O(1) space.", company_name: null, year_asked: null },
    { topicKey: "common-coding-cpp-strings", difficulty: "medium", question_text: "Check if a string is a palindrome, ignoring case and non-alphanumeric characters.", solution_text: "Filter to alphanumeric characters, lowercase them, then use two pointers from both ends comparing characters.", company_name: null, year_asked: null },
    { topicKey: "common-coding-cpp-strings", difficulty: "hard", question_text: "Find the longest palindromic substring in a given string.", solution_text: "Expand around each possible center (single-character and between-character), tracking the longest palindrome found. O(n^2) time.", company_name: null, year_asked: null },

    { topicKey: "common-coding-java-arrays", difficulty: "easy", question_text: "Find the maximum subarray sum using Kadane's algorithm.", solution_text: "Track a running sum, resetting to 0 whenever it goes negative, and keep a running maximum. O(n) time, O(1) space.", company_name: null, year_asked: null },
    { topicKey: "common-coding-java-arrays", difficulty: "medium", question_text: "Find all pairs in an array whose sum equals a target value.", solution_text: "Use a hash set: for each element, check if (target - element) has already been seen; if so, that's a pair. O(n) time.", company_name: null, year_asked: null },

    { topicKey: "common-coding-python-dictionaries", difficulty: "easy", question_text: "Count the frequency of each word in a list using a dictionary.", solution_text: "Iterate the list using dict.get(word, 0) + 1 to increment counts, or use collections.Counter directly.", company_name: null, year_asked: null },
    { topicKey: "common-coding-python-dictionaries", difficulty: "medium", question_text: "Merge two dictionaries, summing values for keys that appear in both.", solution_text: "Copy the first dictionary as the starting result, then iterate the second dictionary's items using result[key] = result.get(key, 0) + value.", company_name: null, year_asked: null },

    { topicKey: "common-cs-os-processscheduling", difficulty: "easy", question_text: "What is the difference between preemptive and non-preemptive scheduling?", solution_text: "Preemptive scheduling allows the OS to interrupt a running process to switch to another; non-preemptive lets a process run to completion or until it voluntarily yields the CPU.", company_name: null, year_asked: null },
    { topicKey: "common-cs-os-processscheduling", difficulty: "medium", question_text: "Explain the Shortest Job First (SJF) scheduling algorithm and its main drawback.", solution_text: "SJF selects the process with the smallest burst time next, minimizing average waiting time. Its drawback is starvation of longer processes if short jobs keep arriving.", company_name: null, year_asked: null },

    { topicKey: "common-cs-dbms-normalization", difficulty: "medium", question_text: "What anomalies does normalization aim to prevent?", solution_text: "Insertion, update, and deletion anomalies — situations where redundant data leads to inconsistency when only some copies of duplicated data get updated or removed.", company_name: null, year_asked: null },
    { topicKey: "common-cs-dbms-normalization", difficulty: "easy", question_text: "What is the purpose of a primary key in a database table?", solution_text: "A primary key uniquely identifies each row in a table, enforcing entity integrity and preventing duplicate or null values in that column.", company_name: null, year_asked: null },

    { topicKey: "common-cs-cn-tcpip", difficulty: "easy", question_text: "List the four layers of the TCP/IP model.", solution_text: "Application, Transport, Internet, and Network Access (Link) layers, from top to bottom.", company_name: null, year_asked: null },
    { topicKey: "common-cs-cn-tcpip", difficulty: "medium", question_text: "What is the difference between TCP and UDP?", solution_text: "TCP is connection-oriented, reliable, and ordered, with overhead for acknowledgments and retransmission. UDP is connectionless and faster, with no delivery guarantee.", company_name: null, year_asked: null },

    { topicKey: "common-cs-oop-inheritance", difficulty: "easy", question_text: "What is the difference between inheritance and polymorphism?", solution_text: "Inheritance lets a class acquire properties/methods of another class. Polymorphism lets objects of different classes be treated through a common interface, typically via method overriding.", company_name: null, year_asked: null },
    { topicKey: "common-cs-oop-inheritance", difficulty: "medium", question_text: "Explain method overloading vs method overriding.", solution_text: "Overloading is defining multiple methods with the same name but different parameters within the same class (compile-time). Overriding is redefining a parent class's method in a child class (runtime).", company_name: null, year_asked: null },

    { topicKey: "common-interview-hr-general", difficulty: "easy", question_text: "Tell me about yourself.", solution_text: "Structure the answer around: current academic/professional context, key strengths relevant to the role, and why you're interested in this opportunity — kept under two minutes.", company_name: null, year_asked: null },
    { topicKey: "common-interview-hr-general", difficulty: "easy", question_text: "What are your strengths and weaknesses?", solution_text: "Pick a genuine strength relevant to the role with a concrete example. For weaknesses, pick something real but non-critical, paired with a specific step you're taking to improve it.", company_name: null, year_asked: null },

    { topicKey: "common-interview-technical-projectdeepdive", difficulty: "easy", question_text: "Walk me through a project you're most proud of.", solution_text: "Structure around: the problem it solved, your specific technical contribution, one challenge you overcame, and the measurable outcome or what you learned.", company_name: null, year_asked: null },
    { topicKey: "common-interview-technical-projectdeepdive", difficulty: "medium", question_text: "What would you do differently if you built this project again?", solution_text: "Pick one genuine technical or architectural decision, explain why it fell short in hindsight, and describe the specific alternative you'd choose now and why it's better.", company_name: null, year_asked: null },

    // =========================================================
    // COMPANY SPECIFIC QUESTIONS
    // =========================================================

    // Amazon
    { topicKey: "amazon-apt-quant-percentages", difficulty: "easy", question_text: "If 20% of a number is 50, find the number.", solution_text: "0.2x = 50, so x = 250.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "amazon-coding-java-arrays", difficulty: "medium", question_text: "Rotate an array to the right by k steps in-place.", solution_text: "Reverse the whole array, then reverse the first k elements, then reverse the remaining n-k elements. O(n) time, O(1) space.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "amazon-cs-os-processscheduling", difficulty: "medium", question_text: "Explain Round Robin scheduling and how time quantum affects performance.", solution_text: "Round Robin gives each process a fixed time slice (quantum) in rotation. Too small a quantum increases context-switch overhead; too large approaches FCFS behavior.", company_name: "Amazon", year_asked: 2024 },
    { topicKey: "amazon-interview-hr-general", difficulty: "easy", question_text: "Why do you want to work at Amazon?", solution_text: "Connect specific, genuine interests (scale of systems, leadership principles, ownership culture) to your own experience or goals rather than generic praise.", company_name: "Amazon", year_asked: 2024 },

    // TCS
    { topicKey: "tcs-apt-quant-percentages", difficulty: "easy", question_text: "A student scores 65% in an exam out of 800 marks. How many marks did they score?", solution_text: "0.65 * 800 = 520 marks.", company_name: "TCS", year_asked: 2024 },
    { topicKey: "tcs-coding-cpp-strings", difficulty: "easy", question_text: "Check if two strings are anagrams of each other.", solution_text: "Sort both strings and compare, or build character frequency counts for both and compare. O(n log n) or O(n) respectively.", company_name: "TCS", year_asked: 2024 },
    { topicKey: "tcs-cs-dbms-normalization", difficulty: "medium", question_text: "What is the difference between 2NF and 3NF?", solution_text: "2NF removes partial dependencies on a composite key. 3NF additionally removes transitive dependencies, where a non-key attribute depends on another non-key attribute.", company_name: "TCS", year_asked: 2024 },
    { topicKey: "tcs-interview-hr-general", difficulty: "easy", question_text: "Why do you want to join TCS?", solution_text: "Focus on genuine reasons — scale of projects, learning opportunities, specific domains of interest — grounded in your own background.", company_name: "TCS", year_asked: 2024 },

    // Google
    { topicKey: "google-apt-logical-puzzles", difficulty: "hard", question_text: "You have 8 balls, one heavier than the rest. Find it in 2 weighings using a balance scale.", solution_text: "Divide into groups of 3, 3, 2. Weigh the two groups of 3 first; if balanced, the heavier ball is in the group of 2, weigh those directly. If unbalanced, take the heavier group of 3 and weigh 2 of them against each other.", company_name: "Google", year_asked: 2024 },
    { topicKey: "google-coding-java-trees", difficulty: "medium", question_text: "Find the lowest common ancestor of two nodes in a binary search tree.", solution_text: "Starting at the root, if both target values are less than the current node, recurse left; if both are greater, recurse right; otherwise the current node is the LCA.", company_name: "Google", year_asked: 2024 },
    { topicKey: "google-cs-os-processscheduling", difficulty: "medium", question_text: "What is a race condition, and how can it be prevented?", solution_text: "A race condition occurs when multiple processes/threads access shared data concurrently and the outcome depends on timing. It's prevented using synchronization mechanisms like mutexes or semaphores.", company_name: "Google", year_asked: 2024 },
    { topicKey: "google-interview-technical-projectdeepdive", difficulty: "medium", question_text: "What was the most technically challenging part of your project, and how did you solve it?", solution_text: "Pick a genuine bottleneck (performance, a tricky algorithm, an integration issue), explain the debugging/design process concretely, and the specific fix.", company_name: "Google", year_asked: 2024 },

    // Infosys
    { topicKey: "infosys-apt-quant-percentages", difficulty: "medium", question_text: "The population of a town increases by 10% every year. If the current population is 5000, what will it be in 2 years?", solution_text: "5000 * 1.10 * 1.10 = 6050.", company_name: "Infosys", year_asked: 2023 },
    { topicKey: "infosys-coding-c-pointers", difficulty: "easy", question_text: "What happens when you dereference a null pointer?", solution_text: "It results in undefined behavior, typically causing a segmentation fault, since the program attempts to access memory it doesn't have valid access to.", company_name: "Infosys", year_asked: 2024 },
    { topicKey: "infosys-interview-hr-general", difficulty: "easy", question_text: "Where do you see yourself in 5 years?", solution_text: "Describe realistic growth within the field — deepening technical expertise, taking on more ownership — while showing awareness that plans evolve with experience.", company_name: "Infosys", year_asked: 2024 },

    // Microsoft
    { topicKey: "microsoft-coding-java-trees", difficulty: "medium", question_text: "Given a binary tree, return its level order traversal.", solution_text: "Use a queue-based BFS: process each level fully before moving to the next, tracking level boundaries by recording the queue's size at the start of each level.", company_name: "Microsoft", year_asked: 2024 },
    { topicKey: "microsoft-cs-oop-inheritance", difficulty: "medium", question_text: "What is the diamond problem in multiple inheritance, and how does C++ resolve it?", solution_text: "The diamond problem occurs when a class inherits from two classes that both inherit from a common base, creating ambiguity about which base copy to use. C++ resolves it using virtual inheritance.", company_name: "Microsoft", year_asked: 2024 },
    { topicKey: "microsoft-interview-technical-projectdeepdive", difficulty: "medium", question_text: "How did you handle disagreements within your project team?", solution_text: "Describe a specific instance: the disagreement's technical or process root cause, how you facilitated resolution, and the outcome.", company_name: "Microsoft", year_asked: 2024 },

    // Wipro
    { topicKey: "wipro-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most similar in meaning to 'Candid'.", solution_text: "Frank. Candid means truthful and straightforward.", company_name: "Wipro", year_asked: 2024 },
    { topicKey: "wipro-cs-dbms-normalization", difficulty: "easy", question_text: "What is a foreign key used for?", solution_text: "A foreign key establishes a link between two tables by referencing the primary key of another table, enforcing referential integrity.", company_name: "Wipro", year_asked: 2023 },
    { topicKey: "wipro-interview-hr-general", difficulty: "easy", question_text: "Why should we hire you?", solution_text: "Match your specific skills and experiences directly to the role's needs, with one concrete example demonstrating each claim.", company_name: "Wipro", year_asked: 2024 },

    // Cognizant
    { topicKey: "cognizant-apt-quant-percentages", difficulty: "easy", question_text: "A shopkeeper marks up a product by 40% and then gives a 10% discount. What is the overall profit percentage?", solution_text: "Let cost = 100. Marked price = 140. After 10% discount = 126. Profit = 26%.", company_name: "Cognizant", year_asked: 2024 },
    { topicKey: "cognizant-coding-python-dictionaries", difficulty: "medium", question_text: "Find all keys in a dictionary whose values exceed a given threshold.", solution_text: "Use a dictionary comprehension filtering items where value > threshold, returning the keys.", company_name: "Cognizant", year_asked: 2023 },
    { topicKey: "cognizant-interview-hr-general", difficulty: "easy", question_text: "How do you handle pressure or tight deadlines?", solution_text: "Give a concrete example: how you prioritized tasks, communicated constraints, and what the outcome was — avoid vague generalities.", company_name: "Cognizant", year_asked: 2024 },

    // Accenture
    { topicKey: "accenture-apt-logical-puzzles", difficulty: "medium", question_text: "A is taller than B but shorter than C. D is taller than C. Who is the tallest?", solution_text: "From the clues: B < A < C < D, so D is the tallest.", company_name: "Accenture", year_asked: 2024 },
    { topicKey: "accenture-cs-cn-tcpip", difficulty: "medium", question_text: "What is the role of the Network layer in the TCP/IP model?", solution_text: "The Network (Internet) layer handles logical addressing and routing, determining the best path for packets to travel from source to destination across networks.", company_name: "Accenture", year_asked: 2024 },
    { topicKey: "accenture-interview-hr-general", difficulty: "easy", question_text: "Describe a time you worked in a team to solve a problem.", solution_text: "Use a specific example with your role, the team's approach, a challenge faced, and the resolution — concrete details matter more than the outcome alone.", company_name: "Accenture", year_asked: 2024 },

    // Capgemini
    { topicKey: "capgemini-apt-verbal-synonyms", difficulty: "easy", question_text: "Choose the word most opposite in meaning to 'Verbose'.", solution_text: "Concise. Verbose means using more words than necessary, so its antonym describes brevity.", company_name: "Capgemini", year_asked: 2024 },
    { topicKey: "capgemini-coding-c-pointers", difficulty: "medium", question_text: "Explain the difference between malloc() and calloc().", solution_text: "malloc() allocates a block of uninitialized memory of a given size. calloc() allocates memory for an array of elements, initializing all bytes to zero.", company_name: "Capgemini", year_asked: 2024 },
    { topicKey: "capgemini-interview-hr-general", difficulty: "easy", question_text: "What motivates you to do your best work?", solution_text: "Give a genuine, specific answer tied to real experience — solving hard problems, learning new things, team impact — rather than a generic claim.", company_name: "Capgemini", year_asked: 2024 },

    // HCLTech
    { topicKey: "hcltech-apt-quant-timespeed", difficulty: "medium", question_text: "A boat travels 30 km downstream in 2 hours and returns upstream in 3 hours. Find the speed of the boat in still water.", solution_text: "Downstream speed = 15 km/h, upstream speed = 10 km/h. Speed in still water = (15+10)/2 = 12.5 km/h.", company_name: "HCLTech", year_asked: 2024 },
    { topicKey: "hcltech-cs-dbms-normalization", difficulty: "easy", question_text: "What is denormalization, and when might it be used?", solution_text: "Denormalization intentionally introduces redundancy into a database design to improve read performance, typically used when query speed matters more than write-side consistency overhead.", company_name: "HCLTech", year_asked: 2023 },
    { topicKey: "hcltech-interview-hr-general", difficulty: "easy", question_text: "What do you know about our company?", solution_text: "Research the company's core business areas, recent notable work, and values beforehand — give a specific, informed answer rather than a generic summary.", company_name: "HCLTech", year_asked: 2024 },

    // Zoho
    { topicKey: "zoho-coding-cpp-strings", difficulty: "medium", question_text: "Remove all duplicate characters from a string while preserving order.", solution_text: "Iterate the string using a seen-set; append a character to the result only if it hasn't been seen before.", company_name: "Zoho", year_asked: 2024 },
    { topicKey: "zoho-cs-oop-inheritance", difficulty: "medium", question_text: "What is the difference between abstraction and encapsulation?", solution_text: "Abstraction hides implementation complexity, exposing only relevant functionality. Encapsulation bundles data and methods together while restricting direct access to internal state.", company_name: "Zoho", year_asked: 2024 },
    { topicKey: "zoho-interview-technical-projectdeepdive", difficulty: "medium", question_text: "Why did you choose the specific tech stack for your project?", solution_text: "Explain the genuine tradeoffs considered — team familiarity, performance needs, ecosystem support — rather than listing technologies without justification.", company_name: "Zoho", year_asked: 2024 },

    // IBM
    { topicKey: "ibm-apt-quant-percentages", difficulty: "easy", question_text: "What is 35% of 480?", solution_text: "0.35 * 480 = 168.", company_name: "IBM", year_asked: 2024 },
    { topicKey: "ibm-coding-python-dictionaries", difficulty: "easy", question_text: "How do you safely access a dictionary key that may not exist?", solution_text: "Use dict.get(key, default_value) instead of dict[key], which returns the default instead of raising a KeyError if the key is absent.", company_name: "IBM", year_asked: 2024 },
    { topicKey: "ibm-cs-cn-tcpip", difficulty: "easy", question_text: "What is the function of the Transport layer in the TCP/IP model?", solution_text: "The Transport layer manages end-to-end communication, providing reliability (TCP) or speed (UDP), including segmentation, flow control, and error checking.", company_name: "IBM", year_asked: 2023 },
    { topicKey: "ibm-interview-hr-general", difficulty: "easy", question_text: "How do you keep your technical skills up to date?", solution_text: "Give specific, genuine examples — courses taken, projects built, communities followed — rather than a vague claim of 'always learning.'", company_name: "IBM", year_asked: 2024 },
  ],
};