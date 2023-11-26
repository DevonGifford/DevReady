"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
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

const goalsFormSchema = z.object({
  goal_title: z
    .string()
    .min(5, {
      message: "⚠ Goal title must be at least 5 characters.",
    })
    .max(50, {
      message: "⚠ Goal title must not be longer than 50 characters.",
    }),
  goal_description: z
    .string()
    .min(10, {
      message: "⚠ Goal description must be at least 10 characters.",
    })
    .max(140, {
      message: "⚠ Goal description must not be longer than 140 characters.",
    }),
  goal_eta: z.date({
    required_error: "⚠ An estimated completion date is required.",
  }),
});
type GoalsFormValues = z.infer<typeof goalsFormSchema>;

const defaultValues: Partial<GoalsFormValues> = {
  // 🎯 to-do-list
  // - will be a database / API call
};

export function GoalsForm() {
  const form = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsFormSchema),
    defaultValues,
  });

  function onSubmit(data: GoalsFormValues) {
    // 🎯 to-do-list
    //- update db
    //- clost sheet
    //- catch with toast notif's
    toast.success("This is just a little test", {
      position: "bottom-left",
    });
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
                <Input
                  className=" text-devready-green"
                  placeholder="Your name"
                  {...field}
                />
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
                  className="text-devready-green"
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
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
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

        <Button
          type="submit"
          variant={"devfill"}
          className="rounded-lg text-sm md:text-sm p-2"
        >
          Set your goal
        </Button>
      </form>
    </Form>
  );
}
