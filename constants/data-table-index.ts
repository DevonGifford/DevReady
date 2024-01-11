import {
  Apple,
  ArrowBigRight,
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  CableCar,
  HelpCircle,
  Mountain,
  MountainSnow,
  Scroll,
  ScrollText,
  Sparkles,
} from "lucide-react";


export const types = [
  {
    label: "Interview",
    value: "interview",
    icon: BrainCircuit,
  },
  {
    label: "Bootcamp",
    value: "bootcamp",
    icon: ScrollText,
  },
  {
    label: "Course",
    value: "course",
    icon: Scroll,
  },
  {
    label: "Topic",
    value: "topic",
    icon: Sparkles,
  },
  {
    label: "Custom",
    value: "custom",
    icon: Apple,
  },
];

export const difficulty = [
  {
    value: "hard",
    label: "Hard",
    icon: MountainSnow,
  },
  {
    value: "medium",
    label: "Medium",
    icon: Mountain,
  },
  {
    value: "easy",
    label: "Easy",
    icon: CableCar,
  },
  {
    value: "other",
    label: "Other",
    icon: HelpCircle,
  },
];

// reference: tags-index.ts