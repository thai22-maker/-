export interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface AnalysisResult {
  subject: string;
  mistakeAnalysis: string;
  correctSolution: string;
  coreConcept: string;
  encouragement: string;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  REVIEW = 'REVIEW',
  GENERATING_QUIZ = 'GENERATING_QUIZ',
  PRACTICE = 'PRACTICE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}