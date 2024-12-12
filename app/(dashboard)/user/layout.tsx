import type { Metadata } from "next";
import { Sheet } from "@/components/ui/sheet";
import DNavbar from "@/components/dashboard/DNavbar";
import DMenubar from "@/components/dashboard/DMenubar";
import DSidebar from "@/components/dashboard/DSidebar";
import CNavbar from "@/components/dashboard/CNavbar";

export const metadata: Metadata = {
  title: "Dashboard - seeker & provider",
  description: "User dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section className="grid grid-cols-12 h-full">
        <div className="col-end-4 col-start-1 row-start-1 shadow-sm border-r-[0.15em] border-[rgba(0,0,0,0.11)] hidden lg:block">
            <DSidebar />
        </div>
        <div className="col-start-1 lg:col-start-4 col-span-full h-full row-start-1 lg:h-screen">
            <Sheet>
              <DNavbar />
              <CNavbar />
              <DMenubar />
            </Sheet>
            {/* <div className="h-[calc(100%-env(safe-area-inset-bottom))] overflow-y-auto no-scrollbar"> */}
            <div className="h-[calc(100vh-62px)] overflow-y-auto lg:h-[calc(100vh-74px)] no-scrollbar">
              {children}
            </div>
        </div>
      </section>
  );
}
