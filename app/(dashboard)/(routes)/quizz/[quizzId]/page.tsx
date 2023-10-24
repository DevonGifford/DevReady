"use client"; //👈 req for error boundary

import React from "react";
import { notFound } from "next/navigation";
import questionsData from "@/constants/TestQuestion.json";
import QuizComponent from "../_components/flashcard-quizz";

interface Question {
  id: number;
  question: string;
  answer: string;
}

function FlashcardGame({ params }: { params: { quizzId: string } }) {
  // 👇 Temp solution for development
  const testQuestions: Question[] = questionsData;

  // 👇 If doesn't match param's lets use the not-found
  if (parseInt(params.quizzId) > 6) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <span>
        Hello there again - here is the params quizz ID {params.quizzId}
      </span>
      <QuizComponent questions={testQuestions} />
    </div>
  );
}

export default FlashcardGame;
