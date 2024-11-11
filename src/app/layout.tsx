import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import TopBar from "@/components/ui/topbar";
import Footer from "@/components/ui/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "sean.silvius.me",
  metadataBase: new URL("https://sean.silvius.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ clsx(geistSans.variable, geistMono.variable, 'text-lg h-full bg-no-repeat bg-gradient-to-br from-indigo-100 via-white to-cyan-100' ) }>
        <TopBar />
        <div className="page mx-auto max-w-7xl py-32">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
