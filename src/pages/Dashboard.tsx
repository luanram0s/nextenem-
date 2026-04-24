import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, BookCheck, Target, ChevronRight, GraduationCap, Sparkles, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import CalculadoraTRI from '../components/CalculadoraTRI';
import GoalSelector from '../components/GoalSelector';

const stats = [
  { label: 'Progresso Total', value: '68%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Horas de Estudo', value: '124h', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Simulados Feitos', value: '12', icon: BookCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Meta de TRI', value: '780', icon: Target, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const [course, setCourse] = useState(() => {
    return localStorage.getItem('next_enem_course') || 'Medicina - USP';
  });

  const [quote, setQuote] = useState("O sucesso é a soma de pequenos esforços repetidos dia após dia.");

  const quotes = [
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "A consistência no TRI é o que separa o sonho da aprovação.",
    "Cada simulado é um degrau. Cada erro é um aprendizado.",
    "Sua vaga na Federal está sendo construída hoje."
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    const handleStorage = () => {
      setCourse(localStorage.getItem('next_enem_course') || 'Medicina - USP');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('next_enem_course', course);
  }, [course]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 bg-transparent max-w-[1400px] mx-auto pb-20">
      {/* Bloco 1: Boas-vindas e Motivação - Sticky Header */}
      <header className="sticky top-4 z-30 py-8 px-10 bg-slate-900/95 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white/5 transition-all">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-next-blue">Plataforma Oficial</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              Bons estudos, <span className="text-next-blue">Luan</span>.
            </h1>
            <p className="text-slate-400 text-xs font-medium italic opacity-70">
              "{quote}"
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Meta de Aprovação</span>
            <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-sm font-black text-white uppercase tracking-tight">{course}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-next-blue/10 rounded-full blur-[80px]" />
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Content Area (8/12) */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Bloco 2: Próxima Aula (Blue Glow) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-next-blue rounded-full" />
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Foco de Hoje</h3>
              </div>
              <span className="text-xs font-bold text-next-blue uppercase tracking-widest">Baseado em sua Incidência</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="group relative p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-next-blue/20 transition-all overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-next-blue mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 mb-2">Geometria Espacial</h4>
                  <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed">
                    Poliedros e Sólidos de Revolução. Assunto com <span className="text-next-blue font-bold">15% de recorrência</span> na prova de MT.
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-next-blue group-hover:gap-4 transition-all">
                    Acessar Módulo <ArrowRight size={14} />
                  </button>
                </div>
                {/* Glow effect */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-next-blue/5 rounded-full blur-2xl group-hover:bg-next-blue/10 transition-all" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="group relative p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-next-blue/20 transition-all overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 mb-2">Estequiometria</h4>
                  <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed">
                    O pilar da Natureza. Pratique cálculos de massa e volume para garantir sua consistência TRI.
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:gap-4 transition-all">
                    Assistir Aula <Play size={14} fill="currentColor" />
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
              </motion.div>
            </div>
          </section>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{stat.label}</span>
                  <stat.icon size={16} className="text-slate-400" />
                </div>
                <p className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets (4/12) */}
        <div className="xl:col-span-4 space-y-10">
          {/* Bloco 3: Calculadora TRI Widget */}
          <div className="sticky top-10 space-y-10">
            <GoalSelector />
            <CalculadoraTRI />
            
            <section className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-next-blue/10 rounded-xl flex items-center justify-center text-next-blue">
                  <Target size={20} />
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Radar Sisu</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-600">Medicina - USP</span>
                    <span className="text-xs font-black text-next-blue">812.5</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-next-blue w-[78%] rounded-full" />
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-600">Medicina - UNESP</span>
                    <span className="text-xs font-black text-next-blue">795.0</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[84%] rounded-full" />
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[10px] text-slate-400 font-medium leading-relaxed">
                * As notas de corte são baseadas no último SISU. Ajuste sua meta TRI para acompanhar a evolução.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
