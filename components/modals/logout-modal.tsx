"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useModalContext } from "../providers/ModalReducerProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export const LogoutModal = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const { modal, dispatch } = useModalContext();

  const [isMounted, setIsMounted] = useState(false);

  // ✅ listening if should be mounted
  useEffect(() => {
    if (modal.open && modal.type === "LOGOUT") {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [modal]);

  if (!isMounted) {
    return null;
  }

  const handleCaseYes = () => {
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
    //setOpenLogoutModal(false);
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Dialog
      open={modal.open}
      onOpenChange={() => dispatch({ type: "CLOSE_MODAL" })}
    >
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
