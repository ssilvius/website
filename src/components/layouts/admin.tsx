import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import AppSidebar  from '@/components/editor/sidebar'
import { MenuTrigger } from "@/components/editor/sidebar/menu-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
<Suspense fallback={<Skeleton />}>
  <SidebarProvider>
    <AppSidebar />
    <main className="flex-1">
      <div className="flex justify-between items-center p-4 border-b bg-background w-full h-16">
        <span>search</span>
        <MenuTrigger />
      </div>
      {children}
    </main>
  </SidebarProvider>
</Suspense>
  )
}
