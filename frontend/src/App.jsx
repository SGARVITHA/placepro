import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CompanyList from './pages/CompanySpecific/CompanyList';
import CompanyCategory from './pages/CompanySpecific/CompanyCategory';
import TopicBrowser from './pages/CompanySpecific/TopicBrowser';
import QuestionList from './pages/CompanySpecific/QuestionList';
import QuestionDetail from './pages/CompanySpecific/QuestionDetail';
import InterviewPreparation from './pages/Interview/InterviewPreparation';
import InterviewQuestionDetail from './pages/Interview/InterviewQuestionDetail';
import InterviewSelection from './pages/Interview/InterviewSelection';
import HRTopicList from './pages/Interview/HRTopicList';
import HRQuestionList from './pages/Interview/HRQuestionList';
import StarPracticeDetail from './pages/Interview/StarPracticeDetail';
import TechnicalTopicList from './pages/Interview/TechnicalTopicList';
import TechnicalQuestionList from './pages/Interview/TechnicalQuestionList';
import TechnicalPracticeDetail from './pages/Interview/TechnicalPracticeDetail';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import Placeholder from './pages/Placeholder/Placeholder';

// New Practice & Testing Screens
import PracticeSelection from './pages/Practice/PracticeSelection';
import AptitudeTopicList from './pages/Practice/Aptitude/AptitudeTopicList';
import AptitudeQuestionList from './pages/Practice/Aptitude/AptitudeQuestionList';
import MCQQuestionPage from './pages/Practice/MCQQuestionPage';
import MCQPractice from './pages/Practice/MCQPractice';
import CodingPractice from './pages/Practice/CodingPractice';
import CodingTopicList from './pages/Practice/Coding/CodingTopicList';
import CodingQuestionList from './pages/Practice/Coding/CodingQuestionList';
import CodingWorkspace from './pages/Practice/Coding/CodingWorkspace';
import FlashcardsPractice from './pages/Practice/FlashcardsPractice';
import CSSubjectsList from './pages/Practice/CSSubjects/CSSubjectsList';
import CSQuestionList from './pages/Practice/CSSubjects/CSQuestionList';
import CSFlashcardPractice from './pages/Practice/CSSubjects/CSFlashcardPractice';
import InterviewPractice from './pages/Practice/InterviewPractice';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Activity from './pages/Activity/Activity';
import DriveAlerts from './pages/Drives/DriveAlerts';
import TestSetup from './pages/Tests/TestSetup';
import TestSession from './pages/Tests/TestSession';
import TestResults from './pages/Tests/TestResults';

import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CompanyList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Specific Flow */}
        <Route
          path="/company/:companyId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CompanyCategory />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        {/* Company Specific Interview Flow */}
        <Route
          path="/company/:companyId/interview"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewSelection />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/interview/hr"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HRTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/interview/hr/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HRQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/interview/hr/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <StarPracticeDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/:companyId/interview/technical"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/interview/technical/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/interview/technical/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalPracticeDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Specific CS Subjects Unified Flow */}
        <Route
          path="/company/:companyId/cs-subjects"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSSubjectsList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/cs-subjects/:subjectId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/cs-subjects/:subjectId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSFlashcardPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/:companyId/cs-subjects/:subjectId/:questionId/mcq"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MCQQuestionPage practiceType="cs-subjects" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Specific Aptitude Flow */}
        <Route
          path="/company/:companyId/aptitude"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AptitudeTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/aptitude/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AptitudeQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/aptitude/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MCQQuestionPage practiceType="aptitude" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Specific Coding Unified Flow */}
        <Route
          path="/company/:companyId/coding"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/coding/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/coding/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingWorkspace />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/:companyId/:categoryId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TopicBrowser />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/:categoryId/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <QuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/:categoryId/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <QuestionDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* General Practice Interview Flow */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewSelection />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/hr"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HRTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/hr/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HRQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/hr/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <StarPracticeDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/technical"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/technical/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/technical/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TechnicalPracticeDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/:type/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewQuestionDetail />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/star"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Navigate to="/interview/hr" replace />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/freeform"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* General Practice Hub & Categories */}
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <PracticeSelection />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* General Practice Aptitude Flow */}
        <Route
          path="/practice/aptitude"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AptitudeTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/aptitude/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AptitudeQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/aptitude/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MCQQuestionPage practiceType="aptitude" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* General Practice CS Subjects Unified Flow */}
        <Route
          path="/practice/cs-subjects"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSSubjectsList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/cs-subjects/:subjectId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/cs-subjects/:subjectId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSFlashcardPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/cs-subjects/:subjectId/:questionId/mcq"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MCQQuestionPage practiceType="cs-subjects" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        {/* General Practice Coding Flow */}
        <Route
          path="/practice/coding"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingTopicList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/coding/:topicId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingQuestionList />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/coding/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CodingWorkspace />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        {/* Backwards-compatible flashcards routes */}
        <Route
          path="/practice/flashcards"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSFlashcardPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/flashcards/:subjectId"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CSFlashcardPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/star"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/freeform"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewPractice />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Bookmarks, Activity & Drives */}
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Bookmarks />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Activity />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recent-practice"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Activity />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Activity />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recent-companies"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <DriveAlerts />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/drives"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <DriveAlerts />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Mock Tests Flow */}
        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TestSetup />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests/session"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TestSession />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests/results"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TestResults />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Notes & Profile */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Notes />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Remaining Planned Placeholders */}
        {[
          '/contribute/question',
          '/contribute/experience',
          '/contribute/paper',
          '/tpo'
        ].map(path => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Placeholder />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
