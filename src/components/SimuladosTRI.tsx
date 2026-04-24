// Build Version: 2.0 - Forced Update (BERRANTE RED BUTTON TEST)
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Layout,
  PenTool,
  Brain,
  ChevronDown,
  ChevronUp,
  X,
  ClipboardList,
  Lock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface Question {
  id: number;
  enunciado: string;
  alternativas: { id: string; text: string }[];
  dica: string;
  category: 'Lógica' | 'Matemática' | 'Humanas' | 'Linguagens';
}

const mockQuestions: Question[] = [
  {
    id: 1,
    enunciado: "O Enem utiliza a Teoria de Resposta ao Item (TRI) para o cálculo das proficiências dos participantes. Esse modelo matemático leva em consideração três parâmetros fundamentais para cada questão. Qual destes parâmetros é crucial para evitar que o acerto por 'chute' eleve desproporcionalmente a nota do aluno?\n\nExemplo de Fórmula LaTeX (VERIFICAÇÃO): $f(x) = \\sqrt{x^2 + 1}$",
    alternativas: [
      { id: 'A', text: 'Parâmetro de Discriminação (a)' },
      { id: 'B', text: 'Parâmetro de Dificuldade (b)' },
      { id: 'C', text: 'Parâmetro de Acerto Casual (c)' },
      { id: 'D', text: 'Parâmetro de Inflexão (d)' },
      { id: 'E', text: 'Parâmetro de Assintota (k)' }
    ],
    dica: "O parâmetro de acerto casual (c) modela a probabilidade de um aluno com baixa proficiência acertar a questão por sorte. Use a lousa ao lado para organizar seu pensamento.",
    category: 'Lógica'
  },
  {
    id: 2,
    enunciado: "Considere uma função quadrática de forma $f(x) = ax^2 + bx + c$. Se os coeficientes $a, b$ e $c$ são tais que o discriminante $\\Delta = b^2 - 4ac$ é maior que zero, o que podemos afirmar sobre o gráfico desta função?",
    alternativas: [
      { id: 'A', text: 'O gráfico não toca o eixo $x$.' },
      { id: 'B', text: 'O gráfico toca o eixo $x$ em exatamente um ponto.' },
      { id: 'C', text: 'O gráfico toca o eixo $x$ em dois pontos distintos.' },
      { id: 'D', text: 'O gráfico é uma reta.' },
      { id: 'E', text: 'A parábola tem concavidade voltada para baixo obrigatoriamente.' }
    ],
    dica: "Quando $\\Delta > 0$, a equação do segundo grau possui duas raízes reais e distintas, o que significa que a parábola intercepta o eixo $x$ em dois pontos.",
    category: 'Matemática'
  }
];

