"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/components/providers/UserProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
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

import { CalendarIcon } from "lucide-react";
import { UserProfile } from "firebase/auth";

const goalsFormSchema = z.object({
  goal_title: z
    .string()
    .min(10, {
      message: "⚠ Goal title must be at least 10 characters.",
    })
    .max(35, {
      message: "⚠ Goal title must not be longer than 35 characters.",
    }),
  goal_description: z
    .string()
    .min(10, {
      message: "⚠ Goal description must be at least 10 characters.",
    })
    .max(240, {
      message: "⚠ Goal description must not be longer than 240 characters.",
    }),
  goal_eta: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
});
type GoalsFormValues = z.infer<typeof goalsFormSchema>;

const defaultValues: Partial<GoalsFormValues> = {
  // 🎯 to-do-list
  // - will be a database / API call
};

export function GoalsForm() {
  const { userProfile, updateUserDataProcess } = useUserContext();
  const form = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsFormSchema),
    defaultValues,
  });

  //✅ SETTING FORM : fields with existing user profile data
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

      // Check if goal_eta exists, use userProfile goal_eta, or today's date as a default
      form.setValue(
        "goal_eta",
        userProfile.goals.current_goals.goal_eta
          ? new Date(userProfile.goals.current_goals.goal_eta)
          : new Date() // Today's date as the default
      );
    }
  }, [userProfile, form]);

  // ⌛ SUBMIT FORM :  work-in-progress
  function onSubmit(data: GoalsFormValues) {
    console.log("goal-form-submit triggered")

    if (userProfile) {
      const updatedProfile: UserProfile = {
        ...userProfile,
        goals: {
          ...userProfile.goals,
          current_goals: {
            ...userProfile.goals.current_goals,
            goal_title: data.goal_title,
            goal_description: data.goal_description,
            goal_eta: data.goal_eta.toISOString(), // Store date in ISO format
          },
        },
      };

      updateUserDataProcess(userProfile.uuid, updatedProfile)
        .then(() => {
          toast.success("Goal updated successfully", {
            position: "bottom-left",
          });
        })
        .catch((error) => {
          toast.error("Failed to update goal", {
            position: "bottom-left",
          });
          console.error(error);
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      {field.value instanceof Date &&
                      !isNaN(field.value.getTime()) ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
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
            className="rounded-lg text-sm md:text-sm p-2"
          >
            Set your goal
          </Button>
          <Button variant={"outline"}>mark goal as achieved!</Button>
        </div>
      </form>
    </Form>
  );
}
