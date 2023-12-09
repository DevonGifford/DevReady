"use client";

import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { EXIT_NORMAL_ALL } from "@/constants/onboarding-index";

// 👇 FORM SCHEMA : Data Onboarding Form
const userCareerFormSchema = z.object({
  career_level: z.number().min(0, "⚠ Please set your level").optional(),
  experience_level: z.number().min(0, "⚠ Please set your level").optional(),
  ztm_student: z.boolean().default(false).optional(),
});
type UserOnboardingValues = z.infer<typeof userCareerFormSchema>;
// ⌛ PLACEHOLDER :  Default form values
const defaultValues: Partial<UserOnboardingValues> = {
  // 🎯 to-do-list : remove
};

export default function UserOnbaordingCareer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ ZOD-FORM HOOK :  custom hook initializes form instance,
  const form = useForm<UserOnboardingValues>({
    resolver: zodResolver(userCareerFormSchema),
    defaultValues,
  });

  // ⌛ SUBMIT FORM -
  function onSubmit(data: UserOnboardingValues) {
    console.log("🎯event-log:  📝onboarding/career/onSubmit:  💢 Triggered");

    const queryParams = {
      pageId: "image-onboarding",
      username: searchParams.get("username")!,
      career_title: searchParams.get("career_title")!,
      career_level: data.career_level?.toString() || "",
      experience_level: data.experience_level?.toString() || "",
    };

    const queryString = new URLSearchParams(queryParams).toString();
    console.log(
      "🎯event-log:  📝onboarding/career/onSubmit:",
      "🔗 new quereyParams",
      queryParams,
      "🔗 new quereyString",
      queryString
    );

    // Update the URL with the form data as query parameters
    router.push(`?${queryString}`);
  }

  return (
    <div className="z-10 mx-5 flex flex-col items-center text-center sm:mx-auto">
      {/* HEADING */}
      <div className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-8 sm:text-3xl sm:pb-12 md:text-4xl md:pb-16">
        <motion.h1
          className="font-display font-bold  transition-colors "
          initial={{ opacity: 0, x: "100vw" }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
          }}
          exit={EXIT_NORMAL_ALL.exit}
          transition={EXIT_NORMAL_ALL.exit.transition}
        >
          Set your{" "}
          <span className="font-display text-devready-green">
            current level
          </span>
        </motion.h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(
              "🎯event_log:  📝-form submitted with following form-data: ",
              data
            );
            onSubmit(data);
          })}
          className="space-y-[calc(100vw-90vw)] lg:space-y-24 w-full "
        >
          {/* Career Level */}
          <FormField
            control={form.control}
            name="career_level"
            render={({ field: { value, onChange } }) => (
              <motion.div
                className="font-display font-bold  transition-colors "
                initial={{ opacity: 0, x: "100vw" }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 },
                }}
                exit={EXIT_NORMAL_ALL.exit}
                transition={EXIT_NORMAL_ALL.exit.transition}
              >
                <FormItem className="space-y-2 py-1">
                  <div className="flex flex-col items-center pb-4 tracking-wider">
                    <FormLabel>Professional Stage</FormLabel>
                    <FormDescription>
                      Indicate your current professional stage.
                    </FormDescription>
                  </div>

                  <FormControl className="mx-4 w-11/12">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[0]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <div className="flex justify-between text-xs text-muted-foreground ml-1 pr-[calc(100vw+1rem]">
                    <div className="flex flex-col text-center">
                      <p>Aspiring</p>
                      <p className="w-full">Dev</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p>Junior</p>
                      <p>Dev</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p>Mid-Level</p>
                      <p>Dev</p>
                    </div>
                    <div className="flex flex-col items-end text-center">
                      <p>Senior</p>
                      <p className="w-full">Dev</p>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />

          {/* Experience level */}
          <FormField
            control={form.control}
            name="experience_level"
            render={({ field: { value, onChange } }) => (
              <motion.div
                className="font-display font-bold  transition-colors "
                initial={{ opacity: 0, x: "100vw" }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeInOut", delay: 0.6 },
                }}
                exit={EXIT_NORMAL_ALL.exit}
                transition={EXIT_NORMAL_ALL.exit.transition}
              >
                <FormItem className="space-y-2 py-2">
                  <div className="flex flex-col items-center pb-4 tracking-wider">
                    <FormLabel>Experience Level</FormLabel>
                    <FormDescription>
                      Indicate your experience in years of work.
                    </FormDescription>
                  </div>

                  <FormControl className="mx-4 w-11/12">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[0]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>

                  <div className="flex justify-between text-xs text-muted-foreground ml-1 pr-[calc(100vw+1rem]">
                    <div className="flex flex-col text-center">
                      <p>&gt;6</p>
                      <p className="w-full">Months</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p>1</p>
                      <p>Year</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p>3</p>
                      <p>Years</p>
                    </div>
                    <div className="flex flex-col items-end text-center">
                      <p>5+</p>
                      <p className="w-full">Years</p>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />

          <motion.div
            className="font-display font-bold  transition-colors "
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
              type="submit"
              className="px-10 font-medium text-base"
              onClick={() => {}}
            >
              Next page
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
