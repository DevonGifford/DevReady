"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

interface ItemProps {
  id?: string;
  icon: React.ElementType;
  label: string;
  customIcon?: string;
  active?: boolean;
  isMaster?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  isReverse?: boolean;
  isMain?: boolean;
  isSub?: boolean;
  level?: number;
  href?: string;
  onExpand?: () => void;
  onClick?: () => void;
}

export const SidebarItem = ({
  id,
  icon: Icon,
  customIcon,
  label,
  active,
  isMaster,
  expanded,
  isReverse,
  isSearch,
  isMain,
  isSub,
  level,
  href,
  onClick,
  onExpand,
}: ItemProps) => {
  const router = useRouter();

  // 🎯  requires updating with sidebar
  const handleNavigation = () => {
    if (isMaster) {
      //- accordion trigger, should not update route
      return null;
    }
    if (onClick) {
      //- opens external link in seperate tab
      //🎯 this could be handled better
      onClick();
    } else if (!onClick) {
      //- updates route
      router.push(`/${href}`);
    }
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={handleNavigation}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[30px] text-base py-2 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium pt-3",
        active && "bg-primary/5 text-primary",
        isMaster && "hover:bg-transparent ml-0",
        isMain && "text-primary font-semibold ml-2",
        isSub && "ml-6",
        isReverse && "flex-row-reverse gap-6 py-1 pr-0"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground/50",
              isMain && "text-primary font-bold"
            )}
          />
        </div>
      )}
      {customIcon ? (
        <div className="shrink-0 mr-5">
          <Image
            src={`/sidebar-icons/${customIcon}`} // Adjust the path and extension according to your file structure
            alt={customIcon}
            height={30}
            width={30}
            className="h-[22px] w-[22px]" // Set the appropriate height and width for your image
          />
        </div>
      ) : (
        <Icon
          className={cn(
            "shrink-0 h-[22px] w-[22px] mr-5 text-muted-foreground",
            isMain && "text-primary font-bold mr-3 h-[30px] w-[20px]"
          )}
        />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={() => {}}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by:
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={() => {}}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

SidebarItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
