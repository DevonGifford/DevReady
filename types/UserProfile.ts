export interface UserProfile {
  uuid: string;
  email: string;
  userRole: string;
  createdAt: string;
  lastLogin: string;

  account: {
    username: string | null;
    userimage: string | null;
    age: number | null;
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
    career_title: string | null;
    programming_lang: string | null;
    career_level: number;
    experience_level: number;
    skills_list: string[] | null[];
    bio: string | null;
  };

  goals: {
    goal_title: string;
    goal_description: string;
    goal_eta: string; 
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

export const defaultUserProfile: UserProfile = {
  uuid: "PhlFnsBd5jgI0WikUT5RlbdKNSI2",
  email: "johndoe@example.com",
  userRole: "user",
  createdAt: "2023-01-01",
  lastLogin: "2023-11-01",

  account: {
    username: "johndoe123",
    userimage: "link_to_firebase_saved_image",
    age: 29,
    home_lang: "English",
    location: "",
    urls: {
      github: "",
      linkedin: "",
      website: "",
    },
    ztm_student: true,
    star_mentor: false,
  },

  profile: {
    career_title: null,
    programming_lang: null,
    career_level: 0,
    experience_level: 0,
    skills_list: [],
    bio: null,
  },

  goals: [
    {
      goal_title: "",
      goal_description: "",
      goal_eta: "",
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
