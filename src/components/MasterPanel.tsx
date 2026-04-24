import React from 'react';
import { Users, ClipboardCheck, MessageSquare, ArrowUpRight, TrendingUp, Search, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Alunos Ativos', value: '1,284', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Simulados Realizados', value: '8,432', trend: '+24%', icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Dúvidas Pendentes', value: '12', trend: '-5%', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const students = [
  { id: 1, name: 'Luan Luis', email: 'luan@nextenem.com', plan: 'Premium', status: 'Ativo', progress: '74%' },
  { id: 2, name: 'Maria Silva', email: 'maria@gmail.com', plan: 'Basic', status: 'Inativo', progress: '12%' },
  { id: 3, name: 'João Souza', email: 'joao@outlook.com', plan: 'Premium', status: 'Ativo', progress: '89%' },
  { id: 4, name: 'Ana Costa', email: 'ana@univise.br', plan: 'Premium', status: 'Ativo', progress: '34%' },
];

export default function MasterPanel() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 font-black text-[10px] uppercase tracking-widest transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Voltar ao Dashboard
        </button>
      </div>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter mb-2">Painel de Controle Master</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Gestão estratégica do ecossistema Next Enem.</p>
        </div>
        <div className="flex bg-zinc-100 p-1.5 rounded-2xl">
          <button className="px-6 py-2.5 bg-white shadow-sm rounded-xl text-xs font-black uppercase tracking-widest text-zinc-950">Visão Geral</button>
          <button className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Relatórios</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={26} />
              </div>
              <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} px-3 py-1 rounded-full uppercase tracking-widest`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-black text-zinc-950 tracking-tighter">{stat.value}</p>
              <TrendingUp size={20} className="text-zinc-200 mb-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-zinc-100 p-10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black text-zinc-950 tracking-tight">Gestão de Estudantes</h3>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">Total: 14,231 alunos</p>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
            <input 
              type="text" 
              placeholder="Buscar por e-mail ou nome..." 
              className="pl-12 pr-6 py-4 bg-zinc-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-600 min-w-[300px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50">
                <th className="pb-6 px-4">Estudante</th>
                <th className="pb-6 px-4">Plano</th>
                <th className="pb-6 px-4">Progresso</th>
                <th className="pb-6 px-4">Status</th>
                <th className="pb-6 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-zinc-50/50 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-black text-zinc-400 text-xs">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-950 tracking-tight">{student.name}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${student.plan === 'Premium' ? 'text-blue-600 bg-blue-50' : 'text-zinc-600 bg-zinc-100'}`}>
                      {student.plan}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: student.progress }} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-950">{student.progress}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${student.status === 'Ativo' ? 'text-emerald-500' : 'text-zinc-300'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                      {student.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <button className="p-2 text-zinc-300 hover:text-zinc-950 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
