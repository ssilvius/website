'use client'

import { NavItem } from '@/types/editor/nav';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useEditor } from '@/contexts/editor';

interface NavMenuProps {
  items: NavItem[];
  level?: number;
}

export function NavMenu({ items, level = 0 }: NavMenuProps) {
  const { setSelectedPath, selectedPath } = useEditor();

  if (!items?.length) return null;

  const handleFileSelect = (path: string) => {
    console.log('File selected:', path);
    
    // Only skip if it's JUST a hash (directory)
    if (path === '#') {
      console.log('Skipping empty directory');
      return;
    }
    
    // Remove the leading hash and set the path
    const filePath = path.replace(/^#/, '');
    console.log('Setting selected path to:', filePath);
    setSelectedPath(filePath);
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={item.url.replace(/^#/, '') === selectedPath}
            className={level > 0 ? 'pl-4' : ''}
            onClick={() => handleFileSelect(item.url)}
          >
            <button type="button">{item.title}</button>
          </SidebarMenuButton>
          {item.items && <NavMenu items={item.items} level={level + 1} />}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}