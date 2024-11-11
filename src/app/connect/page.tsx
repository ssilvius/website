import { MessageForm } from '@/components/forms/message'
import TopBar from '@/components/ui/topbar'
import Footer from '@/components/ui/footer'

export const metadata = {
  title: 'Connect | sean.silvius.me',
  description: 'Get in touch with sean',
}

export default function ContactPage() {
  return (
    <div className='text-lg h-full bg-no-repeat bg-gradient-to-br from-indigo-100 via-white to-cyan-100'>
      <TopBar />
      <div className="mx-auto container pt-32 px-8 md:px-1 max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="mb-4 text-3xl font-thin tracking-tight text-primary md:text-5xl">Connect</h1>
            <p className="text-gray-500">
              If you&apos;ve found value in my writing and insights, I&apos;m available for executive mentoring, tech and product advisory roles, and coaching. Whether you need guidance navigating complex issues or just a fresh perspective, I&apos;d love to hear from you. Reach out and let&apos;s make great things happen together!
            </p>
          </div>
          <MessageForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}