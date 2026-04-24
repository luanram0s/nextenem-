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
    enunciado: "O Enem utiliza a Teoria de Resposta ao Item (TRI) para o cálculo das proficiências dos participantes. Esse modelo matemático leva em consideração três parâmetros fundamentais para cada questão. Qual destes parâmetros é crucial para evitar que o acerto por 'chute' eleve desproporcionalmente a nota do aluno?\n\nExemplo de Fórmula LaTeX: $f(x) = \\sqrt{x^2 + 1}$",
    alternativas: [
      { id: 'A', text: 'Parâmetro de Discriminação (a)' },
      { id: 'B', text: 'Parâmetro de Dificuldade (b)' },
      { id: 'C', text: 'Parâmetro de Acerto Casual (c)' },
      { id: 'D', text: 'Parâmetro de Inflexão (d)' },
      { id: 'E', text: 'Parâmetro de Assintota (k)' }
    ],
    dica: "O parâmetro de acerto casual (c) modela a probabilidade de um aluno com baixa proficiência acertar a questão por sorte. Use a lousa ao lado para organizar seu pensamento."
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
      {/* 📝 LOUSA DE CÁLCULO (SCRATCHPAD) */}
      <AnimatePresence>
        {showScratchpad && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScratchpad(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <PenTool size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-widest">Rascunho de Guerra</h3>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Ativo e Pronto</p>
                  </div>
                </div>
                <button onClick={() => setShowScratchpad(false)} className="p-3 bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <textarea 
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                placeholder="Organize sua lógica agora..."
                className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm font-medium text-zinc-300 placeholder:text-zinc-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none shadow-inner"
              />
              
              <div className="mt-8 flex items-center justify-between">
                 <button 
                  onClick={() => setScratchpadText('')}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors"
                >
                  Limpar Área
                </button>
                <button 
                  onClick={() => setShowScratchpad(false)}
                  className="px-6 py-4 bg-white text-zinc-950 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Voltar para Questão
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-950 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-zinc-950 tracking-tighter">Simulado Ativo</h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1 italic tracking-widest">Ambiente de Alta Performance</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status de Carga</span>
            <div className="w-48 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentIdx + 1) / mockQuestions.length * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Timebox</span>
            <div className={`flex items-center gap-2 font-mono text-xl font-black ${timeLeft < 900 ? 'text-rose-500 animate-pulse' : 'text-zinc-950'}`}>
              <Clock size={18} />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-hidden">
        {/* LEFT: QUESTION CONTENT */}
        <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 shadow-2xl relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Questão {currentQuestion.id}</span>
                    <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">TRI Hard Mode</span>
                  </div>
                  <div className="text-lg font-medium text-zinc-100 leading-relaxed tracking-tight prose prose-invert max-w-none">
                    {renderTextWithMath(currentQuestion.enunciado)}
                  </div>
                </div>

                {/* IA TIP */}
                <div className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden">
                  <button 
                    onClick={() => setShowTip(!showTip)}
                    className="w-full flex items-center justify-between p-6 hover:bg-zinc-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Brain size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-zinc-950 tracking-tight">Cérebro do Professor Next</h4>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">Análise Cognitiva Iniciada</p>
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
                        className="bg-zinc-100/50 border-t border-zinc-200 px-8 py-8"
                      >
                        <p className="text-sm font-medium text-zinc-700 leading-relaxed italic">
                          {renderTextWithMath(currentQuestion.dica)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  {currentQuestion.alternativas.map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => handleSelect(alt.id)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-start gap-4 ${
                        answers[currentQuestion.id] === alt.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20'
                          : 'bg-white border-zinc-100 hover:border-zinc-200 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all shrink-0 ${
                        answers[currentQuestion.id] === alt.id
                          ? 'bg-white text-blue-600 shadow-inner'
                          : 'bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:text-blue-600'
                      }`}>
                        {alt.id}
                      </div>
                      <span className={`text-sm font-bold tracking-tight mt-2 flex-1 ${
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

          {/* BARRA INFERIOR DE COMANDOS */}
          <div className="mt-auto py-6 border-t border-zinc-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 transition-all disabled:opacity-20"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              {/* 🎯 BOTÃO DE RASCUNHO EXIGIDO PELO USUÁRIO */}
              <button 
                id="btn-rascunho-guerra"
                onClick={() => setShowScratchpad(true)}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all z-10"
              >
                <PenTool size={16} /> 📝 Rascunho de Guerra
              </button>

              <button 
                onClick={() => setCurrentIdx(Math.min(mockQuestions.length - 1, currentIdx + 1))}
                disabled={currentIdx === mockQuestions.length - 1}
                className="flex items-center gap-2 px-8 py-4 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl transition-all disabled:opacity-20"
              >
                Próxima <ChevronRight size={16} />
              </button>
            </div>
            
            <button className="p-4 text-zinc-300 hover:text-rose-500 transition-colors">
              <Flag size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT: MAPA DE NAVEGAÇÃO */}
        <div className="lg:col-span-4 h-full flex flex-col pt-2 pb-6">
          <div className="bg-zinc-50 border border-zinc-100 rounded-[2.5rem] p-8 flex flex-col h-full shadow-inner">
            <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-8 flex items-center justify-between">
              Painel de Questões
              <span className="text-[10px] text-zinc-400 font-bold">Total: 45</span>
            </h3>

            <div className="grid grid-cols-5 gap-3 h-fit overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: 45 }).map((_, i) => {
                const qNum = i + 1;
                const isCurrent = qNum === currentIdx + 1;
                const isAnswered = answers[qNum] !== undefined;

                return (
                  <button
                    key={i}
                    onClick={() => {
                        if (i < mockQuestions.length) setCurrentIdx(i);
                    }}
                    className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                      isCurrent 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-110 z-10' 
                        : isAnswered 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-white border border-zinc-200 text-zinc-400 hover:border-zinc-950 hover:text-zinc-950'
                    }`}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-200/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Resolvidas</span>
                <span className="text-sm font-black text-zinc-950">{Object.keys(answers).length}</span>
              </div>
              <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${(Object.keys(answers).length / 45) * 100}%` }} />
              </div>
            </div>

            <button 
              className="mt-12 w-full py-5 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-zinc-800 transition-all active:scale-95"
              onClick={() => {
                if (window.confirm('Confirmar entrega do simulado?')) setIsFinished(true);
              }}
            >
              Finalizar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
