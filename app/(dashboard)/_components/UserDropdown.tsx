"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { SidebarItem } from "./SidebarItem";
import { UserFormHandler } from "./UserFormHandler";
import { useModalContext } from "@/components/providers/ModalReducerProvider";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsRight,
  Gauge,
  LogOut,
  SettingsIcon,
  Trophy,
} from "lucide-react";

export const UserDropdown = () => {
  const { modal, dispatch } = useModalContext();

  // 🎯 to-do-list : get user data
  //const { destruct, user, data } = useUserDataDevon();

  // 🎯 to-do-list : handle user Image (temp solution)
  const userImage = "/profile-placeholder-image.svg" || "real image";

  //👇🎯 testing toast notifications
  const ztmTest = () => {
    toast.success("This is a Test notification 🎯🧪");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center text-base">
          <div className="gap-x-1 flex items-center max-w-[200px]">
            <span className="text-start font-medium line-clamp-1">
              {/* update 🎯 */}
              Devon Gifford
            </span>
            <Avatar className="h-5 w-5">
              <AvatarImage src={userImage} />
            </Avatar>
            <ChevronsRight className="rotate-90 text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-72 mr-3 pt-5 md:pt-0  flex flex-col space-y-4 p-3"
        align="start"
        alignOffset={11}
        forceMount
      >
        {/* <div className="flex flex-col space-y-4 p-2"> */}
        {/* HEADER - USER SUMMARY */}
        {/* update with link & seperate component? 🎯 */}
        <div
          className="flex items-center justify-between gap-x-2 hover:cursor-pointer pt-3"
          //👇🎯temp
          onClick={ztmTest}
        >
          <div className="space-y-1 p-2">
            <p className="text-sm line-clamp-1">
              {/* update 🎯 */}
              Devon Gifford
            </p>
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {/* update 🎯 */}
              devongifford@outlook.com
            </p>
          </div>
          <div className="rounded-md p-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImage} />
            </Avatar>
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* 👉 UPDATE FORM - forms */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="group min-h-[30px] text-base py-2 pr-3 pl-2.5 cursor-pointer w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium pt-3">
              <div
                role="button"
                className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
              >
                <SettingsIcon className="shrink-0 h-[22px] w-[22px] mr-5 text-muted-foreground" />
              </div>
              Update Profile
            </div>
            {/* <SidebarItem label="Update Profile" icon={Settings} isMaster /> */}
          </SheetTrigger>
          <SheetContent>
            <UserFormHandler />
          </SheetContent>
        </Sheet>

        {/* 👉 USER DASHBOARD */}
        <Link href={"/user-dashboard"}>
          <SidebarItem label="User Dashboard" icon={Gauge} />
        </Link>

        {/* 👉 ZTM ACADEMY */}
        <a href="https://academy.zerotomastery.io/" target="_blank">
          <SidebarItem label="ZTM Academy" icon={LogOut} onClick={() => {}} />
        </a>

        {/* 👉 LOGOUT BUTTON */}
        {/* update with functionality 🎯 */}
        <Button
          onClick={() => dispatch({ type: "OPEN_MODAL", modalType: "LOGOUT" })}
        >
          {" "}
          Logout{" "}
        </Button>

        {/* FOOTER USER LEVEL SUMMARY */}
        {/* update with link & seperate component? 🎯 */}
        <DropdownMenuSeparator />
        <div
          className="flex flex-col py-2 px-5 text-primary/50 gap-3 hover:cursor-pointer"
          //👇🎯temp
          onClick={ztmTest}
        >
          <div className="flex flex-row gap-2 text-sm font-semibold text-center justify-center text-amber-500">
            <Trophy size={20} />
            <p>Current score level</p>
          </div>
          <Progress value={33} />
        </div>
        {/* </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
