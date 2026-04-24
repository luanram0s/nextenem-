import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  PenTool, 
  ClipboardList, 
  Target, 
  Zap, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Trophy,
  PieChart
} from 'lucide-react';
import CalculadoraTRI from './CalculadoraTRI';

const Dashboard = () => {
  const [goal, setGoal] = useState<{ course: string, institution: string } | null>(null);
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const savedGoal = localStorage.getItem('next_enem_meta');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('next_enem_meta');
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-white text-zinc-950 font-sans selection:bg-blue-600 selection:text-white">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-zinc-100 flex flex-col p-8 h-full bg-white shrink-0">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
            <Zap size={22} fill="white" />
          </div>
          <div className="flex font-black text-2xl tracking-tighter italic">
            <span className="text-blue-600">NEXT</span>
            <span className="text-zinc-950">ENEM</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('inicio')}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inicio' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'}`}
          >
            <LayoutDashboard size={20} />
            <span className="uppercase tracking-widest text-[10px]">Início</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('redacao')}
             className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'redacao' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'}`}
          >
            <PenTool size={20} />
            <span className="uppercase tracking-widest text-[10px]">Lab de Redação</span>
          </button>

          <button 
             onClick={() => setActiveTab('simulados')}
             className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'simulados' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'}`}
          >
            <ClipboardList size={20} />
            <span className="uppercase tracking-widest text-[10px]">Simulados TRI</span>
          </button>
        </nav>

        {/* LOGOUT */}
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-[2rem] transition-all font-black uppercase tracking-widest text-[10px] group border border-transparent hover:border-red-100"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Sair da Conta</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-white p-12">
        <div className="max-w-6xl mx-auto">
          {/* HEADER COM META */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h1 className="text-4xl font-black text-zinc-950 tracking-tight mb-2">Bem-vindo, Futuro Universitário! 👋</h1>
              <p className="text-zinc-500 font-medium tracking-tight">Sua meta de estudos está ativa e o cronômetro não para.</p>
            </div>
            
            {goal && (
              <div className="bg-blue-600 text-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-600/30 flex items-center gap-6 min-w-[320px]">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Target size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Meta Definida</p>
                  <p className="text-xl font-black leading-none">{goal.course}</p>
                  <p className="text-xs font-bold opacity-80 mt-1">{goal.institution}</p>
                </div>
                <div className="ml-auto bg-white/20 p-2 rounded-full">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            )}
          </header>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LADO ESQUERDO: PROGRESSO E NOTAS */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CARD REDAÇÃO */}
                <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                      <PenTool size={22} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">+12%</span>
                  </div>
                  <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Lab de Redação</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-zinc-950 tracking-tighter">920</span>
                    <span className="text-zinc-400 font-bold">/1000</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium mt-4">Último tema: Desafios da Educação</p>
                  <button className="mt-8 w-full py-4 bg-zinc-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all">Ver Feedback</button>
                </div>

                {/* CARD PROGRESSO GERAL */}
                <div className="bg-zinc-950 p-8 rounded-[3rem] text-white flex flex-col shadow-2xl shadow-zinc-950/20">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 backdrop-blur-sm">
                      <PieChart size={22} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-white/50 uppercase tracking-widest mb-2">Progresso Geral</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tighter">74%</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 uppercase">
                      <span>Dominado</span>
                      <span>Total</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[74%] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CALCULADORA TRI INTEGRADA */}
              <div className="bg-white border-2 border-zinc-50 p-8 rounded-[3rem] shadow-sm">
                <CalculadoraTRI />
              </div>
            </div>

            {/* LADO DIREITO: ATIVIDADES E RANKINGS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-100">
                <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" /> Atividades Recentes
                </h3>
                <div className="space-y-6">
                  {[
                    { t: "Simulado Mat.", d: "Ontem", s: "820 TRI" },
                    { t: "Redação #04", d: "Há 3 dias", s: "920 PTS" },
                    { t: "Física - Óptica", d: "Há 4 dias", s: "100%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-blue-600 group-hover:shadow-lg transition-all duration-300">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-zinc-800 tracking-tight">{item.t}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{item.d} • {item.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-10 w-full py-4 border-2 border-zinc-200 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 hover:text-zinc-600 transition-all">Histórico Completo</button>
              </div>

              <div className="bg-blue-50/50 p-8 rounded-[3rem] border border-blue-100/50">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/20">
                  <Trophy size={22} />
                </div>
                <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-2">Sua Posição</h3>
                <p className="text-3xl font-black text-blue-600 tracking-tighter">Top 5%</p>
                <p className="text-xs text-zinc-500 font-medium mt-2 leading-relaxed">Você está entre os estudantes mais bem preparados para {goal?.course || 'sua meta'}.</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
