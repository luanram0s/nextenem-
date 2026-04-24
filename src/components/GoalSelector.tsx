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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Defina sua Meta</h2>
                    <p className="text-slate-500 font-medium mt-2">A LARA usará estes dados para calibrar seus simulados.</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Curso */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Escolha o Curso</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        placeholder="Ex: Medicina"
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-next-blue/30 focus:ring-4 focus:ring-next-blue/5 transition-all font-medium text-slate-700"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                      {filteredCourses.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedCourse(c.name);
                            setSearchCourse(c.name);
                          }}
                          className={cn(
                            "w-full p-4 rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between",
                            selectedCourse === c.name 
                              ? "bg-next-blue text-white shadow-lg shadow-blue-500/20" 
                              : "bg-white border border-slate-100 text-slate-600 hover:border-next-blue/20"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <GraduationCap size={16} />
                            {c.name}
                          </div>
                          {selectedCourse === c.name && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Universidade */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instituição Alvo</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text"
                        placeholder="Ex: USP"
                        value={searchUni}
                        onChange={(e) => setSearchUni(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-next-blue/30 focus:ring-4 focus:ring-next-blue/5 transition-all font-medium text-slate-700"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                      {filteredUnis.map((u) => (
                        <button
                          key={u}
                          onClick={() => {
                            setSelectedUni(u);
                            setSearchUni(u);
                          }}
                          className={cn(
                            "w-full p-4 rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between",
                            selectedUni === u 
                              ? "bg-next-blue text-white shadow-lg shadow-blue-500/20" 
                              : "bg-white border border-slate-100 text-slate-600 hover:border-next-blue/20"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <School size={16} />
                            {u}
                          </div>
                          {selectedUni === u && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={!selectedCourse || !selectedUni}
                    className={cn(
                      "h-14 px-10 rounded-2xl font-black uppercase tracking-widest transition-all overflow-hidden relative",
                      isSaved 
                        ? "bg-emerald-500 text-white w-full" 
                        : "bg-slate-900 text-white hover:bg-next-blue disabled:bg-slate-200"
                    )}
                  >
                    {isSaved ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check size={20} /> Meta Salva com Sucesso
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
