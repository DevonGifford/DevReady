"use client";

import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "@/components/providers/QuizProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QuizQuestion } from "@/types/databaseSchema";
import { QuizResultsSchema } from "@/types/quizzSchema";

type QuizProps = {
  questions: QuizQuestion[];
};

const QuizApplication: React.FC<QuizProps> = ({ questions }) => {
  const router = useRouter();
  const { updateResults, quizResults } = useQuizContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextCard = async () => {
    try {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
      } else {
        //- handle quiz complete & redirect
        const queryParams = {
          pageId: "results-page",
        };
        const queryString = new URLSearchParams(queryParams).toString();
        router.push(`?${queryString}`);
        toast.success("Quiz Completed!");
      }
    } catch (error) {
      toast.error("Failed to complete the quiz.");
      Sentry.captureException(error);
    }
  };

  const handlePrevCard = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const correctAnswer = (data: QuizQuestion) => {
    toast("Marked Correct", { icon: "✅" });

    const updatedAnswers = [
      ...(quizResults?.usersAnswers || []),
      { questionUuid: data.questionUuid, selectedAnswer: "True" },
    ];

    const newData: Partial<QuizResultsSchema> = {
      usersAnswers: updatedAnswers,
    };

    updateResults(newData);
    handleNextCard();
  };

  const wrongAnswer = (data: QuizQuestion) => {
    toast("Marked Incorrect", { icon: "❌" });

    const updatedAnswers = [
      ...(quizResults?.usersAnswers || []),
      { questionUuid: data.questionUuid, selectedAnswer: "False" },
    ];

    const newData: Partial<QuizResultsSchema> = {
      usersAnswers: updatedAnswers,
    };

    updateResults(newData);
    handleNextCard();
  };

  const handleFlipCard = () => {
    // 🎯 to-do-list :  this should trigger card flip animations
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flex flex-row justify-evenly items-center w-fit lg:w-2/5 md:mx-10 px-1 md:px-2 max-w-2xl">
      <div className="w-10">
        <Button
          className="rounded-full -translate-x-5 h-20 w-20 hover:bg-transparent"
          variant="devoutline"
          onClick={handlePrevCard}
        >
          <ChevronLeft size={50} />
        </Button>
      </div>

      <Card className="flex flex-col justify-between w-full h-full items-stretch min-h-[450px] ">
        <CardHeader className="flex flex-row w-full justify-between items-center p-2 px-3">
          <div>timer</div>
          <div>
            {questions[currentQuestion].questionUuid} / {questions.length}
          </div>
        </CardHeader>

        {!showAnswer ? (
          // 👇 QUESTION CARD
          <CardContent className="flex flex-col gap-3 md:gap-8 md:py-6 xl:py-12 ">
            <CardTitle className="">
              {questions[currentQuestion].questionTitle}
            </CardTitle>

            <CardDescription>
              {questions[currentQuestion].questionDescription}
            </CardDescription>
          </CardContent>
        ) : (
          // 👇 ANSWER CARD
          <CardContent className="flex flex-col gap-3 md:py-6 xl:py-12">
            <CardTitle className=" text-lg text-devready-green">
              Answer
            </CardTitle>

            <CardDescription>
              {questions[currentQuestion].questionAnswer}
            </CardDescription>
          </CardContent>
        )}

        <CardFooter className="p-0 top-0 w-full flex flex-row justify-between">
          <button
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-red-700 rounded-bl-md"
            onClick={() => {
              wrongAnswer(questions[currentQuestion]);
            }}
          >
            wrong
          </button>
          <button
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-yellow-700 "
            onClick={handleFlipCard}
          >
            show
          </button>
          <button
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-green-700 rounded-br-md"
            onClick={() => {
              correctAnswer(questions[currentQuestion]);
            }}
          >
            correct
          </button>
        </CardFooter>
      </Card>

      <div className="w-10">
        <Button
          className="rounded-full -translate-x-5 h-20 w-20 hover:bg-transparent p-0"
          variant="devoutline"
          onClick={handleNextCard}
        >
          <ChevronRight size={50} />
        </Button>
      </div>
    </div>
  );
};

export default QuizApplication;
