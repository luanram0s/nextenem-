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
    <div className="space-y-12 animate-in fade-in duration-700 bg-transparent">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Bem-vindo, Luan!</h2>
          <p className="text-slate-500 font-medium mt-1">Sua evolução rumo à aprovação em <span className="text-next-blue font-bold">{course}</span>.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">LARA: Ativa</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        {/* COL 2: MAIN CONTENT (8/12) */}
        <div className="xl:col-span-8 space-y-10">
          <header className="relative py-12 px-10 bg-next-blue rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-200">
            <div className="relative z-10 flex flex-col justify-between items-start gap-8">
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
              <button className="bg-white text-next-blue px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-blue-900/10">
                Continuar Plano de Estudos
              </button>
            </div>
            
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
          </header>

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

          <section className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Atividade Recente</h3>
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
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-white hover:border-slate-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-next-blue font-black text-xs">
                      {activity.type[0]}
                    </div>
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
        </div>

        {/* COL 3: SIDEBAR WIDGETS (4/12) */}
        <div className="xl:col-span-4 space-y-8">
          <section className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight leading-tight">Radar de <br /> Aprovação</h3>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{course}</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-next-blue">
                  <Target size={24} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Geral</span>
                    <span className="text-next-blue">68% / 85%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-next-blue w-[68%] rounded-full shadow-[0_0_15px_rgba(0,123,255,0.5)]" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Faltam</p>
                    <p className="text-xl font-black">~120 questões</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Média Alvo</p>
                    <p className="text-xl font-black text-next-blue">780+</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-next-blue/10 rounded-full blur-3xl pointer-events-none" />
          </section>

          <section className="p-8 bg-white border border-slate-100 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={18} className="text-slate-400" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Próxima Parada</h3>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-next-blue text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-blue-100">
                  BIO
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800">Bioquímica</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">Finalize este módulo para destravar o simulado Natureza.</p>
                </div>
              </div>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-next-blue transition-all">
                Continuar via LARA
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo de Estudo Hoje</span>
              <span className="text-sm font-black text-slate-800">2h 45m</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
