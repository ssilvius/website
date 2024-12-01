import { Sidebar } from "@/components/editor/sidebar"
import { TopBar } from "@/components/editor/top-bar"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 