// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { UserProvider } from "@/context/UserContext"; // ✅ ใช้ตัวนี้อย่างเดียว

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Job Fair",
  description: "Job Fair Interview Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <TopMenu />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
