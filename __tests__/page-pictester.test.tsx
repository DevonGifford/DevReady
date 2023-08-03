import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as storageUtils from "../utils/firebase/storage.utils";
import { ProfilePictureUploader } from "@/components/ProfilePictureUploader";

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

const mockUpload = jest.mock("../utils/firebase/storage.utils", () => ({
  uploadImageProcess: jest.fn(() => "mockImageUrl"), // Mock the upload function to return a URL
}));

describe("Rendering Tests", () => {
  it("renders component page", () => {
    const { container } = render(<ProfilePictureUploader userDocId="123" />);
    expect(container).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<ProfilePictureUploader userDocId="mockUserId" />);

    const uploadImageButton = screen.getByText(/Click to upload/i);
    expect(uploadImageButton).toBeInTheDocument();
  });
});

jest.mock("../utils/firebase/storage.utils", () => ({
  uploadImageProcess: jest.fn(() => Promise.resolve("mockImageUrl")),
}));

describe("ProfilePictureUploader Component", () => {
  it("handles file upload correctly", async () => {
    render(<ProfilePictureUploader userDocId="mockUserId" />);

    const fileInput = screen.getByTestId("file-input");

    const testFile = new File(["testImage"], "testImage.png", {
      type: "image/png",
    });

    await userEvent.upload(fileInput, testFile);

    await waitFor(() =>
      expect(storageUtils.uploadImageProcess).toHaveBeenCalled()
    );

    // expect(screen.getByLabelText("Change again")).toBeInTheDocument();
  });

  it.skip("handles toggling between upload and uploaded image sections", async () => {
    render(<ProfilePictureUploader userDocId="mockUserId" />);
    const uploadImageButton = screen.getByText(/Click to upload/i);

    fireEvent.change(uploadImageButton, {
      target: {
        files: [
          new File(["testImage"], "testImage.png", { type: "image/png" }),
        ],
      },
    });
    await waitFor(() =>
      expect(storageUtils.uploadImageProcess).toHaveBeenCalled()
    );

    fireEvent.click(screen.getByLabelText("Change again"));

  });
});
