export interface UserProfile {
    uuid: number; // Assuming this represents a unique identifier for the user
    email: string;
    userRole: string;
    createdAt: string;
    lastLogin: string;
  
    account: {
      username: string;
      userimage: string;
      age: number;
      home_lang: string;
      location: string;
      urls: {
        github?: string;
        linkedin?: string;
        website?: string;
      };
      ztm_student: boolean;
      star_mentor: boolean;
    };
  
    profile: {
      career_title: string;
      programming_lang: string;
      career_level: number;
      experience_level: number;
      skills_list: string[];
      bio: string;
    };
  
    goals: {
      goal_title: string;
      goal_description: string;
      goal_eta: string; // Change this to a string date format as per your requirement
    }[];
  
    notifications: {
      notif_level: "all" | "level-change" | "none";
      communication_emails: boolean;
      marketing_emails: boolean;
      push_notifications: boolean;
      log_events: boolean;
      mobile_diff: boolean;
    };
  
  }
  
  // Test Usage:
  export const defaultUserProfile: UserProfile = {
    uuid: 123456,
    email: "johndoe@example.com",
    userRole: "user",
    createdAt: "2023-01-01",
    lastLogin: "2023-11-01",
  
    account: {
      username: "johndoe123",
      userimage: "link_to_firebase_saved_image",
      age: 29,
      home_lang: "English",
      location: "United Kingdom",
      urls: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        website: "https://johndoe.com",
      },
      ztm_student: true,
      star_mentor: false,
    },
  
    profile: {
      career_title: "Software Engineer",
      programming_lang: "JavaScript",
      career_level: 2,
      experience_level: 4,
      skills_list: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
      bio: "Passionate about coding and learning new technologies!",
    },
  
    goals: [
      {
        goal_title: "Learn React",
        goal_description: "Master React and build projects",
        goal_eta: "2023-12-31",
      },
      // Add more goals as needed
    ],
  
    notifications: {
      notif_level: "all",
      communication_emails: true,
      marketing_emails: false,
      push_notifications: true,
      log_events: false,
      mobile_diff: true,
    },

  };
  