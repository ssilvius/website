import Link from "next/link";
import Image from "next/image";
import { Factory } from 'lucide-react';
import dayjs from 'dayjs';
/**
const navigation = [
  {
    name: 'Linkedin',
    href: 'https://linkedin.com/in/ssilvius',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M6.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM11 19h1a1 1 0 0 0 1-1v-4.5c0-1.5 3-2.5 3-.5v5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-6c0-2-1.5-3-3.5-3S13 10.5 13 10.5V10a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1Z"/>
        <path fillRule="evenodd" d="M20 1a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h16Zm0 2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16Z" clipRule="evenodd"/>
      </svg>
    ),
  },

  {
    name: 'GitHub',
    href: 'https://github.com/ssilvius',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]
*/
export default function Footer() {
  const year = dayjs(new Date).format('YYYY');

  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-12 text-slate-100 relative">
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-start pointer-events-none">
        <div className="ml-8 fill-amber-400">
          <Image src="/logo.svg" alt="Logo Watermark" width={384} height={384} className="-ml-16" />
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-400 font-heading">Site</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-slate-100 hover:text-amber-300">Home</Link>
              <Link href="/posts" className="text-slate-100 hover:text-amber-300">Articles</Link>
              <Link href="/connect" className="text-slate-100 hover:text-amber-300">Connect</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-400">Connect</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="https://github.com/ssilvius" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-amber-300">GitHub</Link>
              <Link href="https://www.linkedin.com/in/seansilvius/" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-amber-300">LinkedIn</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-400">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-slate-100 hover:text-amber-300">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-100 hover:text-amber-300">Terms of Service</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300">© { year } Sean Silvius. All rights reserved.</p>
            <p className="mt-4 md:mt-0 text-slate-300">
              Built with love in the PNW <Factory />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}