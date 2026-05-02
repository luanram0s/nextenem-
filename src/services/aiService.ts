import { GoogleGenAI } from '@google/genai';
import { cacheService } from './cacheService';

// Ensure process.env.GEMINI_API_KEY is available
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Atue como um professor especialista no Enem.
        Explique a seguinte questão baseada na Competência ${competency} e Habilidade ${hability} do Enem.
        
        Questão: ${enunciado}
        
        Forneça uma explicação pedagógica, clara e focada em táticas de prova.
      `
    });

    const explanation = response.text || 'Não foi possível gerar uma explicação no momento.';

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
      reference_matrix_context: `C${competency}H${hability}`,
      is_public: true
    });

    return explanation;
  },

  /**
   * 1.1: Parser de Provas Oficiais
   * Extrai questões estruturadas de uma string de texto (extraída de PDF).
   */
  async extractQuestionsFromText(text: string): Promise<any[]> {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `
        Você é um parser especializado em provas do Enem. 
        Analise o texto abaixo e identifique cada questão.

        Texto: "${text}"

        Para cada questão, extraia:
        1. enem_id (Ano_Area_Numero)
        2. enunciado
        3. alternativas (A, B, C, D, E)
        4. correct_label (Gabarito)
        5. competency (1 a 9)
        6. hability (1 a 30)
        7. area (Matemática, Natureza, Humanas ou Linguagens)

        Retorne um JSON contendo uma lista de objetos chamados "questions".
        Seja rigoroso com o texto das alternativas.
      `,
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      const data = JSON.parse(response.text || '{"questions": []}');
      return data.questions || [];
    } catch (e) {
      console.error('Falha no Parse de Provas:', e);
      return [];
    }
  },

  /**
   * 4.2: Generates a question based on TRI difficulty level.
   */
  async generateQuestionByTRI(
    topic: string, 
    discipline: string, 
    level: 'Fácil' | 'Média' | 'Difícil'
  ) {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `
        Atue como o motor de questões do Enem.
        Gere uma questão de múltipla escolha inédita sobre o tema "${topic}" da disciplina "${discipline}".
        Dificuldade Alvo (TRI): ${level}
        
        A questão deve seguir rigorosamente o padrão Enem:
        - Objeto de conhecimento claro.
        - Contextualização (situação-problema).
        - Comando direto.
        - 5 alternativas (A-E), sendo apenas uma correta.
        - Distratores plausíveis.
        
        Gere um JSON com:
        - enunciado: Texto completo da questão.
        - alternativas: Objeto { A: "...", B: "...", ... }
        - correctLabel: Letra da alternativa correta.
        - difficulty: O nível solicitado.
        
        Responda APENAS o JSON.
      `,
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Failed to generate TRI question', e);
      return null;
    }
  },

  /**
   * 5.1: Analyzes the student's thought process from the "Laboratório de Cálculo".
   * Corrects the logic, not just the answer.
   */
  async analyzeCalculationLab(questionEnunciado: string, scratchpadText: string, selectedOption: string, correctOption: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `
        Atue como um mentor pedagógico do Enem.
        Analise o rascunho de cálculo do aluno para a seguinte questão.
        
        Questão: ${questionEnunciado}
        Resposta do Aluno: ${selectedOption} (Gabarito: ${correctOption})
        Rascunho do Aluno: "${scratchpadText}"
        
        Gere um JSON com:
        - logic_error: Descrição de onde o aluno errou no raciocínio (se errou).
        - corrective_tip: Dica imediata para não repetir o erro.
        - cognitive_feedback: Elogio ou ajuste na forma de pensar.
        
        Responda APENAS o JSON.
      `,
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Failed to analyze scratchpad', e);
      return null;
    }
  }
};
