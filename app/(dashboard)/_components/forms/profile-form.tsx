"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormSetValue, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CheckCheckIcon, CheckIcon } from "lucide-react";
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
  careerList,
  programmingLanguagesList,
  skillsList,
} from "@/constants/navigation-index";

import toast from "react-hot-toast";

const profileFormSchema = z.object({
  career_title: z.string({
    required_error: "⚠ Please pick your career .",
  }),
  programming_lang: z.string({
    required_error: "⚠ Please pick a language .",
  }),
  bio: z.string().max(160).min(4).optional(),
  career_level: z.number().min(0, "⚠ Please set your level"),
  experience_level: z.number().min(0, "⚠ Please set your level"),
  skills_list: z.array(z.string()),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  // 🎯 to-do-list
  // - will be a database / API call
  // career_title: {user.name},
  // bio: {user.bio},
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const handleSkillList = (selectedSkill: string, prevSkills: string[]) => {
    // 🎯 to-do-list
    //-I still need to figure out a way to manage the data as form data
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* CAREER AND LANGUAGE */}
        <div className="flex flex-col justify-center items-center md:justify-normal md:flex-row gap-5 md:gap-24">
          <FormField
            control={form.control}
            name="career_title"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4 space-y-1 w-[270px] ">
                <FormLabel>Career Title</FormLabel>
                <FormDescription>
                  Pick your current or dream title.
                </FormDescription>
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
                          ? careerList.find(
                              (language) => language.label === field.value
                            )?.label
                          : "Select language"}
                        <CheckCheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
          <FormField
            control={form.control}
            name="programming_lang"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4 space-y-1">
                <FormLabel>Favorite Language</FormLabel>
                <FormDescription>
                  Pick your most proficient language.
                </FormDescription>
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
                          ? programmingLanguagesList.find(
                              (lang) => lang.label === field.value
                            )?.label
                          : "Select language"}
                        <CheckCheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command className=" overflow-y-auto max-h-[420px]">
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {programmingLanguagesList.map((lang) => (
                          <CommandItem
                            value={lang.label}
                            key={lang.label}
                            onSelect={() => {
                              form.setValue("programming_lang", lang.label);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                lang.label === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {lang.label}
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
        </div>
        {/* Career Level */}
        <FormField
          control={form.control}
          name="career_level"
          render={({ field: { value, onChange } }) => (
            <FormItem className="space-y-1">
              <div className="flex flex-col items-center md:items-start pb-2">
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
                  defaultValue={[defaultValues?.career_level || 0]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
              </FormControl>

              <div className="flex justify-between text-xs text-muted-foreground ml-1 sm:pr-8 md:pr-10 lg:pr-16 xl:pr-12">
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
              <div className="flex flex-col items-center md:items-start pb-2">
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
                  defaultValue={[defaultValues?.experience_level || 0]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
              </FormControl>

              <div className="flex justify-between text-xs text-muted-foreground ml-1 sm:pr-8 md:pr-10 lg:pr-16 xl:pr-12">
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
        {/* Skills 🎯 */}
        <FormField
          control={form.control}
          name="skills_list"
          render={({ field: { value, onChange } }) => (
            <FormItem className="space-y-1">
              <div className="flex flex-col items-center text-center md:text-start md:items-start pb-2">
                <FormLabel>Pick your proficient skills</FormLabel>
                <FormDescription>
                  Pick your most proficient skill set
                </FormDescription>
              </div>
              <FormControl>
                <ToggleGroup
                  size={"sm"}
                  variant="skill"
                  type="multiple"
                  className="flex flex-row flex-wrap"
                  aria-label="Skills list"
                >
                  {skillsList.map((skill) => (
                    <ToggleGroupItem
                      key={skill.label}
                      value={skill.label.toLowerCase()}
                      aria-label={skill.label}
                      //🎯 need to update onCLick functionality - handle form update
                      onClick={() => handleSkillList}
                    >
                      {skill.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Bio  */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex flex-col items-center text-center md:text-start md:items-start pb-2">
                <FormLabel>Bio</FormLabel>
                <FormDescription>
                  Give a brief description of yourself and your learning journey
                </FormDescription>
              </div>
              <FormControl className="flex items-center text-center sm:items-start sm:text-start">
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
        <Button
          type="submit"
          variant={"devfill"}
          className="rounded-lg text-sm md:text-sm p-2"
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}