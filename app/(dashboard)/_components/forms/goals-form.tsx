"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/components/providers/UserProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UserProfile } from "@/types/UserProfile";
import { Spinner } from "@/components/Spinner";
import { Timestamp } from "firebase/firestore";

// 👇 FORM SCHEMA : Goals Form
const goalsFormSchema = z.object({
  goal_title: z
    .string()
    .max(45, {
      message: "⚠ Goal title must not be longer than 45 characters.",
    }),
  goal_description: z
    .string()
    .max(240, {
      message: "⚠ Goal description must not be longer than 240 characters.",
    }),
  goal_eta: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  })
});
type GoalsFormValues = z.infer<typeof goalsFormSchema>;
// ⌛ PLACEHOLDER :  Default form values
const defaultValues: Partial<GoalsFormValues> = {
  // 🎯 to-do-list : remove
};

export function GoalsForm() {
  const { userProfile, updateUserDataProcess } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAchieving, setIsAchieving] = useState(false);
  const [achieved, setAchieved] = useState(false);
  
  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsFormSchema),
    defaultValues,
  });

  // ✅ SETTING FORM VALUES -  based on exisitng user profile context data
  useEffect(() => {
    if (userProfile) {
      form.setValue(
        "goal_title",
        userProfile.goals.current_goals.goal_title || ""
      );
      form.setValue(
        "goal_description",
        userProfile.goals.current_goals.goal_description || ""
      );

      // - convert firebase date to javascript date
      const goalEtaContextData = userProfile.goals.current_goals.goal_eta;
      const formattedDate = goalEtaContextData.toDate();

      form.setValue("goal_eta", formattedDate || new Date());
    }
  }, [userProfile, form]);

  // ✅ HANDLE GOAL ACHIEVED : saves and clears current goal
  function onAchieved() {
    console.log("goal-form-achieved triggered 🎇");
    if (userProfile) {
      setIsAchieving(true); //- Set loading spinner
      const achievedGoalData: UserProfile = {
        ...userProfile,
        goals: {
          ...userProfile.goals,
          past_goals: [
            {
              goal_title: userProfile.goals.current_goals.goal_title,
              goal_description:
                userProfile.goals.current_goals.goal_description,
              goal_eta: userProfile.goals.current_goals.goal_eta,
            },
            ...userProfile.goals.past_goals,
          ],
          current_goals: {
            //- clear/reset current_goals after achieving
            goal_title: "",
            goal_description: "",
            goal_eta: Timestamp.now(),  //-  firebase format
          },
        },
      };

      updateUserDataProcess(userProfile.uuid, achievedGoalData)
        .then(() => {
          // - on success
          toast.success("Goal achieved: congratulations", {
            position: "bottom-left",
          });
          setIsAchieving(false); //- Reset loading state
          setAchieved(true); //- Set achieved state

          setTimeout(() => {
            setAchieved(false); //- Reset achieved state after a while
          }, 2000);
        })
        .catch((error) => {
          //- on error
          setIsAchieving(false); //- Reset loading state
          console.error(error);
        });
    }
  }

  // ✅ SUBMIT FORM :  submit goals form
  function onSubmit(data: GoalsFormValues) {
    console.log("goal-form-submit triggered");
    if (userProfile) {
      setIsLoading(true); //- Set loading spinner
      const updatedProfile: UserProfile = {
        ...userProfile,
        goals: {
          ...userProfile.goals,
          current_goals: {
            ...userProfile.goals.current_goals,
            goal_title: data.goal_title,
            goal_description: data.goal_description,
            goal_eta: Timestamp.fromDate(data.goal_eta), //- convert to firebase format
          },
        },
      };

      updateUserDataProcess(userProfile.uuid, updatedProfile)
        .then(() => {
          // - on success
          setIsLoading(false); //- Reset loading state
          setSubmitted(true); //- Set achieved state

          setTimeout(() => {
            setSubmitted(false); //- Reset achieved state after a while
          }, 2000);
        })
        .catch((error) => {
          //- on error
          setIsLoading(false); //- Reset loading state
          console.error(error);
        });
    } else {
      console.log("No changes to submit.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Form submitted with data:", data);
          onSubmit(data);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="goal_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Title</FormLabel>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Title</FormLabel>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your goal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal_eta"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Estimated completion date</FormLabel>
              <FormDescription>
                Pick the date you wish to complete your goal by.
              </FormDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span>
                        {field.value instanceof Date ? (
                          <span>{field.value.toDateString()}</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <Button
            type="submit"
            variant={"devfill"}
            disabled={isLoading}
            className="rounded-lg text-sm md:text-sm p-2"
          >
            {isLoading ? <Spinner /> : submitted ? <Check /> : "Set your goal"}
          </Button>
          <Button
            type="button"
            onClick={() => onAchieved()}
            variant={"outline"}
            disabled={isAchieving}
          >
            {isAchieving ? (
              <Spinner />
            ) : achieved ? (
              <Check />
            ) : (
              "Mark goal as achieved!"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
