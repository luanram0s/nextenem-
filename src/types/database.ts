export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  is_public: boolean; // 1.1: Core logic for global library access
  content_cache?: any;
  created_at: string;
  updated_at: string;
}

export interface QuestionCache {
  id: string;
  enem_id: string; // ID from official Enem matrix
  year: number;
  area: string;
  competency: number;
  hability: number;
  enunciado: string;
  alternativas: any;
  explanation_cache?: string;
  reference_matrix_context?: string; // 1.2: Matriz de referência
  is_public: boolean;
}

export interface VideoSnippet {
  id: string;
  topic: string;
  discipline: string;
  url: string;
  title: string;
  is_public: boolean;
}
