import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sheet } from "@/components/ui/sheet";
import Menubar from "@/components/Menubar";


export const metadata: Metadata = {
  title: "Premscent - Home",
  description: "Search and hire service workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sheet>
          <Navbar />
          <Menubar />
        </Sheet>
        {children}
        <Footer />
      </body>
    </html>
  );
}
