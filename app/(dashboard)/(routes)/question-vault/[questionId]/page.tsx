"use client"; //👈 req for error boundary

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { QuizQuestion } from "@/types/databaseSchema";
import { Spinner } from "@/components/Spinner";
import { findQuestionByUuid } from "@/lib/findQuestionByUuid";

import QuestionCardPreview from "@/components/QuestionCardPreview";

function QuestionView({ params }: { params: { questionId: number } }) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);

  const paramsQuestionId = params.questionId;

  // ✅ SERVE NOT FOUND IF NO SPECIFIC QUEREY
  // 👇 If the selected quiz ID doesn't match any in the database, redirect to a not-found page
  if (!paramsQuestionId) {
    notFound();
  }

  // ✅ FETCH QUESTION DATA
  const fetchQuestionData = () => {
    return findQuestionByUuid(Number(paramsQuestionId));
  };

  // ✅ HOOK TO TRIGGER FETCH & SET
  useEffect(() => {
    const currentQuestionData = fetchQuestionData();

    currentQuestionData !== undefined && setQuestionData(currentQuestionData);

    setIsLoadingData(false); // Turn off loading once data is set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-10 mx-auto flex flex-col h-auto py-24 items-center justify-center space-y-4 ">
      <div className="w-11/12 md:w-4/6 max-w-xl mx-auto">
        {isLoadingData ? (
          <>
            <p>Loading...</p>
            <Spinner size={"screen"} />
          </>
        ) : questionData ? (
          <>
            <QuestionCardPreview questionData={questionData} />
          </>
        ) : (
          <p>No data found</p> // Customize
        )}
      </div>
    </div>
  );
}

export default QuestionView;
