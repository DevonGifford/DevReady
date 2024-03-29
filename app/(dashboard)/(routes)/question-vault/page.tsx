"use client";

import { useEffect, useState } from "react";
import { fetchAllQuestions } from "@/lib/fetchAllQuestions";
import { Spinner } from "@/components/Spinner";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { QuizQuestion } from "@/types/databaseSchema";

export default function QuestionVault() {
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
      <div className="flex flex-col h-auto py-24 justify-center mx-10 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Question Vault</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all the questions on ZTM Ready!
          </p>
        </div>
        <div className="py-6 relative items-center">
          {data ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <Spinner size={"screen"} />
          )}
        </div>
      </div>
    </>
  );
}
