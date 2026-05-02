import { GoogleGenerativeAI } from '@google/genai';
import { cacheService } from './cacheService';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * MOTOR DE INTELIGÊNCIA NEXT ENEM
 * Logic: Cache-First, AI-Second.
 */
export const aiService = {
  /**
   * Generates or retrieves an explanation for a question.
   * Prioritizes cache hits to reduce latency and costs.
   */
  async getExplanation(
    enemId: string, 
    competency: number, 
    hability: number, 
    enunciado: string
  ): Promise<string> {
    // 2.1: Cache Hit check
    const cached = await cacheService.getQuestionByEnemId(enemId);
    if (cached?.explanation_cache) {
      console.log(`[Cache Hit] Explanation found for Enem ID: ${enemId}`);
      return cached.explanation_cache;
    }

    // Fallback to AI
    console.log(`[Cache Miss] Triggering AI for Competency ${competency}, Hability ${hability}`);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `
      Atue como um professor especialista no Enem.
      Explique a seguinte questão baseada na Competência ${competency} e Habilidade ${hability} do Enem.
      
      Questão: ${enunciado}
      
      Forneça uma explicação pedagógica, clara e focada em táticas de prova.
    `;

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    // Persist for future use (Global Cache)
    await cacheService.persistQuestion({
      enem_id: enemId,
      year: new Date().getFullYear(),
      area: 'Geral', // To be dynamic based on UI
      competency,
      hability,
      enunciado,
      alternativas: {},
      explanation_cache: explanation,
      reference_matrix_context: `C${competency}H${hability}`
    });

    return explanation;
  }
};
