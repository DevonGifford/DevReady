import React from "react";
import {
  AlignVerticalJustifyStart,
  Apple,
  BrainCircuit,
  DatabaseBackup,
  Gauge,
  LibrarySquare,
  LucideIcon,
  MonitorSmartphone,
  Newspaper,
  PlusCircle,
  Route,
  ScrollText,
  Search,
  Settings,
  Map,
  MessagesSquare,
  Sparkles,
  FileCode2,
  Home,
} from "lucide-react";
import { Router, useRouter } from "next/router";

interface SidebarItemProps {
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  isMain?: boolean;
  isSub?: boolean;
  isMaster?: boolean;
  isSearch?: boolean;
  isSetting?: boolean;
  subItems?: {
    label: string;
    icon: LucideIcon;
    customIcon?: string;
    onClick?: () => void;
    href?: string;
    isSub: boolean;
  }[];
}

interface SidebarIndexProps {
  value: string;
  items: SidebarItemProps[];
}

export const sidebarQuickIndex: SidebarItemProps[] = [
  {
    label: "Search Questions",
    icon: Search,
    isSearch: true,
  },
  { label: "Quick Settings", icon: Settings },
  { label: "User Dashboard", icon: Gauge },
  {
    label: "Create Flash Cards",
    icon: PlusCircle,
  },
];

export const sidebarIndex: SidebarIndexProps[] = [
  {
    value: "Interviews",
    items: [
      {
        label: "Frontend Interview",
        icon: MonitorSmartphone,
        href: "interviews",
        isMain: true,
      },
      {
        label: "Backend Interview",
        icon: DatabaseBackup,
        href: "coming-soon",
        isMain: true,
      },
      {
        label: "Fullstack Interview",
        icon: AlignVerticalJustifyStart,
        href: "coming-soon",
        isMain: true,
      },
      {
        label: "Interview with AI Hiring Manager",
        icon: BrainCircuit,
        href: "coming-soon",
        isMain: true,
      },
    ],
  },
  {
    value: "Flashcards",
    items: [
      {
        label: "ZTM Course Flashcards",
        icon: ScrollText,
        isMain: true,
        isMaster: true,
        subItems: [
          {
            label: "Remix Bootcamp",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "The Complete Web Developer",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "Complete Junior to Senior Web Developer",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "Complete Python Developer",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "JavaScript: The Advanced Concepts",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "TypeScript Bootcamp: Zero to Mastery",
            icon: ScrollText,
            customIcon: "ZTM-logo.png",
            href: "coming-soon",
            isSub: true,
          },
        ],
      },
      {
        label: "Popular Topics",
        icon: Sparkles,
        isMain: true,
        isMaster: true,
        subItems: [
          {
            label: "HTML & CSS Flashcards",
            icon: ScrollText,
            customIcon: "html-css.png",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "Python",
            icon: ScrollText,
            customIcon: "python-logo.svg",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "JavaScript Flashcards",
            icon: ScrollText,
            customIcon: "javascript-logo.svg",
            href: "flashcards",
            isSub: true,
          },
          {
            label: "TypeScript Flashcards",
            icon: ScrollText,
            customIcon: "typescript-logo.svg",
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "React Flashcards",
            icon: ScrollText,
            customIcon: "react-logo.svg",
            href: "coming-soon",
            isSub: true,
          },
        ],
      },
      {
        label: "Student Created Flashcards",
        icon: Apple,
        isMain: true,
        isMaster: true,
        subItems: [
          {
            label: "Example 1",
            icon: ScrollText,
            href: "coming-soon",
            isSub: true,
          },
          {
            label: "Example 2",
            icon: ScrollText,
            href: "coming-soon",
            isSub: true,
          },
        ],
      },
    ],
  },
  {
    value: "Resources",
    items: [
      {
        label: "Find your custom career path",
        icon: Map,
        onClick: () => {
          window.open(
            "https://zerotomastery.io/tech-career-path-quiz/",
            "_blank"
          );
        },
        isMain: true,
      },
      {
        label: "Career Roadmaps",
        icon: Route,
        onClick: () => {
          window.open("https://roadmap.sh/", "_blank");
        },
        isMain: true,
      },
      {
        label: "Coding Problems",
        icon: FileCode2,
        href: "coming-soon",
        isMain: true,
      },
      {
        label: "Open Source Study-Notes",
        icon: Newspaper,
        onClick: () => {
          window.open(
            "https://devon-gifford.notion.site/myDev-Resources-d01e48a778674007b3e3da6356f89df4?pvs=4",
            "_blank"
          );
        },
        isMain: true,
      },
      {
        label: "Take Home Assessments",
        icon: Home,
        href: "coming-soon",
        isMain: true,
      },
      {
        label: "Discord Community",
        icon: MessagesSquare,
        onClick: () => {
          window.open(
            "https://zerotomastery.io/community/developer-community-discord/",
            "_blank"
          );
        },
        isMain: true,
      },
    ],
  },
];
