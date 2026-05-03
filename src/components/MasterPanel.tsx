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
    <div className="min-h-screen bg-white text-zinc-950 p-8 lg:p-12 space-y-12 pb-32 relative">
      {/* TICKET DRAWER */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white border-l border-zinc-100 z-50 p-10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">{selectedTicket.student}</h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      selectedTicket.plan === 'Master' ? 'text-purple-600' : 
                      selectedTicket.plan === 'Elite' ? 'text-blue-600' : 'text-zinc-500'
                    }`}>Plano {selectedTicket.plan}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-950 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Histórico de Mensagens</span>
                  <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 font-medium text-zinc-800 leading-relaxed shadow-sm">
                    <p className="text-sm">
                      "{selectedTicket.message}"
                    </p>
                    <span className="text-[9px] font-black text-zinc-400 block mt-4 uppercase">Enviado em {new Date(selectedTicket.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-zinc-100">
                <div className="relative">
                  <textarea 
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Escreva sua resposta técnica aqui..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 min-h-[150px] focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all resize-none shadow-inner"
                  />
                  <button 
                    onClick={handleResponseSubmit}
                    disabled={isProcessing}
                    className="absolute bottom-4 right-4 p-4 bg-blue-600 text-white rounded-xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all"
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
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 font-black text-[10px] uppercase tracking-widest transition-all duration-300 mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
        </button>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black text-zinc-950 tracking-tighter mb-3">Painel Master</h1>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              <p className="text-zinc-500 font-medium tracking-tight uppercase text-[10px] tracking-widest">Cérebro Operacional: <span className="text-emerald-600 font-black ml-1">Sistema Ativo</span></p>
            </div>
          </div>
          
          <div className="flex bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
            {[
              { id: 'operacional', label: 'Suporte', icon: MessageSquare },
              { id: 'estudantes', label: 'Estudantes', icon: Users },
              { id: 'ia', label: 'Cérebro IA', icon: Brain },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-400 ${
                  activeTab === tab.id ? 'bg-white text-blue-600 shadow-md ring-1 ring-zinc-200' : 'text-zinc-400 hover:text-zinc-600'
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
            {/* PROOF UPLOAD */}
            <div className="bg-white border border-zinc-100 rounded-[3rem] p-10 relative overflow-hidden shadow-xl shadow-zinc-200/40">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
               
               <header className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                     <FileUp size={24} />
                   </div>
                   <div>
                     <h2 className="text-xl font-black text-zinc-950 uppercase italic tracking-tighter">Estação de Alimentação Global</h2>
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Extração de Questões Oficiais (AI Parser)</p>
                   </div>
                 </div>
                 {uploadStatus === 'reviewing' && (
                   <button 
                     onClick={() => { setUploadStatus('idle'); setExtractedQuestions([]); }}
                     className="text-[10px] font-black text-zinc-400 uppercase hover:text-red-500 transition-colors"
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
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl p-8 text-sm font-medium text-zinc-700 min-h-[250px] focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all resize-none shadow-inner"
                        />
                        <button 
                          onClick={handleProcessProof}
                          disabled={isProcessing || !proofText}
                          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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
                           <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                             <CheckCircle size={16} /> Questões Extradas ({extractedQuestions.length})
                           </h3>
                           <button 
                             onClick={handleSaveToGlobalLibrary}
                             disabled={isProcessing}
                             className="px-8 py-3 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl"
                           >
                             {isProcessing ? 'Alimentando Banco...' : 'Persistir na Biblioteca Global'}
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar-light">
                           {extractedQuestions.map((q, i) => (
                             <div key={i} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 relative group transition-all hover:bg-white hover:shadow-lg">
                                <div className="absolute top-0 right-0 p-3 bg-blue-600/10 text-blue-600 text-[8px] font-black uppercase rounded-bl-xl">
                                  C{q.competency}H{q.hability}
                                </div>
                                <span className="text-[10px] font-black text-zinc-400 block mb-2">{q.enem_id}</span>
                                <p className="text-xs font-bold text-zinc-800 leading-relaxed line-clamp-3 mb-4 italic">
                                  "{q.enunciado}"
                                </p>
                                <div className="flex gap-2">
                                  <span className="text-[8px] font-black px-2 py-1 bg-white border border-zinc-200 text-zinc-400 rounded uppercase">Gabarito: {q.correct_label}</span>
                                  <span className="text-[8px] font-black px-2 py-1 bg-white border border-zinc-200 text-zinc-400 rounded uppercase">{q.area}</span>
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
                { label: 'Tickets Pendentes', value: '24', trend: '+5%', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
                { label: 'T. Médio Resposta', value: '18m', trend: '-12%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Zap },
                { label: 'Alunos Master', value: '452', trend: '+8%', color: 'text-blue-600', bg: 'bg-blue-50', icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40">
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon size={28} />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400">{stat.trend}</span>
                  </div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black text-zinc-950">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* TICKETS TABLE */}
            <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden">
              <div className="p-10 border-b border-zinc-100 bg-zinc-50/50">
                <h3 className="text-2xl font-black text-zinc-950 tracking-tight">Chamados de Suporte</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Gestão de filas e atendimento</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                  <thead>
                    <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                      <th className="py-6 px-10">Aluno / Plano</th>
                      <th className="py-6 px-6">Assunto</th>
                      <th className="py-6 px-6 text-center">Status</th>
                      <th className="py-6 px-10 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {ticketsList.map((ticket) => (
                      <tr key={ticket.id} className="group hover:bg-zinc-50 transition-all cursor-pointer" onClick={() => setSelectedTicket(ticket)}>
                        <td className="py-8 px-10">
                          <div>
                            <p className="text-sm font-black text-zinc-950 mb-1">{ticket.student_name}</p>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                              ticket.plan === 'Master' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 
                              ticket.plan === 'Elite' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                              'bg-zinc-100 text-zinc-500 border border-zinc-200'
                            }`}>
                              {ticket.plan}
                            </span>
                          </div>
                        </td>
                        <td className="py-8 px-6">
                          <p className="text-xs font-bold text-zinc-600">{ticket.subject}</p>
                        </td>
                        <td className="py-8 px-6 text-center">
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                            ticket.status === 'Resolvido' ? 'bg-emerald-50 text-emerald-600' : 
                            ticket.status === 'Em Atendimento' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-8 px-10 text-right">
                          <button className="p-3 bg-zinc-100 text-zinc-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
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
          <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden">
            <div className="p-10 border-b border-zinc-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-zinc-50/50">
              <div>
                <h3 className="text-2xl font-black text-zinc-950 tracking-tight">Gestão de Estudantes</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1 tracking-[0.1em]">Usuários ativos e métricas de retenção</p>
              </div>
              <div className="relative">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por nome ou e-mail..." 
                  className="pl-14 pr-8 py-5 bg-white border border-zinc-200 rounded-2xl text-xs font-bold text-zinc-950 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-[350px] transition-all outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                    <th className="py-6 px-10">Estudante</th>
                    <th className="py-6 px-6 text-center">Progresso</th>
                    <th className="py-6 px-6 text-center">Status</th>
                    <th className="py-6 px-10 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {studentsList.map((student) => (
                    <tr key={student.id} className="group hover:bg-zinc-50 transition-all duration-300">
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-blue-600 text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {student.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-zinc-950 tracking-tight">{student.name}</p>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-6">
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-32 h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                              style={{ width: `${student.progress}%` }} 
                            />
                          </div>
                          <span className="text-[10px] font-black text-zinc-950">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-8 px-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          student.status === 'Ativo' 
                            ? 'text-emerald-600 border-emerald-100 bg-emerald-50' 
                            : 'text-zinc-500 border-zinc-200 bg-zinc-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                          {student.status}
                        </span>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 bg-zinc-100 text-zinc-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-3 bg-zinc-100 text-zinc-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
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
            <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-xl space-y-10">
              <div>
                <h3 className="text-2xl font-black text-zinc-950 tracking-tight mb-2">Cérebro Central IA</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Afinamento de comportamento do Atlas</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Brain size={12} className="text-blue-600" /> System Prompt Geral
                  </label>
                  <textarea 
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-sm font-medium text-zinc-700 min-h-[300px] focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all resize-none shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-4">Professor Next (Personalidade)</span>
                    <select className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-950 outline-none focus:ring-1 focus:ring-blue-600">
                      <option>Socrático / Analítico</option>
                      <option>Motivacional / Enérgico</option>
                      <option>Direto / Pragmático</option>
                    </select>
                  </div>
                  <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-4">Corretor de Redação (Rigor)</span>
                    <select className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-950 outline-none focus:ring-1 focus:ring-blue-600">
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
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Sincronizando Cérebro IA...' : 'Salvar Alterações Globais'}
              </button>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-xl">
                <h3 className="font-black text-zinc-950 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-600" /> Lab de Redação
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Tema da Semana</label>
                    <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-bold text-zinc-950" defaultValue="Impactos da IA na Educação Brasileira" />
                  </div>
                </div>
                <button className="w-full mt-8 py-4 bg-zinc-100 text-zinc-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all">Publicar Tema</button>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-xl shadow-blue-600/20 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-1000 text-white">
                  <Zap size={120} />
                </div>
                <h4 className="text-xl font-black text-white italic tracking-tight mb-2">Modo Crise</h4>
                <p className="text-xs font-bold text-white/70 leading-relaxed mb-6">Ative para desabilitar o chat e IA globalmente em caso de instabilidade crítica.</p>
                <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Ativar Protocolo Crise</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

