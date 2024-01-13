"use client"; //👈 req for error boundary

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { findQuestionByUuid } from "@/lib/findQuestionByUuid";
import { QuestionCardPreview } from "@/components/QuestionCardPreview";
import { Spinner } from "@/components/Spinner";
import { QuizQuestion } from "@/types/databaseSchema";

function QuestionView({ params }: { params: { questionId: number } }) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);
  const paramsQuestionId = params.questionId;

  if (!paramsQuestionId) {
    notFound();
  }

  useEffect(() => {
    const specificQuestion = findQuestionByUuid(Number(paramsQuestionId));
    specificQuestion !== undefined && setQuestionData(specificQuestion);
    setIsLoadingData(false);
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
