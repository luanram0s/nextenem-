import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ClipboardCheck, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown,
  Search, 
  MoreHorizontal, 
  ArrowLeft,
  Settings,
  Edit2,
  Trash2,
  Filter,
  Brain,
  Shield,
  Clock,
  Send,
  X,
  User,
  Zap,
  BookOpen,
  FileUp,
  Loader2,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { aiService } from '../services/aiService';
import { cacheService } from '../services/cacheService';
import { QuestionCache, StudentProfile, Ticket } from '../types/database';

export default function MasterPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'operacional' | 'estudantes' | 'ia'>('operacional');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  
  // 1.1: State for Proof Processor
  const [proofText, setProofText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'parsing' | 'reviewing' | 'saving'>('idle');

  // Real Data State
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([]);
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);
  const [systemPrompt, setSystemPrompt] = useState('Você é o Atlas, o mentor supremo do Next Enem...');

  useEffect(() => {
    loadData();
    if (activeTab === 'ia') {
      loadSystemPrompt();
    }
  }, [activeTab]);

  const loadData = async () => {
    if (activeTab === 'estudantes') {
      const data = await cacheService.getAllStudents();
      setStudentsList(data);
    } else if (activeTab === 'operacional') {
      const data = await cacheService.getTickets();
      setTicketsList(data);
    }
  };

  const loadSystemPrompt = async () => {
    const prompt = await cacheService.getAdminConfig('system_prompt');
    if (prompt) setSystemPrompt(prompt);
  };

  const handleUpdatePrompt = async () => {
    setIsProcessing(true);
    const success = await cacheService.setAdminConfig('system_prompt', systemPrompt);
    if (success) {
      alert('Configuração de IA atualizada com sucesso em toda a plataforma!');
    }
    setIsProcessing(false);
  };

  const handleResponseSubmit = async () => {
    if (!selectedTicket || !responseMessage) return;
    setIsProcessing(true);
    const success = await cacheService.respondToTicket(selectedTicket.id, responseMessage);
    if (success) {
      alert('Resposta enviada!');
      setResponseMessage('');
      setSelectedTicket(null);
      loadData();
    }
    setIsProcessing(false);
  };

  const handleProcessProof = async () => {
    if (!proofText) return;
    setUploadStatus('parsing');
    setIsProcessing(true);
    
    const questions = await aiService.extractQuestionsFromText(proofText);
    setExtractedQuestions(questions);
    setUploadStatus('reviewing');
    setIsProcessing(false);
  };

  const handleSaveToGlobalLibrary = async () => {
    setUploadStatus('saving');
    setIsProcessing(true);

    for (const q of extractedQuestions) {
      await cacheService.persistQuestion({
        enem_id: q.enem_id,
        year: parseInt(q.enem_id.split('_')[0]) || new Date().getFullYear(),
        area: q.area,
        competency: parseInt(q.competency),
        hability: parseInt(q.hability),
        enunciado: q.enunciado,
        alternativas: q.alternativas,
        is_public: true,
        reference_matrix_context: `C${q.competency}H${q.hability}`
      });
    }

    setUploadStatus('idle');
    setExtractedQuestions([]);
    setProofText('');
    setIsProcessing(false);
    alert('Biblioteca Global alimentada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 lg:p-12 space-y-12 pb-32 relative">
      {/* TICKET DRAWER */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-zinc-900 border-l border-zinc-800 z-50 p-10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-blue-500">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">{selectedTicket.student}</h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      selectedTicket.plan === 'Master' ? 'text-purple-400' : 
                      selectedTicket.plan === 'Elite' ? 'text-blue-400' : 'text-zinc-500'
                    }`}>Plano {selectedTicket.plan}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="p-3 bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Histórico de Mensagens</span>
                  <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-800">
                    <p className="text-sm font-medium text-zinc-300 leading-relaxed">
                      "{selectedTicket.message}"
                    </p>
                    <span className="text-[9px] font-black text-zinc-600 block mt-4">ENVIADO EM {new Date(selectedTicket.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-zinc-800">
                <div className="relative">
                  <textarea 
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Escreva sua resposta técnica aqui..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm font-medium text-white placeholder:text-zinc-700 min-h-[150px] focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                  />
                  <button 
                    onClick={handleResponseSubmit}
                    disabled={isProcessing}
                    className="absolute bottom-4 right-4 p-4 bg-blue-600 text-white rounded-xl shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all duration-300 mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
        </button>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-3">Painel Master</h1>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
              <p className="text-zinc-500 font-medium tracking-tight">Cérebro Operacional: <span className="text-zinc-300 font-bold uppercase text-[10px] tracking-widest ml-1">Ativo</span></p>
            </div>
          </div>
          
          <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl">
            {[
              { id: 'operacional', label: 'Suporte', icon: MessageSquare },
              { id: 'estudantes', label: 'Estudantes', icon: Users },
              { id: 'ia', label: 'Cérebro IA', icon: Brain },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-400 ${
                  activeTab === tab.id ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'operacional' && (
          <div className="space-y-12">
            {/* 1.1 & 1.2: PROOF UPLOAD & PARSING STATION */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
               
               <header className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                     <FileUp size={24} />
                   </div>
                   <div>
                     <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Estação de Alimentação Global</h2>
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Extração de Questões Oficiais (AI Parser)</p>
                   </div>
                 </div>
                 {uploadStatus === 'reviewing' && (
                   <button 
                     onClick={() => { setUploadStatus('idle'); setExtractedQuestions([]); }}
                     className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-colors"
                   >
                     Limpar Sessão
                   </button>
                 )}
               </header>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <div className="lg:col-span-12">
                    {uploadStatus === 'idle' || uploadStatus === 'parsing' ? (
                      <div className="space-y-4">
                        <textarea 
                          value={proofText}
                          onChange={(e) => setProofText(e.target.value)}
                          placeholder="Cole aqui o conteúdo textual da Prova Oficial do Enem para processamento..."
                          disabled={isProcessing}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-sm font-medium text-zinc-300 min-h-[250px] focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none shadow-inner"
                        />
                        <button 
                          onClick={handleProcessProof}
                          disabled={isProcessing || !proofText}
                          className="w-full py-5 bg-amber-500 text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <> <Loader2 size={18} className="animate-spin" /> Extraindo Matriz de Referência... </>
                          ) : (
                            <> <Zap size={18} fill="currentColor" /> Iniciar Processamento IA </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle size={16} /> Questões Extradas ({extractedQuestions.length})
                           </h3>
                           <button 
                             onClick={handleSaveToGlobalLibrary}
                             disabled={isProcessing}
                             className="px-8 py-3 bg-white text-zinc-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
                           >
                             {isProcessing ? 'Alimentando Banco...' : 'Persistir na Biblioteca Global'}
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                           {extractedQuestions.map((q, i) => (
                             <div key={i} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase">
                                  C{q.competency}H{q.hability}
                                </div>
                                <span className="text-[10px] font-black text-zinc-600 block mb-2">{q.enem_id}</span>
                                <p className="text-xs font-bold text-zinc-300 leading-relaxed truncate mb-4 italic">
                                  "{q.enunciado}"
                                </p>
                                <div className="flex gap-2">
                                  <span className="text-[8px] font-black px-2 py-1 bg-zinc-800 text-zinc-400 rounded uppercase">Gabarito: {q.correct_label}</span>
                                  <span className="text-[8px] font-black px-2 py-1 bg-zinc-800 text-zinc-400 rounded uppercase">{q.area}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                 </div>
               </div>
            </div>

            {/* OPERATIONAL METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Tickets Pendentes', value: '24', trend: '+5%', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
                { label: 'T. Médio Resposta', value: '18m', trend: '-12%', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: Zap },
                { label: 'Alunos Master', value: '452', trend: '+8%', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon size={28} />
                    </div>
                    <span className="text-[10px] font-black text-zinc-500">{stat.trend}</span>
                  </div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* TICKETS TABLE */}
            <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-zinc-800 bg-zinc-900/50">
                <h3 className="text-2xl font-black text-white tracking-tight">Chamados de Suporte</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Prioridade baseada no plano do aluno</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                  <thead>
                    <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                      <th className="py-6 px-10">Aluno / Plano</th>
                      <th className="py-6 px-6">Assunto</th>
                      <th className="py-6 px-6 text-center">Status</th>
                      <th className="py-6 px-6 text-center">Responsável</th>
                      <th className="py-6 px-10 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {ticketsList.map((ticket) => (
                      <tr key={ticket.id} className="group hover:bg-zinc-800/30 transition-all cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                        <td className="py-8 px-10">
                          <div>
                            <p className="text-sm font-black text-white mb-1">{ticket.student_name}</p>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                              ticket.plan === 'Master' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                              ticket.plan === 'Elite' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                              'bg-zinc-800 text-zinc-500 border border-zinc-700'
                            }`}>
                              {ticket.plan}
                            </span>
                          </div>
                        </td>
                        <td className="py-8 px-6">
                          <p className="text-xs font-bold text-zinc-300">{ticket.subject}</p>
                        </td>
                        <td className="py-8 px-6 text-center">
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                            ticket.status === 'Resolvido' ? 'bg-emerald-500/10 text-emerald-500' : 
                            ticket.status === 'Em Atendimento' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-8 px-6 text-center">
                          <p className="text-[10px] font-black text-zinc-500 uppercase">Consultor Next</p>
                        </td>
                        <td className="py-8 px-10 text-right">
                          <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowUpRight size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'estudantes' && (
          <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden shadow-black/50">
            <div className="p-10 border-b border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Gestão de Estudantes</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 tracking-[0.1em]">Listando usuários ativos e pendentes no sistema</p>
              </div>
              <div className="relative">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por nome, CPF ou e-mail..." 
                  className="pl-14 pr-8 py-5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-xs font-bold text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-[350px] transition-all outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-900 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <th className="py-6 px-10 font-semibold">Estudante</th>
                    <th className="py-6 px-6 font-semibold">Plano</th>
                    <th className="py-6 px-6 font-semibold text-center">Progresso</th>
                    <th className="py-6 px-6 font-semibold text-center">Status</th>
                    <th className="py-6 px-10 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {studentsList.map((student) => (
                    <tr key={student.id} className="group hover:bg-zinc-900/50 transition-all duration-300">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-black text-white text-sm border border-zinc-700 shadow-inner group-hover:border-blue-500/50 group-hover:bg-zinc-700 transition-all">
                            {student.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">{student.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                          student.plan === 'Premium' || student.plan === 'Master' || student.plan === 'Elite'
                            ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' 
                            : 'text-zinc-400 border-zinc-700 bg-zinc-800'
                        }`}>
                          {student.plan}
                        </span>
                      </td>
                      <td className="py-8 px-6">
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${student.progress}%` }} 
                            />
                          </div>
                          <span className="text-[10px] font-black text-white min-w-[35px]">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-8 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg ${
                            student.status === 'Ativo' 
                              ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' 
                              : 'text-zinc-500 border-zinc-700 bg-zinc-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                            {student.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-zinc-700 hover:text-white transition-all duration-300 shadow-sm">
                            <Settings size={16} />
                          </button>
                          <button className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ia' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* BRAIN CONFIG */}
            <div className="lg:col-span-8 bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl space-y-10">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Cérebro Central IA</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Afinamento de comportamento e regras de negócio</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Brain size={12} className="text-blue-500" /> System Prompt Geral
                  </label>
                  <textarea 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm font-medium text-zinc-300 min-h-[300px] focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                    placeholder="Instruções fundamentais para o cérebro da plataforma..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Professor Next (Personalidade)</span>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-bold text-white outline-none">
                      <option>Socrático / Analítico</option>
                      <option>Motivacional / Enérgico</option>
                      <option>Direto / Pragmático</option>
                    </select>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Corretor de Redação (Rigor)</span>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-bold text-white outline-none">
                      <option>Rigor Nível INEP</option>
                      <option>Nível Concurso Público</option>
                      <option>Didático / Flexível</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleUpdatePrompt}
                disabled={isProcessing}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Sincronizando Cérebro IA...' : 'Atualizar Instruções de IA'}
              </button>
            </div>

            {/* WEEKLY CONTENT */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
                <h3 className="font-black text-white uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-500" /> Lab de Redação
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tema da Semana</label>
                    <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-bold text-white" defaultValue="Impactos da IA na Educação Brasileira" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Textos de Apoio (IDs)</label>
                    <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-bold text-white min-h-[100px]" defaultValue="DOC_4281, DOC_3992, PDF_2210" />
                  </div>
                </div>
                <button className="w-full mt-8 py-4 bg-zinc-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-700 transition-all">Publicar Tema</button>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-1000">
                  <Zap size={120} />
                </div>
                <h4 className="text-xl font-black text-white italic tracking-tight mb-2">Modo Crise</h4>
                <p className="text-xs font-bold text-white/70 leading-relaxed mb-6">Ative para desabilitar o chat e IA globalmente em caso de instabilidade nas APIs.</p>
                <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Entrar em Modo Crise</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

