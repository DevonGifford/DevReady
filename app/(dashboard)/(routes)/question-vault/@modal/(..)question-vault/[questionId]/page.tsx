"use client"; //👈 req for error boundary

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { findQuestionByUuid } from "@/lib/findQuestionByUuid";
import { QuestionCardPreview } from "@/components/QuestionCardPreview";
import { QuizQuestion } from "@/types/databaseSchema";
import Modal from "@/components/modals/question-modal";

function QuestionPreview({ params }: { params: { questionId: number } }) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);
  const paramsQuestionId = params.questionId;

  if (!paramsQuestionId) {
    notFound();
  }

  useEffect(() => {
    const currentQuestionData = findQuestionByUuid(Number(paramsQuestionId));
    currentQuestionData !== undefined && setQuestionData(currentQuestionData);
    setIsLoadingData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal>
      <div className="container mx-auto flex flex-col h-auto items-center justify-center space-y-4 hide-scrollbar ">
        <div className="w-full h-auto mx-auto">
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
            <p>No data found</p> //🎯Customize
          )}
        </div>
      </div>
    </Modal>
  );
}

export default QuestionPreview;
