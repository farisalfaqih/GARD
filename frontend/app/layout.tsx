import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GARD - Dashboard Requester",
  description: "Governance Assessment & Repository Dashboard",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
