"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          zIndex: 9999999,
        },
      }}
    />
  );
};
