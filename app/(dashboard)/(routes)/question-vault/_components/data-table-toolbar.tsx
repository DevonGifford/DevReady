"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center justify-between py-1">
      <div className="flex flex-col items-center lg:flex-row flex-1">
        {/* FILTER BY SEARCH */}
        <Input
          className="w-[250px] lg:w-[250px] focus-visible:ring-2 mb-1.5"
          placeholder="Filter questions..."
          value={(table.getColumn("questionTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("questionTitle")?.setFilterValue(event.target.value)
          }
        />
        <div className="flex flex-row w-full justify-between">
          <div className="lg:ml-2 flex flex-row">
            {/* FILTER BY DIFFICULTY */}
            {table.getColumn("questionDifficulty") && (
              <DataTableFilter
                column={table.getColumn("questionDifficulty")}
                title="Difficulty"
                options={difficulty}
              />
            )}
            {/* //🔮 to-do-list:  filter by tags */}
            {/* {table.getColumn("questionTags") && (
              <DataTableFilter
                column={table.getColumn("questionTags")}
                title="Tags"
                options={tags}
              />
            )} */}
            {/* FILTER BY TYPE */}
            {table.getColumn("questionType") && (
              <DataTableFilter
                column={table.getColumn("questionType")}
                title="Type"
                options={types}
              />
            )}
            {/* RESET FILTER BUTTON */}
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
            {/* COLUMN SELECTOR */}
          </div>
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
