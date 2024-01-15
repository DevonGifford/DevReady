import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizQuestion } from "@/types/databaseSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
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
import { CheckCheckIcon, CheckIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import TagIcons from "@/components/TagIcons";
import { Separator } from "./ui/separator";

const difficultyList = [
  { label: "Easy" },
  { label: "Medium" },
  { label: "Hard" },
  { label: "Unknown" },
] as const;

const tagsList = [
  { label: "js" },
  { label: "Python" },
  { label: "Java" },
  { label: "C#" },
  { label: "C++" },
  { label: "TypeScript" },
  { label: "PHP" },
  { label: "Ruby" },
  { label: "Swift" },
  { label: "Go" },
] as const;

interface QuestionCardPreviewProps {
  questionData: QuizQuestion;
  submitType?: () => void; //🎯Replace with real submit function
}
// 👇 FORM SCHEMA : Account Form
const questionCardSchema = z.object({
  questionTitle: z
    .string()
    .min(5, {
      message: "⚠ Must be at least 5 characters.",
    })
    .max(200, {
      message: "⚠ Cannot be longer than 200 characters.",
    }),
  questionDescription: z
    .string()
    .min(5, {
      message: "⚠ Must be at least 5 characters.",
    })
    .max(200, {
      message: "⚠ Cannot be longer than 200 characters.",
    })
    .optional(),
  questionAnswer: z
    .string()
    .min(5, {
      message: "⚠ Must be at least 5 characters.",
    })
    .max(200, {
      message: "⚠ Cannot be longer than 200 characters.",
    }),
  questionDifficulty: z.string({
    required_error: "⚠ Please set the difficutly",
  }),
  questionTags: z.array(z.string()).optional(),
});
type QuestionFormValues = z.infer<typeof questionCardSchema>;

const QuestionCardPreview: React.FC<QuestionCardPreviewProps> = ({
  questionData,
  submitType,
}) => {
  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionCardSchema),
    defaultValues: questionData,
  });

  // ✅ SUBMIT FORM - submit form
  function onSubmit(data: QuestionFormValues) {
    // Use onSubmit based on the page route or other conditions
    // submitType && submitType();
    console.log(
      "🎯event_log:  📝-form submitted with following form-data: ",
      data
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className=" "
      >
        <div className="flex flex-col gap-5 border-2 rounded-xl bg-primary-foreground text-center p-5 md:p-10">
          <div>
            <h1 className="text-2xl font-bold tracking-wider">Edit Question</h1>
            <span className="text-xs text-secondary-foreground/20">
              Question ID: {questionData.questionUuid}
            </span>
            <Separator className="flex w-full" />
          </div>
          <FormField
            control={form.control}
            name="questionTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex w-full text-xl font-bold tracking-wider">
                  Title
                </FormLabel>
                <FormControl className="flex items-start sm:text-start">
                  <Textarea
                    placeholder="Hello world, allow me to introduce myself..."
                    className="hide-scrollbar min-h-[60px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex w-full text-xl font-bold tracking-wider">
                  Description
                </FormLabel>
                <FormControl className="flex items-start sm:text-start">
                  <Textarea
                    placeholder="Hello world, allow me to introduce myself..."
                    className=" hide-scrollbar min-h-[60px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex w-full text-xl font-bold tracking-wider">
                  Answer
                </FormLabel>
                <FormControl className="flex items-start sm:text-start">
                  <Textarea
                    placeholder="Hello world, allow me to introduce myself..."
                    className=" overflow-auto hide-scrollbar min-h-[60px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questionDifficulty"
            render={({ field }) => (
              <FormItem className="flex flex-row w-full items-center justify-between space-y-0 gap-4 rounded-lg ">
                <FormLabel className="flex text-base sm:text-lg shrink-0 font-bold tracking-wider">
                  Difficulty level:
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex w-full justify-between",
                          !field.value &&
                            "text-muted-foreground text-devready-green"
                        )}
                      >
                        {field.value ? field.value : "Select level"}
                        <CheckCheckIcon className="ml-2 h-5 w-5 shrink-0 opacity-70" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command className=" overflow-y-auto max-h-[420px]">
                      <CommandInput placeholder="Search levels..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {difficultyList.map((lang) => (
                          <CommandItem
                            value={lang.label}
                            key={lang.label}
                            onSelect={() => {
                              form.setValue("questionDifficulty", lang.label);
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

          <FormField
            control={form.control}
            name="questionTags"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex flex-row w-full items-center justify-between space-y-0 gap-4 rounded-lg ">
                <FormLabel className="flex text-base shrink-0 font-bold tracking-wider">
                  Associated Tags:
                </FormLabel>
                <FormControl>
                  <TagIcons tagArray={value} />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator className="w-full" />
          <div className="flex flex-row w-full justify-center">
            <Button
              type="submit"
              variant={"devfill"}
              className="rounded-lg text-sm md:text-sm p-2 px-8"
            >
              Submit
              {/* {isLoading ? <Spinner /> : submitted ? <Check /> : "Update account"} */}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default QuestionCardPreview;
