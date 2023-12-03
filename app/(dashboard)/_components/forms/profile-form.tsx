"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  CheckCheckIcon,
  CheckIcon,
  Github,
  LinkIcon,
  Linkedin,
  Medal,
  Trophy,
} from "lucide-react";


import { countriesList, languages } from "@/constants/userforms-index";

const profileFormSchema = z.object({
  bio: z.string().max(160).min(4).optional(),

  country: z.string({
    required_error: "⚠ Please pick your country.",
  }),
  language: z.string({
    required_error: "⚠ Please select a language.",
  }),
  urls: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .refine((data) => Object.values(data).some(Boolean), {
      message: "⚠ At least one social media profile is required.",
    }),
  projects: z
    .object({
      capstone: z.string().url().optional(),
      additional: z.string().url().optional(),
    }),
  ztm_student: z.boolean().default(false).optional(),
  star_mentor: z.boolean().default(false).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  // 🎯 to-do-list
  // - will be a database / API call
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
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
        {/* Bio  */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex flex-col text-start pb-2">
                <FormLabel className="text-start justify-start">Bio</FormLabel>
                <FormDescription>
                  Give a brief description of yourself and your learning journey
                </FormDescription>
              </div>
              <FormControl className="flex items-start sm:text-start">
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Language & location */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-10 mr-16">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value &&
                            "text-muted-foreground text-devready-green"
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select language"}
                        <CheckCheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
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
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4">
                <FormLabel>Location</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value &&
                            "text-muted-foreground text-devready-green"
                        )}
                      >
                        {field.value
                          ? countriesList.find(
                              (country) => country.value === field.value
                            )?.label
                          : "Select country"}
                        <CheckCheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command className=" overflow-y-auto max-h-[420px]">
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup className="overflow-y-auto max-h-[300px]">
                        {countriesList.map((country) => (
                          <CommandItem
                            value={country.label}
                            key={country.value}
                            onSelect={() => {
                              form.setValue("country", country.value);
                            }}
                            // className=" overflow-y-auto max-h-[10px]"
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {/* <h1 className="ml-10 text-primary/40">
                        <MoreHorizontal />
                      </h1> */}
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Connections */}
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="urls.github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Connections</FormLabel>
                <FormDescription>
                  Connect with your community and make your profile stand out.
                </FormDescription>
                <div className="flex flex-row justify-between items-center gap-3">
                  <Github className="text-devready-green" size={20} />
                  <FormControl className="w-full">
                    <Input placeholder="GitHub profile" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urls.linkedin"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center gap-3">
                  <Linkedin className="text-devready-green" size={20} />
                  <FormControl className="w-full">
                    <Input placeholder="LinkedIn profile" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urls.website"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center gap-3">
                  <LinkIcon className="text-devready-green" size={20} />
                  <FormControl className="w-full">
                    <Input placeholder="Portfolio or project" {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Projects */}
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="projects.capstone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projects</FormLabel>
                <FormDescription>
                  Showcase your most proudest projects.
                </FormDescription>
                <div className="flex flex-row justify-between items-center gap-3">
                  <Trophy className="text-devready-green" size={20} />
                  <FormControl className="w-full">
                    <Input placeholder="Capstone project" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projects.additional"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between items-center gap-3">
                  <Medal className="text-devready-green" size={20} />
                  <FormControl className="w-full">
                    <Input placeholder="Additional project" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Switches */}
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="ztm_student"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="">
                  <FormLabel className="text-base">ZTM Alumni</FormLabel>
                  <FormDescription>
                    Are you currently a ZTM student or alumni?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    // disabled
                    // aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="star_mentor"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="">
                  <FormLabel className="text-base">Star Mentor</FormLabel>
                  <FormDescription>Are you a star mentor?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant={"devfill"}
          className="rounded-lg text-sm md:text-sm p-2"
        >
          Update account
        </Button>
      </form>
    </Form>
  );
}
