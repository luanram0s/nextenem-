import { GoogleGenAI } from '@google/genai';
import { cacheService } from './cacheService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const DEFAULT_MODEL = 'gemini-3-flash-preview';

/**
 * Centralized call with exponential backoff for 429 errors.
 */
async function safeGenerate(params: any, retries = 5, delay = 2000): Promise<string> {
  try {
    const modelName = params.model || DEFAULT_MODEL;
    const sanitizedModelName = modelName.includes('pro') ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({ 
      model: sanitizedModelName,
      contents: params.contents,
      config: params.config
    });

    return response.text || '';
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

    const responseText = await safeGenerate({
      model: 'gemini-3.1-pro-preview',
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
      return JSON.parse(responseText || '{}');
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
