import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import { Brain, TrendingUp, AlertCircle, CheckCircle2, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

const dataTRI = [
  { day: 'Seg', tri: 620 },
  { day: 'Ter', tri: 645 },
  { day: 'Qua', tri: 630 },
  { day: 'Qui', tri: 680 },
  { day: 'Sex', tri: 710 },
  { day: 'Sáb', tri: 695 },
  { day: 'Dom', tri: 740 },
];

const dataRadar = [
  { subject: 'Matemática', A: 85, fullMark: 100 },
  { subject: 'Natureza', A: 45, fullMark: 100 },
  { subject: 'Linguagens', A: 90, fullMark: 100 },
  { subject: 'Humanas', A: 70, fullMark: 100 },
  { subject: 'Redação', A: 92, fullMark: 100 },
];

const labInsights = [
  { 
    pattern: "Erro de Unidade", 
    frequency: "Alta", 
    description: "Você costuma esquecer de converter cm para metros em questões de cinemática.",
    field: "Física/Matemática" 
  },
  { 
    pattern: "Leitura Apressada", 
    frequency: "Média", 
    description: "Identificamos que você ignora o comando 'exceto' em questões de biologia.",
    field: "Ciências da Natureza" 
  }
];

export default function PerformanceAnalytics() {
  return (
    <div className="space-y-8">
      {/* 5.2: Responsive Charts with Cyber-Minimalist Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* TRI Evolution - Cyber Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-50" />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Evolução TRI</h3>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Sua trajetória rumo à aprovação</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[9px] font-black uppercase rounded-full border border-cyan-500/20">Semanal</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTRI}>
                <defs>
                  <linearGradient id="colorTri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={['dataMin - 50', 'dataMax + 50']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tri" 
                  stroke="#22d3ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTri)" 
                  dot={{ r: 4, fill: '#22d3ee', strokeWidth: 2, stroke: '#09090b' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Areas Distribution - Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between"
        >
          <div className="mb-6">
            <h3 className="text-sm font-black text-white italic tracking-widest uppercase">Equilíbrio de Áreas</h3>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Distribuição de competência</p>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" stroke="#3f3f46" fontSize={8} fontWeight="bold" />
                <Radar
                  name="Proficiência"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
              <FlaskConical size={12} className="text-emerald-400" />
              Upgrade Necessário: Natureza (+55%)
            </div>
          </div>
        </motion.div>

        {/* LABORATÓRIO DE CÁLCULO INSIGHTS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-12 bg-zinc-50 border border-zinc-100 rounded-3xl p-10"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-zinc-950 italic tracking-tighter">Análise Cognitiva do Lab</h3>
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-1">Padrões identificados pela IA em seus rascunhos</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labInsights.map((insight, idx) => (
              <div key={idx} className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    insight.frequency === 'Alta' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    Frequência {insight.frequency}
                  </span>
                  <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">{insight.field}</span>
                </div>
                <h4 className="text-lg font-black text-zinc-950 mb-2 flex items-center gap-2">
                  <AlertCircle size={18} className="text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                  {insight.pattern}
                </h4>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {insight.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 size={14} /> Corrigir tática agora
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
