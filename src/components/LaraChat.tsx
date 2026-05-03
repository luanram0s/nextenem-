import React, { useState, useEffect, useRef } from 'react';
import { X, Send, LifeBuoy, MessageSquare, User, Sparkles } from 'lucide-react';
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
      text: 'Olá! Sou o Atlas, seu suporte de elite. Como posso ajudar em seus estudos hoje?',
      isLara: true,
      timestamp: new Date()
    }
  ]);
  
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const user = JSON.parse(localStorage.getItem('next_enem_user') || '{"id": "test", "name": "Aluno"}');
  const lastTopic = localStorage.getItem('last_topic_studied') || 'Geral';

  useEffect(() => {
    checkNotifications();
    const interval = setInterval(checkNotifications, 30000);
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
      const context = {
        topic: lastTopic,
        performance: 'Nível Master',
        question: 'Questão em foco'
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
    } catch (e: any) {
      console.error('Support AI Error:', e);
      const isRateLimit = e?.status === 429 || e?.message?.includes('429') || e?.message?.includes('RESOURCE_EXHAUSTED');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: isRateLimit 
          ? 'Estamos recebendo muitas solicitações no momento devido ao alto volume de alunos. Aguarde um minuto e tente novamente, ou abra um ticket se for urgente.'
          : 'Desculpe, tive um problema técnico temporário. Pode tentar reformular sua dúvida?',
        isLara: true,
        timestamp: new Date(),
        isTicketOption: true
      };
      setMessages(prev => [...prev, errorMessage]);
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
        message: messages[messages.length - 2].text,
        priority: 'medium'
      });

      if (ticket) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: 'Ticket aberto com sucesso. Nossa equipe pedagógica analisará sua dúvida e responderá em breve.',
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header - Total Clean Blue Style */}
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Suporte Next Enem</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm" />
                    <span className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider">Atendimento Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages - Pure White Background */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[400px] min-h-[350px] bg-white scroll-smooth custom-scrollbar-light"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div 
                    className={cn(
                      "max-w-[85%] p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm border",
                      msg.isLara 
                        ? "bg-zinc-100 text-black rounded-tl-none border-zinc-200" 
                        : "bg-blue-50 text-black ml-auto rounded-tr-none border-blue-100"
                    )}
                  >
                    {msg.text}
                  </div>
                  
                  {msg.isTicketOption && (
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleOpenTicket}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-[11px] font-bold shadow-md hover:bg-blue-700 transition-all ml-4"
                    >
                      <LifeBuoy size={14} /> Falar com Especialista
                    </motion.button>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-1.5 p-3 bg-zinc-50 border border-zinc-100 rounded-xl w-14 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                </div>
              )}
            </div>

            {/* Input - Clean Form Style */}
            <div className="p-4 border-t border-zinc-100 bg-white">
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 p-1.5 pl-4 rounded-full focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-600 transition-all">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Olá! Como podemos ajudar hoje?"
                  className="bg-transparent flex-1 text-sm outline-none font-medium text-black placeholder:text-zinc-400 py-2"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  <Send size={16} />
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
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 relative group border-2 border-white",
          isOpen ? "bg-white text-zinc-600 border-zinc-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
        )}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageSquare size={28} className="text-white" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-[10px] font-black shadow-md"
                >
                  {unreadCount}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </button>
    </div>
  );
}
