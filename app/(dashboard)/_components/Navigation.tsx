"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { ElementRef, useEffect, useRef, useState } from "react";

import { Sidebar } from "./Sidebar";
import { ChevronLeft } from "lucide-react";
import Navbar from "./Navbar";

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)"); //-track if screen width mobile-sized
  const isResizingRef = useRef(false); //-track if sidebar being resized

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);



  //✅ Trigger for mobile view
  useEffect(() => {
    if (isMobile) {
      collapse(); //-If in mobile view, collapse the sidebar
    } else {
      resetWidth(); //-If not in mobile view, reset the sidebar width
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse(); //-If in mobile view, collapse the sidebar
    }
  }, [pathname, isMobile]);

  // ✅ Handle mouse events when resizing sidebar
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true; // 👉 Set resizing flag to true
    document.addEventListener("mousemove", handleMouseMove); // 👉 Add mouse move event listener
    document.addEventListener("mouseup", handleMouseUp); // 👉 Add mouse up event listener
  };

  const handleMouseMove = (event: MouseEvent) => {
    // 👇 If not resizing, return
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 270) newWidth = 270; //-Minimum width constraint
    if (newWidth > 600) newWidth = 600; //-Maximum width constraint

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`; //👉 Set sidebar width
      navbarRef.current.style.setProperty("left", `${newWidth}px`); //👉 Set navbar position
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      ); //👉 Sets navbar width based on sidebar width
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false; // 👉 Sets resizing flag to false
    document.removeEventListener("mousemove", handleMouseMove); // 👉 Removes mouse move event listener
    document.removeEventListener("mouseup", handleMouseUp); // 👉 Removes mouse up event listener
  };

  // ✅ Reset sidebar width to default state
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      //👉 Set sidebar width
      sidebarRef.current.style.width = isMobile ? "100%" : "500px";
      //👉 Set navbar width based on sidebar width
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 500px)"
      );
      //👉 Finally set navbar position
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "500px");

      //👇Reset 'resetting-flag' after transition effect
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // ✅ Collapse sidebar (used in mobile view)
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0"; //👉 Collaps sidebar
      navbarRef.current.style.setProperty("width", "100%"); //👉 Set navbar to full width
      navbarRef.current.style.setProperty("left", "0"); //👉 Set navbar position
      setTimeout(() => setIsResetting(false), 300); //👉 Resets 'resetting-flag' after transition effect
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto hide-scrollbar relative flex w-60 flex-col",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* Collapse Sidebar Buton */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>

        <Sidebar />

        {/* 👇 THE HORIZAONTAL SEPERATING LINE */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[88888] left-60 w-[calc(100%-250px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
      </div>
    </>
  );
};
