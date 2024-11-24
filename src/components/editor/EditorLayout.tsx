import { NavItem } from '@/types/editor/nav';
import { Editor } from '@/components/editor/content/Editor';
import { Header } from '@/components/editor/content/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from "@/components/editor/sidebar";

export default function EditorLayout({ navigation }: { navigation: NavItem[] }) {
  return (
    <SidebarProvider>
      <div className="h-screen flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <Editor />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}