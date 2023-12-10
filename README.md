<!-- Introduction Text -->
<div align="center">
    <h1>ZTMReady - Flash Card App</h1>
    <h3>Fullstack Application</h3>
    <h3>Currently a work in progress</h3>
  <a href='https://ztm-ready-portfolio-project.vercel.app/', target='_blank'>
    <h5>live demo</h5>
  </a>
    <hr>
    <h6>
        built with <a href="https://nextjs.org">Next.js</a> &
        hosted by <a href="https://vercel.com/">Vercel</a> 
    </h6>
</div>

<!-- Logo -->
<!-- <p align='center'>
<a href='🎯', target='_blank'>
    <img src="🎯" alt="Demo" title="DemoImage" width="500" height="300">
</a>
</p> -->

---

# **Table of Contents**

- [Introduction](🎯)
- [Features Implemented](🎯)
- [Features Coming Soon](🎯)
- [Running Locally](🎯)
- [Contributions](🎯)
- [License](🎯)
- [Notes](🎯)

<!-- -------------------------------------------------------------------------- -->

---

# **INTRODUCTION**:

Welcome to the ZTM Quiz Platform. A web application inspired by ZTM, designed to create an engaging and interactive quiz platform for students. The project aims to empower learning through gamification and dynamic features tailored to enhance the learning experience.

More than a quiz tool; it's a holistic learning ecosystem designed to prepare students for successful careers in tech.

## **Goals**

1.  **Job-Ready Assessment:**

    This platform will serve as a check to gauge students' readiness for job applications and interviews. Upon successful completion, students will have the confidence and assurance to venture into the job market, equipped with skills and knowledge for excelling in the interview process.

2.  **Interactive Learning Experience:**

    The platform creates an engaging learning environment by integrating gaming elements with educational content. This approach aids students in introducing, comprehending, and articulating the necessary aspects and broader coding concepts in an enjoyable and straightforward manner.

3.  **By ZTM Students, For ZTM Students:**

    Aligning seamlessly with ZTM's teaching methodologies, this platform is crafted by students and tailored exclusively for it's students. It serves as a reinforcement of course materials, empowering students to merge theoretical knowledge with practical application, effectively preparing them for the demands of the industry.

4.  **Fostering Autonomous Learning:**

    With adaptive learning features, progress tracking, and a user-friendly dashboard, students can personalize their learning journeys. This autonomy nurtures a deeper understanding of coding concepts, empowering students and enhancing their readiness for employment.

<br/>

### Community-Driven Collaboration:

As an open-source initiative, this platform encourages collaboration and contributions from both students, mentors and educators. It nurtures a culture of knowledge sharing and continuous improvement.

- **Code Contributions:** One of the primary ways to contribute is by enhancing the codebase. Developers and programmers can submit code improvements, bug fixes, or new features via pull requests, driving the evolution and functionality of the platform.

- **Documentation and Guides:** Clear and comprehensive documentation is fundamental to the project's accessibility and usability. Contributions in the form of guides, tutorials, or documentation enhancements greatly assist users and developers in navigating the platform.

- **Testing and Feedback**: Engaging in testing activities and providing constructive feedback on user experiences, functionalities, or usability issues plays a pivotal role in refining the platform and ensuring its reliability.


We believe that every contribution, regardless of its nature, adds immense value to the community and the project. Emphasizing inclusivity, the platform encourages contributions in various forms, creating an environment where diverse skill sets and perspectives converge to enrich the learning experience.

By embracing the spirit of open collaboration, the platform extends an open invitation to everyone, welcoming their expertise, creativity, and passion to collectively enhance the learning journey for all participants.

<br/>
---

#### Initial Scope of Key Features:

- **Dynamic Flashcard Game Mechanism**: <br>
  Reinforce understanding of concepts and assess knowledge.

- **Adaptive Learning System**: <br>
  Remember incorrect answers for future quizzes, providing targeted practice.

- **Progress Tracking**: <br>
  Monitor advancement and achievements within the platform.

- **Intuitive Dashboard**: <br>
  Enjoy a visually appealing and gamified experience while tracking progress.

- **Collaborative Flashcard Database**: <br>
  Fueled by community contributions. (Consider best practices for database management.)

- **Customizable Flashcard Sets**: <br>
  Create and share sets within the community-driven database.

