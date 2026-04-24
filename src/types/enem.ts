export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  subject: 'Linguagens' | 'Matemática' | 'Ciências Humanas' | 'Ciências da Natureza';
  topic: string;
  // TRI Parameters
  difficulty: number; // b parameter
  discrimination: number; // a parameter
  guessing: number; // c parameter
}

export interface Simulado {
  id: string;
  title: string;
  questions: Question[];
  startTime?: Date;
  endTime?: Date;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface StudentResponse {
  questionId: string;
  selectedOption: number;
  timeSpentSeconds: number;
}

export interface TRIScore {
  finalScore: number;
  perfectProbability: number;
  consistencyScore: number; // Measures if the user got easy ones right and hard ones wrong
}
