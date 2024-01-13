import { DatabaseSchema, QuizQuestion } from "@/types/databaseSchema";

export function fetchAllQuestions(): QuizQuestion[] | null {
  console.log("🎯event_log:  🎇/fetchAllQuestions 💢 Triggered");

  const localStorageKey = "ztmready-database";
  const storedData: string | null = localStorage.getItem(localStorageKey);

  if (!storedData) {
    console.error("✖ Error: no data found in local storage");
    return null; // Handle the absence of data
  }

  try {
    const parsedData = JSON.parse(storedData);

    if (!parsedData.data || !parsedData.timestamp) {
      console.error("✖ Error: incomplete data format in local storage");
      return null; // Handle incomplete data format
    }

    const allQuestions: QuizQuestion[] = parsedData.data.reduce(
      (acc: QuizQuestion[], set: any) => {
        if (Array.isArray(set.setData)) {
          acc.push(...set.setData);
        }
        return acc;
      },
      []
    );

    return allQuestions;
  } catch (error) {
    console.error("✖ Error occurred in fetching data:", error);
    return null; // Handle parsing error
  }
}
