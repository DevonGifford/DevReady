"use client"; //👈 req for error boundary

import { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";

import { QuizQuestion } from "@/types/databaseSchema";
import { Spinner } from "@/components/Spinner";

function QuestionPreview({
  params,
}: {
  params: { collectionId: string; questionId: number };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [questionData, setQuestionData] = useState<QuizQuestion | null>(null);

  const paramsCollectionId = params.collectionId;
  const paramsQuestionId = params.questionId;

  // ✅ SERVE NOT FOUND IF NO SPECIFIC QUEREY
  // 👇 If the selected quiz ID doesn't match any in the database, redirect to a not-found page
  if (!paramsCollectionId || !paramsQuestionId) {
    notFound();
  }

  // ✅ FETCH QUIZ METADATA - title description tags etc.
  const fetchQuestionData = () => {
    try {
      const localStorageKey = "ztmready-database";
      const localDB: string | null = localStorage.getItem(localStorageKey);

      if (!localDB) {
        console.error("Error: No data found in local storage");
        return null; // Handle the absence of data
      }

      const parsedData = JSON.parse(localDB);

      if (!parsedData.data || !parsedData.timestamp) {
        console.error("Error: Incomplete data format in local storage");
        return null; // Handle incomplete data format
      }

      //- Find the relevant collection data based on collectionId
      const relevantCollection = parsedData.data.find(
        (data: any) => data.uuid === paramsCollectionId
      );

      if (!relevantCollection) {
        console.error("Error: No matching collection data found");
        return null; // Handle the absence of relevant collection data
      }

      //- Find the relevant question data within the collection based on questionId
      const relevantQuestion = relevantCollection.setData.find(
        (question: QuizQuestion) => question.questionUuid === paramsQuestionId
      );

      if (!relevantQuestion) {
        console.error("Error: No matching question data found");
        return null; // Handle the absence of relevant question data
      }

      return relevantQuestion;
    } catch (error) {
      console.error(
        "🎯event_log:  🎇/fetchQuestionData  ❌ Error occurred while parsing data from local storage:",
        error
      );
      return null; // Handle parsing error
    }
  };

  // ✅ HOOK TO TRIGGER FETCH ACTIONS
  useEffect(() => {
    const currentQuestionData = fetchQuestionData();
    setQuestionData(currentQuestionData);
    setIsLoadingData(false); // Turn off loading once data is set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-auto py-24 items-center justify-center space-y-4 overflow-scroll">
      {isLoadingData ? (
        <>
          <p>Loading...</p>
          <Spinner size={"screen"} />
        </>
      ) : questionData ? (
        <div>
          {/* Render your question data here */}
          <p>{questionData.questionTitle}</p>
          {/* Add more elements based on your data structure */}
        </div>
      ) : (
        <p>No data found</p> // Customize
      )}
    </div>
  );
}

export default QuestionPreview;
