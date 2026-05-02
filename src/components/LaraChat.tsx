import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, BrainCircuit, Sparkles, MessageSquare, LifeBuoy, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { aiService } from '../services/aiService';
import { cacheService } from '../services/cacheService';

interface Message {
  id: string;
  text: string;
  isLara: boolean;
  timestamp: Date;
  isTicketOption?: boolean;
}

export default function LaraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Saudações! Sou o Atlas, sua IA de suporte tático. Como posso otimizar seus estudos hoje?',
      isLara: true,
      timestamp: new Date()
    }
  ]);
  
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 3.2: Get User Context for better TRI logic and Support
  const user = JSON.parse(localStorage.getItem('next_enem_user') || '{"id": "test", "name": "Aluno"}');
  const lastTopic = localStorage.getItem('last_topic_studied') || 'Geral';

  useEffect(() => {
    checkNotifications();
    const interval = setInterval(checkNotifications, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const checkNotifications = async () => {
    if (user?.id) {
      const count = await cacheService.getUnreadResponsesCount(user.id);
      setUnreadCount(count);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const query = input;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: query,
      isLara: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 3.2: AI Triage logic
      const context = {
        topic: lastTopic,
        performance: 'Nível Master', // Prototype mock
        question: 'Questão de Eletrodinâmica Enem 2023'
      };

      const aiResponse = await aiService.getSupportResponse(query, context);
      
      const laraMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isLara: true,
        timestamp: new Date(),
        isTicketOption: aiResponse.toLowerCase().includes('ticket')
      };
      
      setMessages(prev => [...prev, laraMsg]);
    } catch (e) {
      console.error('Support AI Error:', e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpenTicket = async () => {
    setIsTyping(true);
    
    try {
      const ticket = await cacheService.createTicket({
        user_id: user.id || 'anonymous',
        student_name: user.name || 'Estudante',
        plan: localStorage.getItem('next_enem_plan') || 'Premium',
        subject: `Dúvida sobre: ${lastTopic}`,
        message: messages[messages.length - 2].text, // The last user message
        priority: 'medium'
      });

      if (ticket) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: 'Entendido. Abri um ticket prioritário para nosso time pedagógico. Você será notificado assim que um consultor responder.',
          isLara: true,
          timestamp: new Date()
        }]);
      }
    } catch (e) {
      alert('Erro ao abrir ticket. Tente novamente.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] transition-all duration-300">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[420px] max-w-[calc(100vw-2rem)] bg-zinc-950 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800 overflow-hidden flex flex-col"
          >
            {/* Header - Cyber Master Style */}
            <div className="bg-zinc-900 p-6 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <BrainCircuit size={24} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                    Suporte Elite Atlas <Sparkles size={12} className="text-amber-500" />
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Protocolo Master Ativo</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[450px] min-h-[350px] scroll-smooth custom-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <div 
                    className={cn(
                      "max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed relative group",
                      msg.isLara 
                        ? "bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800" 
                        : "bg-cyan-500 text-zinc-950 ml-auto rounded-tr-none font-black italic shadow-lg shadow-cyan-500/10"
                    )}
                  >
                    {msg.text}
                    {msg.isLara && (
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-zinc-900 border-l border-t border-zinc-800 rotate-[-45deg] -z-10" />
                    )}
                  </div>
                  
                  {msg.isTicketOption && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleOpenTicket}
                      className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all ml-4"
                    >
                      <LifeBuoy size={14} /> Falar com Especialista Humano
                    </motion.button>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 w-20">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-900/20">
              <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-2 pl-6 rounded-2xl focus-within:border-cyan-500/50 transition-all shadow-inner">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Dúvida técnica ou pedagógica..."
                  className="bg-transparent flex-1 text-sm outline-none font-medium text-zinc-300 placeholder:text-zinc-700 py-3"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="w-12 h-12 bg-cyan-500 text-zinc-950 rounded-xl flex items-center justify-center hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/20 active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) checkNotifications();
        }}
        className={cn(
          "w-18 h-18 rounded-3xl shadow-2xl flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 relative overflow-hidden group",
          isOpen ? "bg-zinc-900 ring-2 ring-zinc-800" : "bg-cyan-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        )}
      >
        {isOpen ? <X size={32} className="text-zinc-400" /> : (
          <div className="relative">
            <MessageSquare size={32} className="text-zinc-950" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 -right-4 bg-rose-500 text-white w-7 h-7 rounded-full flex items-center justify-center border-4 border-zinc-950 text-[10px] font-black"
                >
                  {unreadCount}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Hover light effect */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
