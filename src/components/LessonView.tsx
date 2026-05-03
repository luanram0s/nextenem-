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
    <div className="fixed inset-0 z-50 bg-white text-zinc-950 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-20 flex items-center justify-between px-10 bg-white border-b border-zinc-100 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 hover:bg-zinc-50 rounded-xl transition-colors text-zinc-400 hover:text-zinc-950 border border-transparent hover:border-zinc-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-[1px] bg-zinc-100 mx-2" />
          <h2 className="text-sm font-black tracking-tight text-zinc-950 flex items-center gap-2">
            Matemática <ChevronRight size={16} className="text-zinc-300" /> <span className="text-blue-600">Geometria Espacial</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            Ao vivo com LARA AI
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors">
            Marcar como concluída
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-12 scrollbar-thin scrollbar-thumb-zinc-200">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-2xl shadow-zinc-200/20 overflow-hidden flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 to-transparent" />
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 relative z-10"
              >
                <Play size={36} fill="white" className="text-white ml-2" />
              </motion.div>
              
              <div className="absolute bottom-12 left-12 text-zinc-950 z-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-black tracking-tight uppercase">{currentLesson.title}</h3>
                <p className="text-sm text-blue-600 font-black uppercase tracking-widest mt-1">{currentLesson.duration}</p>
              </div>
            </div>

            {/* Lesson Head */}
            <div className="flex items-start justify-between border-b border-zinc-100 pb-12">
              <div className="space-y-6">
                <h1 className="text-5xl font-black tracking-tighter text-zinc-950">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-6 text-sm font-bold text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Clock size={16} /> {currentLesson.duration}
                  </span>
                  <span className="w-1.5 h-1.5 bg-zinc-100 rounded-full" />
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-500" /> Nível ENEM: Médio
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleLaraSupport}
                className="flex items-center gap-3 px-8 py-5 bg-white border border-zinc-100 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-950 transition-all shadow-xl shadow-zinc-100 hover:scale-[1.02] active:scale-95 group"
              >
                <MessageSquare size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                Dúvida com LARA
              </button>
            </div>

            {/* Notes Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="text-zinc-300" size={24} />
                  <h3 className="text-xl font-black tracking-tight text-zinc-950 uppercase tracking-widest">Suas Anotações</h3>
                </div>
                <AnimatePresence>
                  {isSaving && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600"
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
                className="w-full min-h-[400px] p-10 bg-zinc-50 border border-zinc-100 rounded-[3rem] text-zinc-700 placeholder:text-zinc-200 focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:bg-white transition-all font-medium text-lg leading-relaxed shadow-inner"
              />
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-[400px] bg-zinc-50 border-l border-zinc-100 flex flex-col">
          <div className="p-10 border-b border-zinc-200 bg-white">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Cronograma da Aula</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-thin scrollbar-thumb-zinc-200">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={cn(
                  "w-full p-6 rounded-[2rem] flex items-center gap-5 transition-all text-left group border-2",
                  currentLesson.id === lesson.id 
                    ? "bg-white border-blue-600 shadow-xl shadow-blue-500/10" 
                    : "bg-transparent border-transparent hover:bg-white hover:border-zinc-100 opacity-60 hover:opacity-100"
                )}
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 size={26} className="text-emerald-500" />
                  ) : (
                    <Circle size={26} className="text-zinc-200 group-hover:text-blue-600 transition-colors" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-sm font-black truncate uppercase tracking-tight",
                    currentLesson.id === lesson.id ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-950"
                  )}>
                    {lesson.title}
                  </h4>
                  <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mt-1">
                    {lesson.type} • {lesson.duration}
                  </p>
                </div>
                {currentLesson.id === lesson.id && (
                  <motion.div layoutId="active-indicator" className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-10 bg-white border-t border-zinc-100">
            <button className="w-full py-6 bg-zinc-950 hover:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-zinc-200 active:scale-95">
              Próxima Aula
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
