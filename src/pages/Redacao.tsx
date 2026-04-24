import React, { useState } from 'react';
import { PenTool, Send, BrainCircuit, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Redacao() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const competencies = [
    { id: 'C1', label: 'Domínio da norma culta', score: 160, description: 'Demonstra bom domínio, mas com pequenos desvios.' },
    { id: 'C2', label: 'Compreensão do tema', score: 200, description: 'Abordagem completa dentro do gênero dissertativo-argumentativo.' },
    { id: 'C3', label: 'Defesa do ponto de vista', score: 160, description: 'Argumentos bem selecionados, mas faltou profundidade em um ponto.' },
    { id: 'C4', label: 'Mecanismos linguísticos', score: 200, description: 'Excelente uso de conectivos e coesão textual.' },
    { id: 'C5', label: 'Proposta de intervenção', score: 200, description: 'Proposta detalhada e articulada com a discussão.' }
  ];

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setShowResult(false);
    // Simulate IA Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PenTool size={20} className="text-next-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">NEXT ENEM</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Laboratório de Redação</h2>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm">
            <Info size={14} className="text-next-blue" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Folha: ENEM 2024</span>
          </div>
          <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2">
            <span className="text-[10px] font-black text-next-blue uppercase tracking-wider">Modo: Simulado</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Editor Side */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 min-h-[600px] flex flex-col overflow-hidden transition-all focus-within:border-next-blue/30">
            <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/20" />
                <div className="w-3 h-3 rounded-full bg-amber-400/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/20" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{text.length || 0} Caracteres</span>
                <span className="text-[10px] font-black text-slate-200 uppercase">|</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{text ? text.trim().split(/\s+/).length : 0} Palavras</span>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Inicie sua redação aqui... Concentre-se no tema. A LARA analisará cada competência detalhadamente."
              className="flex-1 w-full p-12 focus:outline-none text-slate-700 leading-relaxed font-sans text-xl resize-none placeholder:text-slate-200 border-none bg-transparent"
            />
          </div>
        </div>

        {/* Controls / Results Side */}
        <div className="xl:col-span-5 space-y-6">
          <section className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black tracking-tight mb-2 flex items-center gap-2">
                <BrainCircuit className="text-next-blue" />
                Análise LARA
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Algoritmos treinados na base de dados oficial do INEP para garantir precisão na correção das Competências.
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {competencies.map((comp) => (
                <div key={comp.id} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comp.id}: {comp.label}</span>
                    {showResult && <span className="text-[10px] font-black text-next-blue">{comp.score}/200</span>}
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: showResult ? `${(comp.score / 200) * 100}%` : 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full transition-all",
                        comp.score === 200 ? "bg-emerald-500" : "bg-next-blue"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className={cn(
                "w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl relative z-10",
                isAnalyzing 
                  ? "bg-slate-800 text-slate-500 cursor-wait" 
                  : "bg-next-blue text-white hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-95"
              )}
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Calibrando Critérios...</span>
                </div>
              ) : (
                <>
                  <Send size={18} />
                  Enviar para Avaliação
                </>
              )}
            </button>

            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-next-blue/5 blur-3xl rounded-full" />
          </section>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-8 bg-white border border-slate-100 rounded-[2.5rem] space-y-6 shadow-xl shadow-slate-200/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 size={24} />
                    <span className="text-sm font-black uppercase tracking-widest">Feedback Consolidado</span>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">Excelente</div>
                </div>

                <div className="flex items-end gap-2 border-b border-slate-100 pb-6">
                  <span className="text-6xl font-black text-slate-800 tracking-tighter">920</span>
                  <span className="text-xl font-bold text-slate-300 mb-2">/ 1000</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "Sua argumentação demonstra maturidade. Para chegar aos 1000, revise a pontuação em períodos complexos do desenvolvimento (C1) e traga um repertório sociocultural mais externo no 1º parágrafo (C3)."
                  </p>
                  
                  <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-next-blue hover:text-next-blue transition-all">
                    Ver Comentários por Linha
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
