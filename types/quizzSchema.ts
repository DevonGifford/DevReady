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

export interface usersInput {
  questionUuid: number;
  selectedAnswer: ["True" | "False" | "Skipped"];
}

export interface QuizResultsSchema {
  quizUuid: string; // References the UUID of the quiz
  usersAnswers: usersInput[];
}
