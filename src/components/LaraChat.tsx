import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, BrainCircuit, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  text: string;
  isLara: boolean;
  timestamp: Date;
}

export default function LaraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá, sou a LARA! Estou aqui para otimizar sua trilha rumo à aprovação. Em que posso te ajudar hoje?',
      isLara: true,
      timestamp: new Date()
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      isLara: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate LARA response
    setTimeout(() => {
      const laraResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getLaraAdvice(input),
        isLara: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, laraResponse]);
    }, 1000);
  };

  const getLaraAdvice = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('estudar') || q.includes('foco')) {
      return 'Baseado na sua incidência de erros, recomendo focar em Geometria Espacial e Estequiometria. São temas frequentes e de alto impacto no TRI.';
    }
    if (q.includes('redação') || q.includes('tema')) {
      return 'O tema quente para esta semana é "Impactos da Inteligência Artificial na Educação do Século XXI". Que tal começar um rascunho agora?';
    }
    return 'Lembre-se: no ENEM, a consistência vale mais que a complexidade. Continue firme na sua trilha!';
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-next-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Suporte LARA</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inteligência Ativa</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[400px] scroll-smooth"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.isLara 
                      ? "bg-slate-50 text-slate-700 rounded-tl-none font-medium" 
                      : "bg-next-blue text-white ml-auto rounded-tr-none font-bold"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-50">
              <div className="flex items-center gap-2 bg-slate-50 p-2 pl-4 rounded-xl">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pergunte à LARA..."
                  className="bg-transparent flex-1 text-sm outline-none font-medium text-slate-700"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-next-blue text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 group",
          isOpen ? "bg-slate-900 rotate-90" : "bg-next-blue hover:shadow-blue-200"
        )}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageCircle size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-next-blue rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
