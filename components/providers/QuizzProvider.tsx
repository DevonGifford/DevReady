"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { QuizResultsSchema, QuizSchema, usersInput } from "@/types/quizzSchema";

type QuizzContextProps = {
  quizData: QuizSchema | undefined;
  quizResults: QuizResultsSchema | undefined;
  generateQuizData: () => {};
  updateResults: (newResults: Partial<QuizResultsSchema>) => Promise<void>;
  updateUser: () => {};
};

// 👇 AUTH CONTEXT => exposing following...
const QuizzContext = createContext<QuizzContextProps>({
  quizData: undefined,
  quizResults: undefined,
  generateQuizData: async () => {},
  updateResults: async () => {},
  updateUser: async () => {},
});

// - Arrow Function Shorthand:
// - directly returns result of useContext explicitly defining any type.
export const useQuizzContext = () => useContext<any>(QuizzContext);

export const QuizContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quizData, setQuizData] = useState<QuizSchema>();
  const [quizResults, setQuizResults] = useState<QuizResultsSchema>();
  const [loading, setLoading] = useState<Boolean>(true);

  // ✅ Initialization context logic here...
  useEffect(() => {
    // - Fetch data or perform actions here
    const fetchData = async () => {
      // ⏳ Update state accordingly with setQuizData and setQuizResults
      setLoading(false); // Set loading to false when done
    };

    fetchData();

    //- Clean-up function (optional)
    return () => {
      // ⏳ Add clean-up logic
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  /**
   * ✅ HANDLE SETTING QUIZZ DATA - quizz welcome page
   */
  const generateQuizData = async () => {
    console.log(
      "🎯event_log:  ❓quizzProvider/generateQuizData:  💢 Triggered"
    );
  };

  /**
   * ✅ HANDLE UPDATING STATE - quizz application page
   */
  const updateResults = async (
    newResults: Partial<QuizResultsSchema>
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setQuizResults((prevResults) => {
        if (!prevResults) {
          // If no previous results exist, initialize usersAnswers with new data
          return {
            quizUuid: newResults.quizUuid || "", // Update with appropriate value
            usersAnswers: newResults.usersAnswers || [], // Update with appropriate value
          };
        } else {
          // If previous results exist, merge or update usersAnswers
          const updatedUserAnswers = newResults.usersAnswers || [];

          // Update existing user answers or add new ones
          const mergedUsersAnswers = updatedUserAnswers.reduce(
            (acc: usersInput[], newAnswer: usersInput) => {
              const existingIndex = prevResults.usersAnswers.findIndex(
                (existingAnswer) =>
                  existingAnswer.questionUuid === newAnswer.questionUuid
              );

              if (existingIndex !== -1) {
                // If an answer for the question exists, update it
                acc[existingIndex] = newAnswer;
              } else {
                // If answer doesn't exist, add it to the array
                acc.push(newAnswer);
              }

              return acc;
            },
            [...prevResults.usersAnswers] // Copy existing answers
          );

          return {
            ...prevResults,
            usersAnswers: mergedUsersAnswers,
          };
        }
      });

      resolve(); // Resolve here after the state has been updated
    });
  };

  /**
   * ✅ HANLDE UPDATING USERCONTEXT - quizz results page
   */
  const updateUser = async () => {
    console.log("🎯event_log:  ❓quizzProvider/updateUser:    💢 Triggered ");
  };

  const quizContextValue: QuizzContextProps = {
    quizData,
    quizResults,
    generateQuizData,
    updateResults,
    updateUser,
  };

  return (
    <QuizzContext.Provider value={quizContextValue}>
      {loading ? (
        <div className="h-screen w-screen bg-primary flex items-center justify-center space-y-4">
          <Spinner size="screen" />
        </div>
      ) : (
        children
      )}
    </QuizzContext.Provider>
  );
};
