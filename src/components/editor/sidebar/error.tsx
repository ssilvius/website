import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "No navigation items found" }: ErrorStateProps) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <div className="p-4 text-sm text-gray-500">
          {message}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}