import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden font-sans">
      {/* Left Side: Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-20 flex-col justify-between overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-next-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BrainCircuit size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Next Enem</h1>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-white leading-tight tracking-tighter"
          >
            A Inteligência que <br /> <span className="text-next-blue">Antecipa</span> sua Prova.
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
            Plataforma adaptativa com correção via IA, simuladores TRI e trilhas de aprendizado personalizadas.
          </p>
        </div>

        <div className="relative z-10 flex gap-10">
          <div>
            <p className="text-3xl font-black text-white">82%</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Aprovação Média</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">12k+</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Alunos Ativos</p>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-next-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-next-blue/10 rounded-full blur-[150px]" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 bg-slate-50/30">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Acesse sua Trilha</h3>
            <p className="text-slate-500 mt-2 font-medium">Insira suas credenciais para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-next-blue transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-next-blue/30 focus:ring-4 focus:ring-next-blue/5 transition-all text-slate-700 font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="group space-y-1.5">
                <div className="flex justify-between items-end ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senha</label>
                  <a href="#" className="text-[10px] font-black text-next-blue uppercase tracking-widest hover:underline">Esqueci a senha</a>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-next-blue transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-next-blue/30 focus:ring-4 focus:ring-next-blue/5 transition-all text-slate-700 font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-next-blue hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300">
              <span className="bg-slate-50/30 px-4">Ou entre com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all font-bold text-slate-600 text-xs">
              <Github size={18} /> GitHub
            </button>
            <button className="h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all font-bold text-slate-600 text-xs">
              <Chrome size={18} /> Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 font-medium">
            Não tem uma conta? <a href="#" className="text-next-blue font-black hover:underline">Cadastre-se gratuitamente</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
