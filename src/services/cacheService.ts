import { supabase } from '../lib/supabase';
import { QuestionCache, VideoSnippet, UserHistoryDTO } from '../types/database';

/**
 * SERVICE: Content Cache & Reference Matrix Persistence
 * Goal: Minimize LLM costs by reusing existing explanations and contexts.
 */
export const cacheService = {
  /**
   * Search for a question in the global cache by its official Enem ID.
   */
  async getQuestionByEnemId(enemId: string): Promise<QuestionCache | null> {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('enem_id', enemId)
      .eq('is_public', true)
      .single();

    if (error) return null;
    return data;
  },

  /**
   * Persists a question along with its full context and matrix mapping.
   */
  async persistQuestion(question: Omit<QuestionCache, 'id'>): Promise<QuestionCache | null> {
    const { data, error } = await supabase
      .from('questions')
      .insert([{ ...question, is_public: true }])
      .select()
      .single();

    if (error) {
      console.error('Error persisting question context:', error);
      return null;
    }
    return data;
  },

  /**
   * 2.2: Global Repository for Video Lessons & Summaries
   * Fetch theoretical materials indexed by discipline and topic.
   */
  async getMaterialByTopic(discipline: string, topic: string): Promise<VideoSnippet[]> {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('discipline', discipline)
      .ilike('topic', `%${topic}%`)
      .eq('is_public', true);

    if (error) return [];
    return data || [];
  },

  /**
   * Automatically saves new materials found or generated.
   */
  async persistMaterial(material: Omit<VideoSnippet, 'id'>): Promise<VideoSnippet | null> {
    const { data, error } = await supabase
      .from('materials')
      .insert([{ ...material, is_public: true }])
      .select()
      .single();

    if (error) return null;
    return data;
  },

  /**
   * 4.1: Syncs LocalStorage history to Supabase for centralized persistence.
   */
  async syncPerformanceHistory(history: UserHistoryDTO[]): Promise<boolean> {
    const { error } = await supabase.from('history').insert(history);
    if (error) {
       console.error('Error syncing history', error);
       return false;
    }
    return true;
  }
};
