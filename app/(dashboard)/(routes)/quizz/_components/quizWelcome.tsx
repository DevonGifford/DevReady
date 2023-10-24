import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function QuizWelcome() {
  const router = useRouter();

  async function handleStartNow() {
    console.log("🎯event-log:  📝Quiz/Welcome/StartNow:  💢 Triggered");

    const queryParams = {
      pageId: "active-quiz",
    };

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`?${queryString}`);
  }
  
  return (
    <>
      <div>Quiz Title</div>
      <div>Quiz Image</div>
      <div>Quiz Tags</div>
      <div>Quiz Description</div>
      <div>Quiz Type</div>

      <div>
        <Button onClick={handleStartNow}>Start Now</Button>
        <Button>How it works?</Button>
      </div>
    </>
  );
}

export default QuizWelcome;
