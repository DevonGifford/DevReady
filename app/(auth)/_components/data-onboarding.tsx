"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DataOnboardingPage() {
  const router = useRouter();
  return (
    <>
      <div>DataOnboardingPage</div>;
      <div className="z-10">
        <div className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto">
          <div className="flex flex-col justify-center text-center items-center gap-2">
            <h1 className="font-display text-3xl font-bold text-foreground transition-colors sm:text-5xl">
              What level{" "}
              <span className="font-bold tracking-tighter text-devready-green">
                do you think you
              </span>{" "}
              are currently at?
            </h1>
            <p className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg">
              Buckle up as we gear you up for the job market.
              <br />
              <span className=" italic">Ready to test your readiness?</span>
            </p>
          </div>
          <div>
            <div className="flex flex-col w-full items-center justify-center text-center gap-6 sm:justify-between max-w-3xl sm:pr-10">
              {/* LEVEL */}
              <div className="flex flex-col justify-center items-center text-center gap-3">
                <h1 className=" text-2xl font-bold text-foreground transition-colors">
                  Select range brother
                </h1>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex flex-col justify-center text-center items-center w-[150px] rounded-lg p-2"
                />
              </div>
              {/* EXPERIENCE */}
              <div className="flex flex-col justify-center items-center text-center gap-3">
                <h1 className=" text-2xl font-bold text-foreground transition-colors">
                  Select range brother 
                </h1>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex flex-col justify-center text-center items-center w-[150px] rounded-lg p-2"
                />
              </div>
              {/* SKILLS */}
              <div className="flex flex-col justify-center items-center text-center gap-3">
                <h1 className=" text-2xl font-bold text-foreground transition-colors">
                  Select your skills 
                </h1>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex flex-col justify-center text-center items-center w-[150px] rounded-lg p-2"
                />
              </div>
              {/* SUBMIT BUTTON */}
              <Button
                className="px-10 font-medium text-base"
                onClick={() => {}}
              >
                Next page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
