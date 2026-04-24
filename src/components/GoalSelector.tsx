import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Building2, CheckCircle2, X } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#007BFF]">NEXT ENEM</h1>
          <p className="text-slate-500 font-medium">Defina sua meta para começar.</p>
        </div>

        {/* 1. CURSO */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">1. Qual seu curso?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {courses.map(c => (
              <button 
                key={c} 
                onClick={() => setSelectedCourse(c)} 
                className={`p-3 rounded-xl border-2 transition-all font-bold text-xs uppercase tracking-tight ${selectedCourse === c ? "border-[#007BFF] bg-blue-50 text-[#007BFF] shadow-sm" : "border-slate-100 text-slate-600 hover:border-slate-200"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 2. INSTITUIÇÃO COM BADGE */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-800">2. Onde quer estudar?</h2>
          
          <div className="min-h-[40px]">
            <AnimatePresence>
              {selectedInst && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2 bg-[#007BFF] text-white px-4 py-2 rounded-full w-fit shadow-lg shadow-blue-500/20 mb-4"
                >
                  <Building2 size={16} /> <span className="font-bold text-sm">{selectedInst}</span>
                  <X size={14} className="cursor-pointer hover:scale-125 transition-transform" onClick={() => setSelectedInst("")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Digite e pressione Enter..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search.length > 2) {
                  setSelectedInst(search); // Transforma o texto em Badge ao dar Enter
                  setSearch(""); 
                }
              }}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#007BFF] focus:bg-white outline-none transition-all font-medium text-slate-800" 
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filtered.slice(0, 4).map(i => (
              <button 
                key={i} 
                onClick={() => setSelectedInst(i)} 
                className={`px-4 py-2 text-xs font-bold border-2 rounded-full transition-all ${selectedInst === i ? "bg-blue-50 border-[#007BFF] text-[#007BFF]" : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button 
            disabled={!selectedCourse || !selectedInst}
            onClick={() => {
              const goal = { course: selectedCourse, institution: selectedInst };
              // We'll use 'next_enem_meta' as requested by the provided code
              localStorage.setItem('next_enem_meta', JSON.stringify(goal));
              onConfirm(goal);
            }}
            className={`w-full py-5 rounded-2xl font-black text-white transition-all uppercase tracking-widest text-xs ${selectedCourse && selectedInst ? "bg-[#007BFF] shadow-2xl shadow-blue-500/30 hover:scale-[1.02] active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
          >
            CONFIRMAR META
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelector;
