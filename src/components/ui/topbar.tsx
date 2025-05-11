'use client'

import Link from "next/link"
import clsx from "clsx"
import useScroll from "@/lib/hooks/use-scroll";
import Image from "next/image";

export default function TopBar() {
  const scrolled = useScroll(64);
  
  return (
    <>
      <div
        role="navigation"
        className={clsx(
          'fixed top-0 w-full flex justify-center z-30 transition-all',
          scrolled &&
          'bg-white border-b border-slate-200 shadow-sm',
          !scrolled &&
          'bg-white/0'
        )}
      >
        <nav role="menubar" className="mx-5 flex h-16 max-w-7xl items-center justify-between w-full">
          <div className="mr-8">
            <Link href="/" role="menuitem" className="flex items-center text-lg font-bold uppercase tracking-tight">
              <Image 
                src={`./logo.svg`} 
                alt="Logo"
                width={24} 
                height={24}
                className="mr-2"
              />
              <p className={clsx(
                scrolled && 'text-black',
                !scrolled && 'text-black'
              )}>sean.silvius.me</p> 
            </Link>
          </div>
          <div className="flex-1">
            <Link 
              href="/posts" 
              role="menuitem" 
              className={clsx(
                "self-start text-lg uppercase font-bold tracking-tight hover:underline decoration-4 underline-offset-4",
                scrolled && 'text-black',
                !scrolled && 'text-black'
              )}
            >
              index
            </Link>
          </div>
          <div role="menuitem">
            <Link 
              href="/connect"
              className={clsx(
                "px-4 py-2 text-lg uppercase font-bold tracking-tight",
                scrolled && 'bg-blue-600 text-white hover:bg-blue-700 transition-all',
                !scrolled && 'bg-blue-600 text-white hover:bg-blue-700 transition-all'
              )}
            >
              connect
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}