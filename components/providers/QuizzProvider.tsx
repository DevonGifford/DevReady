"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { QuizResultsSchema, QuizSchema } from "@/types/quizzSchema";

type QuizzContextProps = {
  quizData: QuizSchema | undefined;
  quizResults: QuizResultsSchema | undefined;
  generateQuizData: () => {};
  updateResults: () => {};
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
   * ✅ HANDLE SETTING QUIZZ DATA
   */
  const generateQuizData = async () => {
    console.log(
      "🎯event_log:  ❓quizzProvider/generateQuizData:  💢 Triggered"
    );
  };

  /**
   * ✅ HANDLE UPDATING STATE
   */
  const updateResults = async () => {
    console.log("🎯event_log:  ❓quizzProvider/updateResults:  💢 Triggered ");
  };

  /**
   * ✅ HANLDE UPDATING USERCONTEXT
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
