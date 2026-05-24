"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function StandardPage({
  title,
  description,
  children,
  fullWidth = false,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#020817]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
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
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition duration-150",
                    pathname === l.href ? "text-white bg-white/8" : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/start" className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition">
                Get started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/[0.06] py-3 space-y-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition">
                  {l.label}
                </Link>
              ))}
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition">
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Page header */}
      <div className="border-b border-white/[0.06] bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
          {description && <p className="mt-2 text-slate-400 text-base max-w-2xl leading-relaxed">{description}</p>}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 w-full">
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10", fullWidth ? "max-w-7xl" : "max-w-5xl")}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#020817]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/Taskflowlogo.png" alt="TaskFlow" width={20} height={20} className="rounded-md object-contain" />
            <span className="text-xs text-slate-500">© 2026 TaskFlow. All rights secured on Bitcoin L2.</span>
          </div>
          <div className="flex gap-6 text-xs">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-500 hover:text-slate-300 transition">{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
