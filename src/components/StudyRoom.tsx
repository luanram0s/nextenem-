import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  ChevronRight, 
  Bookmark, 
  PlayCircle, 
  CheckCircle, 
  Save, 
  ChevronLeft 
} from 'lucide-react';

const lessons = [
  { id: 1, title: 'Prismas: Definições e Propriedades', duration: '12:45', completed: true },
  { id: 2, title: 'Cilindros e suas Aplicações', duration: '15:20', completed: true },
  { id: 3, title: 'Pirâmides e Troncos', duration: '18:10', completed: false },
  { id: 4, title: 'Cones: Área e Volume', duration: '14:30', completed: false },
  { id: 5, title: 'Esferas: A Geometria Perfeita', duration: '20:00', completed: false },
];

export default function StudyRoom() {
  const [currentLesson, setCurrentLesson] = useState(lessons[2]);
  const [note, setNote] = useState('');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* HEADER: MODULE INFO */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-zinc-950 tracking-tighter">Matemática: Geometria Espacial</h2>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Módulo 04 • 12/24 Aulas Concluídas</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Premium Access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* LEFT: LESSONS LIST (SIDEBAR) */}
        <div className="lg:col-span-4 space-y-3 overflow-y-auto pr-2 custom-scrollbar lg:max-h-[750px]">
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4 px-2">Conteúdo do Módulo</h3>
          
          {lessons.map((lesson) => (
            <button 
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson)}
              className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group flex items-center justify-between border ${
                currentLesson.id === lesson.id 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' 
                  : 'bg-white border-zinc-100 hover:bg-zinc-50 text-zinc-600 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`${
                  currentLesson.id === lesson.id ? 'text-white' : lesson.completed ? 'text-emerald-500' : 'text-zinc-300'
                }`}>
                  {lesson.completed ? <CheckCircle size={20} /> : <PlayCircle size={20} />}
                </div>
                <div>
                  <h4 className={`text-sm font-black tracking-tight ${
                    currentLesson.id === lesson.id ? 'text-white' : 'text-zinc-800 underline decoration-transparent group-hover:decoration-blue-600/30'
                  }`}>
                    {lesson.title}
                  </h4>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${
                    currentLesson.id === lesson.id ? 'text-white/60' : 'text-zinc-400'
                  }`}>
                    Aula {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-black ${
                currentLesson.id === lesson.id ? 'text-white/60' : 'text-zinc-400'
              }`}>
                {lesson.duration}
              </span>
            </button>
          ))}
        </div>

        {/* RIGHT: PLAYER & NOTES */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* PLAYER CONTAINER */}
          <div className="space-y-6">
            <div className="aspect-video bg-zinc-950 rounded-3xl relative overflow-hidden group shadow-2xl shadow-zinc-950/20 border border-zinc-800">
              <img 
                src={`https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000&seed=${currentLesson.id}`} 
                alt={currentLesson.title} 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all">
                  <Play size={32} fill="white" className="ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/40 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Clock size={20} />
                    </button>
                    <div className="w-48 h-1 bg-white/20 rounded-full">
                      <div className="w-1/3 h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-white/60 hover:text-white transition-colors">
                      <Bookmark size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Assistindo Agora</p>
                <h2 className="text-3xl font-black text-zinc-950 tracking-tighter mb-2">{currentLesson.title}</h2>
                <p className="text-sm text-zinc-500 font-medium max-w-2xl leading-relaxed">
                  Nesta aula, exploramos profundamente os conceitos geométricos fundamentais que são cobrados recorrentemente no ENEM. Focamos em visualização espacial e fórmulas práticas para resolução rápida.
                </p>
              </div>
              <button className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                  <CheckCircle size={20} />
                </div>
                <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-blue-600 tracking-widest transition-all">Concluir</span>
              </button>
            </div>
          </div>

          {/* NOTES MODULE */}
          <div className="flex-1 bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-zinc-950 tracking-tight flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100Shadow-sm">
                  <BookOpen size={24} />
                </div>
                Suas Anotações
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Aula {currentLesson.id}</span>
                <button className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-red-500 transition-colors">Limpar Sessão</button>
              </div>
            </div>
            
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Comece a digitar os pontos chaves desta aula..."
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-[2rem] p-8 text-zinc-700 font-medium leading-relaxed resize-none placeholder:text-zinc-300 focus:ring-4 focus:ring-blue-600/10 focus:bg-white outline-none transition-all mb-8 shadow-inner"
            />
            
            <div className="flex justify-end gap-4">
              <button className="px-8 py-5 bg-zinc-100 text-zinc-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 hover:text-zinc-950 transition-all">
                Exportar Plano de Estudo
              </button>
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-3">
                <Save size={18} />
                Salvar no Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

