import React from 'react';
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
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import Placeholder from './pages/Placeholder/Placeholder';
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

        {/* Interview Flow */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <InterviewPreparation />
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

        {/* All Placeholders */}
        {[
          '/practice/aptitude',
          '/practice/coding',
          '/practice/cs-subjects',
          '/recent-companies',
          '/recent-practice',
          '/tests',
          '/bookmarks',
          '/leaderboard',
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
