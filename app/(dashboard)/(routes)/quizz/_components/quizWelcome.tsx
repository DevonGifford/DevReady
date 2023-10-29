import { useQuizzContext } from "@/components/providers/QuizzProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatabaseSchema } from "@/types/databaseSchema";
import AssociatedTags from "@/components/AssociatedTags";
import QuizTypeInstructions, { QuizType } from "./quizTypeIntstructions";
import { ExternalLinkIcon } from "lucide-react";

interface QuizWelcomeProps {
  quizMetaData: Partial<DatabaseSchema>;
}

const QuizWelcome: React.FC<QuizWelcomeProps> = ({ quizMetaData }) => {
  const router = useRouter();
  const { resetQuizResults } = useQuizzContext();

  // ✅ HANDLE START NOW BUTTON CLICK
  function handleStartNow() {
    console.log("🎯event-log:  📝Quiz/Welcome/StartNow:  💢 Triggered");

    // - ensure quiz state is in default state
    resetQuizResults();

    // - re-route with querey params
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
        {quizMetaData.setTitle}
      </h1>
      <AssociatedTags data={quizMetaData.setTags} />
      <div className="flex flex-col justify-center items-center py-4 gap-4 md:gap-8">
        {/* Quiz Image */}
        <Avatar className="h-32 w-32">
          <AvatarImage src={quizMetaData.setImage} alt="profile-picture" />
          <AvatarFallback>{quizMetaData.setType}</AvatarFallback>
        </Avatar>
        {/* Quiz Description */}
        <div className="text-base italic text-center mx-10 max-w-2xl pb-2">
          {quizMetaData.setDescription}
        </div>
        {/* Start Button */}
        <Button variant={"devfill"} size={"lg"} onClick={handleStartNow}>
          Start Now
        </Button>
      </div>
      <div className="flex flex-col gap-3 py-4 border-4 m-10 rounded-xl">
        {/* Quiz Type Instructions */}
        <QuizTypeInstructions type={quizMetaData.setType as QuizType} />
        {/* Buttons */}
        <Button variant={"outline"} onClick={handleHowTo} className="gap-2">
          <span>more information</span>
          <ExternalLinkIcon size={16}/>
        </Button>
      </div>
    </>
  );
};

export default QuizWelcome;
