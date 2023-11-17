"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/Spinner";
import { Navigation } from "./_components/Navigation";

import { SearchModalContext } from "@/components/providers/SearchboxProvider";
import { LogoutModalContext } from "@/components/providers/LogoutProvider";
import { SettingsModalContext } from "@/components/providers/SettingsboxProvider";

import { SearchModal } from "../../components/modals/search-modal";
import { LogoutModal } from "@/components/modals/logout-modal";
import { SettingsModal } from "@/components/modals/settings-modal";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  //🎯🎯🎯  const { isAuthenticated, isLoading } = FIREBASE CONNECTION 
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // 🎯🎯🎯
  //   if (isLoading) {
  //     return (
  //       <div className="h-full flex items-center justify-center">
  //         <Spinner size="lg" />
  //       </div>
  //     );
  //   }
  //   if (!isAuthenticated) {
  //     return redirect("/");
  //   }

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
