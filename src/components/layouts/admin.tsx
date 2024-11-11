import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layouts/sidebar"
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react"

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "manage | sean.silvius.me",
  metadataBase: new URL("https://sean.silvius.me/manage"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <div className={cn(geistSans.variable, geistMono.variable, "flex h-screen dark:bg-slate-900")}>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <header className="flex-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-100"></header>
            {children}
          </main>
        </SidebarProvider>
      </div>
    </Suspense>
  )
}
