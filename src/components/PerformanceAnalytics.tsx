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
        
        {/* TRI Evolution - Blue Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-xl shadow-zinc-200/40 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-20" />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-black italic tracking-tighter uppercase">Evolução TRI</h3>
              <p className="text-[10px] font-black text-black uppercase tracking-[0.2em] mt-1 opacity-60">Sua trajetória rumo à aprovação</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase rounded-full border border-zinc-100 shadow-sm">Semanal</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTRI}>
                <defs>
                  <linearGradient id="colorTri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#a1a1aa" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#a1a1aa" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={['dataMin - 50', 'dataMax + 50']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f4f4f5', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563eb', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tri" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorTri)" 
                  dot={{ r: 5, fill: '#2563eb', strokeWidth: 3, stroke: '#ffffff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Areas Distribution - Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-xl shadow-zinc-200/40 flex flex-col justify-between"
        >
          <div className="mb-6">
            <h3 className="text-sm font-black text-black italic tracking-widest uppercase">Equilíbrio de Áreas</h3>
            <p className="text-[10px] font-black text-black uppercase tracking-[0.2em] mt-1 opacity-60">Distribuição de competência</p>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid stroke="#f4f4f5" />
                <PolarAngleAxis dataKey="subject" stroke="#71717a" fontSize={9} fontWeight="bold" />
                <Radar
                  name="Proficiência"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
              <FlaskConical size={14} className="text-emerald-500" />
              Meta: Natureza (+55%)
            </div>
          </div>
        </motion.div>

        {/* LABORATÓRIO DE CÁLCULO INSIGHTS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-12 bg-white border border-zinc-100 rounded-[3rem] p-10 shadow-xl shadow-zinc-200/20"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black italic tracking-tighter">Análise Cognitiva do Lab</h3>
                <p className="text-xs font-black text-black uppercase tracking-[0.2em] mt-1 opacity-60">Padrões identificados pela IA em seus rascunhos</p>
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
                <h4 className="text-lg font-black text-black mb-2 flex items-center gap-2">
                  <AlertCircle size={18} className="text-rose-500 transition-colors" />
                  {insight.pattern}
                </h4>
                <p className="text-sm text-black font-bold opacity-70 leading-relaxed italic">
                  {insight.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
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
