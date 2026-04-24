import React from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  BarChart3, 
  Clock, 
  ChevronRight,
  Trophy
} from 'lucide-react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('next_enem_meta');
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* SIDEBAR FIXA */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6 h-full">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-[#007BFF] tracking-tighter">NEXT ENEM</h2>
        </div>

        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-50 text-[#007BFF] rounded-xl font-bold">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all cursor-not-allowed">
            <BookOpen size={20} />
            <span>Conteúdos</span>
          </div>
        </nav>

        {/* BOTÃO DE LOGOUT OBRIGATÓRIO */}
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold w-full border-none cursor-pointer"
        >
          <LogOut size={20} />
          <span>Sair da Conta</span>
        </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-800">Bem-vindo de volta! 🚀</h1>
            <p className="text-slate-500 font-medium">Sua jornada rumo à aprovação continua aqui.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-orange-100 w-10 h-10 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Sua Meta</h3>
              <p className="text-sm text-slate-500">Clique para ajustar</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
