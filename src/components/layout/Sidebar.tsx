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
          "fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-40 transition-all duration-300 md:translate-x-0 w-[280px]",
          !isOpen && "md:w-[280px]"
        )}
      >
        <div className="flex flex-col h-full p-8 selection:bg-next-blue selection:text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-next-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Zap size={22} fill="white" />
            </div>
            <div className="flex font-black text-2xl tracking-tighter italic">
              <span className="text-next-blue">NEXT</span>
              <span className="text-slate-900">ENEM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
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
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group text-sm font-black uppercase tracking-tight",
                    isActive 
                      ? "bg-next-blue text-white shadow-xl shadow-blue-500/10" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-next-blue"
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-300 group-hover:text-next-blue"
                  )} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Progress Mini Card */}
          <div className="mt-auto mb-6 p-6 bg-slate-50/50 border border-slate-100 rounded-3xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sua evolução</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-slate-700">Meta TRI 800+</span>
              <span className="text-[10px] bg-next-blue/10 text-next-blue px-2 py-0.5 rounded-full font-black uppercase tracking-tight">On</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-next-blue w-[68%] rounded-full shadow-[0_0_8px_rgba(0,123,255,0.3)] transition-all duration-1000" />
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="flex items-center gap-3 p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] group border border-transparent hover:border-red-100 shadow-sm hover:shadow-red-200/20"
          >
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
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
