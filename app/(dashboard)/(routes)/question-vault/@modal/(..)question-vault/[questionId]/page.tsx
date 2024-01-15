"use client"; //👈 req for error boundary

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { QuizQuestion } from "@/types/databaseSchema";
import { Spinner } from "@/components/Spinner";
import { findQuestionByUuid } from "@/lib/findQuestionByUuid";
import Modal from "@/components/modals/question-modal";
import QuestionCardPreview from "@/components/QuestionCardPreview";

function QuestionPreview({ params }: { params: { questionId: number } }) {
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
            <p>No data found</p> // Customize
          )}
        </div>
      </div>
    </Modal>
  );
}

export default QuestionPreview;
