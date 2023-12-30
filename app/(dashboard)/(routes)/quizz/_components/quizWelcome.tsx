import { useQuizzContext } from "@/components/providers/QuizzProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DatabaseSchema,
  quickSampleDatabaseData,
} from "@/types/databaseSchema";
import AssociatedTags from "@/components/AssociatedTags";
import QuizTypeInstructions, { QuizType } from "./quizTypeIntstructions";

function QuizWelcome() {
  const router = useRouter();
  const {} = useQuizzContext();

  // 🦺 TEMPORARY SOLUTION FOR DEVELOPMENT - MOCKING DATA
  const rawData: DatabaseSchema[] = quickSampleDatabaseData;
  const tempData = rawData[0];

  // 🎯 HANDLE START NOW BUTTON CLICK
  // - setQuizzDatam Context
  // - handleLoading State's
  // - route with querey params
  function handleStartNow() {
    console.log("🎯event-log:  📝Quiz/Welcome/StartNow:  💢 Triggered");

    const queryParams = {
      pageId: "active-quiz",
    };

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`?${queryString}`);
  }

  // 🎯 HANDLE HOW IT WORKS BUTTON CLICK
  function handleHowTo() {}

  return (
    <>
      <h1 className="text-xl sm:text-3xl underline underline-offset-8 font-bold tracking-widest">
        {tempData.setTitle}
      </h1>
      <AssociatedTags data={tempData.setTags} />
      <div className="flex flex-col justify-center items-center py-4 gap-4 md:gap-8">
        {/* Quiz Image */}
        <Avatar className="h-32 w-32">
          <AvatarImage src={tempData.setImage} alt="profile-picture" />
          <AvatarFallback>{tempData.setType}</AvatarFallback>
        </Avatar>
        {/* Quiz Description */}
        <div className="text-base italic text-center mx-10 max-w-2xl pb-2">
          {tempData.setDescription}
        </div>
        {/* Start Button */}
        <Button variant={"devfill"} size={"lg"} onClick={handleStartNow}>
          Start Now
        </Button>
      </div>
      <div className="flex flex-col gap-3 py-4 border-4 m-10 rounded-xl">
        {/* Quiz Type Instructions */}
        <QuizTypeInstructions type={tempData.setType as QuizType} />
        {/* Buttons */}
        <Button variant={"outline"} onClick={handleHowTo}>
          How it works?
        </Button>
      </div>
    </>
  );
}

export default QuizWelcome;
