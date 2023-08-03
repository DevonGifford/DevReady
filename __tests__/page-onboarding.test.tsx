import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "@/app/(auth)/(routes)/login/page";
import OnboardingFormHandler from "@/app/(auth)/(routes)/onboarding/page";
import UserOnboardingWelcome from "@/app/(auth)/_components/userWelcome-onboarding";
import UserOnbaordingCareer from "@/app/(auth)/_components/userCareer-onboarding";
import UserOnboardingImage from "@/app/(auth)/_components/userImage-onboarding";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

global.ResizeObserver = jest.fn(() => ({
  // Create a mock for ResizeObserver in test setup
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// TESTING ONBOARDING PROCESS
describe("Onboarding: General Page Rendering Tests", () => {
  it("renders root page", () => {
    const { container } = render(<OnboardingFormHandler />);
    expect(container).toBeInTheDocument();
  });

  it("renders form", () => {
    const { container } = render(<UserOnboardingWelcome />);
    expect(container).toBeInTheDocument();
  });

  it("expect first-welcome-form to be rendered", () => {
    render(<OnboardingFormHandler />);
    expect(screen.getByText("Welcome to your")).toBeInTheDocument();
  });

  it("expect next form button", () => {
    render(<OnboardingFormHandler />);
    expect(screen.getByText("Next page")).toBeInTheDocument();
  });
});

describe("Onboarding: User-Welcome-Form Tests", () => {
  test("Testing rendering correct elements: Heading, name, career, career clicked", async () => {
    //-Arrange
    render(<UserOnboardingWelcome />);
    const welcomeHeader = screen.getByTestId("welcome-header");
    const displayNameField = screen.getByText(/enter a display name/i);
    const pickCareerField = screen.getByText(/pick your dream career/i);
    const nextFormButton = screen.getByText(/next page/i);

    //-Assert
    expect(welcomeHeader).toBeInTheDocument();
    expect(displayNameField).toBeInTheDocument();
    expect(pickCareerField).toBeInTheDocument();
    expect(nextFormButton).toBeInTheDocument();
  });

  test("form validation on empty email/password error messages", async () => {
    //-Arrange
    render(<UserOnboardingWelcome />);
    const nextButton = screen.getByRole("button", { name: "Next page" });

    //-Act
    await userEvent.click(nextButton);

    //-Assert
    setTimeout(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument();
    }, 3000);
  });

  test("happy path case - submits form with valid data", async () => {
    //-Arrange
    render(<UserOnboardingWelcome />);
    const usernameInput = screen.getByRole("textbox", {
      name: "display-name",
    });
    const careerTitleButton = screen.getByRole("combobox", {
      name: "Pick your dream career",
    });
    const nextButton = screen.getByRole("button", { name: "Next page" });

    //-Act
    fireEvent.change(usernameInput, { target: { value: "JohnDoe" } });
    await userEvent.click(careerTitleButton);
    const careerItem = await screen.findByText("Frontend Developer");
    await userEvent.click(careerItem);
    await userEvent.click(nextButton);

    //-Assert
    setTimeout(() => {
      expect(window.location.search).toContain("pageId=data-onboarding");
      expect(window.location.search).toContain("username=JohnDoe");
      expect(window.location.search).toContain(
        "career_title=Frontend+Developer"
      );
    }, 3000);
  });
});

describe("Onboarding: User-Career-Form Tests", () => {
  it("renders form", () => {
    const { container } = render(<UserOnbaordingCareer />);
    expect(container).toBeInTheDocument();
  });

  test("rendering correct elements: heading, sliders, next button", async () => {
    //-Arrange
    render(<UserOnbaordingCareer />);
    const welcomeHeader = screen.getByText(/current level/i);
    const proficiencyField = screen.getByText("Professional Stage");
    const experienceField = screen.getByText(/experience level/i);
    const nextFormButton = screen.getByText(/next page/i);

    //-Assert
    expect(welcomeHeader).toBeInTheDocument();
    expect(proficiencyField).toBeInTheDocument();
    expect(experienceField).toBeInTheDocument();
    expect(nextFormButton).toBeInTheDocument();
  });

  test("happy path case - submits form with valid dat", async () => {
    render(<UserOnbaordingCareer />);
    const careerLevelSlider = screen.getByTestId("professional-stage");
    const experienceLevelSlider = screen.getByTestId("experience-level");
    const nextFormButton = screen.getByText(/next page/i);

    careerLevelSlider.focus();
    await userEvent.keyboard("{arrowright>5}");
    experienceLevelSlider.focus();
    await userEvent.keyboard("{arrowright>5}");
    await userEvent.click(nextFormButton);

    //-Assert
    setTimeout(() => {
      expect(window.location.search).toContain("pageId=image-onboarding");
      expect(window.location.search).toContain("career_level=69");
      expect(window.location.search).toContain("experience_level=69");
    }, 3000);
  });

  // test note:  case of no negative testing required on this form
});

describe("Onboarding: User-Image-Form Tests", () => {
  it("renders form", () => {
    const { container } = render(<UserOnboardingImage />);
    expect(container).toBeInTheDocument();
  });

  test("rendering correct elements: heading, sliders, next button", async () => {
    //-Arrange
    render(<UserOnboardingImage />);
    const welcomeHeader = screen.getByText(/final step/i);
    const welcomeDescription = screen.getByText(/pick a custom avatar/i);
    const completeOnboardingButton = screen.getByText(/complete/i);

    //-Assert
    expect(welcomeHeader).toBeInTheDocument();
    expect(welcomeDescription).toBeInTheDocument();
    expect(completeOnboardingButton).toBeInTheDocument();
  });
});

describe("Onboarding: Submission and integration tests", () => {
  it("successful form submit should have notification and reroute", async () => {
    //- Tearup
    jest.mock("../components/providers/UserProvider", () => ({
      useUserContext: jest.fn(() => ({
        userProfile: {
          uuid: "mockedUserId", // Replace with your mock data as needed
          account: {
            username: "mockedUsername",
            career_title: "mockedCareerTitle",
            career_level: 5,
            experience_level: 3,
            userimage: "mockedImageURL",
          },
        },
        updateUserDataProcess: jest.fn(), // You can mock this function as well if needed
      })),
    }));

    //- Arrange
    render(<UserOnboardingImage />);
    const submitButton = screen.getByRole("button", { name: "Complete" });

    //- Act
    await userEvent.click(submitButton);

    //-Assert
    setTimeout(() => {
      expect(screen.getByText("Successfully signed in")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/dashboard"); // Example of checking for redirection
      // expect(mockSuccessLogin).toHaveBeenCalledTimes(1);
    }, 4000);
  });

  it("unsuccessful form submit should have notification and reroute", async () => {
    //- Tearup
    const mockUserContext = jest.mock("../components/providers/UserProvider", () => ({
      useUserContext: jest.fn(() => ({
        userProfile: undefined,
        updateUserDataProcess: jest.fn(), // You can mock this function as well if needed
      })),
    }));

    //- Arrange
    render(<UserOnboardingImage />);
    const submitButton = screen.getByRole("button", { name: "Complete" });

    //- Act
    await userEvent.click(submitButton);

    //-Assert
    setTimeout(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/dashboard"); // Example of checking for redirection
      expect(mockUserContext).toHaveBeenCalledTimes(1);
    }, 4000);
  });

  it("unsuccessful form submit should have notification and error messages", async () => {
    //- Tearup
    const mockFailedLogin = jest.fn().mockResolvedValue({ result: "error" });
    jest.mock("../components/providers/AuthProvider", () => ({
      useAuth: () => ({
        login: mockFailedLogin,
      }),
    }));

    //- Arrange
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    //- Act
    await userEvent.type(emailInput, "notrealemail@test.com");
    await userEvent.type(passwordInput, "notrealpassword");
    await userEvent.click(submitButton);

    //- Assert
    setTimeout(() => {
      expect(
        screen.getByText("Incorrect credentials, please try again.")
      ).toBeInTheDocument();
      expect(mockFailedLogin).toHaveBeenCalledTimes(1);
    });
  });
});
