import { DatabaseSchema, QuizQuestion } from "@/types/databaseSchema";

export const findQuestionByUuid = (
  questionUuid: number
): QuizQuestion | undefined => {
  try {
    const localStorageKey = "ztmready-database";
    const localDB: string | null = localStorage.getItem(localStorageKey);

    if (!localDB) {
      console.error("✖ Error: No data found in local storage");
      return undefined; // Handle the absence of data
    }

    const parsedData = JSON.parse(localDB);

    if (!parsedData.data || !parsedData.timestamp) {
      console.error("✖ Error: Incomplete data format in local storage");
      return undefined; // Handle incomplete data format
    }

    for (const quiz of parsedData.data) {
      const question = quiz.setData.find(
        (q: QuizQuestion) => q.questionUuid === questionUuid
      );
      if (question) {
        return question;  //✔ Success
      }
    }

    console.error("✖ Error: No matching question data found");
    return undefined; // Handle the absence of relevant question data
  } catch (error) {
    console.error(
      "✖ Error occurred while parsing data from local storage:",
      error
    );
    return undefined; // Handle parsing error
  }
};
