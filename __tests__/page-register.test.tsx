import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterPage from "@/app/(auth)/(routes)/register/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock("../components/providers/AuthProvider", () => ({
  useAuth: () => ({
    register: jest.fn().mockImplementation(async (email, password) => {
      // Your custom implementation goes here
      // For example, simulate a successful registration
      return { result: "success" }; // Change this based on your test scenario
    }),
  }),
}));

global.ResizeObserver = jest.fn(() => ({
  // Create a mock for ResizeObserver in test setup
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// TESTING REGISTER PAGE
describe.skip("Reigster Page Rendering Tests", () => {
  it("renders login page", () => {
    const { container } = render(<RegisterPage />);
    expect(container).toBeInTheDocument();
  });

  it("renders the header component correctly", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Create a new account")).toBeInTheDocument();
    expect(screen.getByText(/if it be not to come/i)).toBeInTheDocument();
  });

  it("renders the footer correctly", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Back to Home Page")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
});

describe.skip("Reister Form Validation Tests", () => {
  test("case empty email/password renders error messages", async () => {
    //-Arrange
    render(<RegisterPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    //-Act
    await userEvent.click(emailInput);
    await userEvent.click(passwordInput);
    await userEvent.click(submitButton);

    //-Assert
    await waitFor(() => {
      const passwordRequiredText = screen.getAllByText(/Required/i);
      expect(passwordRequiredText.length).toBeGreaterThan(1); // Checks both error messages present
      // 🤔 or assert on a specific element in the array
      // ? expect(passwordRequiredText[0]).toBeInTheDocument();
    });
  });

  test("case short password renders error message", async () => {
    //-Arrange
    render(<RegisterPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    //-Act
    await userEvent.click(emailInput);
    await userEvent.keyboard("test@gmail.com");
    await userEvent.click(passwordInput);
    await userEvent.keyboard("a".repeat(2));
    await userEvent.click(submitButton);

    //-Assert
    await waitFor(() => {
      const shortPasswordError = screen.getByText(
        /Password must be at least 8 characters/
      );
      expect(shortPasswordError).toBeInTheDocument();
    });
  });

  test("case incorrect email format renders error message", async () => {
    //-Arrange
    render(<RegisterPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    //-Act
    await userEvent.click(emailInput);
    await userEvent.keyboard("test");
    await userEvent.click(passwordInput);
    await userEvent.keyboard("a".repeat(10));
    await userEvent.click(submitButton);

    //-Assert
    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });
});

describe.skip("Register Submission Tests", () => {
  it("successful form submit should have notification and reroute", async () => {
    jest.mock("../components/providers/AuthProvider", () => ({
      useAuth: () => ({
        register: jest.fn().mockImplementation(async (email, password) => {
          return { result: "success" };
        }),
      }),
    }));

    render(<RegisterPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    // Fill in correct authentication details and submit
    await userEvent.type(emailInput, "test2@test.com");
    await userEvent.type(passwordInput, "test@123");
    await userEvent.click(submitButton);

    //-Assert
    setTimeout(() => {
      expect(screen.getByText("Successfully registered.")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/onboarding");
    }, 3000);
  });

  it("unsuccessful form submit should have notification and error messages", async () => {
    jest.mock("../components/providers/AuthProvider", () => ({
      useAuth: () => ({
        register: jest.fn().mockImplementation(async (email, password) => {
          return { result: "error" };
        }),
      }),
    }));
    render(<RegisterPage />);
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    // Fill in incorrect authentication details and submit
    await userEvent.type(emailInput, "notrealemail@test.com");
    await userEvent.type(passwordInput, "notrealpassword");
    await userEvent.click(submitButton);

    // Assert: Check for error messages
    setTimeout(() => {
      expect(
        screen.getByText("Hmmm... something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
