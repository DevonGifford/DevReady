import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "ZTMReady",
  description: "Are you ready to take that first interview?",
  icons: {
    icon: [
      {
        url: "/landingpage/ZTM-logo.png",
        href: "/landingpage/ZTM-logo.png",
      },

    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="ztmready-theme"
        >
          <ToasterProvider />
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
