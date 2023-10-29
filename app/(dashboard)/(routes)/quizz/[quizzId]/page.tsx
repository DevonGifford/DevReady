"use client"; //👈 req for error boundary

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useDatabaseContext } from "@/components/providers/DatabaseProvider";
import { Button } from "@/components/ui/button";
import { LucideXSquare } from "lucide-react";

import QuizComponent from "../_components/flashcard-quizz";
import QuizWelcome from "../_components/quizWelcome";
import QuizResults from "../_components/quizResults";

import questionsData from "@/constants/TestQuestion.json"; // 👈🦺 Temporary solution for development purposes (mock Data)
import mockDB from "@/constants/mockDB.json";
import { QuizQuestion } from "@/types/databaseSchema";
import { useQuizzContext } from "@/components/providers/QuizzProvider";
import { quizGeneratingAlgo } from "@/lib/quizGeneratingAlgo";
import { useEffect } from "react";

function FlashcardGame({ params }: { params: { quizzId: string } }) {
  const router = useRouter();
  const { database } = useDatabaseContext();
  const searchParams = useSearchParams();
  const { resetQuizResults, setCustomQuizData, quizData } = useQuizzContext();

  const paramsQuizzId = params.quizzId; // 👈 Reference, check and fetch data from local DB
  const pageId = searchParams.get("pageId"); // 👈 Renders different component pages accordingly

  console.log("paramsQuizzId 🍉", paramsQuizzId);
  console.log("pageId 🍉", pageId);

  const testQuestions: QuizQuestion[] = mockDB[0].setData; // 👈🦺 Temporary solution for development purposes (mock Data)

  // ✅ SERVE NOT FOUND IF NO SPECIFIC QUEREY
  // 👇 If the selected quizz ID doesn't match any in the database, redirect to a not-found page
  if (!paramsQuizzId) {
    notFound();
  }

  // ✅ FIND QUIZZ IN DB BASED ON QUEREY STRING
  // if (database) {
  //   // 👇 array of quizz data objects
  //   const selectedQuizz = database.find(
  //     (entry) => entry.uuid === paramsQuizzId
  //   );

  //   console.log("selectedQuizz", selectedQuizz);
  // }

  // ✅🔮 CUSTOM SORTING ALGORITHM HERE - use effect?
  // 🎯 todolist:
  // - History check and custom quizz creation
  // - (or maybe call from the quiz context?)
  const setCustomQuizQuestion = () => {
    // 🎯 need to update the Algo 
    const customData: QuizQuestion[] = quizGeneratingAlgo(
      paramsQuizzId,
      10,
      "userHistory"
    );
    console.log("customData 🎈", customData);
    setCustomQuizData(customData);
  };
  useEffect(() => {
    setCustomQuizQuestion(); // Call setCustomQuizQuestion once on initial render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-auto py-24 md:h-screen items-center justify-center space-y-4 overflow-scroll">
      {/* Conditional rendering based on router query */}
      {pageId === "active-quiz" && (
        <QuizComponent key="quiz" questions={quizData} /> 
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
            resetQuizResults();
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
