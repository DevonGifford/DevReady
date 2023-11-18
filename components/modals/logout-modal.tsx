"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { logOut } from "@/utils/firebase/auth/logout";
import { LogoutModalContext } from "@/components/providers/LogoutProvider";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";

export const LogoutModal = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const { openLogoutModal, setOpenLogoutModal } =
    useContext(LogoutModalContext);

  // ✅ listening if should be mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleCaseYes = () => {
    //🎯 needs to be updated
    try {
      logOut();
      router.push("/");
      toast.success("Successfully logged out");
      console.log("completed logout process");
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleCaseNo = () => {
    //🎯 needs to be updated
    setOpenLogoutModal(false);
  };

  return (
    <Dialog open={openLogoutModal} onOpenChange={setOpenLogoutModal}>
      <DialogContent className=" max-w-md">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg text-center font-medium">Logging out</h2>
          <span className="text-[0.8rem] text-muted-foreground text-center">
            Are you sure you want to log out?
          </span>
        </DialogHeader>
        <div className="flex items-center justify-evenly">
          <Button size="sm" onClick={handleCaseNo}>
            No
          </Button>
          <Button size="sm" onClick={handleCaseYes}>
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
