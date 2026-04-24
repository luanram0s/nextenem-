import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import StudyRoom from './pages/StudyRoom';
import Simulados from './pages/Simulados';
import Redacao from './pages/Redacao';
import Login from './pages/Login';
import LaraChat from './components/LaraChat';
import GoalSelector from './components/GoalSelector';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
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
    setIsLoggedIn(true);
    localStorage.setItem('next_enem_auth', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('next_enem_auth', 'false');
  };

  const handleSetGoal = (goal: { course: string; institution: string }) => {
    localStorage.setItem('next_enem_meta', JSON.stringify(goal));
    localStorage.setItem('next_enem_course', `${goal.course} - ${goal.institution}`);
    setHasGoal(true);
    // Force storage event to update other components if needed
    window.dispatchEvent(new Event('storage'));
  };

  if (!isLoggedIn) {
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'study':
        return <StudyRoom />;
      case 'simulados':
        return <Simulados />;
      case 'redacao':
        return <Redacao />;
      case 'settings':
      default:
        return (
          <div className="p-8 text-center text-gray-400">
            Seção em desenvolvimento
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-next-bg text-slate-900 selection:bg-next-blue selection:text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      <main className="transition-all duration-300 md:ml-[280px] p-8 lg:p-16 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <LaraChat />
    </div>
  );
}
