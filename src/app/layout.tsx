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
const arvoRegular = localFont({
  src: "./fonts/Arvo-Regular.ttf",
  variable: "--font-arvo-regular",
  weight: "400",
});

const arvoBold = localFont({
  src: "./fonts/Arvo-Bold.ttf",
  variable: "--font-arvo-bold",
  weight: "700",
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
      <body className={ clsx(geistSans.variable, geistMono.variable, arvoRegular.variable, arvoBold.variable, 'text-lg h-full bg-slate-50') }>
        <TopBar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
