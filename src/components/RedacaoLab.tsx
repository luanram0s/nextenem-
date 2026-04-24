import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  Send, 
  Info, 
  ChevronLeft, 
  Layout, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';

export default function RedacaoLab() {
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const lineCount = text.split('\n').length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-950 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-zinc-950 tracking-tighter">Laboratório de Redação</h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Simulação Real • Correção instantânea IA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Tempo Restante</span>
            <div className={`flex items-center gap-2 font-mono text-xl font-black ${timeLeft < 600 ? 'text-rose-500 animate-pulse' : 'text-zinc-950'}`}>
              <Clock size={18} />
              {formatTime(timeLeft)}
            </div>
          </div>
          <button 
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="px-6 py-3 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            {isTimerRunning ? 'Pausar' : 'Retomar'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0 overflow-hidden">
        {/* LEFT: PROPOSAL */}
        <div className="lg:col-span-5 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
            <div className="flex items-center gap-3 text-white">
              <FileText size={18} className="text-blue-500" />
              <span className="text-xs font-black uppercase tracking-widest">Texto de Apoio & Proposta</span>
            </div>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Info size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
            <div className="space-y-4">
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">Tema da Semana</span>
              <h2 className="text-3xl font-black text-white tracking-tighter leading-none">
                Caminhos para combater a intolerância religiosa no Brasil.
              </h2>
            </div>

            <div className="space-y-6 text-zinc-400 text-sm font-medium leading-relaxed">
              <div className="p-6 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <p className="italic mb-4">"A liberdade de crença é um direito fundamental garantido pela Constituição de 1988, porém, dados do Ministério dos Direitos Humanos apontam um crescimento de 45% nas denúncias de intolerância..."</p>
                <cite className="text-[10px] font-black uppercase tracking-widest text-zinc-600">— Fonte: G1 Notícias (Adaptado)</cite>
              </div>
              
              <p>Com base nos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema proposto.</p>
              
              <div className="space-y-4">
                <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <Layout size={14} className="text-blue-500" /> Instruções de Prova
                </h4>
                <ul className="space-y-2 list-disc list-inside text-xs">
                  <li>Seu texto deve ter entre 7 e 30 linhas.</li>
                  <li>Evite cópias literais dos textos motivadores.</li>
                  <li>Utilize uma proposta de intervenção completa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITOR */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative">
          <div className="flex-1 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-center px-8">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <span className={lineCount > 30 ? 'text-rose-500' : 'text-zinc-400'}>{lineCount} Linhas</span>
                  <span>/</span>
                  <span>30 Máx</span>
                </div>
                <div className="w-px h-4 bg-zinc-800" />
                <div className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {wordCount} Palavras
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>

            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite sua redação aqui respeitando a estrutura formal..."
              className="flex-1 bg-transparent p-10 text-zinc-300 font-serif text-lg leading-[2rem] resize-none focus:outline-none placeholder:text-zinc-700 custom-scrollbar"
              style={{
                backgroundImage: 'linear-gradient(transparent, transparent 31px, rgba(255,255,255,0.03) 31px)',
                backgroundSize: '100% 32px'
              }}
            />

            <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-5 pointer-events-none">
               <FileText size={400} strokeWidth={1} className="text-white" />
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-zinc-400">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles size={14} className="text-blue-500" />
                  Salvo automaticamente
               </div>
            </div>
            
            <button className="group relative flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:scale-[1.05] active:scale-95 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Send size={18} />
              Enviar para Correção IA
            </button>
          </div>

          <div className="absolute -bottom-12 left-0 right-0 p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-center gap-3">
            <MessageSquare size={16} className="text-blue-500" />
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none">A Lara analisará seu texto em menos de 10 segundos após o envio.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
