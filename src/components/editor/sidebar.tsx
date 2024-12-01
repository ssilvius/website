'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === null) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar() {
  const [items, setItems] = useState([])
  const { loadFile } = useEditorStore()

  useEffect(() => {
    const fetchItems = async () => {
      const navItems = await getNavigationItems()
      setItems(navItems)
    }
    fetchItems()
  }, [])

  return (
    <ShadcnSidebar defaultOpen>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton
            key={item.path}
            onClick={() => loadFile(item.path)}
          >
            {item.name}
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </ShadcnSidebar>
  )
} 