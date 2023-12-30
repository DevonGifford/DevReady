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

  const handleFlipCard = () => {
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
    <div className="flex flex-row justify-evenly items-center w-fit lg:w-2/5 md:mx-10 px-1 md:px-2 overflow-hidden">
      <div className="w-10">
        <Button
          className="rounded-full -translate-x-5 h-20 w-20 hover:bg-transparent"
          variant="devoutline"
          onClick={handlePrev}
        >
          <ChevronLeft size={100} />
        </Button>
      </div>

      <Card className="flex flex-col items-center justify-center w-full">
        <CardHeader className="flex flex-row w-full justify-between items-center p-2 px-3">
          <div>timer</div>
          <div>{questions[currentQuestion].id} / {questions.length}</div>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 md:gap-8 md:py-6 xl:py-12">
          <CardTitle className="">
            {questions[currentQuestion].question}
            <br />
            How does it look?
          </CardTitle>

          <CardDescription>
            I could give a little more context here , if it is required that
            is...
          </CardDescription>
        </CardContent>
        <CardFooter className="p-0 w-full flex flex-row justify-between">
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-red-700 rounded-bl-md"
            onClick={() => {
              wrongAnswer;
            }}
          >
            wrong
          </div>
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-yellow-700 "
            onClick={wrongAnswer}
          >
            show
          </div>
          <div
            className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-green-700 rounded-br-md"
            onClick={correctAnswer}
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

//   return (
//     <>
//       <div className="flex justify-center items-center">
//         <Carousel className="w-3/4 max-w-xs sm:w-full sm:max-w-md  md:max-w-lg">
//           <CarouselContent>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <CarouselQuizz
//                 key={index}
//               >
// <Card className="flex flex-col items-center justify-center">
//   <CardHeader className="flex flex-row w-full justify-between items-center p-2 px-3">
//     <div>timer</div>
//     <div>{index + 1}/5</div>
//   </CardHeader>
//   <CardContent className="flex flex-col gap-3 md:gap-8 md:py-6 xl:py-12">
//     <CardTitle className="">
//       This is the Question that will be asked to the student.
//       <br />
//       How does it look?
//     </CardTitle>
//     <CardDescription>
//       I could give a little more context here , if it is
//       required that is...
//     </CardDescription>
//   </CardContent>
//   <CardFooter className="p-0 w-full flex flex-row justify-between">
//     <div
//       className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-red-700 rounded-bl-md"
//       onClick={() => {
//         wrongAnswer;
//       }}
//     >
//       wrong
//     </div>
//     <div
//       className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-yellow-700 "
//       onClick={wrongAnswer}
//     >
//       show
//     </div>
//     <div
//       className="cursor-pointer font-bold tracking-wider text-sm sm:text-base md:text-lg w-full flex justify-center items-center h-16 hover:bg-green-700 rounded-br-md"
//       onClick={correctAnswer}
//     >
//       correct
//     </div>
//   </CardFooter>
// </Card>
//               </CarouselQuizz>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>

//       {/* <div className="flex flex-row justify-center items-center w-full lg:w-2/5 md:mx-10 px-1 md:px-2 ">
//         <Button
//           className="rounded-full translate-x-3 h-20 w-20"
//           variant="devoutline"
//           onClick={handlePrev}
//         >
//           <ChevronLeft size={50} />
//         </Button>

//         <Card className="flex flex-col items-center justify-center p-10 gap-4 w-full">
//           <CardHeader>
//             <CardTitle>Question no. {questions[currentQuestion].id}</CardTitle>
//           </CardHeader>

//           <CardDescription className="text-xl">
//             {questions[currentQuestion].question}
//           </CardDescription>
//           <Button size={"sm"} variant={"devoutline"} onClick={handleFlipCard}>
//             {showAnswer ? "Hide Answer" : "Show Answer"}
//           </Button>

//           <CardContent>
//             {showAnswer && (
//               <div className="flex justify-center items-center text-center">
//                 <p>{questions[currentQuestion].answer}</p>
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="w-full">
//             {showAnswer && (
//               <div className="flex flex-row w-full justify-between items-center text-center">
//                 <Button
//                   variant="devoutline"
//                   className="rounded-full h-20 w-20"
//                   onClick={correctAnswer}
//                 >
//                   <Check size={50} />
//                 </Button>
//                 <Button
//                   variant="devoutline"
//                   className="rounded-full h-20 w-20"
//                   onClick={skipQuestion}
//                 >
//                   <HelpCircle size={40} />
//                 </Button>
//                 <Button
//                   variant="devoutline"
//                   className="rounded-full h-20 w-20"
//                   onClick={wrongAnswer}
//                 >
//                   <X size={50} />
//                 </Button>
//               </div>
//             )}
//           </CardFooter>
//         </Card>

//         <Button
//           className="rounded-full -translate-x-3 h-20 w-20"
//           variant="devoutline"
//           onClick={handleNext}
//         >
//           <ChevronRight size={50} />
//         </Button>
//       </div> */}
//     </>
//   );
// };

// export default QuizComponent;
