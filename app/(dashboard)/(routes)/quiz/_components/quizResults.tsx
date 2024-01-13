import { useRouter } from "next/navigation";
import { useQuizContext } from "@/components/providers/QuizProvider";
import { useUserContext } from "@/components/providers/UserProvider";
import { CustomPieChart } from "./pieChart";
import { GradeStamp } from "./gradeStamp";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { HomeIcon, LucideRepeat2 } from "lucide-react";

import { DatabaseSchema } from "@/types/databaseSchema";
import { usersInput } from "@/types/quizzSchema";
import { UserProfile } from "@/types/UserProfile";

function QuizResults({
  quizMetaData,
}: {
  quizMetaData: DatabaseSchema | null;
}) {
  const router = useRouter();
  const { quizResults, resetQuizResults } = useQuizContext();
  const { userProfile, updateUserDataProcess } = useUserContext();

  if (!quizMetaData) {
    return <Spinner />;
  }

  const calculatePieChart = () => {
    const totalQuestionsCount = 3; //🎯 UPDATE REQUIRED - REMOVE HARD CODED

    const correctCount =
      quizResults?.usersAnswers.filter((answer: usersInput) =>
        answer.selectedAnswer.includes("True")
      ).length || 0;

    const incorrectCount =
      quizResults?.usersAnswers.filter((answer: usersInput) =>
        answer.selectedAnswer.includes("False")
      ).length || 0;

    const skippedCount = totalQuestionsCount - correctCount - incorrectCount;

    const pieData = [
      { name: "Correct", value: (correctCount / totalQuestionsCount) * 100 },
      {
        name: "Incorrect",
        value: (incorrectCount / totalQuestionsCount) * 100,
      },
      { name: "Skipped", value: (skippedCount / totalQuestionsCount) * 100 },
    ];
    return pieData;
  };

  const calculateGradeStamp = () => {
    const totalQuestionsCount = 3; //🎯 UPDATE REQ _ HARD CODED

    const correctCount =
      quizResults?.usersAnswers.filter((answer: usersInput) =>
        answer.selectedAnswer.includes("True")
      ).length || 0;
    const score = (correctCount / totalQuestionsCount) * 100;
    return score;
  };

  const updateDatabaseHelper = () => {
    const newResult = {
      quizID: quizResults?.quizUuid || "unknown",
      incorrectQuestionIDs:
        quizResults?.usersAnswers
          .filter(
            (answer: { selectedAnswer: string }) =>
              answer.selectedAnswer === "False"
          )
          .map((answer: { questionUuid: any }) => answer.questionUuid) || [],
    };
    const newData: Partial<UserProfile> = {
      history: {
        quizCompleted: [
          {
            quizID: newResult.quizID,
            incorrectQuestionIDs: newResult.incorrectQuestionIDs,
          },
        ],
      },
    };
    updateUserDataProcess(userProfile?.uuid!, newData); //-update user doc & local-storage
  };

  function handleRestart() {
    updateDatabaseHelper();
    resetQuizResults();
    router.back();
  }

  function handleHome() {
    updateDatabaseHelper();
    resetQuizResults();
    router.push(`/dashboard`);
  }

  return (
    <>
      <article className="flex flex-col justify-center items-center space-y-6 -translate-y-6">
        <header>
          <h1 className="text-3xl underline underline-offset-8 font-bold tracking-widest pb-10 text-center">
            {quizMetaData?.setTitle || "Quiz Title"} Results
          </h1>
        </header>

        <div className="flex flex-col-reverse xl:flex-row justify-between ">
          <section className="flex flex-col w-full">
            <CustomPieChart pieData={calculatePieChart()} />
          </section>
          <section>
            <GradeStamp score={calculateGradeStamp()} />
          </section>
        </div>

        <section className="flex flex-col gap-12 pt-10">
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
        </section>
      </article>
    </>
  );
}

export default QuizResults;
