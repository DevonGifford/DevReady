"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, HelpCircle, X } from "lucide-react";
import { QuizQuestion } from "@/types/databaseSchema";
import { useQuizzContext } from "@/components/providers/QuizzProvider";
import { useRouter } from "next/navigation";

interface QuizProps {
  questions: QuizQuestion[];
}

const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const { updateResults } = useQuizzContext();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      console.log(currentQuestion);
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    } else {
      // 🎯 handle if final question -> redirect complete
      toast("Quiz Complete");
      const queryParams = {
        pageId: "results-page",
      };

      const queryString = new URLSearchParams(queryParams).toString();
      router.push(`?${queryString}`);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const correctAnswer = (data: QuizQuestion) => {
    toast("Marked Correct", {
      icon: "✅",
    });
    console.log(data);
    handleNext();
    updateResults();
    // 🎯 to-do-list:
    // - update the quizContext
  };

  const wrongAnswer = () => {
    toast("Marked Incorrect", {
      icon: "❌",
    });
    handleNext();
    updateResults();
    // 🎯 to-do-list:
    // - update the quizContext
  };

  const handleFlipCard = () => {
    // 🎯 to-do-list :  this should trigger card flip animations
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flex flex-row justify-evenly items-center w-fit lg:w-2/5 md:mx-10 px-1 md:px-2 overflow-hidden max-w-2xl">
      <div className="w-10">
        <Button
          className="rounded-full -translate-x-5 h-20 w-20 hover:bg-transparent"
          variant="devoutline"
          onClick={handlePrev}
        >
          <ChevronLeft size={50} />
        </Button>
      </div>

      <Card className="flex flex-col justify-between w-full h-full items-stretch min-h-[450px] ">
        <CardHeader className="flex flex-row w-full justify-between items-center p-2 px-3">
          <div>timer</div>
          <div>
            {questions[currentQuestion].uuid} / {questions.length}
          </div>
        </CardHeader>

        {!showAnswer ? (
          // 👇 QUESTION CARD
          <CardContent className="flex flex-col gap-3 md:gap-8 md:py-6 xl:py-12 ">
            <CardTitle className="">
              {questions[currentQuestion].questionTitle}
              <br />
              How does it look?
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
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-red-700 rounded-bl-md"
            onClick={wrongAnswer}
          >
            wrong
          </div>
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-yellow-700 "
            onClick={handleFlipCard}
          >
            show
          </div>
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-green-700 rounded-br-md"
            onClick={() => {
              correctAnswer(questions[currentQuestion]);
            }}
          >
            correct
          </div>
        </CardFooter>
      </Card>

      <div className="w-10">
        <Button
          className="rounded-full -translate-x-5 h-20 w-20 hover:bg-transparent p-0"
          variant="devoutline"
          onClick={handleNext}
        >
          <ChevronRight size={50} />
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent;
