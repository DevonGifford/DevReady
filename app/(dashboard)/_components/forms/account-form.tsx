"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, CheckCheckIcon, CheckIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";
import { useUserContext } from "@/components/providers/UserProvider";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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
} from "@/constants/userforms-index";

const accountFormSchema = z.object({
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
  programming_lang: z.string({
    required_error: "⚠ Please pick a language .",
  }),
  career_level: z.number().min(0, "⚠ Please set your level").optional(),
  experience_level: z.number().min(0, "⚠ Please set your level").optional(),
  skills_list: z.array(z.string()).optional(),
});
type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { userProfile, updateUserDataProcess } = useUserContext();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const defaultValues: Partial<AccountFormValues> = {
    username: userProfile?.account.username || "",
    career_title: userProfile?.account.career_title || "",
    programming_lang: userProfile?.account.programming_lang || "",
    career_level: userProfile?.account.career_level || 1,
    experience_level: userProfile?.account.experience_level || 1,
    skills_list: userProfile?.account.skills_list || [],
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (userProfile && userProfile.account.skills_list) {
      setSelectedSkills(userProfile.account.skills_list || []);
    }
  }, [form, userProfile]);

  const handleSkillList = (selectedSkill: string) => {
    const updatedSkills = selectedSkills.includes(selectedSkill)
      ? selectedSkills.filter((skill) => skill !== selectedSkill)
      : [...selectedSkills, selectedSkill];
    //- update local skills state + skills form field
    setSelectedSkills(updatedSkills);
    form.setValue("skills_list", updatedSkills);
  };

  const onSubmit = (data: AccountFormValues) => {
    if (userProfile) {
      setIsLoading(true);
      const updatedUserData: UserProfile = {
        account: {
          ...userProfile?.account,
          username: data.username || "",
          career_title: data.career_title || "",
          programming_lang:
            typeof data?.programming_lang === "string"
              ? data.programming_lang
              : "",
          career_level: data.career_level || 0,
          experience_level: data.experience_level || 0,
          skills_list: data.skills_list || [],
        },
      };

      updateUserDataProcess(userProfile.uuid, updatedUserData)
        .then(() => {
          setIsLoading(false);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("✖ Something went wrong -  error: ", error);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-2 w-full -translate-y-5 sm:-translate-y-10 md:-translate-y-18 "
      >
        {/* USERNAME & USERIMAGE */}
        <div className="flex flex-col justify-between items-center gap-4 sm:flex-row max-w-3xl">
          {/* USERNAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-center justify-center sm:justify-start">
                  Display Name
                </FormLabel>
                <FormDescription className="flex flex-col pb-1 whitespace-nowrap text-center sm:text-left">
                  <p>This is your public display name.</p>
                  <p>It can be your real name or a pseudonym.</p>
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Anonymous"
                    className="w-[300px] text-center sm:text-left"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* USER IMAGE */}
          <div className="flex h-[200px] sm:h-[220px] w-full max-w-sm justify-center">
            <ProfilePictureUploader userDocId={userProfile?.uuid!} />
          </div>
        </div>

        {/* CAREER AND LANGUAGE */}
        <div className="flex flex-col items-center justify-center gap-5 sm:justify-between sm:flex-row max-w-3xl sm:pr-10">
          <FormField
            control={form.control}
            name="career_title"
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4">
                <FormLabel>Career Title</FormLabel>
                <FormDescription>
                  Pick your current or dream job title.
                </FormDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between mx-8",
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
              <FormItem className="flex flex-col rounded-lg border p-4">
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
                          "w-[200px] justify-between mx-8",
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

        <div className="flex flex-col gap-8 lg:mx-10 lg:pr-10 pt-3 ">
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
                    defaultValue={[userProfile?.account.career_level!]}
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
                    defaultValue={[userProfile?.account.experience_level || 0]}
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
                        value={skill.label}
                        aria-label={`${skill.label} toggle`}
                        onClick={() => handleSkillList(skill.label)}
                        data-state={
                          selectedSkills.includes(skill.label) ? "on" : "off"
                        }
                      >
                        {skill.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-row justify-start gap-8 pt-10">
          <Button
            type="submit"
            variant={"devfill"}
            className="rounded-lg text-sm md:text-sm p-2"
          >
            {isLoading ? <Spinner /> : submitted ? <Check /> : "Update account"}
          </Button>
          <Button variant={"outline"}> Reset Password </Button>
        </div>
      </form>
    </Form>
  );
}
