"use client";

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  return (
    <>
      <nav className="flex bg-transparent px-3 py-2 w-full justify-between items-center gap-x-4">
        {isCollapsed && (
          <>
            <MenuIcon
              role="button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          </>
        )}
        <div
          className={cn(
            "flex items-center justify-end  gap-4",
            !isCollapsed && "hidden md:flex w-screen"
            // w-[calc(100%)]
          )}
        >
          <UserDropdown />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
