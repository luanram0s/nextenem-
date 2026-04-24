import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  Save, 
  Sparkles,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading';
  completed: boolean;
}

const LESSONS: Lesson[] = [
  { id: '1', title: 'Introdução à Geometria Espacial', duration: '12:45', type: 'video', completed: true },
  { id: '2', title: 'Prismas e Pirâmides', duration: '18:20', type: 'video', completed: true },
  { id: '3', title: 'Cilindros e Cones', duration: '15:10', type: 'video', completed: false },
  { id: '4', title: 'Esferas e Troncos', duration: '22:05', type: 'video', completed: false },
  { id: '5', title: 'Material de Apoio: Exercícios de Fixação', duration: '10 min', type: 'reading', completed: false },
];

export default function LessonView({ onBack }: { onBack: () => void }) {
  const [currentLesson, setCurrentLesson] = useState(LESSONS[2]);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`next_notes_${currentLesson.id}`);
    if (savedNotes) setNotes(savedNotes);
  }, [currentLesson.id]);

  // Auto-save notes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(`next_notes_${currentLesson.id}`, notes);
      if (notes.length > 0) {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [notes, currentLesson.id]);

  const handleLaraSupport = () => {
    // Dispatch custom event for LARA chat
    window.dispatchEvent(new CustomEvent('lara-trigger', {
      detail: {
        message: `LARA, estou com dúvida na aula "${currentLesson.title}". Pode me explicar melhor?`,
        context: { lessonTitle: currentLesson.title, lessonId: currentLesson.id }
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 flex items-center justify-between px-8 bg-zinc-900/50 border-b border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-zinc-800 mx-2" />
          <h2 className="text-sm font-bold tracking-tight text-zinc-300">
            Matemática <ChevronRight size={14} className="inline mx-1 text-zinc-600" /> Geometria Espacial
          </h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Sincronizado com LARA
          </div>
          <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
            Marcar como concluída
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-12 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-[0_0_50px_-12px_rgba(0,123,255,0.15)] overflow-hidden flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-next-blue rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 relative z-10"
              >
                <Play size={32} fill="white" className="text-white ml-1" />
              </motion.div>
              
              <div className="absolute bottom-10 left-10 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-black tracking-tight">{currentLesson.title}</h3>
                <p className="text-sm text-zinc-400 font-medium">{currentLesson.duration}</p>
              </div>
            </div>

            {/* Lesson Head */}
            <div className="flex items-start justify-between border-b border-zinc-900 pb-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tighter text-white">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} /> {currentLesson.duration}
                  </span>
                  <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={16} className="text-amber-500" /> Nível ENEM: Médio
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleLaraSupport}
                className="flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold text-white transition-all shadow-xl hover:shadow-blue-500/5 group"
              >
                <MessageSquare size={18} className="text-next-blue group-hover:scale-110 transition-transform" />
                Dúvida com LARA
              </button>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-zinc-600" size={20} />
                  <h3 className="text-lg font-black tracking-tight text-zinc-300">Minhas Anotações</h3>
                </div>
                <AnimatePresence>
                  {isSaving && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs font-medium text-zinc-500"
                    >
                      <Save size={12} /> Salvando...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="O que você aprendeu nesta aula? Suas notas são salvas automaticamente..."
                className="w-full min-h-[300px] p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-next-blue/30 focus:bg-zinc-900/50 transition-all font-medium leading-relaxed"
              />
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col">
          <div className="p-8 border-b border-zinc-800">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Cronograma da Aula</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={cn(
                  "w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left group",
                  currentLesson.id === lesson.id 
                    ? "bg-next-blue/10 border border-next-blue/20" 
                    : "hover:bg-zinc-800/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                )}
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  ) : (
                    <Circle size={24} className="text-zinc-700 group-hover:text-zinc-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-sm font-bold truncate",
                    currentLesson.id === lesson.id ? "text-next-blue" : "text-zinc-300"
                  )}>
                    {lesson.title}
                  </h4>
                  <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mt-1">
                    {lesson.type} • {lesson.duration}
                  </p>
                </div>
                {currentLesson.id === lesson.id && (
                  <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 bg-next-blue rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 bg-zinc-950/50 border-t border-zinc-800">
            <button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-emerald-900/20 active:scale-95">
              Próxima Aula
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
