import React, { useState } from 'react';
import { 
  Send, 
  HelpCircle, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';

const faq = [
  { q: "Como funciona a nota TRI?", a: "A Teoria de Resposta ao Item avalia o nível de dificuldade de cada questão. Acertar questões difíceis e errar fáceis pode baixar sua nota por inconsistência, enquanto um padrão coerente valoriza sua pontuação." },
  { q: "Os simulados são baseados em provas reais?", a: "Sim, todos os nossos simulados utilizam questões de anos anteriores do ENEM ou questões inéditas desenvolvidas por especialistas seguindo rigorosamente a Matriz de Referência do INEP." },
  { q: "Como cancelar minha assinatura?", a: "Você pode gerenciar sua assinatura diretamente no painel 'Meu Perfil' > 'Plano & Cobrança'. O cancelamento é imediato e você mantém o acesso até o fim do período já pago." },
  { q: "Tenho direito a monitoria individual?", a: "Assinantes do plano Premium têm acesso a sessões coletivas de tirar dúvidas e suporte via chat prioritário com nossos mentores pedagógicos." }
];

export default function SupportChat() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-black text-zinc-950 tracking-tighter mb-2">Suporte & Ajuda</h1>
        <p className="text-zinc-500 font-medium tracking-tight">Estamos aqui para garantir sua aprovação. Escolha o melhor canal para você.</p>
      </header>

      {/* QUICK SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="https://wa.me/5511999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform mb-6">
            <Phone size={32} />
          </div>
          <h3 className="text-xl font-black text-zinc-950 tracking-tight mb-2">WhatsApp</h3>
          <p className="text-xs text-zinc-500 font-medium mb-6">Fale com um consultor em tempo real para dúvidas urgentes.</p>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full uppercase tracking-widest">Abrir Conversa</span>
        </a>

        <a 
          href="mailto:suporte@nextenem.com" 
          className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform mb-6">
            <Mail size={32} />
          </div>
          <h3 className="text-xl font-black text-zinc-950 tracking-tight mb-2">E-mail</h3>
          <p className="text-xs text-zinc-500 font-medium mb-6">Envie sugestões ou problemas técnicos detalhados.</p>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest">suporte@nextenem.com</span>
        </a>

        <button 
          onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white p-8 rounded-2xl border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all group flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform mb-6">
            <HelpCircle size={32} />
          </div>
          <h3 className="text-xl font-black text-zinc-950 tracking-tight mb-2">Central de FAQ</h3>
          <p className="text-xs text-zinc-500 font-medium mb-6">Encontres respostas rápidas para as perguntas mais comuns.</p>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest">Acessar Banco de Dados</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CONTACT FORM */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-10 rounded-2xl border border-zinc-100 shadow-sm space-y-8 h-fit">
          <div className="flex items-center gap-3">
             <MessageSquare size={20} className="text-blue-600" />
             <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs">Mensagem Direta</h3>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Assunto do Contato</label>
              <select className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all">
                <option>Problemas Técnicos</option>
                <option>Dúvidas Pedagógicas</option>
                <option>Sugestões de Conteúdo</option>
                <option>Financeiro / Assinatura</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sua Mensagem</label>
              <textarea 
                required
                placeholder="Descreva o que está acontecendo..."
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-sm font-bold min-h-[150px] resize-none focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
            </div>

            <button 
              disabled={formStatus !== 'idle'}
              className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                formStatus === 'sent' 
                  ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                  : 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {formStatus === 'idle' && <><Send size={18} /> Enviar Mensagem</>}
              {formStatus === 'sending' && <span className="animate-pulse">Enviando...</span>}
              {formStatus === 'sent' && <>Mensagem Enviada!</>}
            </button>
          </form>
        </div>

        {/* ACCORDION FAQ */}
        <div id="faq-section" className="lg:col-span-12 xl:col-span-7 bg-white p-10 rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/40 space-y-8">
          <div className="flex items-center gap-3">
             <HelpCircle size={20} className="text-blue-600" />
             <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs">Perguntas Frequentes</h3>
          </div>
 
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div 
                key={i} 
                className="bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden hover:border-blue-600/20 transition-all"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-bold text-zinc-950 tracking-tight group-hover:text-blue-600 transition-colors">{item.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-zinc-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-600' : ''}`} 
                  />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-40 p-6 pt-0 border-t border-zinc-100' : 'max-h-0'
                }`}>
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed px-6 pb-6">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-8 mt-8 border-t border-zinc-50">
             <div className="flex items-center gap-6 text-zinc-400">
               <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Atendimento Seg - Sex</span>
               </div>
               <span className="text-xs font-black text-zinc-950">08:00 — 22:00</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

