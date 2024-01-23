"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-10">
        <h3 className="flex flex-col gap-1 text-lg font-semibold leading-none tracking-tight text-center">
          <span>Uh oh...</span>
          <span>Something went wrong with fetching the database </span>
          <span>Please try again</span>
          <span>🙈</span>
        </h3>
        <div className="text-sm font-thin">{error.message}</div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </>
  );
}
