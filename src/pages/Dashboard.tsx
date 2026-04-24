import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, BookCheck, Target, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

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

  useEffect(() => {
    localStorage.setItem('next_enem_course', course);
  }, [course]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Bem-vindo, Luan!</h2>
          <p className="text-slate-500 font-medium mt-1">Sua evolução rumo à aprovação em <span className="text-next-blue font-bold">{course}</span>.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-next-blue rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sync: Online</span>
          </div>
        </div>
      </div>

      <header className="relative py-12 px-10 bg-next-blue rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
              AVANÇO<br />
              <span className="opacity-60 italic">GLOBAL</span>
            </h1>
            <p className="text-white/80 mt-6 font-medium leading-relaxed">
              Você completou <span className="text-white font-bold">12 horas</span> de estudo nesta semana. 
              Mantenha o rito para atingir sua meta de <span className="text-white font-bold">850 pontos</span> no simulado de domingo.
            </p>
          </div>
          <button className="bg-white text-next-blue px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-transform flex items-center gap-2">
            Continuar Plano de Estudos
          </button>
        </div>
        
        {/* Abstract shapes for tech vibe */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      </header>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, idx) => {
          if (idx > 2) return null; 
          return (
            <motion.div 
              key={idx}
              variants={item}
              className="card-next group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  {stat.label}
                </span>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-next-blue group-hover:bg-blue-50 transition-colors">
                  <stat.icon size={16} />
                </div>
              </div>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">
                {stat.value}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-next-blue transition-all duration-1000" 
                    style={{ width: stat.value.includes('%') ? stat.value : '75%' }} 
                  />
                </div>
                <span className="text-[10px] font-bold text-next-blue">TOP 5%</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Distância para a Vaga</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">Meta: Medicina - USP (Ampla Concorrência)</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-next-blue">812.5</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nota de Corte</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Progresso na Trilha</span>
                <span className="text-next-blue">68% / 85% Requisitado</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-next-blue w-[68%] rounded-full shadow-[0_0_15px_rgba(0,123,255,0.5)]" />
              </div>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-next-blue/20 rounded-full flex items-center justify-center text-next-blue">
                  <Target size={20} />
                </div>
                <div>
                  <p className="text-xs font-black">Faltam ~120 questões</p>
                  <p className="text-[10px] text-slate-500">Média TRI necessária: 780+</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-600" />
            </div>
          </div>
          
          {/* Abstract background shape */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-next-blue/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        <section className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Atividades</h3>
            <button className="text-xs font-bold text-next-blue flex items-center gap-1 hover:underline">
              Histórico <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Simulado TRI #08', type: 'Exame', value: '742 pts', trend: '+12' },
              { title: 'Módulo: Geometria', type: 'Estudo', value: '85%', trend: 'OK' },
              { title: 'Redação: IA e Ética', type: 'Envio', value: '920 pts', trend: '+40' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-next-blue" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{activity.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-next-blue">{activity.value}</p>
                  <p className="text-[9px] font-bold text-emerald-500">{activity.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-300">
            <Target size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800">Próximo Passo</h3>
            <p className="text-sm text-slate-500 max-w-xs mt-2 font-medium">Finalize o módulo de Bioquímica para destravar o simulado de Ciências da Natureza.</p>
          </div>
          <button className="mt-4 px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors uppercase tracking-widest">
            Ir para Trilha
          </button>
        </section>
      </div>
    </div>
  );
}
