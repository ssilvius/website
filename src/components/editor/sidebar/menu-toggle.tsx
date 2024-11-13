'use client'

import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function MenuTrigger() {
  const { toggleSidebar } = useSidebar()
 
  return ( 
    <Button variant={"ghost"} onClick={toggleSidebar} className="md:hidden">
      <Menu />
    </Button>
  )
}