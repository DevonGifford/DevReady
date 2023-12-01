"use client";

import { useEffect, useState } from "react";
import { QuizQuestion } from "@/types/databaseSchema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchAllQuestions } from "@/lib/fetchAllQuestions";
import { Spinner } from "@/components/Spinner";

export default function DatabaseViewer() {
  const [data, setData] = useState<QuizQuestion[] | null>(null);

  useEffect(() => {
    function fetchData() {
      try {
        const fetchedData = fetchAllQuestions();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="h-full mx-10 flex flex-col items-center justify-center space-y-4">
        Database of all quizzes will go here.... 🎯💣🤔
        <p>Hello</p>
        <div className="py-10">
          {data ? (
            <DataTable columns={columns} data={data} /> //-render DataTable when data is available
          ) : (
            <Spinner size={"screen"} /> //-render Loading Animation while waiting for data
          )}
        </div>
      </div>
    </>
  );
}
