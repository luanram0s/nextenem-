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
            <h1 className="text-2xl font-black text-black tracking-tighter">Laboratório de Redação</h1>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mt-1 opacity-60">Simulação Real • Correção instantânea IA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-black uppercase tracking-widest mb-1 opacity-60">Tempo Restante</span>
            <div className={`flex items-center gap-2 font-mono text-xl font-black ${timeLeft < 600 ? 'text-rose-500 animate-pulse' : 'text-black'}`}>
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
        <div className="lg:col-span-5 bg-zinc-50 rounded-[2.5rem] border border-zinc-200 flex flex-col overflow-hidden shadow-inner">
          <div className="p-12 border-b border-zinc-200 flex items-center justify-between bg-white/50">
            <div className="flex items-center gap-4 text-black">
              <FileText size={20} className="text-blue-600" />
              <span className="text-xs font-black uppercase tracking-widest">Texto de Apoio & Proposta</span>
            </div>
            <button className="text-zinc-400 hover:text-blue-600 transition-colors">
              <Info size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar-light">
            <div className="space-y-6">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]">Tema da Semana</span>
              <h2 className="text-4xl font-black text-black tracking-tighter leading-[1.1]">
                Caminhos para combater a intolerância religiosa no Brasil.
              </h2>
            </div>

            <div className="space-y-8 text-black text-sm font-medium leading-relaxed opacity-70">
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600/20 rounded-l-3xl" />
                <p className="italic mb-6 text-black opacity-80">"A liberdade de crença é um direito fundamental garantido pela Constituição de 1988, porém, dados do Ministério dos Direitos Humanos apontam um crescimento de 45% nas denúncias de intolerância..."</p>
                <cite className="text-[10px] font-black uppercase tracking-widest text-black opacity-40">— Fonte: G1 Notícias (Adaptado)</cite>
              </div>
              
              <p>Com base nos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema proposto.</p>
              
              <div className="space-y-6">
                <h4 className="text-black font-black text-xs uppercase tracking-widest flex items-center gap-3">
                  <Layout size={16} className="text-blue-600" /> Instruções de Prova
                </h4>
                <ul className="space-y-3 list-disc list-inside text-xs font-bold text-black opacity-40">
                  <li>Seu texto deve ter entre 7 e 30 linhas.</li>
                  <li>Evite cópias literais dos textos motivadores.</li>
                  <li>Utilize uma proposta de intervenção completa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITOR */}
        <div className="lg:col-span-7 flex flex-col gap-8 relative">
          <div className="flex-1 bg-white rounded-[2.5rem] border border-zinc-100 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="p-6 border-b border-zinc-50 flex justify-between items-center px-10 bg-zinc-50/30">
              <div className="flex items-center gap-6">
                <div className="flex gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
                  <span className={lineCount > 30 ? 'text-red-500' : 'text-zinc-400'}>{lineCount} Linhas</span>
                  <span className="text-zinc-200">/</span>
                  <span className="text-zinc-400">30 Máx</span>
                </div>
                <div className="w-px h-5 bg-zinc-100" />
                <div className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {wordCount} Palavras
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 opacity-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
                </div>
              </div>
            </div>

            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite sua redação aqui respeitando a estrutura formal..."
              className="flex-1 bg-transparent p-12 text-black font-serif text-xl leading-[2.5rem] resize-none focus:outline-none placeholder:text-zinc-200 custom-scrollbar-light"
              style={{
                backgroundImage: 'linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.02) 39px)',
                backgroundSize: '100% 40px'
              }}
            />

            <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.02] pointer-events-none text-black">
               <FileText size={400} strokeWidth={1} />
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

          <div className="absolute -bottom-14 left-0 right-0 p-5 border border-blue-100 bg-blue-50/50 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <MessageSquare size={18} />
            </div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-normal">
              O Suporte de Elite (Lara AI) analisará seu texto instantaneamente após o envio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
