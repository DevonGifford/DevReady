"use client";

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
  const router = useRouter();
  const { user } = useAuth();
  const [modal, dispatch] = useReducer(modalReducer, initialState);

  // ✅ If not authenticated, redirect to the home page
  // 🎯 to-do-list:  improvement & persisting auth state
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!user || !user.uid) {
      timeoutId = setTimeout(() => {
        console.log("🎯event_log: AUTH FAILED - please login again");
        router.push("/");
      }, 2500); // 2.5 seconds
    }

    return () => {
      clearTimeout(timeoutId);
    };
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
