import { Suspense } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { GithubContent } from './content';
import { SidebarSkeleton } from './loading';

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton className='font-mono font-semibold text-lg'>mdx manager</SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<SidebarSkeleton />}>
          <GithubContent />
        </Suspense>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}