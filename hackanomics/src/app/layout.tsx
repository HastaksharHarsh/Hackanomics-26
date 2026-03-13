import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNavigation from "@/components/BottomNavigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriBuddy AI",
  description: "Your friendly AI-powered nutrition companion.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-200`}>
        <div className="mx-auto max-w-md h-[100dvh] bg-background-app shadow-2xl relative flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
            {children}
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
