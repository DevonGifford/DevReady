"use client";

import React, { useState } from "react";
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
import toast from "react-hot-toast";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface QuizProps {
  questions: Question[];
}

const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      console.log(currentQuestion);
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    // 🎯 to-do-list :  this should trigger card flip, reveal answer and answerButtons
    setShowAnswer(!showAnswer);
  };

  const correctAnswer = () => {
    toast("Well done!", {
      icon: "👏",
    });
    handleNext();
    // 🎯 to-do-list:  
  };

  const wrongAnswer = () => {
    toast("Wrong Answer!", {
      icon: "❌",
    });
    handleNext();
    // 🎯 to-do-list:
  };

  const skipQuestion = () => {
    toast("Next time", {
      icon: "🧠",
    });
    handleNext();
    // 🎯 to-do-list:
  };

  return (
    <div className="flex flex-row justify-center items-center w-full lg:w-2/5 md:mx-10 px-1 md:px-2 ">
      <Button
        className="rounded-full translate-x-3 h-20 w-20"
        variant="devoutline"
        onClick={handlePrev}
      >
        <ChevronLeft size={50} />
      </Button>

      <Card className="flex flex-col items-center justify-center p-10 gap-4 w-full">
        <CardHeader>
          <CardTitle>Question no. {questions[currentQuestion].id}</CardTitle>
        </CardHeader>

        <CardDescription className="text-xl">
          {questions[currentQuestion].question}
        </CardDescription>
        <Button size={"sm"} variant={"devoutline"} onClick={handleShowAnswer}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>

        <CardContent>
          {showAnswer && (
            <div className="flex justify-center items-center text-center">
              <p>{questions[currentQuestion].answer}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="w-full">
          {showAnswer && (
            <div className="flex flex-row w-full justify-between items-center text-center">
              <Button
                variant="devoutline"
                className="rounded-full h-20 w-20"
                onClick={correctAnswer}
              >
                <Check size={50} />
              </Button>
              <Button
                variant="devoutline"
                className="rounded-full h-20 w-20"
                onClick={skipQuestion}
              >
                <HelpCircle size={40} />
              </Button>
              <Button
                variant="devoutline"
                className="rounded-full h-20 w-20"
                onClick={wrongAnswer}
              >
                <X size={50} />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <Button
        className="rounded-full -translate-x-3 h-20 w-20"
        variant="devoutline"
        onClick={handleNext}
      >
        <ChevronRight size={50} />
      </Button>
    </div>
  );
};

export default QuizComponent;
