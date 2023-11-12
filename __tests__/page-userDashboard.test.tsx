import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { render, screen } from "@testing-library/react";
import UserDashboard from "@/app/(dashboard)/(routes)/user-dashboard/page";

global.ResizeObserver = jest.fn(() => ({
  // Create a mock for ResizeObserver in test setup
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe.skip("Renders the Landing Page correctly - SSR 👀", () => {
  test.only("Landing page renders correctly", () => {
    //-Arrange
    const { container } = render(<UserDashboard />);

    //-Act

    //-Assert
    expect(container).toBeInTheDocument();
  });
});

// 🧪🎯 OPEN ISSUE :  https://github.com/DevonGifford/ZtmReady--PortfolioProject/issues/77
