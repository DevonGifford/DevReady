"use client";

import { DatabaseContextProvider } from "@/components/providers/DatabaseProvider";

export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <DatabaseContextProvider>
        {props.modal}
        {props.children}
      </DatabaseContextProvider>
    </>
  );
}
