import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, CheckCircle2, AlertCircle, ChevronRight, Play, Info, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import CalculadoraTRI from '../components/CalculadoraTRI';

export default function Simulados() {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18000); // 5 hours in seconds for ENEM

  useEffect(() => {
    let interval: any;
    if (isStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-next-blue rounded-full" />
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">Simulados TRI</h2>
            </div>
            <p className="text-slate-500 font-medium max-w-2xl">
              Pratique com exames que simulam a experiência real do ENEM, com cronômetro e interface oficial.
            </p>
          </div>
        </header>

        <CalculadoraTRI />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-next group"
          >
            <div className="w-14 h-14 bg-blue-50 text-next-blue rounded-2xl flex items-center justify-center font-black mb-8 group-hover:bg-next-blue group-hover:text-white transition-all shadow-sm">
              S1
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Simulado Completo</h3>
            <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">
              90 questões (Linguagens + Humanas) e Redação incorporada. 
              Ideal para testar seu condicionamento físico e mental.
            </p>
            <button 
              onClick={() => setIsStarted(true)}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-next-blue transition-all flex items-center justify-center gap-2"
            >
              <Play size={14} /> Começar Simulado
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="card-next group"
          >
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black mb-8 border border-slate-100 group-hover:border-next-blue group-hover:text-next-blue transition-all shadow-sm">
              P2
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Prática por Área</h3>
            <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">
              Foque o treinamento em uma área específica (45 questões). 
              A evolução constante por blocos acelera o aprendizado.
            </p>
            <button className="w-full bg-white border-2 border-slate-100 text-slate-500 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:border-next-blue hover:text-next-blue transition-all">
              Selecionar Área
            </button>
          </motion.div>
        </div>

        <section className="bg-blue-50/50 p-10 rounded-[2.5rem] border border-blue-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-blue-200/50 flex items-center justify-center text-next-blue flex-shrink-0">
            <Sparkles size={32} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-next-blue">Atenção ao TRI</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              O algoritmo <span className="font-black text-slate-800">Teoria de Resposta ao Item</span> é o coração do ENEM. 
              Acertos aleatórios em questões complexas sem consistência nas fáceis penalizam sua média. 
              Nosso simulador calibra essa consistência em tempo real.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-next-bg z-[60] flex flex-col p-8 animate-in slide-in-from-bottom duration-500 text-slate-900 font-sans">
      <header className="flex items-center justify-between pb-8 border-b border-next-border mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-next-blue rounded flex items-center justify-center font-black text-white text-lg">
            N
          </div>
          <div>
            <h3 className="font-black text-xl uppercase tracking-tighter text-slate-800">Simulado_ENEM_42</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Linguagens e Códigos</p>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-4 px-6 py-2 rounded-xl font-mono text-2xl font-black border tracking-tighter shadow-sm",
          timeLeft < 600 ? "bg-red-50 text-red-600 border-red-100" : "bg-slate-50 text-next-blue border-slate-200"
        )}>
          <Timer size={24} />
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => setIsStarted(false)}
          className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 rounded-xl"
        >
          Finalizar Prova
        </button>
      </header>

      <div className="flex-1 overflow-auto max-w-3xl mx-auto w-full py-8">
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-[10px] font-mono font-bold text-next-blue uppercase tracking-[0.5em]">Question_01</span>
            <h4 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
              O gênero textual apresentado no trecho acima demonstra uma característica marcante da literatura contemporânea brasileira, especialmente no que tange à:
            </h4>
            <div className="space-y-4 pt-8">
              {['A) Ruptura com a sintaxe clássica.', 'B) Valorização do discurso direto.', 'C) Utilização de regionalismos.', 'D) Intertextualidade irônica.', 'E) Exaltação do nacionalismo.'].map((opt, i) => (
                <button 
                  key={i}
                  className="w-full text-left p-6 border border-slate-100 rounded-2xl hover:border-next-blue hover:bg-blue-50/50 transition-all group flex items-center gap-6"
                >
                  <div className="w-10 h-10 border border-slate-200 group-hover:border-next-blue rounded-lg flex items-center justify-center text-sm font-black text-slate-400 group-hover:text-next-blue transition-colors">
                    {opt[0]}
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-900 font-medium tracking-tight transition-colors">{opt.substring(3)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-8 border-t border-next-border flex justify-between items-center max-w-3xl mx-auto w-full mt-auto">
        <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">Página Anterior</button>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={cn("w-2 h-2 rounded-full", i === 1 ? "bg-next-blue" : "bg-slate-200")} />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Q_01 / 90</span>
        </div>
        <button className="flex items-center gap-3 bg-next-blue text-white px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-100">
          Próxima <ChevronRight size={14} />
        </button>
      </footer>
    </div>
  );
}
