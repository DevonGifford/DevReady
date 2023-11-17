import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { userProfileForms } from "@/constants/navigation-index";

export const UserFormHandler = () => {
  const [currentForm, setCurrentForm] = useState("Account");

  return (
    <div className="h-full overflow-auto hide-scrollbar">
      <SheetHeader>
        <SheetTitle>Edit your profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when youre done.
        </SheetDescription>
        {/* Handle Selecting Forms */}
        <div className="h-full overflow-y-auto flex space-y-8 flex-row lg:space-x-12 lg:space-y-0 md:px-4 md:py-3">
          <aside className="-mx-3 lg:w-1/5 flex space-x-2 flex-row items-center justify-start sm:justify-normal sm:flex-row overflow-x-aut scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            {Object.keys(userProfileForms).map((key) => (
              <Button
                key={key}
                onClick={() => setCurrentForm(key)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-primary max-w-[120px] no-underline",
                  currentForm === key
                    ? "bg-muted hover:bg-muted text-devready-green"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                {key}
              </Button>
            ))}
          </aside>
        </div>
        <Separator className="mt-20" />
      </SheetHeader>
      {/* Handle The Different Forms */}
      <div className="space-y-6 pt-5 px-2">
        {userProfileForms[currentForm] && (
          <>
            <div>
              <h3 className="text-xl font-semibold">Update {currentForm}</h3>
              <p className="text-sm text-muted-foreground">
                {userProfileForms[currentForm].description}
              </p>
            </div>
            {userProfileForms[currentForm].component}
          </>
        )}
      </div>
    </div>
  );
};
