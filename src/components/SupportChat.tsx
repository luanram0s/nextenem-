import React, { useState } from 'react';
import { Send, User, MessageCircle, HelpCircle, ChevronRight, Search } from 'lucide-react';

const faq = [
  { q: "Como funciona a nota TRI?", a: "A Teoria de Resposta ao Item avalia o nível de dificuldade de cada questão..." },
  { q: "Posso refazer os simulados?", a: "Sim, você pode refazer qualquer simulado após 7 dias da primeira tentativa." },
  { q: "Como entrar em contato com um mentor?", a: "Mentores estão disponíveis via chat das 08h às 22h." }
];

export default function SupportChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Como posso ajudar na sua jornada rumo à aprovação hoje?", sender: 'ai', time: '10:00' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' }) }]);
    setInput('');
    
    // Simple echo/bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Entendi! Vou encaminhar sua dúvida para um de nossos mentores especialistas. Eles responderão em breve.", 
        sender: 'ai', 
        time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' }) 
      }]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* CHAT AREA */}
      <div className="lg:col-span-8 flex flex-col bg-zinc-50 rounded-[3rem] border border-zinc-100 overflow-hidden h-[700px]">
        <div className="p-8 bg-white border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <MessageCircle size={22} />
            </div>
            <div>
              <h3 className="font-black text-zinc-950 tracking-tight">Suporte Next Enem</h3>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Operacional Agora
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-5 rounded-[2rem] text-sm font-medium shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-zinc-900 text-white rounded-tr-none' 
                  : 'bg-white text-zinc-600 rounded-tl-none border border-zinc-100'
              }`}>
                {msg.text}
                <p className={`text-[9px] mt-2 font-black uppercase tracking-widest ${msg.sender === 'user' ? 'text-white/40' : 'text-zinc-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white border-t border-zinc-100">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida aqui..."
              className="w-full p-6 pr-20 bg-zinc-50 border-none rounded-[2rem] text-sm font-bold placeholder:text-zinc-300 focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <button 
              type="submit"
              className="absolute right-2 p-4 bg-blue-600 text-white rounded-[1.5rem] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* FAQ SIDEBAR */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white p-8 rounded-[3rem] border-2 border-zinc-50 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={20} className="text-blue-600" />
            <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs">Dúvidas Frequentes</h3>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group border-b border-zinc-100 pb-4 last:border-0 hover:border-blue-100 transition-colors">
                <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-sm text-zinc-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.q}
                  <ChevronRight size={14} className="group-open:rotate-90 transition-transform text-zinc-300" />
                </summary>
                <p className="mt-3 text-xs text-zinc-500 leading-relaxed font-medium">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-zinc-50 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-100 hover:text-zinc-600 transition-all">Ver FAQ Completo</button>
        </div>

        <div className="bg-blue-600 text-white p-8 rounded-[3rem] shadow-2xl shadow-blue-600/30 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <h4 className="text-xl font-black tracking-tight mb-2">Gosta de ajudar?</h4>
          <p className="text-xs font-bold text-white/70 leading-relaxed mb-6">Torne-se um monitor embaixador e ganhe benefícios no plano anual.</p>
          <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:translate-y-[-2px] transition-all">Saiba Mais</button>
        </div>
      </div>
    </div>
  );
}