- **Course Recommendations**: <br>
  Suggest ZTM courses based on user data - quizz results and onboarding info.

- **OpenAI Integration**: <br>
  Incorporate a trained OpenAI API bot for interactive interviews.

<br>

<!-- ---------------------------------------------------------------- -->

---

# **FEATURES**

### **Features Implemented**

Let's dive into the key features implemented in this project: 🔑

- **Modern UI with Tailwind design:** <br/> Enjoy a visually stunning and sleek user interface.

- **Full responsiveness for all devices:** <br/> The application adapts flawlessly to various screen sizes and devices.

- **Feature name:** <br/> description

<br>

### **Features Coming Soon**

These features are currently being worked on: 👨‍💻

- **Feature name:** <br/> description

-

<br>

---

<!-- ---------------------------------------------------------------- -->

# **RUNNING LOCALLY:**

<!-- Small container -->
<details>
<summary> Click here to see how to run this locally: 🏃‍♂️ </summary>
<br/>

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/DevonGifford/ZTM-Card-Flip.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
🎯🎯🎯
```

### Setup 🎯🎯🎯

### Start the app

```shell
npm run dev
```

<!-- CLOSING DIV -->
</details>

<br><br>

---

# **CONTRIBUTIONS**

If you'd like to contribute to this repository by adding more features, fixing bugs, or improving documentation, please feel free to check out existing issues and submit a pull request. 

Your contributions are greatly appreciated!


<!-- This needs to be updated one day 🎯 -->
<br/>

---

# **LICENSE**

This project is licensed under the [MIT License](🎯).

<br/>

---

# **NOTES:**

<details>
<summary> Click here to see further notes: </summary>
<br/>

- This project is for educational purposes only and not affiliated with ZTM.

- 🎯🎯🎯

<!-- CLOSING DIV -->
</details>

<br>
 


 


# Ticket Handling Strategy

### Branch Plan Overview

I've devised a structured approach to handle next tickets. Here's the breakdown of my plan:

### Ticket Segmentation

1. **Feature: User Onboarding Implementation**
   - **Branch Name:** `feature/user-onboarding-implementation`
   - **Objective:** Adding a new feature for guiding new users during registration and determining their initial platform level.
   - **Reasoning:** This feature enhances our app by collecting additional user information and establishing a smooth onboarding process.

2. **Refactor/Enhance: Authentication Pages**
   - **Branch Name:** `refactor/enhance-authentication-pages`
   - **Objective:** Improving the structure, error handling, and validation in the Login and Register pages.
   - **Reasoning:** This task focuses on refining our existing authentication processes, ensuring robustness and reliability.

### Sequential Approach

**Order of Implementation:**
   - **Priority 1:** Start with the `feature/user-onboarding-implementation` branch to introduce the onboarding feature.
   - **Priority 2:** Following the completion of the onboarding implementation, move to the `refactor/enhance-authentication-pages` branch. This will serve as a cleanup and optimization phase for entire authentication processes - thus setting up for cleaner testing phase .

### Interdependency Consideration

While the authentication pages are already integrated, prioritizing the onboarding feature might be for the best. It allows me to build upon existing functionality and then refine authentication process comprehensively.





# CURRENT TICKET :  Implement User Onboarding Process  #20

https://github.com/DevonGifford/ZtmReady--PortfolioProject/issues/20

### Summary:

This ticket outlines the process of establishing an onboarding process for new users during registration. The tasks involved include defining onboarding questions, integrating the questionnaire with the registration flow, developing mechanisms for data collection and storage, defining the logic for level determination, and providing user feedback.

In layman’s terms, this implementation “Helps our app guide new users during registration. It sets up a process to collect additional information about users and determine their initial level.”

As always, we prioritize thorough testing and validation of functionalities for robustness and reliability, along with comprehensive documentation for clarity and future reference.

<br/>

---

### Research Onboarding & Define Questions
- [ ] **Create Targeted Questions:** Gather user information for determining their initial platform level.
- [ ] **Research Best Practices:** Explore potential examples or libraries with smooth user interaction and flashy UI.

### Integration with Registration and FireStore DB
- [ ] **Incorporate Questionnaire:** Integrate the onboarding questionnaire smoothly within the registration flow to gather additional user information.
- [ ] **Secure Data Collection:** Develop secure mechanisms to collect and store user responses securely in the Firestore Database.
- [ ] **Implement Robust Validation:** Ensure thorough error handling and validation processes to maintain accurate data for level determination.

### Post Onboarding Logic
- [ ] **Provide User Feedback:** Offer clear and informative feedback to users based on their onboarding responses, ensuring a better understanding of the initial level determination.
- [ ] **Define Level Algorithm:** Establish the algorithm or logic to derive the user’s initial platform level based on collected data.
- [ ] **Final Submission Functionality:** Create a function for updating the Firebase database upon onboarding completion, followed by user redirection to the login page.
- [ ] **Post-Login Data Retrieval:** Develop a process to fetch data from Firebase during login, store it in session storage, and update the user context.

### Testing Considerations
- [ ] **Comprehensive Testing:** Conduct exhaustive end-to-end (E2E), integration, and unit tests to ensure the robust functionality of the onboarding process across diverse scenarios and inputs.


<br/>

---

### Additional Considerations

- Collaborate with UX/UI teams to ensure the seamless integration of the forms with the application’s design and user experience.
- Prioritize security measures to safeguard user data and prevent unauthorized access during CRUD operations.

**Consider Documenting** the following:

- **Onboarding Questions**: Detail the questions asked during the onboarding process.
- **Data Storage Methods**: Document the methods used for data collection and storage.
- **Level Determination Logic**: Describe the logic or algorithm used to determine the user’s initial level.


# My Notes During dev: 


---

### Onboarding Components
**Files:**  `app\(auth)\_components`

1. **`welcome-onboarding.tsx`**:
   - **Purpose:** Create a welcoming experience for new users, collecting:
     - Username
     - Dream title

2. **`data-onboarding.tsx`**:
   - **Purpose:** Collect basic user data including:
     - Current career level
     - Years of experience
     - Input fields for user information

3. **`image-onboarding.tsx`**:
   - **Purpose:** Manage user profile pictures:
     - Provide default options
     - Enable user uploads or selections for profile visuals

**Note Data Utilization:**
Collected data will personalize the user’s app experience, updating user context and setting initial SR (secret rating).

---

### Handling Routing and State
**File:** `app\(auth)\(routes)\onboarding\page.tsx`

Implemented conditional rendering and state storage within the UI to manage routing efficiently.

Snippet Example:
```tsx
// Render 'go back to previous form' button or render first form
{router.query.type ? (
    <button onClick={() => router.back()}>
        <ArrowLeftIcon /> Go Back
    </button>
) : (
    <Intro key="intro" />
)}

