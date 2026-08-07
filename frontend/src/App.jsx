import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function DashboardPlaceholder() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Dashboard — logged in
      </h1>
      {user && (
        <p className="text-text-secondary text-sm mb-6">
          Signed in as <span className="font-semibold text-text-primary">{user.email}</span>
        </p>
      )}
      <button
        type="button"
        onClick={signOut}
        className="px-5 py-2.5 bg-accent text-white rounded-pill text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Sign Out
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPlaceholder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
