'use client'

import React from 'react';
import { NavItem } from '@/types/editor/nav';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useEditorStore } from '@/stores/editor';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

interface NavMenuProps {
  items: NavItem[];
  level?: number;
}

export function NavMenu({ items, level = 0 }: NavMenuProps) {
  const { activePath, setActivePath } = useEditorStore();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  if (!items?.length) return null;

  const handleFileSelect = (path: string) => {
    if (path !== '#') {
      const filePath = path.replace(/^#/, '');
      setActivePath(filePath);
    }
  };

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const isDirectory = (item: NavItem) => Boolean(item.items?.length);
  const isExpanded = (itemTitle: string) => expandedItems.has(itemTitle);

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isDir = isDirectory(item);
        const expanded = isExpanded(item.title);
        const isActive = item.url.replace(/^#/, '') === activePath;
        const indentationClass = level > 0 ? `pl-${level * 4}` : '';

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              asChild 
              isActive={isActive}
              className={`
                ${indentationClass}
                flex items-center gap-2 w-full
                hover:bg-accent/50 transition-colors
                ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}
              `}
              onClick={() => {
                if (isDir) {
                  toggleExpanded(item.title);
                } else {
                  handleFileSelect(item.url);
                }
              }}
            >
              <button type="button" className="flex items-center gap-2 w-full py-1">
                <span className="flex items-center gap-2 min-w-[20px]">
                  {isDir ? (
                    <>
                      {expanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <Folder className="h-4 w-4" />
                    </>
                  ) : (
                    <File className="h-4 w-4" />
                  )}
                </span>
                <span className="truncate">{item.title}</span>
              </button>
            </SidebarMenuButton>
            {isDir && expanded && (
              <div className="ml-2">
                <NavMenu items={item.items!} level={level + 1} />
              </div>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}