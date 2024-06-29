import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Premscent - Login | Register",
  description: "user login and registration page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
