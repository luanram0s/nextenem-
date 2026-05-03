import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, TrendingUp, ChevronRight, BarChart3, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AreaConfig {
  id: string;
  label: string;
  max: number;
  weight: number;
  color: string;
}

const areas: AreaConfig[] = [
  { id: 'lin', label: 'Linguagens', max: 45, weight: 15, color: 'bg-blue-500' },
  { id: 'hum', label: 'Humanas', max: 45, weight: 16, color: 'bg-amber-500' },
  { id: 'nat', label: 'Natureza', max: 45, weight: 18, color: 'bg-emerald-500' },
  { id: 'mat', label: 'Matemática', max: 45, weight: 22, color: 'bg-indigo-600' },
  { id: 'red', label: 'Redação', max: 1000, weight: 1, color: 'bg-rose-500' },
];

export default function CalculadoraTRI() {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('next_enem_scores');
    return saved ? JSON.parse(saved) : { lin: 30, hum: 32, nat: 28, mat: 35, red: 800 };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [goal, setGoal] = useState<{ course: string, institution: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('next_enem_scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    const savedGoal = localStorage.getItem('next_enem_meta');
    if (savedGoal) setGoal(JSON.parse(savedGoal));
  }, []);

  const calculateTotal = () => {
    let total = 0;
    areas.forEach(area => {
      if (area.id === 'red') {
        total += scores[area.id];
      } else {
        // Lógica TRI solicitada: acertos * peso + base 350
        total += Math.round(scores[area.id] * area.weight + 350);
      }
    });
    return Math.round(total / 5);
  };

  const notaTotal = calculateTotal();
  const corteEstimado = 780; // Placeholder para nota de corte baseada na meta

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 bg-white border border-zinc-100 rounded-[2.5rem] text-black flex items-center justify-between group hover:bg-zinc-50 transition-all duration-300 shadow-xl shadow-zinc-200/40"
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 border border-blue-100">
            <Calculator size={28} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-1 block opacity-40">SIMULADOR ELITE NEXT ENEM</span>
            <h3 className="text-xl font-black tracking-tight uppercase">Simulador de Notas TRI</h3>
            <p className="text-xs text-black font-medium uppercase tracking-widest mt-1 opacity-50">Calcule sua aprovação em tempo real</p>
          </div>
        </div>
        <div className={cn("transition-transform duration-500", isOpen ? "rotate-90" : "")}>
          <ChevronRight size={24} className="text-zinc-300" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-10 bg-white border-2 border-zinc-50 rounded-[3rem] shadow-2xl shadow-zinc-200/50 space-y-12 backdrop-blur-xl bg-white/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h4 className="font-black text-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <BarChart3 size={16} className="text-blue-600" /> Ajuste seus acertos
                  </h4>
                  
                  <div className="space-y-8">
                    {areas.map((area) => (
                      <div key={area.id} className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                          <span className="text-zinc-400">{area.label}</span>
                          <span className="text-black bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                            {scores[area.id]} {area.id === 'red' ? 'pts' : 'acertos'}
                          </span>
                        </div>
                        <div className="relative flex items-center">
                          <input 
                            type="range" 
                            min="0" 
                            max={area.max} 
                            value={scores[area.id]}
                            onChange={(e) => setScores({...scores, [area.id]: parseInt(e.target.value)})}
                            className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <TrendingUp size={120} />
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles size={18} className="text-amber-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nota Final Estimada</span>
                        </div>
                        <div className="flex items-end gap-3">
                          <span className="text-8xl font-black text-blue-600 tracking-tighter">{notaTotal}</span>
                          <span className="text-2xl font-bold text-zinc-300 mb-4 uppercase tracking-widest">pts</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black opacity-40">
                            <span>Sua Chance em {goal?.institution || 'SIU'}</span>
                            <span>{Math.round((notaTotal / corteEstimado) * 100)}%</span>
                         </div>
                         <div className="h-3 bg-zinc-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                              style={{ width: `${Math.min((notaTotal / corteEstimado) * 100, 100)}%` }}
                            />
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-black opacity-40 mt-2">
                           <Info size={12} />
                           <span>Nota de corte base estimada: {corteEstimado} pts</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
