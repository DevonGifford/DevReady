"use client"; //👈 required for error boundary

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LucideXSquare } from "lucide-react";
import { useQuizContext } from "@/components/providers/QuizProvider";
import { quizGeneratingAlgo } from "@/lib/quizGeneratingAlgo";
import { synchQuestionVault } from "@/utils/firebase/firestore.utils";
import QuizApplication from "../_components/quizApplication";
import QuizWelcome from "../_components/quizWelcome";
import QuizResults from "../_components/quizResults";
import { DatabaseSchema } from "@/types/databaseSchema";

function QuizControl({ params }: { params: { quizId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetQuizResults, setCustomQuestions, quizData } = useQuizContext();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [quizMetaData, setQuizMetaData] = useState<DatabaseSchema | null>(null);
  const paramsQuizzId = params.quizId;
  const pageId = searchParams.get("pageId");

  if (!paramsQuizzId) {
    notFound();
  }

  const initializeQuizMetadata = () => {
    const localStorageKey = "ztmready-database";
    const localVault: string | null = localStorage.getItem(localStorageKey);

    if (!localVault) {
      synchQuestionVault();
      return null; // Handle the absence of data
    }

    try {
      const parsedData = JSON.parse(localVault);

      if (!parsedData.data || !parsedData.timestamp) {
        return null; // Handle incomplete data format
      }

      const relevantData = parsedData.data.find(
        (data: any) => data.uuid === paramsQuizzId
      );

      if (!relevantData) {
        return null; // Handle the absence of relevant data
      }

      const { setData, ...dataWithoutSetData } = relevantData;

      return dataWithoutSetData;
    } catch (error) {
      console.error(
        "✖ Error occurred while parsing data from local storage:",
        error
      );
      return null; // Handle parsing error
    }
  };

  const initializeCustomQuestions = () => {
    const customQuestionSet = quizGeneratingAlgo(
      // 🎯🔮 to-do-list - work-in-progress...
      paramsQuizzId,
      10,
      "userHistory"
    );
    setCustomQuestions(customQuestionSet!); //update state
  };

  //-TRIGGER FETCH ACTIONS
  useEffect(() => {
    initializeCustomQuestions();
    const metaQuizData = initializeQuizMetadata();
    setQuizMetaData(metaQuizData);
    setIsLoadingData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-auto py-24 items-center justify-center space-y-4 ">
      {/* Conditional rendering based on router query */}
      {pageId === "active-quiz" && (
        <>
          <QuizApplication key="quiz" questions={quizData!} />
          {/* Quit quiz button */}
          <Button
            className="text-xs font-bold translate-y-1/2"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              router.back();
              resetQuizResults();
              toast("Quiz cancelled");
            }}
          >
            <LucideXSquare size={16} /> Quit Quiz
          </Button>
        </>
      )}
      {pageId === "results-page" && (
        <QuizResults quizMetaData={quizMetaData} key="results" />
      )}

      {/* Render 'go back to previous form' button or render first form */}
      {!pageId && (
        <QuizWelcome
          quizMetaData={quizMetaData}
          isLoading={isLoadingData}
          key="intro"
        />
        // 👇 for development use
        // <QuizApplication key="quiz" questions={testQuestions} />
        // <QuizResults key="results" />
      )}
    </div>
  );
}

export default QuizControl;
