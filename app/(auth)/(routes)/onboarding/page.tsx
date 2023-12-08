"use client";

import { useRouter, useSearchParams } from "next/navigation";
import UserOnboardingCareer from "../../_components/userCareer-onboarding";
import UserOnboardingImage from "../../_components/userImage-onboarding";
import UserOnboardingWelcome from "../../_components/userWelcome-onboarding";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingFormHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
        <div
          className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        {/* Render 'go back to previous form' button or render first form */}
        {pageId ? (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              router.back();
              console.log(
                "🎯event-log:  👋onboardingFormHandler/root:  Back Buton Clicked"
              );
            }}
          >
            <ArrowLeftIcon /> Go Back
          </Button>
        ) : (
            <UserOnboardingWelcome key="intro" />
            // <UserOnboardingCareer key="data-onboarding" />
            // <UserOnboardingImage key="image-onboarding" />
        )}

        {/* Conditional rendering based on router query */}
        {pageId === "data-onboarding" && (
          <UserOnboardingCareer key="data-onboarding" />
        )}
        {pageId === "image-onboarding" && (
          <UserOnboardingImage key="image-onboarding" />
        )}
        {pageId === "welcome-onbaording" && (
          <UserOnboardingWelcome key="welcome-onbaording" />
        )}
      </div>
    </>
  );
}
