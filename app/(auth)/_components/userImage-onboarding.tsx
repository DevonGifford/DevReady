"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";
import { useUserContext } from "@/components/providers/UserProvider";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import { EXIT_NORMAL_ALL } from "@/constants/onboarding-index";
import { UserProfile } from "@/types/UserProfile";

export default function UserOnboardingImage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userProfile, updateUserDataProcess } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ SUBMIT ONBOARDING DATA :  updates the usercontext, db and then routes to dashboard:
  const handleCompleteOnboarding = () => {
    console.log(
      "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  💢 Triggered"
    );

    //👇 handling the user data
    if (userProfile) {
      setIsLoading(true); //-Set loading spinner
      const updatedUserData: Partial<UserProfile> = {
        account: {
          ...userProfile.account,
          username: searchParams.get("username") || "",
          career_title: searchParams.get("career_title") || "",
          career_level: Number(searchParams.get("career_level")) || 0,
          experience_level: Number(searchParams.get("experience_level")) || 0,
          userimage: userProfile.account.userimage || "",
        },
      };
      //👇 update userContext & userDatabase
      updateUserDataProcess(userProfile.uuid, updatedUserData)
        .then(() => {
          console.log(
            "🎯event-log:  👋onboarding/image/handleCompleteOnboarding:  ✔ Success"
          );
          setIsLoading(false); //- Reset loading state
          setSubmitted(true); //- Set achieved state
          setTimeout(() => {
            setSubmitted(false); //- Reset achieved (timeout)
          }, 1500);
          //👇 send user to dashboard
          router.push("/dashboard");
        })
        // ✖ Handle error states
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
        <motion.h1
          initial={{ opacity: 0, x: "100vw" }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
          }}
          exit={EXIT_NORMAL_ALL.exit}
          transition={EXIT_NORMAL_ALL.exit.transition}
          className="font-display text-xl sm:text-3xl md:text-4xl font-bold transition-colors"
        >
          and the{" "}
          <span className="font-display text-devready-green">
            final step...
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: "100vw" }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 },
          }}
          exit={EXIT_NORMAL_ALL.exit}
          transition={EXIT_NORMAL_ALL.exit.transition}
          className="max-w-md text-accent-foreground/80 transition-colors text-lg font-bold md:text-lg italic"
        >
          Pick a custom avatar
          <br />
        </motion.p>
      </div>
      
      {/* CUSTOM IMAGE UPLOADER */}
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeInOut", delay: 0.6 },
        }}
        exit={EXIT_NORMAL_ALL.exit}
        transition={EXIT_NORMAL_ALL.exit.transition}
      >
        <ProfilePictureUploader userDocId={userProfile?.uuid!} />
      </motion.div>
      
      {/* ONBOARDING_COMPLETE SUBMIT BUTTON */}
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeInOut", delay: 0.8 },
        }}
        exit={EXIT_NORMAL_ALL.exit}
        transition={EXIT_NORMAL_ALL.exit.transition}
      >
        <Button
          className="px-10 font-medium text-base"
          onClick={handleCompleteOnboarding}
        >
          {isLoading ? <Spinner /> : submitted ? <Check /> : "Complete"}
        </Button>
      </motion.div>
    </div>
  );
}
