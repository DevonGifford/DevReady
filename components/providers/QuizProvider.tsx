"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { QuizResultsSchema, usersInput } from "@/types/quizzSchema";
import { QuizQuestion } from "@/types/databaseSchema";

type QuizContextProps = {
  quizData: QuizQuestion[] | undefined;
  quizResults: QuizResultsSchema | undefined;
  setCustomQuestions: (customQuizData: QuizQuestion[]) => {};
  updateResults: (newResults: Partial<QuizResultsSchema>) => Promise<void>;
  resetQuizResults: () => void;
};

const QuizContext = createContext<QuizContextProps>({
  quizData: undefined,
  quizResults: undefined,
  setCustomQuestions: async () => {},
  updateResults: async () => {},
  resetQuizResults: async () => {},
});

export const useQuizContext = () => useContext<QuizContextProps>(QuizContext);

export const QuizContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>();
  const [quizResults, setQuizResults] = useState<QuizResultsSchema>();
  const [loading, setLoading] = useState<Boolean>(true);

  // ⏳ Initialization context logic on mount...
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      // 🎯 to-do-list: add actions here
    };

    fetchData();

    return () => {
      // 🎯 to-do-list: add clean-up logic
    };
  }, []);

  const resetQuizResults = () => {
    const defaultQuizResults: QuizResultsSchema = {
      quizUuid: "",
      usersAnswers: [],
    };
    setQuizResults(defaultQuizResults);
  };

  const setCustomQuestions = async (customQuizData: QuizQuestion[]) => {
    // 🎯 to-do-list: add algorithm here logic
    // ⏳ temporary just setting all data
    setQuizData(customQuizData);
  };

  const updateResults = async (
    newResults: Partial<QuizResultsSchema>
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setQuizResults((prevResults) => {
        if (!prevResults) {
          //- If no previous results exist, initialize usersAnswers with new data
          return {
            quizUuid: newResults.quizUuid || "",
            usersAnswers: newResults.usersAnswers || [],
          };
        } else {
          //- If previous results exist, merge or update usersAnswers
          const updatedUserAnswers = newResults.usersAnswers || [];

          //- Update existing user answers or add new
          const mergedUsersAnswers = updatedUserAnswers.reduce(
            (acc: usersInput[], newAnswer: usersInput) => {
              const existingIndex = prevResults.usersAnswers.findIndex(
                (existingAnswer) =>
                  existingAnswer.questionUuid === newAnswer.questionUuid
              );

              if (existingIndex !== -1) {
                acc[existingIndex] = newAnswer; //- If answer for question exists, update it
              } else {
                acc.push(newAnswer); //- If answer doesn't exist, add it to the array
              }

              return acc;
            },
            [...prevResults.usersAnswers] //- Copy existing answers
          );

          return {
            ...prevResults,
            usersAnswers: mergedUsersAnswers,
          };
        }
      });

      resolve(); //- Resolve after the state has been updated
    });
  };

  const quizContextValue: QuizContextProps = {
    quizData,
    quizResults,
    updateResults,
    resetQuizResults,
    setCustomQuestions,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {loading ? (
        <div className="h-screen w-screen bg-primary flex items-center justify-center space-y-4">
          <Spinner size="screen" />
        </div>
      ) : (
        children
      )}
    </QuizContext.Provider>
  );
};
