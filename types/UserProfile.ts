export interface UserProfile {
  uuid: string;
  email: string;
  user_role: string;
  created_at: string;
  last_login: string;

  account: {
    username: string | null;
    userimage: string | null;

    career_title: string | null;
    programming_lang: string | null;

    career_level: number;
    experience_level: number;

    skills_list: string[] | null;
  };

  profile: {
    bio: string | null;
    home_lang: string;
    location: string;
    urls: {
      github?: string;
      linkedin?: string;
      portfolio?: string;
    };
    projects: {
      capstone?: string;
      additional?: string;
    };
    ztm_student: boolean;
    star_mentor: boolean;
  };

  goals: {
    current_goals: {
      goal_title: string;
      goal_description: string;
      goal_eta: Date;
    };
    past_goals: {}[];
  };

  notifications: {
    notif_level: "all" | "profile" | "none";
    
    communication_emails: boolean;
    marketing_emails: boolean;
    newsletter_emails: boolean;
    
    push_notifs: boolean;
    mobile_notifs: boolean;
  };
}

export const defaultUserProfile: UserProfile = {
  uuid: "PhlFnsBd5jgI0WikUT5RlbdKNSI2",
  email: "johndoe@example.com",
  user_role: "user",
  created_at: "2023-01-01",
  last_login: "2023-11-01",

  account: {
    username: "johndoe123",
    userimage: "link_to_firebase_saved_image",
    career_title: null,
    programming_lang: null,
    career_level: 0,
    experience_level: 0,
    skills_list: null,
  },

  profile: {
    bio: null,
    home_lang: "English",
    location: "",
    urls: {
      github: "",
      linkedin: "",
      portfolio: "",
    },
    projects: {
      capstone: "",
      additional: "",
    },
    ztm_student: true,
    star_mentor: false,
  },

  goals: {
    current_goals: {
      goal_title: "",
      goal_description: "",
      goal_eta: new Date(), // Date type for goal_eta
    },
    past_goals: [], // Empty array instead of an array with an empty object
  },

  notifications: {
    notif_level: "all",
    communication_emails: true,
    marketing_emails: false,
    newsletter_emails: false, // Added missing property
    push_notifs: true,
    mobile_notifs: true, // Renamed log_events to mobile_notifs
  },
};