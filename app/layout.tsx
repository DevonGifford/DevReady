"use client";

import { AuthContextProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";

// 🤔 import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 🤔 so I cant use meta data here and use client - use client is required in order to use authContext ... need to find a better space for metadata
// export const metadata: Metadata = {
//   title: "ZTMReady",
//   description: "Are you ready to take that first interview?",
//   icons: {
//     icon: [
//       {
//         url: "/landingpage/ZTM-logo.png",
//         href: "/landingpage/ZTM-logo.png",
//       },
//     ],
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToasterProvider />
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="ztmready-theme"
          >
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
