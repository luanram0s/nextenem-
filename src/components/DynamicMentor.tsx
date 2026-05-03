import React, { useState, useEffect } from 'react';
import { Brain, Target, AlertTriangle, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mentorService, TacticalBrief } from '../services/mentorService';

export default function DynamicMentor() {
  const [brief, setBrief] = useState<TacticalBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMentorData();
  }, []);

  const loadMentorData = async () => {
    setIsLoading(true);
    setError(null);
    // Simulate getting history from localStorage or Supabase
    const mockHistory = [
      { discipline: 'Matemática', score: 12, total: 20, date: '2023-10-01' },
      { discipline: 'Linguagens', score: 18, total: 20, date: '2023-10-02' },
      { discipline: 'Humanas', score: 14, total: 20, date: '2023-10-03' }
    ];
    
    try {
      const data = await mentorService.generateTacticalBrief(mockHistory);
      setBrief(data);
    } catch (e: any) {
      console.error(e);
      const isRateLimit = e?.status === 429 || e?.message?.includes('429') || e?.message?.includes('RESOURCE_EXHAUSTED');
      if (isRateLimit) {
        setError('O Mentor está em alta demanda. Tente atualizar a página em alguns instantes.');
      } else {
        setError('Não foi possível carregar os insights do Mentor agora.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-zinc-100 border-dashed rounded-[2.5rem] bg-zinc-50/50">
        <AlertTriangle className="text-zinc-300 mb-4" size={32} />
        <p className="text-zinc-500 font-bold text-center text-sm">{error}</p>
        <button 
          onClick={loadMentorData}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-zinc-100 border-dashed rounded-[2.5rem] bg-zinc-50/50">
        <Loader2 className="text-blue-600 animate-spin mb-4" size={32} />
        <p className="text-zinc-400 font-black text-xs uppercase tracking-[0.2em]">Consultando Mentor de IA...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-zinc-100 rounded-[3rem] p-10 relative overflow-hidden shadow-xl shadow-zinc-200/40"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10" />

      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
            <Brain size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-zinc-950 tracking-tight uppercase italic">Plano de Guerra</h2>
            <p className="text-[10px] font-black text-zinc-950 uppercase tracking-[0.2em] mt-1 opacity-60">Análise Tática em Tempo Real</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-zinc-100 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Mentor Ativo</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Summary Column */}
        <div className="lg:col-span-12">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2rem] flex gap-5 items-start shadow-sm">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
               <TrendingUp size={24} />
             </div>
             <div>
               <p className="text-base font-bold text-zinc-950 leading-relaxed italic">
                 "{brief?.summary}"
               </p>
             </div>
           </div>
        </div>

        {/* Intelligence Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-8 bg-white border border-emerald-100 rounded-[2rem] shadow-sm">
            <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-3 mb-6">
              <Sparkles size={16} /> Pontos de Domínio
            </h3>
            <ul className="space-y-4">
              {brief?.strengths.map((s, i) => (
                <li key={i} className="text-sm font-bold text-zinc-950 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="p-8 bg-white border border-rose-100 rounded-[2rem] shadow-sm">
            <h3 className="text-[10px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-3 mb-6">
              <AlertTriangle size={16} /> Pontos de Atenção
            </h3>
            <ul className="space-y-4">
              {brief?.weaknesses.map((w, i) => (
                <li key={i} className="text-sm font-bold text-zinc-950 flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="lg:col-span-12">
          <h3 className="text-[10px] font-black text-zinc-950 uppercase tracking-[0.2em] mb-6 opacity-60">
            Missões Recomendadas (Biblioteca Global)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {brief?.recommendedTopics.map((topic, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl hover:border-blue-600/30 hover:shadow-xl hover:shadow-zinc-200/50 transition-all group cursor-pointer">
                <p className="text-xs font-black text-zinc-950 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Tip */}
        <div className="lg:col-span-12">
          <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-600/30">
            <div className="flex items-center gap-3 mb-3">
              <Target size={24} className="text-white/80" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Dica de Vaga Garantida</h4>
            </div>
            <p className="text-lg font-black tracking-tight leading-tight uppercase italic underline underline-offset-8 decoration-white/20">
              {brief?.tacticalTip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
