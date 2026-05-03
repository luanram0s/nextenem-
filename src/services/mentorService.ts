import { GoogleGenAI } from '@google/genai';
import { cacheService } from './cacheService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const DEFAULT_MODEL = 'gemini-1.5-flash';

/**
 * Centralized call with exponential backoff for 429 errors.
 */
async function safeGenerate(params: any, retries = 5, delay = 2000): Promise<any> {
  try {
    const modelName = params.model || DEFAULT_MODEL;
    const sanitizedParams = {
      ...params,
      model: modelName.includes('pro') ? 'gemini-1.5-pro' : 'gemini-1.5-flash'
    };
    return await ai.models.generateContent(sanitizedParams);
  } catch (error: any) {
    const isRateLimit = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
    
    if (isRateLimit && retries > 0) {
      console.warn(`[Mentor AI 429] Quota exceeded. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return safeGenerate(params, retries - 1, delay * 2);
    }
    throw error;
  }
}

export interface TacticalBrief {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
  tacticalTip: string;
}

export const mentorService = {
  /**
   * Generates a personalized tactical brief based on student history.
   */
  async generateTacticalBrief(history: any[]): Promise<TacticalBrief> {
    const historySummary = history.map(h => 
      `Disciplina: ${h.discipline}, Acertos: ${h.score}/${h.total}, Data: ${h.date}`
    ).join('\n');

    const response = await safeGenerate({
      model: 'gemini-1.5-pro',
      contents: `
        Você é o Mentor Dinâmico do Next Enem. Seu objetivo é analisar o histórico do aluno e fornecer um Plano de Guerra tático.
        
        Histórico:
        ${historySummary}
        
        Gere um objeto JSON com:
        1. summary: Breve análise do estado atual (máx 200 caracteres).
        2. strengths: Lista de 3 disciplinas/temas dominados.
        3. weaknesses: Lista de 3 disciplinas/temas que precisam de atenção.
        4. recommendedTopics: 3 temas específicos da Biblioteca Global para estudar agora.
        5. tacticalTip: Uma dica de "vaga garantida" baseada no perfil.
        
        Responda APENAS o JSON.
      `,
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Failed to parse mentor response', e);
      return {
        summary: 'Seu histórico está sendo processado. Continue praticando para gerar insights.',
        strengths: [],
        weaknesses: [],
        recommendedTopics: [],
        tacticalTip: 'Foque nos temas de maior recorrência no momento.'
      };
    }
  }
};
