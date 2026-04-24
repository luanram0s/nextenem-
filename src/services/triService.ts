import { StudentResponse, Question, TRIScore } from '../types/enem';

/**
 * Simplified TRI logic for ENEM scoring.
 * In a real scenario, this would use a complex 3PL (3rd Parameter Logistic) model.
 */
export const calculateTRIScore = (
  responses: StudentResponse[],
  questions: Question[]
): TRIScore => {
  let score = 0;
  let correctCount = 0;
  
  // Basic consistency check (heuristic)
  let easyCorrect = 0;
  let easyTotal = 0;
  let hardCorrect = 0;
  let hardTotal = 0;

  responses.forEach(resp => {
    const question = questions.find(q => q.id === resp.questionId);
    if (!question) return;

    const isCorrect = resp.selectedOption === question.correctOption;
    
    if (isCorrect) {
      correctCount++;
      // Simplified TRI weighting: harder questions give more potential but require consistency
      score += question.difficulty * 100;
    }

    if (question.difficulty < 0.4) {
      easyTotal++;
      if (isCorrect) easyCorrect++;
    } else if (question.difficulty > 0.7) {
      hardTotal++;
      if (isCorrect) hardCorrect++;
    }
  });

  const consistency = easyTotal > 0 ? (easyCorrect / easyTotal) : 1;
  const hardPenalty = (hardCorrect > easyCorrect) ? 0.8 : 1; // Penalty if guessing hard ones but failing easy ones

  return {
    finalScore: Math.round(score * consistency * hardPenalty),
    perfectProbability: correctCount / questions.length,
    consistencyScore: consistency
  };
};
