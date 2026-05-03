import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  PieChart,
  BookOpen,
  User,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Calculator,
  FlaskConical,
  Languages,
  Globe
} from 'lucide-react';
import CalculadoraTRI from './CalculadoraTRI';
import StudyRoom from './StudyRoom';
import Profile from './Profile';
import SupportChat from './SupportChat';
import MasterPanel from './MasterPanel';
import RedacaoLab from './RedacaoLab';
import SimuladosTRI from './SimuladosTRI';
import TheoryDashboard from './TheoryDashboard';
import DynamicMentor from './DynamicMentor';
import PerformanceAnalytics from './PerformanceAnalytics';

const Dashboard = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<{ course: string, institution: string } | null>(null);
  const [activeTab, setActiveTab] = useState('inicio');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedGoal = localStorage.getItem('next_enem_meta');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }

    // Check for user data to determine role
    const savedUser = localStorage.getItem('next_enem_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Default mock for testing if no user exists
      const mockUser = { name: 'Luan Luis', role: 'admin' };
      setUser(mockUser);
      localStorage.setItem('next_enem_user', JSON.stringify(mockUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="max-w-6xl mx-auto">
            {/* HEADER COM META */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
              <div>
                <h1 className="text-4xl font-black text-zinc-950 tracking-tight mb-2">Bem-vindo, Futuro Universitário! 👋</h1>
                <p className="text-zinc-950 font-bold tracking-tight opacity-70">Sua meta de estudos está ativa e o cronômetro não para.</p>
              </div>
              
              {goal && (
                <div className="bg-white border-2 border-blue-600 text-zinc-950 p-6 rounded-[2.5rem] shadow-xl shadow-blue-500/5 flex items-center gap-6 min-w-[320px]">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                    <Target size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Meta Definida</p>
                    <p className="text-xl font-black leading-none">{goal.course}</p>
                    <p className="text-xs font-bold text-zinc-950 opacity-60 mt-1">{goal.institution}</p>
                  </div>
                  <div className="ml-auto bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <ArrowUpRight size={18} className="text-blue-600" />
                  </div>
                </div>
              )}
            </header>

            {/* MENTOR DINÂMICO IA */}
            <div className="mb-12">
              <DynamicMentor />
            </div>

            {/* PERFORMANCE ANALYTICS (PORTÃO 5.2) */}
            <div className="mb-16">
              <PerformanceAnalytics />
            </div>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LADO ESQUERDO: PROGRESSO E NOTAS */}
              <div className="lg:col-span-8 space-y-8">
                {/* SUBJECT CARDS ROW */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Matemática', icon: Calculator, progress: 65, color: 'text-blue-500' },
                    { label: 'Natureza', icon: FlaskConical, progress: 40, color: 'text-emerald-500' },
                    { label: 'Linguagens', icon: Languages, progress: 80, color: 'text-indigo-500' },
                    { label: 'Humanas', icon: Globe, progress: 55, color: 'text-amber-500' },
                  ].map((subject, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-300 hover:scale-[1.01] group cursor-pointer lg:aspect-square flex flex-col justify-between">
                      <div className={`w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center ${subject.color} shadow-sm group-hover:scale-110 transition-transform duration-300 border border-zinc-100`}>
                        <subject.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-950 uppercase tracking-widest mb-3">{subject.label}</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[9px] font-black text-zinc-950 uppercase tracking-tighter">
                            <span>Progresso</span>
                            <span className={subject.color}>{subject.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${subject.color === 'text-blue-500' ? 'bg-blue-600' : subject.color === 'text-emerald-500' ? 'bg-emerald-500' : subject.color === 'text-indigo-500' ? 'bg-indigo-500' : 'bg-amber-500'} transition-all duration-1000`} 
                              style={{ width: `${subject.progress}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CARD REDAÇÃO */}
                  <div className="bg-white p-8 rounded-2xl border border-zinc-100 flex flex-col group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                        <PenTool size={22} />
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">+12%</span>
                    </div>
                    <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest mb-2 opacity-60">Lab de Redação</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-zinc-950 tracking-tighter">920</span>
                      <span className="text-zinc-950 font-black opacity-30">/1000</span>
                    </div>
                    <p className="text-xs text-zinc-950 font-bold mt-4 opacity-70 italic">Último tema: Desafios da Educação</p>
                    <button className="mt-8 w-full py-4 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 active:scale-95 transition-all duration-300">Ver Feedback</button>
                  </div>

                  {/* CARD PROGRESSO GERAL */}
                  <div className="bg-white p-8 rounded-2xl text-zinc-950 flex flex-col shadow-xl border border-blue-600/10 hover:scale-[1.01] transition-all duration-300">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                        <PieChart size={22} />
                      </div>
                    </div>
                    <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest mb-2 opacity-60">Progresso Geral</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-zinc-950 tracking-tighter">74%</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-[10px] font-black tracking-widest text-zinc-950 uppercase">
                        <span>Dominado</span>
                        <span className="opacity-40">Total</span>
                      </div>
                      <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[74%] rounded-full shadow-[0_0_12px_rgba(37,99,235,0.2)]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CALCULADORA TRI INTEGRADA */}
                <div className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-xl">
                  <header className="mb-8 border-b border-zinc-100 pb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-zinc-950 tracking-tight">Simulador TRI</h3>
                      <p className="text-zinc-950 text-xs font-bold opacity-60">Calcule suas chances reais baseado no algoritmo oficial.</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                      <Calculator size={22} />
                    </div>
                  </header>
                  <CalculadoraTRI />
                </div>
              </div>

              {/* LADO DIREITO: ATIVIDADES E RANKINGS */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-zinc-100 hover:shadow-2xl transition-all duration-300 shadow-sm">
                  <h3 className="font-black text-zinc-950 uppercase tracking-[0.2em] text-[10px] mb-8 flex items-center gap-3">
                    <Clock size={16} className="text-blue-600" /> Atividades Recentes
                  </h3>
                  <div className="space-y-6">
                    {[
                      { t: "Simulado Mat.", d: "Ontem", s: "820 TRI" },
                      { t: "Redação #04", d: "Há 3 dias", s: "920 PTS" },
                      { t: "Física - Óptica", d: "Há 4 dias", s: "100%" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-950 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg transition-all duration-300 border border-zinc-100">
                          <CheckCircle2 size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-zinc-950 tracking-tight">{item.t}</p>
                          <p className="text-[10px] text-zinc-950 font-black uppercase tracking-widest opacity-40">{item.d} • {item.s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-10 w-full py-4 border-2 border-zinc-100 text-zinc-950 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-950 hover:text-white transition-all duration-300">Histórico Completo</button>
                </div>

                <div className="bg-white border-2 border-blue-600 p-8 rounded-2xl text-zinc-950 shadow-xl shadow-blue-500/5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100">
                      <Trophy size={22} />
                    </div>
                    <h3 className="font-black text-blue-600 uppercase tracking-widest text-[10px] mb-2">Sua Posição</h3>
                    <p className="text-3xl font-black text-zinc-950 tracking-tighter">Top 5%</p>
                    <p className="text-xs text-zinc-950 font-black opacity-60 mt-2 leading-relaxed uppercase italic">Você está entre os estudantes mais bem preparados para {goal?.course || 'sua meta'}.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'estudo':
        return <StudyRoom />;
      case 'redacao':
        return <RedacaoLab />;
      case 'simulados':
        return <SimuladosTRI />;
      case 'perfil':
        return <Profile />;
      case 'suporte':
        return <SupportChat />;
      case 'biblioteca':
        return <TheoryDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white text-zinc-950 font-sans selection:bg-blue-600 selection:text-white">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-zinc-100 flex flex-col p-8 h-full bg-white shrink-0">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-[#007BFF] rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
            <Zap size={22} fill="white" />
          </div>
          <div className="flex font-black text-2xl tracking-tighter italic">
            <span className="text-[#007BFF]">NEXT</span>
            <span className="text-zinc-950">ENEM</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
          <button 
            onClick={() => setActiveTab('inicio')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'inicio' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
          >
            <LayoutDashboard size={20} className={activeTab === 'inicio' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
            <span className="uppercase tracking-[0.1em] text-[10px]">Início</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('estudo')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'estudo' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
          >
            <BookOpen size={20} className={activeTab === 'estudo' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
            <span className="uppercase tracking-[0.1em] text-[10px]">Sala de Estudo</span>
          </button>

          <button 
             onClick={() => setActiveTab('redacao')}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'redacao' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
          >
            <PenTool size={20} className={activeTab === 'redacao' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
            <span className="uppercase tracking-[0.1em] text-[10px]">Lab de Redação</span>
          </button>

          <button 
             onClick={() => setActiveTab('simulados')}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'simulados' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
          >
            <ClipboardList size={20} className={activeTab === 'simulados' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
            <span className="uppercase tracking-[0.1em] text-[10px]">Simulados TRI</span>
          </button>

          <button 
             onClick={() => setActiveTab('biblioteca')}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'biblioteca' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
          >
            <BookOpen size={20} className={activeTab === 'biblioteca' ? 'text-white' : 'text-zinc-300 group-hover:text-blue-600'} />
            <span className="uppercase tracking-[0.1em] text-[10px]">Biblioteca Global</span>
          </button>

          <div className="pt-6 mt-6 border-t border-zinc-100 space-y-2">
            <button 
              onClick={() => setActiveTab('perfil')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'perfil' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
            >
              <User size={20} className={activeTab === 'perfil' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
              <span className="uppercase tracking-[0.1em] text-[10px]">Meu Perfil</span>
            </button>

            <button 
              onClick={() => setActiveTab('suporte')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'suporte' ? 'bg-zinc-50 text-zinc-950 border border-zinc-100 shadow-sm' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
            >
              <HelpCircle size={20} className={activeTab === 'suporte' ? 'text-blue-600' : 'text-zinc-300 group-hover:text-blue-600'} />
              <span className="uppercase tracking-[0.1em] text-[10px]">Suporte</span>
            </button>

            {user?.role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all duration-300 group ${activeTab === 'master' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'}`}
              >
                <ShieldCheck size={20} className={activeTab === 'master' ? 'text-white' : 'text-zinc-300 group-hover:text-blue-600'} />
                <span className="uppercase tracking-[0.1em] text-[10px]">Master Panel</span>
              </button>
            )}
          </div>
        </nav>

        {/* LOGOUT */}
        <button 
          onClick={handleLogout}
          className="mt-8 flex items-center gap-3 p-5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-[2rem] transition-all duration-300 font-black uppercase tracking-widest text-[10px] group border border-transparent hover:border-red-100"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Sair da Conta</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-white p-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;

