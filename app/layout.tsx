import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exserc - Home",
  description: "Search and hire service workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
