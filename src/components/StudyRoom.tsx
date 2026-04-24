import React from 'react';
import { BookOpen, Play, Clock, ChevronRight, Bookmark } from 'lucide-react';

const modules = [
  { id: 1, title: 'Matemática e suas Tecnologias', lessons: 24, progress: 65, color: 'bg-indigo-500' },
  { id: 2, title: 'Ciências da Natureza', lessons: 18, progress: 40, color: 'bg-emerald-500' },
  { id: 3, title: 'Linguagens e Códigos', lessons: 12, progress: 80, color: 'bg-blue-500' },
  { id: 4, title: 'Ciências Humanas', lessons: 15, progress: 50, color: 'bg-amber-500' },
];

export default function StudyRoom() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* LEFT: MODULES LIST */}
      <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-black text-zinc-950 tracking-tight">Meus Módulos</h2>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">4 Ativos</span>
        </div>
        
        {modules.map((mod) => (
          <button 
            key={mod.id}
            className="w-full text-left bg-zinc-50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 border border-zinc-100 rounded-[2rem] p-6 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${mod.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-zinc-800 text-sm mb-1 group-hover:text-blue-600 transition-colors leading-tight">{mod.title}</h3>
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={10} /> {mod.lessons} Aulas</span>
                  <span>•</span>
                  <span>{mod.progress}% Concluído</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-zinc-300 group-hover:text-blue-400 transition-colors self-center" />
            </div>
            
            <div className="mt-4 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${mod.color} rounded-full transition-all duration-1000`}
                style={{ width: `${mod.progress}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* RIGHT: PLAYER AREA */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="aspect-video bg-zinc-950 rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-zinc-950/20">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000" 
            alt="Current Lesson" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all">
              <Play size={32} fill="white" className="ml-1" />
            </button>
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Reproduzindo Agora</p>
                <h2 className="text-2xl font-black text-white tracking-tight">Geometria Espacial: Prismas e Cilindros</h2>
              </div>
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all">
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-zinc-50 rounded-[3.5rem] border border-zinc-100 p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-zinc-950 tracking-tight">Anotações da Aula</h3>
            <button className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Limpar Notas</button>
          </div>
          <textarea 
            placeholder="Comece a digitar suas anotações aqui..."
            className="w-full h-48 bg-transparent border-none focus:ring-0 text-zinc-600 font-medium leading-relaxed resize-none placeholder:text-zinc-300"
          />
          <div className="mt-8 flex justify-end">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">Salvar Aula</button>
          </div>
        </div>
      </div>
    </div>
  );
}
