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
): QuizQuestion[] {
  console.log("🎯event_log:  🎇/quizGeneratingAlgo 💢 Triggered");

  //- Retrieve data from local storage
  const storedData: any[] = JSON.parse(
    localStorage.getItem("ztmready-database") || "[]"
  );

  //- Find relevant data based on quizzID
  const relevantData = storedData.find((data) => data.uuid === quizzID);

  //- If no matching data found, return an empty array or handle case accordingly
  if (!relevantData) {
    console.log(
      "🎯event_log:  🎇/quizGeneratingAlgo  ❌ Error occured no matching data found"
    );
    return [];
  }

  console.log("Here is that relevantData you asked about good sir", relevantData)


  //- Retrieve setData property containing quiz questions
  const quizQuestions: QuizQuestion[] = relevantData.setData;

  //- Handle custom logic for selecting questions (based on user level or history)
  // 🎯 to do list

  // - Return the result
  return quizQuestions;
}
