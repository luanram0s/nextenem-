import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, School, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Course {
  name: string;
  id: string;
}

const COURSES: Course[] = [
  { name: 'Medicina', id: 'med' },
  { name: 'Direito', id: 'dir' },
  { name: 'Engenharia de Computação', id: 'eng' },
  { name: 'Psicologia', id: 'psi' },
  { name: 'Administração', id: 'adm' },
  { name: 'Arquitetura', id: 'arq' },
  { name: 'Odontologia', id: 'odo' },
  { name: 'Enfermagem', id: 'enf' },
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

interface GoalSelectorProps {
  onConfirm: (goal: { course: string; university: string }) => void;
}

export default function GoalSelector({ onConfirm }: GoalSelectorProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedUni, setSelectedUni] = useState<string>('');

  const handleConfirm = () => {
    if (selectedCourse && selectedUni) {
      onConfirm({ course: selectedCourse, university: selectedUni });
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[500] flex flex-col font-sans overflow-y-auto">
      {/* Header */}
      <header className="py-12 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-12 h-12 bg-next-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-black text-2xl">N</span>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">NEXT ENEM</span>
        </motion.div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Defina sua Meta</h1>
        <p className="text-slate-500 font-medium mt-2">Personalize sua experiência de estudoadaptativo.</p>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-24 space-y-16">
        {/* Course Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
              <GraduationCap size={18} />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">1. Qual o seu curso alvo?</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COURSES.map((course) => (
              <motion.button
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCourse(course.name)}
                className={cn(
                  "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 text-center",
                  selectedCourse === course.name
                    ? "border-next-blue bg-blue-50/50 shadow-xl shadow-blue-500/10 text-next-blue"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-1",
                  selectedCourse === course.name ? "bg-next-blue text-white" : "bg-slate-50 text-slate-400"
                )}>
                  <GraduationCap size={24} />
                </div>
                <span className="text-sm font-black uppercase tracking-tight leading-tight">{course.name}</span>
                {selectedCourse === course.name && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 bg-next-blue text-white rounded-full p-1">
                    <Check size={12} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* University Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
              <School size={18} />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">2. Onde você quer estudar?</h2>
          </div>
          
          <div className="space-y-3">
            {UNIVERSITIES.map((uni) => (
              <button
                key={uni}
                onClick={() => setSelectedUni(uni)}
                className={cn(
                  "w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between",
                  selectedUni === uni
                    ? "border-next-blue bg-blue-50/50 text-next-blue"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                )}
              >
                <span className="font-bold text-sm">{uni}</span>
                {selectedUni === uni && <Check size={20} />}
              </button>
            ))}
          </div>
        </section>

        {/* Confirm Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleConfirm}
            disabled={!selectedCourse || !selectedUni}
            className={cn(
              "h-16 px-16 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl active:scale-95",
              selectedCourse && selectedUni
                ? "bg-next-blue text-white hover:bg-blue-600 shadow-blue-500/30"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            Confirmar Meta
          </button>
        </div>
      </main>
    </div>
  );
}
