export interface QuizQuestions {
  uuid: number;
  questionTitle: string;
  questionDescription?: string;
  questionAnswer: string;
  questionDifficulty: number;
  questionTags: string[];
}

export interface QuizSchema {
  uuid: string;
  title: string;
  description: string;
  questions: QuizQuestions[];
}

export interface QuizResultsSchema {
  quizUuid: string; // References the UUID of the quiz
  questionUuid: number; // References the UUID of the answered question
  userAnswer: string; // User's answer to the question
  isCorrect: boolean; // Indicates whether the user's answer is correct
}
