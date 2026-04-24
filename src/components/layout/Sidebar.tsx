import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  ClipboardList, 
  PenTool,
  Settings, 
  Menu,
  X,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Meu Avanço', icon: LayoutDashboard },
  { id: 'study', label: 'Trilha de Aprendizado', icon: Map },
  { id: 'simulados', label: 'Simulados TRI', icon: ClipboardList },
  { id: 'redacao', label: 'Lab. de Redação', icon: PenTool },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <button 
        id="sidebar-toggle"
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600"
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
          "fixed top-0 left-0 h-screen bg-next-bg border-r border-next-border z-40 transition-all duration-300 md:translate-x-0 w-[280px]",
          !isOpen && "md:w-[280px]"
        )}
      >
        <div className="flex flex-col h-full p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12 px-2">
            <div className="w-9 h-9 bg-next-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Zap size={20} weight="bold" />
            </div>
            <div className="flex font-black text-xl tracking-tighter">
              <span className="text-next-blue">NEXT</span>
              <span className="text-slate-800">ENEM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
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
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold",
                    isActive 
                      ? "bg-next-blue text-white shadow-md shadow-blue-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-next-blue"
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-next-blue"
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

          <div className="mt-auto p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Seu Plano</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">Premium Pro</span>
              <span className="text-[10px] bg-next-blue/10 text-next-blue px-2 py-0.5 rounded-full font-bold">Ativo</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-next-blue w-3/4 rounded-full" />
            </div>
          </div>
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
