import React, { useState, useEffect, useRef } from 'react';
import { Target, User, Shield, Key, Bell, CreditCard, ChevronRight, Zap, Camera, Save, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const [goal, setGoal] = useState<{ course: string, institution: string } | null>(null);
  const [name, setName] = useState('Luan Luis');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedGoal = localStorage.getItem('next_enem_meta');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }
    
    const savedUser = localStorage.getItem('next_enem_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setName(userData.name || 'Luan Luis');
      if (userData.phone) setPhone(userData.phone);
    }
  }, []);

  const handleSave = () => {
    const savedUser = localStorage.getItem('next_enem_user');
    const userData = savedUser ? JSON.parse(savedUser) : { role: 'user' };
    
    const updatedUser = { ...userData, name, phone };
    localStorage.setItem('next_enem_user', JSON.stringify(updatedUser));

    if (goal) {
      localStorage.setItem('next_enem_meta', JSON.stringify(goal));
    }
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Dispatch event to notify Dashboard/Sidebar of name change
    window.dispatchEvent(new Event('storage'));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* TOAST NOTIFICATION */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-zinc-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-zinc-800">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={18} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Alterações Salvas com Sucesso</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center gap-4">
          <div 
            onClick={handleAvatarClick}
            className="w-40 h-40 rounded-[2.5rem] bg-zinc-950 border-4 border-white shadow-2xl overflow-hidden relative group cursor-pointer active:scale-95 transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
              alt="Profile" 
              className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-60 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={32} className="text-white" />
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          </div>
          <button 
            onClick={handleAvatarClick}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors"
          >
            Alterar Foto
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-black text-zinc-950 tracking-tighter mb-2">{name}</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Estudante NEXT ENEM • Plano Premium</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
             <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
                <Shield size={10} /> Conta Verificada
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EDIT SECTION */}
        <div className="bg-white p-10 rounded-[2rem] border border-zinc-100 shadow-sm space-y-8">
          <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs flex items-center gap-3">
             <User size={16} className="text-blue-600" /> Dados Básicos
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Nome Completo</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 text-white rounded-xl p-4 text-sm font-bold border border-zinc-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">WhatsApp / Telefone</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full bg-zinc-900 text-white rounded-xl p-4 text-sm font-bold border border-zinc-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Curso Desejado</label>
                <input 
                  type="text" 
                  value={goal?.course || ''}
                  onChange={(e) => setGoal(prev => ({ course: e.target.value, institution: prev?.institution || '' }))}
                  placeholder="Ex: Medicina"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Universidade Alvo</label>
                <input 
                  type="text" 
                  value={goal?.institution || ''}
                  onChange={(e) => setGoal(prev => ({ institution: e.target.value, course: prev?.course || '' }))}
                  placeholder="Ex: USP"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>

        {/* GOAL SECTION */}
        <div className="bg-blue-600 text-white p-10 rounded-[2rem] shadow-2xl shadow-blue-600/30 flex flex-col">
          <div className="flex justify-between items-start mb-8 text-white/50">
            <Target size={32} />
            <button className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all">Alterar Meta</button>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Meta Principal</p>
            <h2 className="text-3xl font-black tracking-tight">{goal?.course || 'Não definida'}</h2>
            <p className="text-sm font-bold opacity-80 mt-2">{goal?.institution || 'Aguardando escolha'}</p>
          </div>
          
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
      </div>

      {/* ADDITIONAL SETTINGS */}
      <div className="bg-zinc-50 rounded-[2rem] p-10 border border-zinc-100">
        <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-8">Outras Preferências</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Alterar Senha', icon: Key },
            { label: 'Gerenciar Notificações', icon: Bell },
            { label: 'Dados de Pagamento', icon: CreditCard },
            { label: 'Privacidade de Dados', icon: Shield },
          ].map((item, i) => (
            <button key={i} className="flex items-center justify-between p-5 bg-white border border-transparent hover:border-zinc-100 rounded-2xl hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-600 transition-colors">
                  <item.icon size={22} />
                </div>
                <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-950 tracking-tight transition-colors">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-zinc-300 transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
