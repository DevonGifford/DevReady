export interface QuizQuestion {
  questionUuid: number;
  questionTitle: string;
  questionDescription?: string;
  questionAnswer: string;
  questionDifficulty?: string; //change to string - i.e. Hard, Medium, Easy, Other
  questionType?: string; //related - i.e. Interview, Bootcamp, Topic, Other/Custom
  questionTags: string[];
}

export interface DatabaseSchema {
  uuid: string;
  setType: string;
  setTitle: string;
  setDescription: string;
  setImage?: string;
  setTags: string[];
  setData: QuizQuestion[];
}

export const quickSampleDatabaseData: DatabaseSchema[] = [
  {
    uuid: "interview-frontend",
    setType: "interview",
    setTitle: "Frontend Interview",
    setDescription:
      "This is a smart accumulation of questions in order to evaluate your readiness for a Frontend Interview.",
    setImage: "not sure what this will be yet....",
    setTags: [
      "JavaScript",
      "TypeScript",
      "React",
      "State management",
      "Testing",
    ],
    setData: [
      {
        questionUuid: 1,
        questionTitle: "What is Javascript?",
        questionDescription:
          "Can you spend 2 minutes explaining to me what JavaScript is",
        questionAnswer:
          "It is the scripting language of the web that was initially intended to run on the browser. Today, JavaScript is used in the server.",
        questionDifficulty: "Hard",
        questionTags: ["JS", "TS", "React"],
      },
      // ... (other questions)
    ],
  },
  // ... (other mock data entries)
];
