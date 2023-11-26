"use client";

import { useEffect, useState, useContext } from "react";
import { SearchModalContext } from "@/components/providers/SearchboxProvider";

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
  
  const { openSearchModal, setOpenSearchModal } =
    useContext(SearchModalContext);

  // ✅ listening if should be mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //✅ listening for shortcut key input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchModal(true);
        // setIsMounted(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpenSearchModal, openSearchModal]);


  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={openSearchModal} onOpenChange={setOpenSearchModal}>
      <CommandInput placeholder={`Search for questions`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents"></CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
