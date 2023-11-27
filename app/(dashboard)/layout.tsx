"use client";

import toast from "react-hot-toast";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";
import { Navigation } from "./_components/Navigation";

import { SearchModal } from "../../components/modals/search-modal";
import { LogoutModal } from "@/components/modals/logout-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import {
  ModalContext,
  initialState,
  modalReducer,
} from "@/components/providers/ModalReducerProvider";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [modal, dispatch] = useReducer(modalReducer, initialState);

  // // ✅ Handle loading state while authentication is being checked
  // - this is now being handled in the authProvider

  // ✅ If not authenticated, redirect to the home page
  // 🎯 to do list
  //- this results in a flashing of content - I need to figure it out
  useEffect(() => {
    // If the user is not authenticated, redirect to the home page
    if (!user || !user.uid) {
      toast.error("Woops - Something went wrong - please login again");
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <ModalContext.Provider value={{ modal, dispatch }}>
        <div className="h-full w-full flex dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="flex-1 top-0 h-full overflow-y-auto ">
            {children}
            <SearchModal />
            <SettingsModal />
            <LogoutModal />
          </main>
        </div>
      </ModalContext.Provider>
    </>
  );
};

export default MainLayout;
