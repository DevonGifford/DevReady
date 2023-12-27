import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { render, screen } from "@testing-library/react";
import LandingDashboardPage from "@/app/(dashboard)/(routes)/dashboard/page";

global.ResizeObserver = jest.fn(() => ({
  // Create a mock for ResizeObserver in test setup
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe.skip("Renders the Landing Page correctly - SSR 👀", () => {
  test.only("Landing page renders correctly", () => {
    //-Arrange
    const { container } = render(<LandingDashboardPage />);

    //-Act

    //-Assert
    expect(container).toBeInTheDocument();
  });
});

/* 

🎯 OPEN ISSUE :  
🧱 Issue with unit testing embla-carousel components
🔮 https://github.com/DevonGifford/ZtmReady--PortfolioProject/issues/77

--------------------------------------------------------------------------
 -  UNIT TESTING
 --------------------------------------------------------------------------
🔍 note: Most of the unit tests are covered in the individual components 

🧪 Test Render without crashing

🧪 Test Component Structure - all children componennts render as expected

🧪 Test Mocking the User Context


--------------------------------------------------------------------------
 - INTEGRATION TESTING
--------------------------------------------------------------------------

🧪 Test Avatar Component Test
   
🧪 Test Carousel Interaction Test

🧪 Test 

*/
