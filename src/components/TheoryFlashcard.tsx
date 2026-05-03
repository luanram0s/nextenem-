import React from 'react';
import { Play, FileText, Share2, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { VideoSnippet } from '../types/database';

interface TheoryFlashcardProps {
  topic: string;
  discipline: string;
  summary: string;
  videos: VideoSnippet[];
}

export default function TheoryFlashcard({ topic, discipline, summary, videos }: TheoryFlashcardProps) {
  React.useEffect(() => {
    // 3.2: Context Persistence for Support Bot
    localStorage.setItem('last_topic_studied', topic);
  }, [topic]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden hover:border-blue-600/20 transition-all group shadow-xl shadow-zinc-200/40"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              {discipline}
            </span>
            <h3 className="text-2xl font-black text-zinc-950 mt-4 tracking-tighter group-hover:text-blue-600 transition-colors">
              {topic}
            </h3>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-zinc-50 text-zinc-400 hover:text-blue-600 transition-all rounded-xl border border-zinc-100">
              <Bookmark size={18} />
            </button>
            <button className="p-3 bg-zinc-50 text-zinc-400 hover:text-blue-600 transition-all rounded-xl border border-zinc-100">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
          {summary}
        </p>

        {videos.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Play size={12} className="text-blue-600" />
              Conteúdo Recomendado
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {videos.map((video) => (
                <a 
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all group/video"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 group-hover/video:scale-110 transition-all">
                      <Play size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-zinc-700 group-hover/video:text-blue-600 truncate max-w-[180px] transition-colors">
                      {video.title}
                    </span>
                  </div>
                  <FileText size={16} className="text-zinc-300 group-hover/video:text-blue-600 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-1.5 w-full bg-blue-600 opacity-10" />
    </motion.div>
  );
}