// Conditional rendering based on router query
{router.query.type === "data-onboarding" && <DataOnboardingPage />}
{router.query.type === "image-onboarding" && <ImageOnboardingPage />}
{router.query.type === "welcome-onbaording" && <WelcomeOnboardingPage />}
```

---

### Logic for User State Handling

Outlined steps to manage user state during the onboarding process:

1. **Create Basic Onboarding Pages**:
    - Develop necessary onboarding pages.
    - Store entered information (e.g., username, dream title) in local state using `useState`.
    - Create placeholder functions for form submissions.

2. **Navigating to Data Collection Page**:
    - Conditionally render the appropriate onboarding page based on user interaction.
    - Update URL to include collected data on user interaction (e.g., `/onboarding/data?username=John&dreamTitle=Adventure`).

3. **Retrieving Data on Data Collection Page**:
    - Retrieve parameters from URL on `DataOnboardingPage` using `router.query`.
    - Extract necessary data (username, dream title, etc.) for personalizing the user’s experience.

4. **Handling Form Submissions (Data Collection Page)**:
    - Update local state for user inputs (e.g., career level, years of experience) on form interaction.
    - Update URL with new data on form submission (e.g., `/onboarding/image?username=John&careerLevel=Intermediate`).

5. **Persisting Data (DB and Global State)**:
    - Save data permanently (Firestore database).
    - Update userContext with new data.

---

### Additional Changes and Updates

- **Creating Constants for Onboarding Process**:  
  `constants\onboarding-index.ts`
  
- **Updating Register to Route to Onboarding**:  
  Implemented logic to direct users to the onboarding process.
  
- **Incorporating Framer Motion for Smooth Animations**:
  *provide additional details later.*




