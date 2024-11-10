import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { PlanTrip } from './pages/PlanTrip';
import { useAuthStore } from './store/authStore';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/plan-trip"
              element={
                <PrivateRoute>
                  <PlanTrip />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/plan-trip" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;