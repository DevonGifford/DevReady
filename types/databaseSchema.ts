interface Question {
  uuid: number;
  questionTitle: string;
  questionDescription?: string;
  questionAnswer: string;
  questionDifficulty: number;
  questionTags: string[];
}

interface MockData {
  uuid: string;
  setType: string;
  setTitle: string;
  setDescription: string;
  setImage?: string;
  setTags: string[];
  setData: Question[];
}

const quickSampleDatabaseData: MockData[] = [
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
        uuid: 1,
        questionTitle: "What is Javascript?",
        questionDescription:
          "Can you spend 2 minutes explaining to me what JavaScript is",
        questionAnswer:
          "It is the scripting language of the web that was initially intended to run on the browser. Today, JavaScript is used in the server.",
        questionDifficulty: 1,
        questionTags: ["JS", "TS", "React"],
      },
      // ... (other questions)
    ],
  },
  // ... (other mock data entries)
];
