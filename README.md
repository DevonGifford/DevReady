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
 

# Login testing
 
### Unit Tests:
- [ ] **Form Validation Tests**:
  - [ ] Validate `loginFormSchema` for email and password inputs.
  - [ ] Test validation error messages for different input scenarios.

- [ ] **Form Submission Tests**:
  - [ ] Simulate form submission with successful login.
  - [ ] Verify handling of incorrect email/password combinations.
  - [ ] Test error handling for different Firebase authentication errors.

- [ ] **Rendering Tests**:
  - [ ] Ensure component renders without errors.
  - [ ] Verify rendering of UI elements (headers, labels, inputs, buttons, etc.).

- [ ] **Event Handling Tests**:
  - [ ] Test user interactions such as typing, clicking, and form submission.
  
### Integration Tests:
- [ ] **AuthProvider Integration**:
  - [ ] Mock `useAuth` hook to simulate authentication scenarios.
  - [ ] Verify component behavior based on authentication outcomes.

- [ ] **Router Integration**:
  - [ ] Mock router (`next/navigation`) to test navigation upon login success or failure.

- [ ] **Form Library Integration**:
  - [ ] Test integration of `react-hook-form` with `zodResolver`.
  - [ ] Validate error display based on form validation results.

### Snapshot Tests:
- [ ] Capture snapshots for the overall structure of the rendered component.