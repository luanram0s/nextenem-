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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2 py-1 rounded">
              {discipline}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 tracking-tight group-hover:text-cyan-400 transition-colors">
              {topic}
            </h3>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
              <Bookmark size={18} />
            </button>
            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
          {summary}
        </p>

        {videos.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Play size={12} className="text-cyan-400" />
              Videoaulas Recomendadas
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {videos.map((video) => (
                <a 
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors group/video"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-cyan-400/10 text-cyan-400 rounded-lg group-hover/video:bg-cyan-400 group-hover/video:text-zinc-950 transition-colors">
                      <Play size={14} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-zinc-300 group-hover/video:text-white truncate max-w-[200px]">
                      {video.title}
                    </span>
                  </div>
                  <FileText size={14} className="text-zinc-600" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
