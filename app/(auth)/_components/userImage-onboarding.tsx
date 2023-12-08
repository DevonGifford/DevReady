"use client";

import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";
import { Spinner } from "@/components/Spinner";
import { useUserContext } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/UserProfile";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UserOnboardingImage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userProfile, updateUserDataProcess } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const username = searchParams.get("username");
  const career_title = searchParams.get("career_title");
  const career_level = searchParams.get("career_level");
  const experience_level = searchParams.get("experience_level");

  console.log("username", username);
  console.log("career_title", career_title);
  console.log("career_level", career_level);
  console.log("experience_level", experience_level);

  // ⌛ HANDLE COMPLETE BUTTON:
  const handleCompleteOnboarding = () => {
    console.log(
      "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  💢 Triggered"
    );

    //👇 handle user data (partial)
    if (userProfile) {
      setIsLoading(true); //- Set loading spinner
      const updatedUserData: Partial<UserProfile> = {
        account: {
          ...userProfile?.account,
          username: username || "",
          career_title: career_title || "",
          career_level: Number(career_level) || 0,
          experience_level: Number(experience_level) || 0,
        },
      };

      //👇 update context & userdoc
      updateUserDataProcess(userProfile.uuid, updatedUserData)
        .then(() => {
          console.log(
            "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  ✔ Success"
          );
          setIsLoading(false); //- Reset loading state
          setSubmitted(true); //- Set achieved state
          setTimeout(() => {
            setSubmitted(false); //- Reset achieved state after a while
            //- send user to dashboard
          }, 2000);
          router.push('/dashboard')
        })
        .catch((error) => {
          console.log(
            "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  ❌ Something went wrong, error: ",
            error
          );
          setIsLoading(false); //- Reset loading state
        });
      } else {
      console.log(
        "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  ❌ Hmmm something went wrong in registration: "
      );
      setIsLoading(false); //- Reset loading state
    }
  };

  return (
    <div className="z-10 flex flex-col items-center text-center sm:mx-auto -translate-y-10">
      {/* HEADING */}
      <div className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-2 sm:text-3xl md:text-4xlsm:mx-10">
        <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-bold transition-colors">
          and the{" "}
          <span className="font-display text-devready-green">
            final step...
          </span>
        </h1>

        <p className="max-w-md text-accent-foreground/80 transition-colors text-lg font-bold md:text-lg italic">
          Pick a custom avatar
          <br />
        </p>
      </div>

      <ProfilePictureUploader userDocId={userProfile?.uuid!} />

      {/* <div className="h-[230px] border-2 w-full max-w-sm justify-center sm:mb-5">
        {" "}
      </div> */}

      <Button className="px-10 font-medium text-base" onClick={handleCompleteOnboarding}>
      {isLoading ? <Spinner /> : submitted ? <Check /> : "Complete"}
      </Button>
    </div>
  );
}
