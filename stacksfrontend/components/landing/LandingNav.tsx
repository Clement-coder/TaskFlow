"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function LandingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#020817]/90 backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-sky-500/20 blur-md group-hover:bg-sky-500/30 transition" />
              <Image src="/Taskflowlogo.png" alt="TaskFlow" width={32} height={32} className="relative rounded-xl object-contain" priority />
            </div>
            <span className="text-base font-bold text-white tracking-tight">TaskFlow</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition duration-150",
                  pathname === l.href ? "text-white bg-white/[0.08]" : "text-slate-400 hover:text-white hover:bg-white/5")}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition duration-150">
              Sign in
            </Link>
            <Link href="/start" className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150">
              Get started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition duration-150">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown — absolute, smooth */}
        <div className={cn(
          "md:hidden absolute left-0 right-0 top-full z-50",
          "bg-[#020817]/98 backdrop-blur-xl border-b border-white/[0.06]",
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}>
          <nav className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition duration-150",
                  pathname === l.href ? "bg-sky-500/10 text-sky-300 border border-sky-500/20" : "text-slate-300 hover:text-white hover:bg-white/5"
                )}>
                {l.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition duration-150">
              Sign in
            </Link>
            <div className="pt-1 pb-2">
              <Link href="/start" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150">
                Get started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
