"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronDown } from "lucide-react";
import {
  Form,
  FormControl,
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
import { EXIT_NORMAL_ALL } from "@/constants/onboarding-index";

// 👇 FORM SCHEMA : Welcome Onboarding Form
const userOnboardingFormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(16, {
      message: "Username must not be longer than 16 characters.",
    }),
  career_title: z.string(),
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

  // ✅ SUBMIT ONBOARDING FORM - Navigates to the next onboarding page with submitted data.
  async function onSubmit(data: WelcomeOnboardingValues) {
    console.log("🎯event-log:  📝onboarding/welcome/onSubmit:  💢 Triggered");

    const queryParams = {
      pageId: "data-onboarding",
      username: data.username,
      career_title: data.career_title,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`?${queryString}`);
  }

  return (
    <>
      <div className="z-10 flex flex-col items-center text-center sm:mx-auto -translate-y-12 lg:-translate-y-20 ">
        {/* HEADING */}
        <div data-testid='welcome-header' className="flex flex-col justify-center text-center items-center gap-2 text-2xl pb-8 sm:text-3xl sm:pb-10 md:text-4xl md:pb-12 sm:mx-16">
          <motion.h1
            className="font-display text-xl sm:text-3xl md:text-4xl font-bold transition-colors"
            variants={{
              hidden: { opacity: 0, scale: 1.8 },
              show: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.4,
                  type: "spring",
                  bounce: 0.4,
                  delay: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
            exit={EXIT_NORMAL_ALL.exit}
            transition={EXIT_NORMAL_ALL.exit.transition}
          >
            Welcome to your{" "}
            <span className="font-display text-devready-green">
              new account
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.1, type: "spring", delay: 0.8 },
              },
            }}
            initial="hidden"
            animate="show"
            exit={EXIT_NORMAL_ALL.exit}
            transition={EXIT_NORMAL_ALL.exit.transition}
            className="max-w-md text-accent-foreground/80 transition-colors text-xs md:text-lg italic"
          >
            Buckle up as we gear you up for the job market.
            <br />
          </motion.p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(
                "🎯event_log:  👋📝 Onboarding form submitted - form-data : ",
                data
              );
              onSubmit(data);
            })}
            className="flex flex-col justify-center items-center text-center space-y-[calc(100vw-90vw)] lg:space-y-16 w-full  "
          >
            {/* USERNAME */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, type: "spring", delay: 1.4 },
                },
              }}
              initial="hidden"
              animate="show"
              exit={EXIT_NORMAL_ALL.exit}
              transition={EXIT_NORMAL_ALL.exit.transition}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center text-center">
                    <FormLabel className="capitalize text-lg font-bold">
                      Enter a display name
                    </FormLabel>

                    <FormControl>
                      <div className="border-b-2 border-gray-500 px-4">
                        <Input
                          className={`
                      w-[150px] 
                      bg-transparent
                      font-semibold 
                      text-muted-foreground 
                      text-base
                      text-center
                      text-devready-green
                      placeholder:text-devready-green
                      placeholder:italic
                      outline-none
                      border-none
                      ring-none
                      ring-transparent
                      focus:ring-none
                      focus:ring-offset-0;
                      focus-visible:outline-none
                      focus-visible:ring-transparent
                      focus-visible:ring-none
                      focus-visible:ring-offset-transparent
                      ring-offset-transparent
                      `}
                          placeholder=""
                          autoComplete="off"
                          autoFocus
                          aria-label="display-name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            {/* CAREER TITLE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, type: "spring", delay: 1.6 },
                },
              }}
              initial="hidden"
              animate="show"
              exit={EXIT_NORMAL_ALL.exit}
              transition={EXIT_NORMAL_ALL.exit.transition}
            >
              <FormField
                control={form.control}
                name="career_title"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center text-center">
                    <FormLabel className="capitalize text-lg font-bold">
                      Pick your dream career
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"link"}
                            role="combobox"
                            className={cn(
                              " flex flex-col text-base rounded-full text-devready-green font-semibold italic hover:no-underline",
                              !field.value &&
                                "text-muted-foreground text-devready-green animate-pulse"
                            )}
                          >
                            {field.value ? (
                              careerList.find(
                                (language) => language.label === field.value
                              )?.label
                            ) : (
                              <ChevronDown className="h-10 w-10 font-bold shrink-0 pt-2" />
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command className=" overflow-y-auto max-h-[420px]">
                          <CommandInput placeholder="Search careers..." />
                          <CommandEmpty>more coming soon ...</CommandEmpty>
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
            </motion.div>
            {/* SUBMIT BUTTON */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, type: "spring", delay: 1.8 },
                },
              }}
              initial="hidden"
              animate="show"
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
    </>
  );
}
