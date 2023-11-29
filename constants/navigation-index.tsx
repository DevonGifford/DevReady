import React from "react";
import { AccountForm } from "@/app/(dashboard)/_components/forms/account-form";
import { ProfileForm } from "@/app/(dashboard)/_components/forms/profile-form";
import { AppearanceForm } from "@/app/(dashboard)/_components/forms/appearance-form";
import { NotificationsForm } from "@/app/(dashboard)/_components/forms/notification-form";
import { GoalsForm } from "@/app/(dashboard)/_components/forms/goals-form";


// 👇 Handle Forms 
export interface FormObject {
  component: React.ReactNode;
  description: string;
}

export const userProfileForms: Record<string, FormObject> = {
  Account: {
    component: <AccountForm />,
    description: "Configure your account.",
  },
  Profile: {
    component: <ProfileForm />,
    description: "Configure how you receive notifications.",
  },
  Goals: {
    component: <GoalsForm />,
    description: "Configure how you receive display.",
  },
  // Appearance: {
  //   component: <AppearanceForm />,
  //   description: "Configure appearance.",
  // },
  Notifications: {
    component: <NotificationsForm />,
    description: "Configure how you receive notifications.",
  },
};


// 👇 Account-form 
export const countriesList = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Spain", value: "ES" },
  { label: "Italy", value: "IT" },
  { label: "Australia", value: "AU" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
  { label: "India", value: "IN" },
  { label: "Brazil", value: "BR" },
  { label: "Mexico", value: "MX" },
  { label: "South Africa", value: "ZA" },
  { label: "Nigeria", value: "NG" },
  { label: "Russia", value: "RU" },
  { label: "South Korea", value: "KR" },
  { label: "Turkey", value: "TR" },
  { label: "Argentina", value: "AR" },
  { label: "Egypt", value: "EG" },
  // Add more countriesList as needed
] as const;

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;



// 👇 Profile-form 
export const careerList = [
  { label: "Frontend Developer" },
  { label: "Fullstack Developer" },
  { label: "Backend Developer" },
  { label: "Python Developer" },
  { label: "Data Engineer" },
  { label: "Mobile Developer" },
  { label: "AI/ML" },
  { label: "DevOps" },
] as const;

export const programmingLanguagesList = [
  { label: "JavaScript" },
  { label: "Python" },
  { label: "Java" },
  { label: "C#" },
  { label: "C++" },
  { label: "TypeScript" },
  { label: "PHP" },
  { label: "Ruby" },
  { label: "Swift" },
  { label: "Go" },
] as const;

export const skillsList = [
  // Frontend Development
  { label: "React.js" },
  { label: "Angular" },
  { label: "Vue.js" },
  { label: "Svelte" },
  { label: "Next.js" },

  // Backend Development
  { label: "Node.js" },
  { label: "Express.js" },
  { label: "Django" },
  { label: "Flask" },
  { label: "Ruby on Rails" },
  { label: "ASP.NET" },

  // Libraries
  { label: "Cypress" },
  { label: "Playwright" },
  { label: "React Testing Library (RTL)" },
  { label: "Jest" },
  { label: "Vitest" },
  { label: "Redux" },

  // Data Engineering
  { label: "Apache Hadoop" },
  { label: "Apache Spark" },
  { label: "SQL Databases" },
  { label: "NoSQL Databases" },

  // Data Science
  { label: "NumPy" },
  { label: "Pandas" },
  { label: "Scikit-learn" },

  // Tools
  { label: "PowerBI" },
  { label: "React-native" },
  { label: "Flutter" },
  { label: "Git/GitHub" },
] as const;


// 👇 Appearance-form
export const sidebarItems = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;