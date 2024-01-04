// quizGenerator.ts

import { QuizQuestion } from "@/types/databaseSchema";

// 🔮 Implement custom logic here to generate quiz questions -  filter and select questions accordingly
// 🔮 Return a custom quiz as an array of QuizQuestion objects
// 🔮 This should also take the type into consideration
// ⏳ For now this logic is only selecting 10 random questions
export function quizGeneratingAlgo(
  quizzID: string,
  userLevel: number,
  userHistory: any // Update this type
): QuizQuestion[] | null {
  console.log("🎯event_log:  🎇/quizGeneratingAlgo 💢 Triggered");

  const localStorageKey = "ztmready-database";
  const storedData: string | null = localStorage.getItem(localStorageKey);

  if (!storedData) {
    console.log(
      "🎯event_log:  🎇/quizGeneratingAlgo  ❌ Error occurred: no data found in local storage"
    );
    return null; //🔮 Handle the absence of data
  }

  try {
    const parsedData = JSON.parse(storedData);

    if (!parsedData.data || !parsedData.timestamp) {
      console.log(
        "🎯event_log:  🎇/quizGeneratingAlgo  ❌ Error occurred: incomplete data format in local storage"
      );
      return null; //🔮 Handle incomplete data format
    }

    const relevantData = parsedData.data.find(
      (data: any) => data.uuid === quizzID
    );

    if (!relevantData) {
      console.log(
        "🎯event_log:  🎇/quizGeneratingAlgo  ❌ Error occurred: no matching data found"
      );
      return null; //🔮 Handle the absence of relevant data
    }

    const quizQuestions: QuizQuestion[] = relevantData.setData;

    //🔮 Handle custom logic for selecting questions (based on user level or history)
    //🔮 🎯 Add logic here

    return quizQuestions;
  } catch (error) {
    console.error(
      "🎯event_log:  🎇/quizGeneratingAlgo  ❌ Error occurred while parsing data from local storage:",
      error
    );
    return null; //🔮 Handle parsing error
  }
}
