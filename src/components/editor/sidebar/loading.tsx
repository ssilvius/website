import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

export function SidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md mb-4 mx-4" />
          <div className="space-y-3 mx-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}