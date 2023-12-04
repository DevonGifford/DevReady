// 👇 Profile-form 
export const locations = [
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
] as const;

export const home_languages = [
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



// 👇 Account-form 
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
  { label: "React" },
  { label: "Angular" },
  { label: "Vue" },
  { label: "Svelte" },
  { label: "Next" },
  { label: "Remix" },

  // Backend Development
  { label: "Node" },
  { label: "Express" },
  { label: "Django" },
  { label: "Flask" },
  { label: "Ruby" },
  { label: ".NET" },

  // Libraries
  { label: "Cypress" },
  { label: "Playwright" },
  { label: "RTL" },
  { label: "Jest" },
  { label: "Vitest" },
  { label: "Redux" },

  // Data Engineering
  { label: "Hadoop" },
  { label: "Spark" },
  { label: "SQL" },
  { label: "NoSQL" },
  { label: "MongoDB" },

  // Data Science
  { label: "NumPy" },
  { label: "Pandas" },
  { label: "Scikit" },

  // Tools
  { label: "PowerBI" },
  { label: "React-native" },
  { label: "Flutter" },
  { label: "Git/GitHub" },
] as const;


// 👇 Appearance-form  
//🎯 to-do-list removed appearance form - remove this 
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