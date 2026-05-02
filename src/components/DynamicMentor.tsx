import React, { useState, useEffect } from 'react';
import { Brain, Target, AlertTriangle, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mentorService, TacticalBrief } from '../services/mentorService';

export default function DynamicMentor() {
  const [brief, setBrief] = useState<TacticalBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMentorData();
  }, []);

  const loadMentorData = async () => {
    setIsLoading(true);
    // Simulate getting history from localStorage or Supabase
    const mockHistory = [
      { discipline: 'Matemática', score: 12, total: 20, date: '2023-10-01' },
      { discipline: 'Linguagens', score: 18, total: 20, date: '2023-10-02' },
      { discipline: 'Humanas', score: 14, total: 20, date: '2023-10-03' }
    ];
    
    try {
      const data = await mentorService.generateTacticalBrief(mockHistory);
      setBrief(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 border-dashed rounded-3xl bg-zinc-950/50">
        <Loader2 className="text-cyan-400 animate-spin mb-4" size={32} />
        <p className="text-zinc-500 font-black text-xs uppercase tracking-[0.2em]">Consultando Mentor de IA...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10" />

      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Brain size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase italic">Plano de Guerra</h2>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Análise Tática em Tempo Real</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Mentor Ativo</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Summary Column */}
        <div className="lg:col-span-12">
           <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex gap-4 items-start">
             <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
               <TrendingUp size={20} />
             </div>
             <div>
               <p className="text-sm font-bold text-zinc-200 leading-relaxed italic">
                 "{brief?.summary}"
               </p>
             </div>
           </div>
        </div>

        {/* Intelligence Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
            <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Sparkles size={14} /> Pontos de Domínio
            </h3>
            <ul className="space-y-3">
              {brief?.strengths.map((s, i) => (
                <li key={i} className="text-sm font-bold text-zinc-300 flex items-center gap-3">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
            <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <AlertTriangle size={14} /> Pontos de Atenção
            </h3>
            <ul className="space-y-3">
              {brief?.weaknesses.map((w, i) => (
                <li key={i} className="text-sm font-bold text-zinc-300 flex items-center gap-3">
                  <div className="w-1 h-1 bg-rose-500 rounded-full" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="lg:col-span-12">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">
            Missões Recomendadas (Biblioteca Global)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brief?.recommendedTopics.map((topic, i) => (
              <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-cyan-500/30 transition-colors group cursor-pointer">
                <p className="text-xs font-black text-zinc-400 group-hover:text-cyan-400 transition-colors">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Tip */}
        <div className="lg:col-span-12">
          <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-zinc-950">
            <div className="flex items-center gap-3 mb-2">
              <Target size={20} className="fill-zinc-950" />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Dica de Vaga Garantida</h4>
            </div>
            <p className="text-sm font-black tracking-tight leading-tight uppercase italic underline decoration-2 underline-offset-4 decoration-zinc-950/20">
              {brief?.tacticalTip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