export default function SimuladosTRI() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [isFinished, setIsFinished] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadTexts, setScratchpadTexts] = useState<Record<number, string>>({});
  const [showTip, setShowTip] = useState(false);
  const [requirementAlert, setRequirementAlert] = useState<string | null>(null);

  const currentQuestion = mockQuestions[currentIdx] || mockQuestions[0];

  useEffect(() => {
    setShowTip(false);
    if (currentQuestion.category === 'Lógica' || currentQuestion.category === 'Matemática') {
      setRequirementAlert('Esta questão necessita do Espaço de Raciocínio para ser validada.');
      setTimeout(() => setRequirementAlert(null), 5000);
    }
  }, [currentIdx, currentQuestion.category]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelect = (altId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: altId });
  };

  const renderTextWithMath = (text: string) => {
    const parts = text.split(/(\$.*?\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={i} math={part.slice(1, -1)} />;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white text-zinc-950 font-sans relative">
      {/* REQUIREMENT TOAST */}
      <AnimatePresence>
        {requirementAlert && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] bg-zinc-950 text-white px-8 py-4 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-zinc-950">
              <AlertCircle size={18} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest">{requirementAlert}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛑 SCRATCHPAD DRAWER 🛑 */}
      <AnimatePresence>
        {showScratchpad && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScratchpad(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-zinc-950 text-white z-[1000] p-10 shadow-2xl flex flex-col border-l border-zinc-800"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
                    <PenTool size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic tracking-tighter uppercase">Espaço de Raciocínio</h3>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Organize seu ataque aqui</p>
                  </div>
                </div>
                <button onClick={() => setShowScratchpad(false)} className="p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all">
                  <X size={24} />
                </button>
              </div>

              <textarea 
                value={scratchpadTexts[currentQuestion.id] || ''}
                onChange={(e) => setScratchpadTexts({ ...scratchpadTexts, [currentQuestion.id]: e.target.value })}
                placeholder="Esculpa sua lógica aqui..."
                className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-lg font-medium text-white placeholder:text-zinc-800 focus:ring-4 focus:ring-red-600/20 outline-none transition-all resize-none shadow-inner"
              />
              
              <div className="mt-10 flex items-center justify-between">
                 <button 
                  onClick={() => setScratchpadTexts({ ...scratchpadTexts, [currentQuestion.id]: '' })}
                  className="text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition-colors"
                >
                  Dizimar Notas
                </button>
                <button 
                  onClick={() => setShowScratchpad(false)}
                  className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-red-700 transition-all hover:scale-[1.05] active:scale-95"
                >
                  Confirmar Raciocínio
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="flex items-center justify-between mb-10 border-b border-zinc-100 pb-8 shrink-0">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-xl">
             <ClipboardList size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-zinc-950 tracking-tighter italic">Simulado <span className="text-red-600">TRI</span></h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Nível de Dificuldade: Dinâmico</p>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] mb-1">Tempo de Prova</span>
             <div className={`flex items-center gap-3 text-2xl font-black ${timeLeft < 600 ? 'text-red-600 animate-pulse' : 'text-zinc-950'}`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LADO ESQUERDO: QUESTÃO */}
        <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-10 pr-6 custom-scrollbar pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-[2.5rem] shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
                   <div className="flex items-center gap-3 mb-8">
                      <span className="px-5 py-2 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Questão {currentQuestion.id}</span>
                   </div>
                   <div className="text-xl font-bold text-zinc-800 leading-relaxed tracking-tight">
                      {renderTextWithMath(currentQuestion.enunciado)}
                   </div>
                </div>

                {/* DICA IA */}
                <div className="bg-white border-2 border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:border-blue-600/30 transition-all">
                  <button 
                    onClick={() => setShowTip(!showTip)}
                    className="w-full flex items-center justify-between p-8"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <Brain size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-zinc-950 uppercase tracking-widest">Insights do Next AI</h4>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Análise de Redução de Erros</p>
                      </div>
                    </div>
                    {showTip ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
                  <AnimatePresence>
                    {showTip && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-zinc-50 border-t border-zinc-100 p-10"
                      >
                        <p className="text-lg font-medium text-zinc-600 italic leading-relaxed">
                           {renderTextWithMath(currentQuestion.dica)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.alternativas.map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => handleSelect(alt.id)}
                      className={`flex items-start gap-6 p-8 rounded-3xl border-2 text-left transition-all group ${
                        answers[currentQuestion.id] === alt.id
                          ? 'bg-zinc-950 border-zinc-950 text-white shadow-2xl scale-[1.02]'
                          : 'bg-white border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all shrink-0 ${
                        answers[currentQuestion.id] === alt.id
                          ? 'bg-red-600 text-white rotate-12 shadow-lg shadow-red-600/30'
                          : 'bg-zinc-100 text-zinc-400 group-hover:rotate-6 group-hover:text-zinc-600'
                      }`}>
                        {alt.id}
                      </div>
                      <span className={`text-lg font-black tracking-tight mt-2 flex-1 ${
                        answers[currentQuestion.id] === alt.id ? 'text-white' : 'text-zinc-700'
                      }`}>
                        {renderTextWithMath(alt.text)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* LADO DIREITO: DASHBOARD LOCAL */}
        <div className="lg:col-span-4 h-full flex flex-col overflow-hidden">
            <div className="bg-zinc-950 rounded-[3rem] p-10 flex flex-col h-full shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 pointer-events-none">
                  <PenTool size={200} />
               </div>

               <div className="mb-12">
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                     <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                     Seu Alvo
                  </h3>
                  <div className="grid grid-cols-5 gap-3">
                     {Array.from({ length: 45 }).map((_, i) => {
                        const num = i+1;
                        const active = num === currentIdx + 1;
                        const done = answers[num] !== undefined;
                        return (
                           <button 
                              key={i}
                              onClick={() => i < mockQuestions.length && setCurrentIdx(i)}
                              className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                                 active ? 'bg-red-600 text-white shadow-xl shadow-red-600/30 scale-125 z-10' :
                                 done ? 'bg-white text-zinc-950' : 
                                 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                              }`}
                           >
                              {num}
                           </button>
                        )
                     })}
                  </div>
               </div>

               <div className="mt-auto space-y-6">
                  <div className="flex items-center justify-between text-white">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Respondidas</span>
                      <span className="text-2xl font-black">{Object.keys(answers).length}/45</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${(Object.keys(answers).length/45)*100}%` }} />
                  </div>

                  <button 
                    onClick={() => { if(window.confirm('Assinar termo de entrega final?')) setIsFinished(true) }}
                    className="w-full py-6 bg-white text-zinc-950 rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-zinc-100 transition-all active:scale-95 mt-10 shadow-2xl"
                  >
                    ENTREGAR PROVA
                  </button>
               </div>
            </div>
        </div>
      </div>

      {/* 🚀 BARRA DE COMANDO BOTTOM 🚀 */}
      <footer className="mt-10 pt-10 border-t border-zinc-100 flex items-center justify-between shrink-0 mb-4">
          <div className="flex items-center gap-6">
             <button 
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-3 px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 transition-all disabled:opacity-30"
             >
                <ChevronLeft size={20} /> Anterior
             </button>

             {/* 🎯 BOTÃO ESPAÇO DE RACIOCÍNIO 🎯 */}
             <button 
                onClick={() => setShowScratchpad(true)}
                className="flex items-center gap-4 px-12 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all outline-none ring-4 ring-red-600/20"
             >
                <PenTool size={20} /> 📝 Espaço de Raciocínio
             </button>

             <button 
                onClick={() => {
                  const isTechnical = currentQuestion.category === 'Lógica' || currentQuestion.category === 'Matemática';
                  const hasReasoning = (scratchpadTexts[currentQuestion.id] || '').trim().length > 0;
                  
                  if (isTechnical && !hasReasoning) {
                    setRequirementAlert('Obrigatório preencher o Espaço de Raciocínio!');
                    setTimeout(() => setRequirementAlert(null), 3000);
                    return;
                  }
                  
                  setCurrentIdx(Math.min(mockQuestions.length - 1, currentIdx + 1));
                }}
                disabled={currentIdx === mockQuestions.length - 1}
                className={`flex items-center gap-3 px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-30 flex-row-reverse ${
                  (currentQuestion.category === 'Lógica' || currentQuestion.category === 'Matemática') && !(scratchpadTexts[currentQuestion.id] || '').trim()
                    ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
                    : 'bg-zinc-950 text-white hover:scale-105 active:scale-95'
                }`}
             >
                {(currentQuestion.category === 'Lógica' || currentQuestion.category === 'Matemática') && !(scratchpadTexts[currentQuestion.id] || '').trim() ? <Lock size={18} /> : <ChevronRight size={20} />}
                Próxima
             </button>
          </div>

          <button className="p-5 text-zinc-200 hover:text-red-600 transition-all">
             <Flag size={24} />
          </button>
      </footer>
    </div>
  );
}
