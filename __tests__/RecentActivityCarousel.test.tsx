import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import RecentActivityCarousel from "@/components/RecentActivityCarousel";

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
        title: "Typescript with React",
        tags: ["React", "JavaScript", "TypeScript"],
        imagelink:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
        href: "/dashboard",
      },
    ];

    render(<RecentActivityCarousel title="Test Title" data={mockData} />);
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