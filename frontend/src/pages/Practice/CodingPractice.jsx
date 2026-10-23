import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  Play,
  CheckCircle,
  Code2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  Terminal,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { mockQuestions } from '../../services/mockApiService';
import { UserService } from '../../data/UserService';

export default function CodingPractice() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const targetQId = searchParams.get('q') || location.state?.questionId;

  const codingQuestions = mockQuestions.filter((q) => q.category_id === 'coding');
  
  const initialIndex = targetQId
    ? Math.max(0, codingQuestions.findIndex((q) => q.id === targetQId))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(codingQuestions[initialIndex]?.starter_code || '// Write your solution here');
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => UserService.getBookmarks());
  const [solvedList, setSolvedList] = useState(() => UserService.getSolved());

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarks(UserService.getBookmarks());
    };
    window.addEventListener('placepro_bookmark_changed', handleBookmarkChange);
    return () => window.removeEventListener('placepro_bookmark_changed', handleBookmarkChange);
  }, []);

  const currentQ = codingQuestions[currentIndex] || codingQuestions[0];
  const isBookmarked = bookmarks.includes(currentQ.id);
  const isSolved = solvedList.includes(currentQ.id);

  const handleSelectQuestion = (index) => {
    setCurrentIndex(index);
    setCode(codingQuestions[index]?.starter_code || '// Write your solution here');
    setConsoleOutput(null);
  };

  const toggleBookmark = () => {
    const updated = UserService.toggleBookmark(currentQ.id);
    setBookmarks(updated);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setConsoleOutput({
        status: 'success',
        runtime: '48 ms',
        memory: '42.1 MB',
        message: 'All test cases passed successfully!',
        testCases: [
          { input: currentQ.example_input, output: currentQ.example_output, status: 'Passed' },
          { input: 'Corner case (single element array)', output: 'Valid', status: 'Passed' },
        ],
      });
    }, 600);
  };

  const handleSubmit = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const updatedSolved = UserService.toggleSolved(currentQ.id);
      setSolvedList(updatedSolved);
      setConsoleOutput({
        status: 'accepted',
        runtime: '52 ms (Beats 89.4% of submissions)',
        memory: '41.8 MB',
        message: 'Accepted! Problem solved and saved to your activity record.',
        testCases: [
          { input: currentQ.example_input, output: currentQ.example_output, status: 'Passed' },
          { input: 'Test case 2', output: 'Expected', status: 'Passed' },
          { input: 'Large input 10^5 elements', output: 'Expected', status: 'Passed' },
        ],
      });
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Practice' },
          { label: 'Coding Practice' },
          { label: currentQ.title || 'Problem' },
        ]}
      />

      {/* Top Problem Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Problem {currentIndex + 1} of {codingQuestions.length}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                currentQ.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {currentQ.difficulty}
            </span>
            {isSolved && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#16793A] flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Solved
              </span>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            {currentQ.title || currentQ.question_text.split('\n')[0]}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleBookmark}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-white">
            <button
              type="button"
              onClick={() => handleSelectQuestion(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
              title="Previous Problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium px-2 text-slate-500">
              {currentIndex + 1} / {codingQuestions.length}
            </span>
            <button
              type="button"
              onClick={() => handleSelectQuestion(Math.min(codingQuestions.length - 1, currentIndex + 1))}
              disabled={currentIndex === codingQuestions.length - 1}
              className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600"
              title="Next Problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Coding Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Description & Examples */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Problem Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {currentQ.question_text}
            </p>
          </div>

          {currentQ.example_input && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Example
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 font-mono text-xs">
                <div>
                  <span className="text-slate-500">Input: </span>
                  <span className="text-slate-900 font-semibold">{currentQ.example_input}</span>
                </div>
                <div>
                  <span className="text-slate-500">Output: </span>
                  <span className="text-[#16793A] font-semibold">{currentQ.example_output}</span>
                </div>
              </div>
            </div>
          )}

          {currentQ.solution && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Recommended Approach
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                {currentQ.solution}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor & Console Output */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 shadow-md overflow-hidden flex flex-col">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">Solution.js</span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-800 text-slate-300 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none"
                >
                  <option value="javascript">JavaScript (Node.js)</option>
                  <option value="python">Python 3</option>
                  <option value="java">Java 17</option>
                  <option value="cpp">C++ 20</option>
                </select>

                <button
                  type="button"
                  onClick={() => setCode(currentQ.starter_code || '// Reset')}
                  className="text-slate-400 hover:text-white p-1 rounded"
                  title="Reset Code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-4 bg-[#1E293B]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none"
                spellCheck="false"
              />
            </div>

            {/* Editor Action Buttons */}
            <div className="px-4 py-3 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Tab: 2 spaces · UTF-8
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>Run</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isExecuting}
                  className="px-4 py-1.5 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isExecuting ? 'Evaluating...' : 'Submit'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Case / Execution Console Output */}
          {consoleOutput && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Execution Output
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {consoleOutput.status === 'accepted' ? 'Accepted' : 'Tests Passed'} · {consoleOutput.runtime}
                </span>
              </div>

              <p className="text-xs font-medium text-slate-700">
                {consoleOutput.message}
              </p>

              <div className="space-y-1.5 pt-1">
                {consoleOutput.testCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded bg-slate-50 border border-slate-200/80 font-mono"
                  >
                    <span className="text-slate-600 truncate max-w-xs">{tc.input}</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      ✓ {tc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
