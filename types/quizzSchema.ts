export interface usersInput {
  questionUuid: number;
  selectedAnswer: ["True" | "False" | "Skipped"];
}

export interface QuizResultsSchema {
  quizUuid: string; // References the UUID of the quiz
  usersAnswers: usersInput[];
}
