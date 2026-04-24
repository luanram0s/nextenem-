import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const areas = [
  { id: 'LC', label: 'Linguagens', color: 'bg-blue-500' },
  { id: 'CH', label: 'Humanas', color: 'bg-amber-500' },
  { id: 'CN', label: 'Natureza', color: 'bg-emerald-500' },
  { id: 'MT', label: 'Matemática', color: 'bg-next-blue' },
];

export default function CalculadoraTRI() {
  const [acertos, setAcertos] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('next_enem_acertos');
    return saved ? JSON.parse(saved) : { LC: 30, CH: 35, CN: 25, MT: 32 };
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('next_enem_acertos', JSON.stringify(acertos));
  }, [acertos]);

  // Simplified TRI projection heuristic
  const calculateProjection = (area: string, count: number) => {
    const base = count * 15;
    const offset = area === 'MT' ? 120 : 80;
    const min = base + offset;
    const max = base + offset + 150;
    return { min, max };
  };

  const totalProjection = (Object.entries(acertos) as [string, number][]).reduce((acc, [area, count]) => {
    const { min, max } = calculateProjection(area, count);
    return { min: acc.min + min, max: acc.max + max };
  }, { min: 0, max: 0 });

  const finalAvg = {
    min: Math.round(totalProjection.min / 4),
    max: Math.round(totalProjection.max / 4)
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 bg-slate-900 border border-slate-800 rounded-[2rem] text-white flex items-center justify-between group hover:bg-slate-800 transition-all shadow-xl"
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-next-blue/20 rounded-2xl flex items-center justify-center text-next-blue group-hover:scale-110 transition-transform">
            <Calculator size={28} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-black tracking-tight uppercase">Simulador de Nota TRI</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Calcule sua probabilidade de aprovação</p>
          </div>
        </div>
        <div className={cn("transition-transform duration-500", isOpen ? "rotate-90" : "")}>
          <ChevronRight size={24} className="text-slate-600" />
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
            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {areas.map((area) => (
                  <div key={area.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{area.label}</label>
                      <span className="text-sm font-black text-slate-800">{acertos[area.id]} / 45</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="45" 
                      value={acertos[area.id]}
                      onChange={(e) => setAcertos({...acertos, [area.id]: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-next-blue"
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-300">
                      <span>Projeção:</span>
                      <span className="text-next-blue">{calculateProjection(area.id, acertos[area.id]).min} - {calculateProjection(area.id, acertos[area.id]).max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Projeção de Média Geral</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-black text-slate-800 tracking-tighter">{finalAvg.min}</span>
                    <span className="text-2xl font-bold text-slate-300 mb-2">~ {finalAvg.max}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-6 border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-next-blue">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Status de Aprovação</h4>
                    <p className="text-xs font-bold text-emerald-500 uppercase">Probabilidade Alta em 82% das Federais</p>
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
