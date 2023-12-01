"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QuizQuestion } from "@/types/databaseSchema";
import AssociatedTags from "@/components/AssociatedTags";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<QuizQuestion>[] = [
  {
    accessorKey: "questionTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "questionDifficulty",
    header: () => <div className="text-right">Difficulty</div>,
    cell: ({ row }) => {
      const level = row.original.questionDifficulty;
      let formattedLevel;

      switch (level) {
        case 1:
          formattedLevel = "Easy";
          break;
        case 2:
          formattedLevel = "Medium";
          break;
        case 3:
          formattedLevel = "Hard";
          break;
        default:
          formattedLevel = "?";
      }
      return <div className="flex flex-row ">{formattedLevel}</div>;
    },
  },
  {
    accessorKey: "questionTags",
    header: () => <div className="text-right">Tags</div>,
    cell: ({ row }) => {
      const rowTags = row.original.questionTags;

      return (
        <div className="flex flex-row gap-2 text-right font-medium justify-end">
          <AssociatedTags data={rowTags} />
        </div>
      );
    },
  },
];
