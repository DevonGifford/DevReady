"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusCircle } from "lucide-react";
import { DataTableFilter } from "./data-table-filters";
import { DataTableViewOptions } from "./data-table-view-options";
import { difficulty, types } from "@/constants/data-table-index";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex flex-col">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <div className="flex flex-row">
            {table.getColumn("questionDifficulty") && (
              <DataTableFilter
                column={table.getColumn("questionDifficulty")}
                title="Difficulty"
                options={difficulty}
              />
            )}
            {/* //🔮 adding filtering by tags */}
            {/* {table.getColumn("questionTags") && (
              <DataTableFilter
                column={table.getColumn("questionTags")}
                title="Tags"
                options={tags}
              />
            )} */}
            {table.getColumn("questionType") && (
              <DataTableFilter
                column={table.getColumn("questionType")}
                title="Type"
                options={types}
              />
            )}
          </div>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
