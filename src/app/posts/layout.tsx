import TopBar from "@/components/ui/topbar";
import Footer from "@/components/ui/footer";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return(
    <div className="text-lg h-full bg-no-repeat bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <TopBar />
      <div className="mx-auto max-w-screen-xl">
        {children}
      </div>
      <Footer />
    </div>
  )
}