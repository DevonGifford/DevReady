'use client';

import { DatabaseContextProvider } from "@/components/providers/DatabaseProvider";

export default function FlashCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DatabaseContextProvider>{children}</DatabaseContextProvider>
    </>
  );
}
