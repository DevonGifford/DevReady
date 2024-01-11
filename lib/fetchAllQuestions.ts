import { DatabaseSchema, QuizQuestion } from "@/types/databaseSchema";

export function fetchAllQuestions(): QuizQuestion[] | null {
  console.log("🎯event_log:  🎇/fetchAllQuestions 💢 Triggered");

  const localStorageKey = "ztmready-database";
  const storedData: string | null = localStorage.getItem(localStorageKey);

  if (!storedData) {
    console.log(
      "🎯event_log:  🎇/fetchAllQuestions  ❌ Error occurred: no data found in local storage"
    );
    return null; //🔮 Handle the absence of data
  }

  try {
    const parsedData = JSON.parse(storedData);

    if (!parsedData.data || !parsedData.timestamp) {
      console.log(
        "🎯event_log:  🎇/fetchAllQuestions  ❌ Error occurred: incomplete data format in local storage"
      );
      return null; //🔮 Handle incomplete data format
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
    console.error(
      "🎯event_log:  🎇/fetchAllQuestions  ❌ Error occurred while parsing data from local storage:",
      error
    );
    return null; //🔮 Handle parsing error
  }
}
