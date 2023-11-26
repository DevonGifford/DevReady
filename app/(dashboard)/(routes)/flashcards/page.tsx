import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import QuizComponent from "./_components/flashcard-quizz";

import questionsData from '@/constants/TestQuestion.json';

interface Question {
  id: number;
  question: string;
  answer: string;
}

function FlashcardGame() {

  const testQuestions: Question[] = questionsData
  
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <QuizComponent questions={testQuestions} />
    </div>
  );
}

export default FlashcardGame;
