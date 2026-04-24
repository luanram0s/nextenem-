import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import StudyRoom from './pages/StudyRoom';
import Simulados from './pages/Simulados';
import Redacao from './pages/Redacao';
import Login from './pages/Login';
import LaraChat from './components/LaraChat';
import GoalSelector from './components/GoalSelector';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('next_enem_auth') === 'true';
  });
  
  const [hasGoal, setHasGoal] = useState(() => {
    return !!localStorage.getItem('next_enem_meta');
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('next_enem_active_tab') || 'dashboard';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('next_enem_active_tab', activeTab);
  }, [activeTab]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('next_enem_auth', 'true');
  };

  const handleSetGoal = (goal: { course: string; institution: string }) => {
    localStorage.setItem('next_enem_meta', JSON.stringify(goal));
    localStorage.setItem('next_enem_course', `${goal.course} - ${goal.institution}`);
    setHasGoal(true);
    window.dispatchEvent(new Event('storage'));
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <Login onLogin={handleLogin} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!hasGoal) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="goal-selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <GoalSelector onConfirm={handleSetGoal} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Dashboard />
      <LaraChat />
    </div>
  );
}
