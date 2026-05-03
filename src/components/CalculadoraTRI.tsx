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
    <div className="space-y-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 bg-white border border-zinc-200 border-l-4 border-l-blue-600 rounded-md text-black flex items-center justify-between group hover:bg-zinc-50 transition-all duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center text-blue-600 border border-blue-100">
            <Calculator size={18} />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 block">Simulador Elite</span>
            <h3 className="text-base font-bold tracking-tight uppercase italic">Simulador de Notas TRI</h3>
          </div>
        </div>
        <div className={cn("transition-transform duration-300", isOpen ? "rotate-90" : "")}>
          <ChevronRight size={18} className="text-zinc-300" />
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
            <div className="p-6 bg-white border border-zinc-200 rounded-md space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <BarChart3 size={14} className="text-blue-600" /> Ajuste seus acertos
                  </h4>
                  
                  <div className="space-y-6">
                    {areas.map((area) => (
                      <div key={area.id} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-gray-500">{area.label}</span>
                          <span className="text-black bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100 italic">
                            {scores[area.id]} {area.id === 'red' ? 'pts' : 'acertos'}
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max={area.max} 
                          value={scores[area.id]}
                          onChange={(e) => setScores({...scores, [area.id]: parseInt(e.target.value)})}
                          className="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-50 p-8 rounded-md border border-zinc-100 flex flex-col justify-center h-full">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={14} className="text-blue-600" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nota Final Estimada</span>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-6xl font-bold text-blue-600 tracking-tighter">{notaTotal}</span>
                          <span className="text-lg font-bold text-gray-300 mb-2 uppercase tracking-widest font-mono">pts</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            <span>Sua Chance em {goal?.institution || 'SISU'}</span>
                            <span className="text-black">{Math.round((notaTotal / corteEstimado) * 100)}%</span>
                         </div>
                         <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-1000" 
                              style={{ width: `${Math.min((notaTotal / corteEstimado) * 100, 100)}%` }}
                            />
                         </div>
                         <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-wide">
                           <Info size={12} />
                           <span>Corte estimado: {corteEstimado} pts</span>
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
