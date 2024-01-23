export type usersInput = {
  questionUuid: number;
  selectedAnswer: string;
};

export type QuizResultsSchema = {
  quizUuid: string;
  usersAnswers: usersInput[];
};
