import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  Layout,
  PenTool,
  Brain,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface Question {
  id: number;
  enunciado: string;
  alternativas: { id: string; text: string }[];
  dica: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    enunciado: "O Enem utiliza a Teoria de Resposta ao Item (TRI) para o cálculo das proficiências dos participantes. Esse modelo matemático leva em consideração três parâmetros fundamentais para cada questão. Qual destes parâmetros é crucial para evitar que o acerto por 'chute' eleve desproporcionalmente a nota do aluno?\n\nExemplo de Fórmula: $f(x) = \\sqrt{x^2 + 1}$",
    alternativas: [
      { id: 'A', text: 'Parâmetro de Discriminação (a)' },
      { id: 'B', text: 'Parâmetro de Dificuldade (b)' },
      { id: 'C', text: 'Parâmetro de Acerto Casual (c)' },
      { id: 'D', text: 'Parâmetro de Inflexão (d)' },
      { id: 'E', text: 'Parâmetro de Assintota (k)' }
    ],
    dica: "O parâmetro de acerto casual (c) modela a probabilidade de um aluno com baixa proficiência acertar a questão por sorte."
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
    dica: "Quando $\\Delta > 0$, a equação do segundo grau possui duas raízes reais e distintas, o que significa que a parábola intercepta o eixo $x$ em dois pontos."
  }
];

export default function SimuladosTRI() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [isFinished, setIsFinished] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    // Reset tip state when question changes
    setShowTip(false);
  }, [currentIdx]);

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

  const currentQuestion = mockQuestions[currentIdx] || mockQuestions[0];
  const progress = (Object.keys(answers).length / 45) * 100; // Mocking 45 questions

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
      {/* SCRATCHPAD OVERLAY */}
      <AnimatePresence>
        {showScratchpad && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScratchpad(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center">
                    <PenTool size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-widest">Lousa de Cálculo</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Rascunho Digital</p>
                  </div>
                </div>
                <button onClick={() => setShowScratchpad(false)} className="p-3 bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <textarea 
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                placeholder="Organize seu raciocínio aqui..."
                className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm font-medium text-zinc-300 placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none shadow-inner"
              />
              
              <div className="mt-8 flex items-center justify-between">
                 <button 
                  onClick={() => setScratchpadText('')}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-rose-500 transition-colors"
                >
                  Limpar Lousa
                </button>
                <button 
                  onClick={() => setShowScratchpad(false)}
                  className="px-6 py-3 bg-white text-zinc-950 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Continuar Questão
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-950 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-zinc-950 tracking-tighter">Simulado Matemático</h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Ciências da Natureza e suas Tecnologias</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Progresso Total</span>
            <div className="w-48 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentIdx + 1) / mockQuestions.length * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Tempo de Prova</span>
            <div className={`flex items-center gap-2 font-mono text-xl font-black ${timeLeft < 900 ? 'text-rose-500 animate-pulse' : 'text-zinc-950'}`}>
              <Clock size={18} />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-hidden">
        {/* LEFT: QUESTION CONTENT */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar"
            >
              <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <Layout size={120} className="text-white" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Questão {currentQuestion.id}</span>
                  <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Nível Médio</span>
                </div>
                <div className="text-lg font-medium text-zinc-100 leading-relaxed tracking-tight">
                  {renderTextWithMath(currentQuestion.enunciado)}
                </div>
              </div>

              {/* AI STUDY TIP */}
              <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
                <button 
                  onClick={() => setShowTip(!showTip)}
                  className="w-full flex items-center justify-between p-6 hover:bg-zinc-100/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
                      <Brain size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-black text-zinc-950 tracking-tight">Dica do Professor Next</h4>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Insight Estratégico</p>
                    </div>
                  </div>
                  {showTip ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
                </button>
                
                <AnimatePresence>
                  {showTip && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white border-t border-zinc-100"
                    >
                      <div className="p-8 text-sm font-medium text-zinc-600 leading-relaxed italic">
                        {renderTextWithMath(currentQuestion.dica)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4 pb-20">
                {currentQuestion.alternativas.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => handleSelect(alt.id)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group flex items-start gap-4 ${
                      answers[currentQuestion.id] === alt.id
                        ? 'bg-blue-600/10 border-blue-600'
                        : 'bg-zinc-50 border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-lg'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                      answers[currentQuestion.id] === alt.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-zinc-200 text-zinc-400 group-hover:border-blue-200 group-hover:text-blue-600 shadow-sm'
                    }`}>
                      {alt.id}
                    </div>
                    <span className={`flex-1 text-sm font-bold tracking-tight mt-2 ${
                      answers[currentQuestion.id] === alt.id ? 'text-zinc-950' : 'text-zinc-600'
                    }`}>
                      {renderTextWithMath(alt.text)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FOOTER CONTROLS */}
          <div className="mt-auto pt-6 border-t border-zinc-100 flex items-center justify-between pb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowScratchpad(true)}
                className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
              >
                <PenTool size={16} /> 📝 Rascunho
              </button>
              <div className="h-10 w-[1px] bg-zinc-100 mx-2" />
              <button 
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 transition-all disabled:opacity-30"
              >
                <ChevronLeft size={16} /> Anterior
              </button>
              <button 
                onClick={() => setCurrentIdx(Math.min(mockQuestions.length - 1, currentIdx + 1))}
                disabled={currentIdx === mockQuestions.length - 1}
                className="flex items-center gap-2 px-8 py-4 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
              >
                Próxima <ChevronRight size={16} />
              </button>
            </div>
            
            <button className="p-4 text-zinc-400 hover:text-rose-500 transition-colors">
              <Flag size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT: NAVIGATION PANEL */}
        <div className="lg:col-span-4 space-y-8 h-full flex flex-col">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl flex-1 flex flex-col">
            <h3 className="font-black text-white uppercase tracking-widest text-xs mb-8 flex items-center justify-between">
              Mapa de Questões
              <span className="text-[10px] text-zinc-500 font-bold">45 Questões</span>
            </h3>

            <div className="grid grid-cols-5 gap-3 h-fit">
              {Array.from({ length: 45 }).map((_, i) => {
                const qNum = i + 1;
                const isCurrent = qNum === currentIdx + 1;
                const isAnswered = answers[qNum] !== undefined;

                return (
                  <button
                    key={i}
                    onClick={() => {
                        // For demo, we only have 2 real questions
                        if (i < mockQuestions.length) setCurrentIdx(i);
                    }}
                    className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-900 scale-110' 
                        : isAnswered 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                    }`}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Respondidas</span>
                </div>
                <span className="text-sm font-black text-white">{Object.keys(answers).length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-zinc-500" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Restantes</span>
                </div>
                <span className="text-sm font-black text-white">{45 - Object.keys(answers).length}</span>
              </div>
            </div>

            <button 
              className="mt-auto w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all"
              onClick={() => {
                if (window.confirm('Deseja finalizar o simulado agora?')) {
                  setIsFinished(true);
                }
              }}
            >
              Finalizar Simulado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
