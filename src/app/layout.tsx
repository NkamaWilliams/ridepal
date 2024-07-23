import type { Metadata } from "next";
import Navbar from "@/components/general/navbar";
import AppContext from "@/components/general/appcontext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ride Pal",
  description: "Your No. 1 Professional Ride Sharing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>
          <Navbar />
          {children}
        </AppContext>
      </body>
    </html>
  );
}
