"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QuizQuestion } from "@/types/databaseSchema";
import AssociatedTags from "@/components/AssociatedTags";
import { DataTableColumnHeader } from "./column-header";
import { difficulty, types } from "@/constants/data-table-index";
import TagIcons from "./data-table-tag-icons";

export const columns: ColumnDef<QuizQuestion>[] = [
  {
    accessorKey: "questionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = types.find(
        (type) => type.value === row.getValue("questionType")
      );

      if (!type) {
        return <div className="flex flex-row ">none</div>;
      }

      return (
        <div className="flex items-center">
          {type.icon && (
            <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "questionTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Question Title" />
    ),
  },
  {
    accessorKey: "questionDifficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const level = difficulty.find(
        (level) => level.value === row.getValue("questionDifficulty")
      );
      if (!level) {
        return <div className="flex flex-row ">none</div>;
      }
      return (
        <div className="flex items-center">
          {level.icon && (
            <level.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{level.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "questionTags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const rowTags = row.original.questionTags;

      return (
        <div className="flex flex-row gap-2 text-right font-medium justify-end">
          <TagIcons data={rowTags} />
        </div>
      );
    },
  },
];
