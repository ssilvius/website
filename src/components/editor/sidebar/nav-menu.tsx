import { NavItem } from '@/types/editor/nav';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavMenuProps {
  items: NavItem[];
  level?: number;
}

export function NavMenu({ items, level = 0 }: NavMenuProps) {
  if (!items?.length) return null;

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={item.isActive}
            className={level > 0 ? 'pl-4' : ''}
          >
            <a href={item.url}>{item.title}</a>
          </SidebarMenuButton>
          {item.items && <NavMenu items={item.items} level={level + 1} />}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}