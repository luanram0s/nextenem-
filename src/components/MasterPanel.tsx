import React from 'react';
import { 
  Users, 
  ClipboardCheck, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown,
  Search, 
  MoreHorizontal, 
  ArrowLeft,
  Settings,
  Edit2,
  Trash2,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Alunos Ativos', value: '1,284', trend: '+12%', isPositive: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Vendas Brutas', value: 'R$ 42,8k', trend: '+24%', isPositive: true, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Cancelamentos', value: '02', trend: '-5%', isPositive: true, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

const students = [
  { id: 1, name: 'Luan Luis', email: 'luan@nextenem.com', plan: 'Premium', status: 'Ativo', progress: '74%' },
  { id: 2, name: 'Maria Silva', email: 'maria@gmail.com', plan: 'Basic', status: 'Inativo', progress: '12%' },
  { id: 3, name: 'João Souza', email: 'joao@outlook.com', plan: 'Premium', status: 'Ativo', progress: '89%' },
  { id: 4, name: 'Ana Costa', email: 'ana@univise.br', plan: 'Premium', status: 'Ativo', progress: '34%' },
  { id: 5, name: 'Pedro Alves', email: 'pedro.alves@gmail.com', plan: 'Premium', status: 'Ativo', progress: '65%' },
];

export default function MasterPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 lg:p-12 space-y-12 pb-32">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300 mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
        </button>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-3">Painel Master</h1>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
              <p className="text-zinc-500 font-medium tracking-tight">Status do Sistema: <span className="text-zinc-300 font-bold uppercase text-[10px] tracking-widest ml-1">Operacional</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white hover:border-zinc-700 transition-all">
              <Filter size={14} /> Filtros Avançados
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
              Exportar CSV
            </button>
          </div>
        </header>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl group hover:border-zinc-700 transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={28} />
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] font-black ${stat.isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'} px-3 py-1.5 rounded-full uppercase tracking-widest border border-current opacity-80`}>
                  {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 tracking-[0.2em]">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tighter">{stat.value}</span>
                <span className="text-zinc-600 font-bold text-xs">hoje</span>
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE SECTION */}
        <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden shadow-black/50">
          <div className="p-10 border-b border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Gestão de Estudantes</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 tracking-[0.1em]">Listando usuários ativos e pendentes no sistema</p>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Pesquisar por nome, CPF ou e-mail..." 
                className="pl-14 pr-8 py-5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-xs font-bold text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-[350px] transition-all outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-900 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  <th className="py-6 px-10 font-semibold">Estudante</th>
                  <th className="py-6 px-6 font-semibold">Plano</th>
                  <th className="py-6 px-6 font-semibold text-center">Progresso</th>
                  <th className="py-6 px-6 font-semibold text-center">Status</th>
                  <th className="py-6 px-10 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {students.map((student) => (
                  <tr key={student.id} className="group hover:bg-zinc-900/50 transition-all duration-300">
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-black text-white text-sm border border-zinc-700 shadow-inner group-hover:border-blue-500/50 group-hover:bg-zinc-700 transition-all">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">{student.name}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                        student.plan === 'Premium' 
                          ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' 
                          : 'text-zinc-400 border-zinc-700 bg-zinc-800'
                      }`}>
                        {student.plan}
                      </span>
                    </td>
                    <td className="py-8 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: student.progress }} 
                          />
                        </div>
                        <span className="text-[10px] font-black text-white min-w-[35px]">{student.progress}</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg ${
                          student.status === 'Ativo' 
                            ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' 
                            : 'text-zinc-500 border-zinc-700 bg-zinc-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                          {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-zinc-700 hover:text-white transition-all duration-300 shadow-sm">
                          <Settings size={16} />
                        </button>
                        <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-zinc-950/30 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Mostrando 5 de 14.231 resultados</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all">Anterior</button>
              <button className="px-4 py-2 bg-zinc-800 border border-blue-600/50 rounded-lg text-[10px] font-black uppercase text-white shadow-lg shadow-blue-600/20">1</button>
              <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all">2</button>
              <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all">Próxima</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

