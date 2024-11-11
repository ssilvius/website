import { MessageForm } from '@/components/forms/message'

export const metadata = {
  title: 'Connect | sean.silvius.me',
  description: 'Get in touch with sean',
}

export default function ContactPage() {
  return (
    <div className="mx-auto container max-w-2xl py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Connect</h1>
          <p className="text-gray-500">
            If you&apos;ve found value in my writing and insights, I&apos;m available for executive mentoring, tech and product advisory roles, and coaching. Whether you need guidance navigating complex issues or just a fresh perspective, I&apos;d love to hear from you. Reach out and let&apos;s make great things happen together!
          </p>
        </div>
        <MessageForm />
      </div>
    </div>
  )
}