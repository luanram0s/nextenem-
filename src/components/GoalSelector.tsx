import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Search, GraduationCap, School, Check, X, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Goal {
  course: string;
  university: string;
  score: number;
}

const COURSES = [
  { name: 'Medicina', score: 810 },
  { name: 'Direito', score: 750 },
  { name: 'Engenharia de Computação', score: 780 },
  { name: 'Psicologia', score: 710 },
  { name: 'Administração', score: 680 },
  { name: 'Arquitetura e Urbanismo', score: 720 },
  { name: 'Medicina Veterinária', score: 740 }
];

const UNIVERSITIES = [
  'USP - São Paulo',
  'UFMG - Belo Horizonte',
  'UFRJ - Rio de Janeiro',
  'UNICAMP - Campinas',
  'UNESP - Bauru',
  'UFRGS - Porto Alegre',
  'UFSC - Florianópolis'
];

export default function GoalSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedUni, setSelectedUni] = useState<string>('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchUni, setSearchUni] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('next_enem_goal');
    if (saved) {
      const data = JSON.parse(saved);
      setSelectedCourse(data.course);
      setSelectedUni(data.university);
    } else {
      // Auto-open if no meta exists
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    if (!selectedCourse || !selectedUni) return;

    const courseData = COURSES.find(c => c.name === selectedCourse);
    const goal: Goal = {
      course: selectedCourse,
      university: selectedUni,
      score: courseData?.score || 700
    };

    localStorage.setItem('next_enem_goal', JSON.stringify(goal));
    localStorage.setItem('next_enem_course', `${selectedCourse} - ${selectedUni.split(' ')[0]}`);
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
    }, 1500);

    // Trigger local storage event for dashboard update
    window.dispatchEvent(new Event('storage'));
  };

  const filteredCourses = COURSES.filter(c => 
    c.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  const filteredUnis = UNIVERSITIES.filter(u => 
    u.toLowerCase().includes(searchUni.toLowerCase())
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-next-blue/20 transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-next-blue/10 rounded-xl flex items-center justify-center text-next-blue">
            <Target size={20} />
          </div>
          <ArrowRight size={16} className="text-slate-300 group-hover:text-next-blue transition-all" />
        </div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1">Meta de Carreira</h3>
        <p className="text-xs text-slate-500 font-medium">Configure seu alvo para ajustar a LARA.</p>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Defina sua Meta</h2>
                    <p className="text-slate-500 text-sm font-medium">A LARA precisa disso para calibrar seu plano.</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Curso */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Carreira</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input 
                        type="text"
                        placeholder="Buscar curso..."
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-next-blue transition-all font-medium text-slate-700 text-sm"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                      {filteredCourses.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedCourse(c.name);
                            setSearchCourse(c.name);
                          }}
                          className={cn(
                            "w-full p-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between truncate",
                            selectedCourse === c.name 
                              ? "bg-next-blue text-white shadow-md shadow-blue-500/20" 
                              : "bg-white border border-slate-100 text-slate-600 hover:border-next-blue/20"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <GraduationCap size={14} className="flex-shrink-0" />
                            <span className="truncate">{c.name}</span>
                          </div>
                          {selectedCourse === c.name && <Check size={14} className="flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Universidade */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universidade</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input 
                        type="text"
                        placeholder="Buscar instituição..."
                        value={searchUni}
                        onChange={(e) => setSearchUni(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-next-blue transition-all font-medium text-slate-700 text-sm"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                      {filteredUnis.map((u) => (
                        <button
                          key={u}
                          onClick={() => {
                            setSelectedUni(u);
                            setSearchUni(u);
                          }}
                          className={cn(
                            "w-full p-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between truncate",
                            selectedUni === u 
                              ? "bg-next-blue text-white shadow-md shadow-blue-500/20" 
                              : "bg-white border border-slate-100 text-slate-600 hover:border-next-blue/20"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <School size={14} className="flex-shrink-0" />
                            <span className="truncate">{u}</span>
                          </div>
                          {selectedUni === u && <Check size={14} className="flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={handleSave}
                    disabled={!selectedCourse || !selectedUni}
                    className={cn(
                      "w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98]",
                      isSaved 
                        ? "bg-emerald-500 text-white" 
                        : "bg-next-blue text-white hover:bg-blue-600 disabled:bg-slate-200 disabled:shadow-none shadow-blue-500/30"
                    )}
                  >
                    {isSaved ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check size={20} /> Sucesso
                      </div>
                    ) : (
                      "Confirmar Meta"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
