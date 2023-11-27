import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import LandingPage from "@/app/(landingpage)/page";

// -Mock the router
// import NextLink from "next/link";
// jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Renders the Landing Page correctly - SSR 👀", () => {
  it("ENV TEST 1/3:  Page renders correctly", () => {
    //-aarange
    render(<LandingPage />);

    //-act
    const testElement = screen.getByText("Get Started Now");

    //-assert
    expect(testElement).toBeInTheDocument();
  });

  it("ENV TEST 2/3:  Should navigate to the login page when get started button is clicked", async () => {
    //-aarange
    render(<LandingPage />, { wrapper: MemoryRouterProvider });

    //-act
    const link = screen.getByRole("button", { name: "Get Started Now" });
    await userEvent.click(link);

    //-assert
    expect(mockRouter.asPath).toEqual("/login");
  });

  it("ENV TEST 3/3:  Page content is rendering correctly", () => {
    //-arange
    render(<LandingPage />);

    //-act
    const testImage = screen.getAllByAltText("ztmready logo");
    const testHeading = screen.getByText("ZTM");
    const testText = screen.getByText(/check to see if you are ready to/i);
    const testButton = screen.getByRole("button", { name: "How it works?" });

    //-assert
    expect(testImage[0]).toBeInTheDocument();
    expect(testHeading).toBeInTheDocument();
    expect(testText).toBeInTheDocument();
    expect(testButton).toBeInTheDocument();
  });
});
