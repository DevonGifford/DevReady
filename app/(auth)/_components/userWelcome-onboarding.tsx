"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { careerList } from "@/constants/userforms-index";

// 👇 FORM SCHEMA : Welcome Onboarding Form
const userOnboardingFormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "⚠ Username must be at least 5 characters.",
    })
    .max(16, {
      message: "⚠ Username must not be longer than 16 characters.",
    }),
  career_title: z.string({
    required_error: "⚠ Please pick your career .",
  }),
});
type WelcomeOnboardingValues = z.infer<typeof userOnboardingFormSchema>;
// ⌛ PLACEHOLDER :  Default form values
const defaultValues: Partial<WelcomeOnboardingValues> = {
  // 🎯 to-do-list : remove
};

export default function UserOnboardingWelcome() {
  const router = useRouter();

  // ✅ ZOD-FORM HOOK :  custom hook initializes form instance,
  const form = useForm<WelcomeOnboardingValues>({
    resolver: zodResolver(userOnboardingFormSchema),
    defaultValues,
  });

  // ⌛ SUBMIT FORM -
  function onSubmit(data: WelcomeOnboardingValues) {
    console.log("🎯event-log:  📝onboarding/career/onSubmit:  💢 Triggered");

    console.log("here is the data submitted in this form");
  }

  return (
    <>
      <div className="z-10 flex flex-col items-center text-center sm:mx-auto -translate-y-10 md:-translate-y-20">
        {/* HEADING */}
        <div className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-5 sm:text-3xl sm:pb-8 md:text-4xl md:pb-10 sm:mx-10">
          <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-bold transition-colors">
            Welcome to your{" "}
            <span className="font-display text-devready-green">
              new account
            </span>
          </h1>
          <p className="max-w-md text-accent-foreground/80 transition-colors text-xs md:text-lg italic">
            Buckle up as we gear you up for the job market.
            <br />
          </p>
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
            className="flex flex-col justify-center items-center text-center space-y-[calc(100vw-95vw)] lg:space-y-16 w-full  "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center text-center">
                  <FormLabel className="flex text-center justify-center capitalize text-lg">
                    Enter a display name
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Anonymous"
                      className="w-[150px] text-center bg-transparent border-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="career_title"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center text-center">
                  <FormLabel className="capitalize text-lg">
                    Pick your dream career
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          role="combobox"
                          className={cn(
                            " flex flex-col text-base rounded-full",
                            !field.value &&
                              "text-muted-foreground text-devready-green"
                          )}
                        >
                          {field.value
                            ? careerList.find(
                                (language) => language.label === field.value
                              )?.label
                            : ""}
                          <ChevronDown className="h-10 w-10 font-bold shrink-0 pt-1" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command className=" overflow-y-auto max-h-[420px]">
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup className="overflow-y-auto max-h-[300px]">
                          {careerList.map((career) => (
                            <CommandItem
                              value={career.label}
                              key={career.label}
                              onSelect={() => {
                                form.setValue("career_title", career.label);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  career.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {career.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
