"use client";

import { QuizContextProvider } from "@/components/providers/QuizProvider";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QuizContextProvider>{children}</QuizContextProvider>
    </>
  );
}
