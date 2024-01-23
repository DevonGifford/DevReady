"use client";

import { useEffect, useState } from "react";
import { useModalContext } from "../providers/ModalReducerProvider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

// 🎯 to-do-list
//- requires database of questions to exist first.
//- create search functionality / hook
//- handle route changing
//- handle different cases (question, set, topic , etc. )

export const SearchModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { modal, dispatch } = useModalContext();

  useEffect(() => {
    if (modal.open && modal.type === "SEARCH") {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [modal]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch({ type: "OPEN_MODAL", modalType: "SEARCH" });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [dispatch, modal.open]);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog
      open={modal.open}
      onOpenChange={() => dispatch({ type: "CLOSE_MODAL" })}
    >
      <CommandInput placeholder={`Search for questions`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents"></CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
