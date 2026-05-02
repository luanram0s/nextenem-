import React, { useState, useEffect } from 'react';
import { Search, Zap, BookOpen, Layers, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cacheService } from '../services/cacheService';
import TheoryFlashcard from './TheoryFlashcard';
import { VideoSnippet } from '../types/database';

interface TopicData {
  topic: string;
  discipline: string;
  summary: string;
  videos: VideoSnippet[];
}

const RECURRING_TOPICS = [
  { topic: 'Estequiometria', discipline: 'Química' },
  { topic: 'Brasil Colônia', discipline: 'História' },
  { topic: 'Ecologia', discipline: 'Biologia' },
  { topic: 'Funções Quadráticas', discipline: 'Matemática' },
  { topic: 'Modernismo', discipline: 'Linguagens' }
];

export default function TheoryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('Todas');
  const [results, setResults] = useState<TopicData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const disciplines = ['Todas', 'Matemática', 'Ciências da Natureza', 'Humanas', 'Linguagens'];

  useEffect(() => {
    // Initial Load - Fetch high recurrence topics from cache
    loadInitialTopics();
  }, []);

  const loadInitialTopics = async () => {
    setIsLoading(true);
    const mockSummaries: Record<string, string> = {
      'Estequiometria': 'O cálculo das quantidades de reagentes e produtos envolvidos em uma reação química, fundamental para o Enem.',
      'Brasil Colônia': 'O período que vai de 1500 a 1822, marcado pela exploração, escravidão e o ciclo do ouro.',
      'Ecologia': 'Estudo das interações entre seres vivos e seu ambiente, com foco em cadeias alimentares e poluição.',
      'Funções Quadráticas': 'Análise de parábolas, raízes e o vértice (ponto de máximo ou mínimo), sempre presente no segundo dia.',
      'Modernismo': 'Movimento artístico que rompeu com o passado, focado na Semana de Arte Moderna de 1922.'
    };

    const initialResults = await Promise.all(
      RECURRING_TOPICS.map(async (t) => {
        const videos = await cacheService.getMaterialByTopic(t.discipline, t.topic);
        return {
          topic: t.topic,
          discipline: t.discipline,
          summary: mockSummaries[t.topic] || 'Conteúdo em processamento pelo cache global...',
          videos
        };
      })
    );
    setResults(initialResults);
    setIsLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setIsLoading(true);
    // 3.1: Try instant retrieval from cache
    const materials = await cacheService.getMaterialByTopic(selectedDiscipline === 'Todas' ? 'Matemática' : selectedDiscipline, searchTerm);
    
    if (materials.length > 0) {
      setResults([{
        topic: searchTerm,
        discipline: materials[0].discipline,
        summary: `Conteúdo recuperado instantaneamente do cache global para o tema ${searchTerm}.`,
        videos: materials
      }]);
    } else {
      // Fallback message if not even in cache (UI will handle this)
      setResults([{
        topic: searchTerm,
        discipline: 'Novo Tema',
        summary: 'Este tema ainda não existe na biblioteca global. Deseja solicitar a geração via IA?',
        videos: []
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Zap size={24} className="text-cyan-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Next Enem <span className="text-cyan-400">Library</span>
          </h1>
        </div>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em] mb-10">
          Cache Global: 1.2M+ Conteúdos Rápidos
        </p>

        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O que você precisa aprender hoje? (Ex: Estequiometria)"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-6 pl-16 pr-6 text-lg font-bold text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 transition-all shadow-2xl"
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-3 bg-cyan-500 text-zinc-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95"
          >
            Acessar
          </button>
        </form>

        <div className="flex gap-2 mt-6 overflow-x-auto pb-2 custom-scrollbar">
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                selectedDiscipline === d 
                ? 'bg-zinc-100 border-zinc-100 text-zinc-950' 
                : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-3">
            <BookOpen size={16} className="text-cyan-400" />
            Recorrência Garantida
          </h2>
          <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400">
            <Layers size={14} />
            CONTEÚDO INSTANTÂNEO
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Cyber Skeletal Loader
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 w-20 bg-zinc-800 rounded mb-4" />
                  <div className="h-6 w-40 bg-zinc-800 rounded mb-6" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-zinc-800 rounded" />
                    <div className="h-3 w-2/3 bg-zinc-800 rounded" />
                  </div>
                </div>
              ))
            ) : (
              results.map((result, idx) => (
                <div key={`${result.topic}-${idx}`}>
                  <TheoryFlashcard 
                    topic={result.topic}
                    discipline={result.discipline}
                    summary={result.summary}
                    videos={result.videos}
                  />
                </div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
