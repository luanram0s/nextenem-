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
    const saved = localStorage.getItem('next_enem_meta');
    if (saved) {
      const data = JSON.parse(saved);
      return `${data.course} - ${data.institution}`;
    }
    return 'Medicina - USP';
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
      const saved = localStorage.getItem('next_enem_meta');
      if (saved) {
        const data = JSON.parse(saved);
        setCourse(`${data.course} - ${data.institution}`);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 animate-in fade-in duration-700 max-w-[1500px] mx-auto pb-20">
      {/* Coluna 2: Main Content (8/12) */}
      <div className="xl:col-span-8 space-y-12">
        {/* Header Fixo Interno */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-next-blue">Dashboard Oficial</span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Bons estudos, <span className="text-next-blue">Luan</span>.
          </h1>
          <p className="text-slate-500 font-medium italic opacity-80 max-w-xl">
            "{quote}"
          </p>
        </header>

        {/* Cards de Foco Atual (Alta Incidência) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Foco de Hoje</h3>
            <span className="text-xs font-bold text-next-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Alta Incidência</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              animate={{ 
                boxShadow: ["0 0 0px rgba(0, 123, 255, 0)", "0 0 20px rgba(0, 123, 255, 0.15)", "0 0 0px rgba(0, 123, 255, 0)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-next-blue transition-all overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-next-blue mb-8 group-hover:scale-110 transition-transform">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">Geometria Espacial</h4>
                <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
                  Foco em Poliedros. Assunto com <span className="text-next-blue font-bold">15% de recorrência</span> na prova de Matemática.
                </p>
                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-next-blue group-hover:gap-5 transition-all">
                  Continuar Estudo <ArrowRight size={16} />
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-next-blue/5 rounded-full blur-3xl group-hover:bg-next-blue/10 transition-all" />
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              animate={{ 
                boxShadow: ["0 0 0px rgba(0, 123, 255, 0)", "0 0 20px rgba(0, 123, 255, 0.1)", "0 0 0px rgba(0, 123, 255, 0)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="group relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-next-blue/20 transition-all overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
                  <Sparkles size={28} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">Estequiometria</h4>
                <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
                  O pilar da Natureza. Pratique cálculos de massa e volume para garantir sua consistência TRI.
                </p>
                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-purple-600 group-hover:gap-5 transition-all">
                  Assistir Aula <Play size={16} fill="currentColor" />
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {stats.slice(0, 3).map((stat, idx) => (
            <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] transition-colors hover:bg-slate-100/50">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{stat.label}</span>
                <stat.icon size={18} className="text-slate-400" />
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna 3: Widgets (4/12) */}
      <div className="xl:col-span-4 space-y-12">
        <div className="sticky top-12 space-y-12">
          {/* Radar Sisu Widget */}
          <section className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-next-blue/10 rounded-2xl flex items-center justify-center text-next-blue">
                <Target size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Radar Sisu</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Vaga Alvo: {course}</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status da Vaga</span>
                    <h4 className="text-lg font-black text-slate-900">{course}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seu TRI</span>
                    <p className="text-lg font-black text-next-blue">745.8</p>
                  </div>
                </div>
                
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-next-blue rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  <span>Início</span>
                  <span className="text-next-blue">78% da Meta</span>
                  <span>Aprovação</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  Faltam aproximadamente <span className="text-next-blue">67 pontos</span> para atingir a nota de corte média do Sisu 2024.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-next-blue uppercase tracking-widest">
                  <Sparkles size={14} /> Ver Insights de Evolução
                </div>
              </div>
            </div>
          </section>

          <CalculadoraTRI />
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
