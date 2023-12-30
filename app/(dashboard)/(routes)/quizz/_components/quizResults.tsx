import { useQuizzContext } from "@/components/providers/QuizzProvider";
import { useUserContext } from "@/components/providers/UserProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HomeIcon, LucideArrowDownSquare, LucideRepeat2 } from "lucide-react";

import CustomPieChart from "./pieChart";
import GradeStamp from "./gradeStamp";

import { DatabaseSchema } from "@/types/databaseSchema";
import { QuizResultsSchema } from "@/types/quizzSchema";

import mockDB from "@/constants/mockDB.json"; // 👈🦺 Temporary solution for development purposes (mock Data)

function QuizResults() {
  const router = useRouter();
  const {} = useQuizzContext();
  const {} = useUserContext();

  // 👇🦺 Temporary solution for development purposes (mock Data)
  const quizDataMock: DatabaseSchema = mockDB[0];
  const pieDataMock = [
    { name: "Correct", value: 30 },
    { name: "Incorrect", value: 25 },
    { name: "Skipped", value: 45 },
  ];

  // 🎯 CALCULATE GRADE STAMP
  function manageGradeStamp() {}

  // 🎯 CALCULATE QUIZ GRAPH
  function manageGraphData() {}

  // 🎯 HANDLE RESTART FLASHCARD GAME
  function handleRestart() {
    // - router.push
    // - same set or recalculate? - sameset..
    // - update context with this data?  - yes, locally....
    const queryParams = {
      pageId: "",
    };
    const queryString = new URLSearchParams(queryParams).toString();
    router.back();
  }

  // 🎯 HANDLE GO BACK HOME
  function handleHome() {
    // - router.push
    // - update user Document with new data
    // - update local Storage with new data
    router.push(`/dashboard`);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-6 -translate-y-6">
        <h1 className="text-3xl underline underline-offset-8 font-bold tracking-widest pb-10 text-center">
          {quizDataMock.setTitle} Results
        </h1>

        <div className="flex flex-col-reverse xl:flex-row justify-between ">
          <div className="flex flex-col w-full">
            <CustomPieChart pieData={pieDataMock} />
          </div>
          <GradeStamp score={91} />
        </div>

        <div className="flex flex-col gap-5 pt-10">
          <Button size={"lg"} variant={"devfill"} onClick={handleRestart}>
            <LucideRepeat2 size={40} className="mr-5" />
            Try Again
          </Button>
          <Button
            variant={"devoutline"}
            className=" rounded-md"
            size={"default"}
            onClick={handleHome}
          >
            <HomeIcon size={20} className="mr-2" />
            Back Home
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <h4 className="text-xl  font-bold tracking-widest">Study Result</h4>
          <LucideArrowDownSquare />
        </div>
      </div>
    </>
  );
}

export default QuizResults;
