export type QuizQuestion = {
  questionUuid: number;
  questionTitle: string;
  questionDescription?: string;
  questionAnswer: string;
  questionDifficulty?: string;
  questionType?: string;
  questionTags: string[];
};

export type DatabaseSchema = {
  uuid: string;
  setType: string;
  setTitle: string;
  setDescription: string;
  setImage?: string;
  setTags: string[];
  setData: QuizQuestion[];
};

export const quickSampleDatabaseData: DatabaseSchema[] = [
  {
    uuid: "interview-frontend",
    setType: "interview",
    setTitle: "Frontend Interview",
    setDescription:
      "Embark on the Frontend Dev Journey! Dive into the world of client-side development, HTML, CSS, and JavaScript. This quiz tests your skills in crafting user interfaces, handling browser compatibility, and leveraging various frameworks and libraries. Perfect for aspiring UI/UX designers and seasoned frontend developers, this quiz challenges your mastery of frontend technologies!",
    setImage: "",
    setTags: ["HTML/CSS", "js", "ts", "react", "Testing"],
    setData: [
      {
        questionUuid: 900,
        questionTitle: "Explain the concept of Virtual DOM in React.",
        questionDescription:
          "Provide an explanation of the Virtual DOM and how it works in the context of React.",
        questionAnswer:
          "The Virtual DOM in React is a lightweight copy of the actual DOM. React uses it to optimize rendering by updating only the parts of the actual DOM that have changed. Changes are first applied to the Virtual DOM, and React calculates the most efficient way to update the real DOM, minimizing performance impact.",
        questionDifficulty: "medium",
        questionType: "interview",
        questionTags: ["react", "frontend"],
      },
      // ... (other questions)
    ],
  },
  // ... (other mock data entries)
];
