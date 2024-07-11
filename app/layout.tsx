import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focus-List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`h-full ${inter.className}`}>
        <Navbar />
        <Sidebar />
        <div className="min-w-full min-h-screen pt-12 sm:pt-20 bg-secondary-color">
          {children}
        </div>
      </body>
    </html>
  );
}
