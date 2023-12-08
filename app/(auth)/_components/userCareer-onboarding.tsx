"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

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

  // ✅ ZOD-FORM HOOK :  custom hook initializes form instance,
  const form = useForm<UserOnboardingValues>({
    resolver: zodResolver(userCareerFormSchema),
    defaultValues,
  });

  // ⌛ SUBMIT FORM -
  function onSubmit(data: UserOnboardingValues) {
    console.log("🎯event-log:  📝onboarding/career/onSubmit:  💢 Triggered");

    console.log("here is the data submitted in this form");
  }

  return (
    <>
      <div className="z-10 mx-5 flex flex-col items-center text-center sm:mx-auto">
        {/* HEADING */}
        <div className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-5 sm:text-3xl sm:pb-8 md:text-4xl md:pb-10">
          <h1 className="font-display font-bold  transition-colors ">
            Set your{" "}
            <span className="font-display text-devready-green">
              current level
            </span>
          </h1>
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
            className="space-y-[calc(100vw-95vw)] lg:space-y-16 w-full "
          >
            {/* Career Level */}
            <FormField
              control={form.control}
              name="career_level"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-2">
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
              )}
            />

            {/* Experience level */}
            <FormField
              control={form.control}
              name="experience_level"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-1">
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
              )}
            />

            {/* Switches */}
            {/* <div className="flex flex-row justify-center items-center">
              <FormField
                control={form.control}
                name="ztm_student"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-6 md:gap-10 justify-between rounded-lg border p-3 ">
                    <div className="text-start">
                      <FormLabel className="text-base">ZTM Alumni</FormLabel>
                      <FormDescription className="text-xs md:text-sm pt-1">
                        Currently a ZTM student or alumni?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}

            <Button
              type="submit"
              className="px-10 font-medium text-base"
              onClick={() => {}}
            >
              Next page
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
