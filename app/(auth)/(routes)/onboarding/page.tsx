"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AnimatePresence, motion } from "framer-motion";
import UserOnboardingCareer from "../../_components/userCareer-onboarding";
import UserOnboardingImage from "../../_components/userImage-onboarding";
import UserOnboardingWelcome from "../../_components/userWelcome-onboarding";
import { EXIT_NORMAL_ALL } from "@/constants/onboarding-index";

export default function OnboardingFormHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  return (
    <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
      <AnimatePresence mode="wait">
        {/* Conditional rendering based on router query */}
        {pageId === "data-onboarding" && (
          <UserOnboardingCareer key="data-onboarding" />
        )}
        {pageId === "image-onboarding" && (
          <UserOnboardingImage key="image-onboarding" />
        )}

        {/* Render 'go back to previous form' button or render first form */}
        {pageId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            exit={EXIT_NORMAL_ALL.exit}
          >
            <Button
              className="text-xs font-bold translate-y-1/2"
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeftIcon size={16} /> Go Back
            </Button>
          </motion.div>
        ) : (
          <UserOnboardingWelcome key="intro" />
          // <UserOnboardingCareer key="data-onboarding" />  //👉 for development use
          // <UserOnboardingImage key="image-onboarding" />  //👉 for development use
        )}
      </AnimatePresence>
    </div>
  );
}
