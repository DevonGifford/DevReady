"use client"; //👈 req for error boundary

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useDatabaseContext } from "@/components/providers/DatabaseProvider";
import { Button } from "@/components/ui/button";
import { LucideXSquare } from "lucide-react";

import QuizComponent from "../_components/flashcard-quizz";
import QuizWelcome from "../_components/quizWelcome";
import QuizResults from "../_components/quizResults";

import questionsData from "@/constants/TestQuestion.json"; // 👈🦺 Temporary solution for development purposes (mock Data)

interface Question {
  id: number;
  question: string;
  answer: string;
}

function FlashcardGame({ params }: { params: { quizzId: string } }) {
  const router = useRouter();
  const { database } = useDatabaseContext();
  const searchParams = useSearchParams();

  const paramsQuizzId = params.quizzId;      // 👈 Reference, check and fetch data from local DB
  const pageId = searchParams.get("pageId"); // 👈 Renders different component pages accordingly

  const testQuestions: Question[] = questionsData;  // 👈🦺 Temporary solution for development purposes (mock Data)


  // ✅ FIND QUIZZ IN DB BASED ON QUEREY STRING
  if (database) {
    // 👇 array of quizz data objects
    const selectedQuizz = database.find(
      (entry) => entry.uuid === paramsQuizzId
    );
  }

  // ✅ SERVE NOT FOUND IF NOT FOUND IN DB
  // 👇 If the selected quizz ID doesn't match any in the database, redirect to a not-found page
  if (!paramsQuizzId) {
    notFound();
  }

  // ✅🔮 Run CUSTOM SORTING ALGORITHM HERE
  // 🎯 todolist:
  // - History check and custom quizz creation
  // - (or maybe call from the quiz context?)

  return (
    <div className="flex flex-col h-auto py-24 md:h-screen items-center justify-center space-y-4 overflow-scroll">
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
