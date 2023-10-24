import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EarnedBadges from "@/components/EarnedBadges";

import {
  DatabaseSchema,
  quickSampleDatabaseData,
} from "@/types/databaseSchema";

function QuizWelcome() {
  const router = useRouter();

  const rawData: DatabaseSchema[] = quickSampleDatabaseData;
  const tempData = rawData[0];

  // 🎯 USE EFFECT TO START CALCULATING DATA
  console.log("🎯event-log:  📝Quiz/Welcome/useEffect:  💢 Triggered");

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
      <h1 className="text-3xl underline underline-offset-8 font-bold tracking-widest">
        {tempData.setTitle}
      </h1>
      {/* Quiz Tags */}
      <EarnedBadges data={tempData.setTags} />
      {/* Quiz Image */}
      <Avatar className="h-24 w-24">
        <AvatarImage src={tempData.setImage} alt="profile-picture" />
        <AvatarFallback>{tempData.setType}</AvatarFallback>
      </Avatar>
      {/* Quiz Description */}
      <div className="text-base italic text-center">
        {tempData.setDescription}
      </div>
      {/* Quiz Type Instructions */}
      <div className="flex flex-col text-center py-4">
        <h4 className="font-semibold">
          <span>This is a </span>
          <span>{tempData.setType} quiz type</span>
        </h4>
        <h5>This means that ...</h5>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-5">
        <Button variant={"devfill"} size={"lg"} onClick={handleStartNow}>
          Start Now
        </Button>
        <Button variant={"outline"} onClick={handleHowTo}>
          How it works?
        </Button>
      </div>
    </>
  );
}

export default QuizWelcome;
