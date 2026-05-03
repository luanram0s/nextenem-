import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  ClipboardList, 
  PenTool,
  Settings, 
  Menu,
  X,
  Zap,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Meu Avanço', icon: LayoutDashboard },
  { id: 'study', label: 'Trilha de Aprendizado', icon: Map },
  { id: 'simulados', label: 'Simulados TRI', icon: ClipboardList },
  { id: 'redacao', label: 'Lab. de Redação', icon: PenTool },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <button 
        id="sidebar-toggle"
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <motion.aside
        id="sidebar-container"
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-zinc-100 z-40 transition-all duration-300 md:translate-x-0 w-[280px] shadow-sm",
          !isOpen && "md:w-[280px]"
        )}
      >
        <div className="flex flex-col h-full p-8 selection:bg-blue-600 selection:text-white">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Zap size={24} fill="white" />
            </div>
            <div className="flex font-black text-2xl tracking-[ -0.05em] italic">
              <span className="text-blue-600">NEXT</span>
              <span className="text-black">ENEM</span>
            </div>
          </div>
 
          {/* Navigation */}
          <nav className="flex-1 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group text-[11px] font-black uppercase tracking-[0.05em]",
                    isActive 
                      ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" 
                      : "text-zinc-400 hover:bg-zinc-50 hover:text-black"
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-blue-600" : "text-zinc-300 group-hover:text-black"
                  )} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
                    />
                  )}
                </button>
              );
            })}
          </nav>
 
          {/* Logout Button */}
          <button 
            onClick={() => {
              localStorage.removeItem('next_enem_meta');
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-auto flex items-center gap-3 p-5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
