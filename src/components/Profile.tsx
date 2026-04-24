import React, { useState, useEffect } from 'react';
import { Target, User, Shield, Key, Bell, CreditCard, ChevronRight, Zap } from 'lucide-react';

export default function Profile() {
  const [goal, setGoal] = useState<{ course: string, institution: string } | null>(null);

  useEffect(() => {
    const savedGoal = localStorage.getItem('next_enem_meta');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-950 border-4 border-zinc-50 shadow-2xl overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
            alt="Profile" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter mb-2">Luan Luis</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Estudante NEXT ENEM • Plano Premium</p>
          <div className="flex items-center gap-2 mt-4">
             <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
                <Shield size={10} /> Conta Verificada
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GOAL SECTION */}
        <div className="bg-[#007BFF] text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-600/30">
          <div className="flex justify-between items-start mb-8 text-white/50">
            <Target size={32} />
            <button className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all">Alterar Meta</button>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Meta Principal</p>
          <h2 className="text-3xl font-black tracking-tight">{goal?.course || 'Não definida'}</h2>
          <p className="text-sm font-bold opacity-80 mt-2">{goal?.institution || 'Aguardando escolha'}</p>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Chance de Aprovação</p>
              <p className="text-xl font-black tracking-tight">Alta (74%)</p>
            </div>
          </div>
        </div>

        {/* SETTINGS PREVIEW */}
        <div className="bg-zinc-50 rounded-[3rem] p-10 border border-zinc-100 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-6">Configurações Rápidas</h3>
            {[
              { label: 'Privacidade & Segurança', icon: Key },
              { label: 'Notificações', icon: Bell },
              { label: 'Plano & Cobrança', icon: CreditCard },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-600 transition-colors">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-950 tracking-tight transition-colors">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-zinc-300 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
