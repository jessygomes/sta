import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

export const metadata: Metadata = {
  title: "ShopTonAlternance",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
