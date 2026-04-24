import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Building2, CheckCircle2, X, GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface GoalSelectorProps {
  onConfirm: (goal: { course: string; institution: string }) => void;
}

const courses = ["Medicina", "Direito", "Engenharia", "Psicologia", "Administração", "Enfermagem", "Veterinária", "Arquitetura"];
const institutions = ["USP", "UNICAMP", "UFRJ", "UFMG", "UFBA", "UNB", "UFSC"];

const GoalSelector: React.FC<GoalSelectorProps> = ({ onConfirm }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [search, setSearch] = useState("");
  const [selectedInst, setSelectedInst] = useState("");

  const filtered = institutions.filter(i => i.toLowerCase().includes(search.toLowerCase()));

  const handleConfirm = () => {
    if (selectedCourse && selectedInst) {
      const goal = { course: selectedCourse, institution: selectedInst };
      localStorage.setItem('next_enem_meta', JSON.stringify(goal));
      onConfirm(goal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && search.trim().length > 2) {
      setSelectedInst(search.trim());
      setSearch("");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-6 overflow-y-auto selection:bg-[#007BFF] selection:text-white">
      <div className="w-full max-w-xl space-y-10">
        <div className="text-center space-y-2">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 mb-2"
          >
            <div className="w-12 h-12 bg-[#007BFF] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
              <span className="text-white font-black text-2xl">N</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">NEXT ENEM</h1>
          </motion.div>
          <p className="text-slate-500 font-medium tracking-tight">Personalize sua jornada rumo à vaga.</p>
        </div>

        {/* 1. CURSO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#007BFF]">
              <GraduationCap size={18} />
            </div>
            <h2 className="font-black text-slate-800 uppercase tracking-tight text-xs">1. Escolha seu Curso</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {courses.map(c => (
              <button 
                key={c} 
                onClick={() => setSelectedCourse(c)} 
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest leading-tight",
                  selectedCourse === c 
                    ? "border-[#007BFF] bg-blue-50 text-[#007BFF] shadow-lg shadow-blue-500/10" 
                    : "border-slate-100 text-slate-500 hover:border-slate-200 bg-white"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 2. INSTITUIÇÃO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#007BFF]">
              <Building2 size={18} />
            </div>
            <h2 className="font-black text-slate-800 uppercase tracking-tight text-xs">2. Onde quer estudar?</h2>
          </div>
          
          <div className="min-h-[48px]">
            <AnimatePresence mode="wait">
              {selectedInst ? (
                <motion.div 
                  key="badge"
                  initial={{ scale: 0.8, opacity: 0, x: -10 }} 
                  animate={{ scale: 1, opacity: 1, x: 0 }} 
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-3 bg-[#007BFF] text-white px-6 py-3 rounded-2xl w-fit shadow-xl shadow-blue-500/20 mb-4"
                >
                  <Building2 size={18} /> 
                  <span className="font-black text-xs uppercase tracking-widest">{selectedInst}</span>
                  <button 
                    onClick={() => setSelectedInst("")}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Busque ou digite e aperte Enter..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#007BFF] focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300" 
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {!selectedInst && search.length === 0 && (
            <div className="flex flex-wrap gap-2 px-1">
              {institutions.map(i => (
                <button 
                  key={i} 
                  onClick={() => setSelectedInst(i)} 
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-slate-100 text-slate-400 rounded-full hover:border-blue-200 hover:bg-blue-50 hover:text-[#007BFF] transition-all"
                >
                  {i}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 px-2">
          <button 
            disabled={!selectedCourse || !selectedInst}
            onClick={handleConfirm}
            className={cn(
              "w-full py-5 rounded-2xl font-black text-white transition-all uppercase tracking-widest text-xs",
              selectedCourse && selectedInst 
                ? "bg-[#007BFF] shadow-2xl shadow-blue-500/40 hover:scale-[1.02] active:scale-95" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            )}
          >
            CONFIRMAR MINHA META
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelector;
