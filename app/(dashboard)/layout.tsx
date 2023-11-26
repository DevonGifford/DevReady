"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";
import { SearchModalContext } from "@/components/providers/SearchboxProvider";
import { LogoutModalContext } from "@/components/providers/LogoutProvider";
import { SettingsModalContext } from "@/components/providers/SettingsboxProvider";

import { SearchModal } from "../../components/modals/search-modal";
import { LogoutModal } from "@/components/modals/logout-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

import { Navigation } from "./_components/Navigation";
import toast from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

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
      <SearchModalContext.Provider
        value={{ openSearchModal, setOpenSearchModal }}
      >
        <SettingsModalContext.Provider
          value={{ openSettingModal, setOpenSettingModal }}
        >
          <LogoutModalContext.Provider
            value={{ openLogoutModal, setOpenLogoutModal }}
          >
            <div className="h-full w-full flex dark:bg-[#1F1F1F]">
              <Navigation />
              <main className="flex-1 top-0 h-full overflow-y-auto ">
                {children}
                <SearchModal />
                <SettingsModal />
                <LogoutModal />
              </main>
            </div>
          </LogoutModalContext.Provider>
        </SettingsModalContext.Provider>
      </SearchModalContext.Provider>
    </>
  );
};

export default MainLayout;
