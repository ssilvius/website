import AdminLayout from '@/components/layouts/admin';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard | sean.silvius.me",
  metadataBase: new URL("https://sean.silvius.me"),
};

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn(geistSans.variable, geistMono.variable, 'h-full')}>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}