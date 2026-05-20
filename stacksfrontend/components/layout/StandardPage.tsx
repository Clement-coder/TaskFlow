import React from "react";
import Image from "next/image";
import Link from "next/link";

type IconName = "start" | "roadmap" | "pricing" | "product" | "docs";

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "start":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <title>Start Workspace Icon</title>
          <rect width="24" height="24" rx="6" fill="#0ea5e9" />
          <path d="M8 12l6-4v8l-6-4z" fill="white" />
        </svg>
      );
    case "roadmap":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <title>Product Roadmap Icon</title>
          <rect width="24" height="24" rx="6" fill="#7c3aed" />
          <path d="M6 12h12M9 8v8M15 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <title>Pricing Plans Icon</title>
          <rect width="24" height="24" rx="6" fill="#06b6d4" />
          <path d="M12 7v10M8 11h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "product":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <title>Product Details Icon</title>
          <rect width="24" height="24" rx="6" fill="#1e293b" />
          <path d="M4 7h16M4 12h16M4 17h16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "docs":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <title>Documentation Icon</title>
          <rect width="24" height="24" rx="6" fill="#64748b" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function StandardPage({
  title,
  description,
  icon = "product",
  children,
}: {
  title: string;
  description?: string;
  icon?: IconName;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Shared Landing Header */}
      <header className="border-b border-white/5 py-4 sticky top-0 bg-slate-950/80 backdrop-blur-md z-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/Taskflowlogo.png"
                alt="TaskFlow Logo"
                width={36}
                height={36}
                className="group-hover:scale-105 transition duration-300 object-contain rounded-xl"
                priority
              />
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition duration-200">
                TaskFlow
              </span>
            </Link>

            <nav className="hidden gap-8 md:flex items-center">
              <Link href="/product" className="text-sm font-medium text-slate-400 hover:text-white transition">Product</Link>
              <Link href="/pricing" className="text-sm font-medium text-slate-400 hover:text-white transition">Pricing</Link>
              <Link href="/docs" className="text-sm font-medium text-slate-400 hover:text-white transition">Docs</Link>
              <Link href="/roadmap" className="text-sm font-medium text-slate-400 hover:text-white transition">Roadmap</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="relative group overflow-hidden rounded-2xl bg-sky-500 hover:bg-sky-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition duration-200">
                <span className="relative z-10">Launch App</span>
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Wrapper */}
      <main className="flex-1 mx-auto max-w-5xl px-6 sm:px-10 lg:px-16 py-12 w-full">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center gap-6 border-b border-white/5 pb-8">
          <div className="rounded-2xl bg-white/5 p-3.5 w-fit border border-white/5 shadow-inner">
            <Icon name={icon} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white tracking-tight">{title}</h2>
            {description && <p className="mt-2 text-slate-400 text-sm max-w-xl">{description}</p>}
          </div>
        </div>

        <section className="space-y-8">{children}</section>
      </main>

      {/* Shared Landing Footer */}
      <footer className="border-t border-white/5 py-8 bg-black/40 text-slate-500">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">TaskFlow</span>
            <span className="text-[10px] text-slate-600">•</span>
            <span className="text-xs">© 2026 TaskFlow. All rights secured on Bitcoin L2.</span>
          </div>
          <div className="flex gap-6 text-xs">
            <Link href="/docs" className="hover:text-slate-300 transition">API</Link>
            <Link href="/roadmap" className="hover:text-slate-300 transition">Roadmap</Link>
            <Link href="/pricing" className="hover:text-slate-300 transition">SaaS Plans</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
