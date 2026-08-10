import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CompanyList from './pages/CompanySpecific/CompanyList';
import CategoryList from './pages/CompanySpecific/CategoryList';
import TopicList from './pages/CompanySpecific/TopicList';
import QuestionList from './pages/CompanySpecific/QuestionList';
import QuestionDetail from './pages/CompanySpecific/QuestionDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <Layout>
                <CompanyList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId"
          element={
            <ProtectedRoute>
              <Layout>
                <CategoryList />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Topic List routes (shared for Company Specific and Common Prep) */}
        <Route
          path="/company/:companyId/:categorySlug"
          element={
            <ProtectedRoute>
              <Layout>
                <TopicList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/:companyId/:categorySlug/:sectionId"
          element={
            <ProtectedRoute>
              <Layout>
                <TopicList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prep/:categorySlug"
          element={
            <ProtectedRoute>
              <Layout>
                <TopicList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prep/:categorySlug/:sectionId"
          element={
            <ProtectedRoute>
              <Layout>
                <TopicList />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Question List routes (shared for Company Specific and Common Prep) */}
        <Route
          path="/company/:companyId/:categorySlug/:sectionId/:topicId"
          element={
            <ProtectedRoute>
              <Layout>
                <QuestionList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prep/:categorySlug/:sectionId/:topicId"
          element={
            <ProtectedRoute>
              <Layout>
                <QuestionList />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Question Detail routes (shared for Company Specific and Common Prep) */}
        <Route
          path="/company/:companyId/:categorySlug/:sectionId/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <Layout>
                <QuestionDetail />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prep/:categorySlug/:sectionId/:topicId/:questionId"
          element={
            <ProtectedRoute>
              <Layout>
                <QuestionDetail />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





