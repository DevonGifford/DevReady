import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { render, screen } from "@testing-library/react";

import LandingPage from "@/app/(landingpage)/page";

describe("Renders the Landing Page correctly - SSR 👀", () => {
  test("Landing page renders correctly", () => {
    //-Arrange
    render(<LandingPage />);

    //-Act
    const testElement = screen.getByText("Get Started Now");

    //-Assert
    expect(testElement).toBeInTheDocument();
  });

  test("Navigation to login page works correctly", async () => {
    //-Arrange
    render(<LandingPage />, { wrapper: MemoryRouterProvider });

    //-Act
    const link = screen.getByRole("button", { name: "Get Started Now" });
    await userEvent.click(link);

    //-Assert
    expect(mockRouter.asPath).toEqual("/login");
  });

  it("UI Elements are present and rendering correctly", () => {
    //-Arrange
    render(<LandingPage />);

    //-Act
    const testImage = screen.getAllByAltText("ztmready logo");
    const testHeading = screen.getByText("ZTM");
    const testText = screen.getByText(/check to see if you are ready to/i);
    const testButton = screen.getByRole("button", { name: "How it works?" });

    //-Assert
    expect(testImage[0]).toBeInTheDocument();
    expect(testHeading).toBeInTheDocument();
    expect(testText).toBeInTheDocument();
    expect(testButton).toBeInTheDocument();
  });
});
