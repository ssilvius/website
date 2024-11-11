'use client'

import Link from "next/link"
import clsx from "clsx"
import useScroll from "@/lib/hooks/use-scroll";

export default function TopBar() {
  const scrolled = useScroll(64);
  
  return (
    <>
      <div
        role="navigation"
        className={clsx(
          'fixed top-0 w-full flex justify-center z-30 transition-all',
          scrolled &&
          'border-b border-gray-200 bg-white/50 backdrop-blur-xl',
          !scrolled &&
          'bg-white/0'
        )}
      >
        <nav role="menubar" className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <div className="mr-8">
            <Link href="/" role="menuitem" className="flex items-center font-display text-lg text-indigo-400 hover:text-indigo-600 transition-all">
              <p>sean.silvius.me</p>
            </Link>
          </div>
          <div className="flex-1">
            <Link href="/posts" role="menuitem" className="self-start font-display text-lg text-indigo-400 hover:text-indigo-600 transition-all">
              index
            </Link>
          </div>
          <div role="menuitem" className="flex justify-center items-center font-display text-lg text-indigo-400 hover:text-indigo-600 transition-all">
            <Link href="/connect">connect</Link>
          </div>
        </nav>
      </div>
    </>
  );
}