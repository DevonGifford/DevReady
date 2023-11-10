import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import RecommendedCarousel from "@/components/RecommendedCarousel";

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

jest.mock("../components/providers/UserProvider", () => ({
  useUserContext: jest.fn(() => ({
    userProfile: {
      uuid: "mockedUserId",
      account: {
        username: "mockedUsername",
        career_title: "mockedCareerTitle",
        career_level: 5,
        experience_level: 3,
        userimage: "mockedImageURL",
      },
    },
    updateUserDataProcess: jest.fn(),
  })),
}));

describe.skip("Renders Component and UI Elements", () => {
  it.only("renders component without crashing", () => {
    const mockData = [
      {
        index: 1,
        label: "Typescript with React",
        icon: "BrainCircuit",
        href: "/dashboard",
      },
    ];

    render(<RecommendedCarousel data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    // Add other assertions for the presence of UI elements based on your component structure
  });
});

describe.skip("Renders Data Accordingly Testing", () => {
  test.skip("", () => {
    //-Arrange
    //-Act
    //-Assert
  });
});

// 🧪🎯 OPEN ISSUE :  https://github.com/DevonGifford/ZtmReady--PortfolioProject/issues/77
