export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: Message;
  done: boolean;
}

export interface LearningContent {
  lesson: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  financialConcept: string;
  content: string;
  exercises: Exercise[];
}

export interface Exercise {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChatConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
