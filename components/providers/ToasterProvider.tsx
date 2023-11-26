"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          zIndex: 9999999, // Check and adjust this value
        },
      }}
    />
  );
};

export default ToasterProvider;
