import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TheoryDashboard from './components/TheoryDashboard';
import Login from './pages/Login';
import LaraChat from './components/LaraChat';
import GoalSelector from './components/GoalSelector';
import MasterPanel from './components/MasterPanel';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('next_enem_auth') === 'true';
  });
  
  const [hasGoal, setHasGoal] = useState(() => {
    return !!localStorage.getItem('next_enem_meta');
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('next_enem_user');
    return savedUser ? JSON.parse(savedUser) : { name: 'Luan Luis', role: 'admin' };
  });

  useEffect(() => {
    // Sync authentication state
    const auth = localStorage.getItem('next_enem_auth') === 'true';
    if (auth !== isAuthenticated) setIsAuthenticated(auth);

    const goal = !!localStorage.getItem('next_enem_meta');
    if (goal !== hasGoal) setHasGoal(goal);
  }, [location]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('next_enem_auth', 'true');
    navigate('/');
  };

  const handleSetGoal = (goal: { course: string; institution: string }) => {
    localStorage.setItem('next_enem_meta', JSON.stringify(goal));
    localStorage.setItem('next_enem_course', `${goal.course} - ${goal.institution}`);
    setHasGoal(true);
    navigate('/');
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!hasGoal && location.pathname !== '/goal') return <Navigate to="/goal" replace />;
    
    if (requireAdmin && user?.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/goal" 
            element={
              <ProtectedRoute>
                <GoalSelector onConfirm={handleSetGoal} />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="p-12">
                   <MasterPanel />
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/library" 
            element={
              <ProtectedRoute>
                <TheoryDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <LaraChat />
    </div>
  );
}
