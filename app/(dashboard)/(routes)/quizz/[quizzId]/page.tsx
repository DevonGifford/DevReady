"use client"; //👈 req for error boundary

import React from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import questionsData from "@/constants/TestQuestion.json";
import QuizComponent from "../_components/flashcard-quizz";
import { useDatabaseContext } from "@/components/providers/DatabaseProvider";
import QuizWelcome from "../_components/quizWelcome";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LucideXSquare } from "lucide-react";
import QuizResults from "../_components/quizResults";

interface Question {
  id: number;
  question: string;
  answer: string;
}

function FlashcardGame({ params }: { params: { quizzId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { database } = useDatabaseContext();
  const pageId = searchParams.get("pageId");
  const paramsQuizzId = params.quizzId;

  // 👇⏳ Temp solution for development
  const testQuestions: Question[] = questionsData;

  if (database) {
    // 👇 Assuming database is an array of quiz data objects
    const selectedQuizz = database.find(
      (entry) => entry.uuid === paramsQuizzId
    );
  }
  // 👇 If the selected quizz ID doesn't match any in the database, redirect to a not-found page
  if (!paramsQuizzId) {
    notFound();
  }

  // 👇 Run History check and custom quizz creation
  // 🎯🔮

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* Conditional rendering based on router query */}
      {pageId === "active-quiz" && (
        <QuizComponent key="quiz" questions={testQuestions} />
      )}
      {pageId === "results-page" && <QuizResults key="results" />}

      {/* Render 'go back to previous form' button or render first form */}
      {pageId ? (
        <Button
          className="text-xs font-bold translate-y-1/2"
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            router.back();
          }}
        >
          <LucideXSquare size={16} /> Quit Quiz
        </Button>
      ) : (
        <QuizWelcome key="intro" />
        // 👇 for development use
        // <QuizComponent key="quiz" questions={testQuestions} />
        // <QuizResults key="results" />
      )}
    </div>
  );
}

export default FlashcardGame;
