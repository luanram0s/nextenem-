import React, { useState } from 'react';
import { PlayCircle, FileText, CheckCircle, Lock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import LessonView from '../components/LessonView';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'Matemática', label: 'Matemática' },
  { id: 'Linguagens', label: 'Linguagens' },
  { id: 'Natureza', label: 'Natureza' },
  { id: 'Humanas', label: 'Humanas' },
];

const modules = [
  { id: 1, title: 'Geometria Espacial e Plana', category: 'Matemática', incidence: 'Alta', count: 12, progress: 60, status: 'unlocked', icon: BookOpen, color: 'text-next-blue', bg: 'bg-blue-50' },
  { id: 2, title: 'Variação Linguística', category: 'Linguagens', incidence: 'Média', count: 8, progress: 45, status: 'unlocked', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 3, title: 'Ciclos Biogeoquímicos', category: 'Natureza', incidence: 'Alta', count: 15, progress: 0, status: 'locked', icon: Lock, color: 'text-slate-400', bg: 'bg-slate-50' },
  { id: 4, title: 'Era Vargas e Populismo', category: 'Humanas', incidence: 'Alta', count: 10, progress: 100, status: 'completed', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 5, title: 'Estequiometria Avançada', category: 'Natureza', incidence: 'Alta', count: 20, progress: 10, status: 'unlocked', icon: BookOpen, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 6, title: 'Filosofia Medieval', category: 'Humanas', incidence: 'Baixa', count: 5, progress: 0, status: 'unlocked', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function StudyRoom() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewingLesson, setViewingLesson] = useState(false);

  const filteredModules = activeFilter === 'all' 
    ? modules 
    : modules.filter(m => m.category === activeFilter);

  if (viewingLesson) {
    return <LessonView onBack={() => setViewingLesson(false)} />;
  }

  return (
    <div className="space-y-12 max-w-6xl mx-auto animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">NEXT ENEM</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-next-blue rounded-full" />
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Trilha de Aprendizado</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-2xl">
            Módulos estruturados de acordo com a Matriz de Referência do ENEM. 
            Seu progresso é monitorado para otimização de tempo.
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={cn(
              "px-6 py-2.5 rounded-[0.8rem] text-xs font-black uppercase tracking-widest transition-all",
              activeFilter === cat.id 
                ? "bg-white text-next-blue shadow-sm" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredModules.map((mod) => (
            <motion.div 
              key={mod.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              whileHover={mod.status !== 'locked' ? { y: -8 } : {}}
              onClick={() => mod.status !== 'locked' && setViewingLesson(true)}
              className={cn(
                "p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all relative overflow-hidden flex flex-col h-full",
                mod.status === 'locked' ? "opacity-60 bg-slate-50/50" : "hover:border-next-blue/20 cursor-pointer shadow-xl shadow-slate-200/40",
                mod.incidence === 'Alta' && mod.status !== 'locked' && "ring-2 ring-next-blue/5 shadow-[0_0_25px_rgba(0,123,255,0.1)] border-next-blue/10"
              )}
            >
              <div className="flex items-start justify-between relative z-10 mb-8">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl", mod.bg, mod.color)}>
                  <mod.icon size={28} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                      mod.incidence === 'Alta' ? "bg-red-50 text-red-600" :
                      mod.incidence === 'Média' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"
                    )}>
                      Incidência {mod.incidence}
                    </span>
                    <span className="text-[10px] font-black mt-2 text-slate-300 uppercase tracking-widest">{mod.count} Aulas</span>
                  </div>
                  <p className={cn(
                    "text-[10px] font-black px-3 py-1 rounded-full inline-block uppercase tracking-wider",
                    mod.status === 'completed' ? "bg-emerald-100 text-emerald-700" : 
                    mod.status === 'locked' ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-next-blue"
                  )}>
                    {mod.status === 'completed' ? 'Finalizado' : mod.status === 'locked' ? 'Bloqueado' : `${mod.progress}%`}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-next-blue uppercase tracking-[0.2em] mb-1 block">{mod.category}</span>
                  <h3 className="text-2xl font-black text-slate-800 mb-6 leading-tight">{mod.title}</h3>
                  
                  {mod.status !== 'locked' && (
                    <div className="space-y-3 mb-8">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${mod.progress}%` }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                          className={cn("h-full rounded-full", mod.status === 'completed' ? "bg-emerald-500" : "bg-next-blue")}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mod.status !== 'locked') setViewingLesson(true);
                  }}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest",
                    mod.status === 'locked' ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-next-blue shadow-lg hover:shadow-blue-200"
                  )}
                >
                  {mod.status === 'locked' ? 'Nível Insuficiente' : <><PlayCircle size={16} /> Continuar Estudo</>}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
