"use client";

import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";
import { useUserContext } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserOnboardingImage() {
  const router = useRouter();
  const { userProfile, updateUserDataProcess } = useUserContext();
  return (
    <div className="z-10 flex flex-col items-center text-center sm:mx-auto -translate-y-10">
      {/* HEADING */}
      <div className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-2 sm:text-3xl md:text-4xlsm:mx-10">
        <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-bold transition-colors">
          and the{" "}
          <span className="font-display text-devready-green">final step...</span>
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

      <Button className="px-10 font-medium text-base" onClick={() => {}}>
        Complete
      </Button>
    </div>
  );
}
 