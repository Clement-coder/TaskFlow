import React from "react";
import Image from "next/image";
import Link from "next/link";

type IconName = "start" | "roadmap" | "pricing" | "product" | "docs";

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "start":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#0ea5e9" />
          <path d="M8 12l6-4v8l-6-4z" fill="white" />
        </svg>
      );
    case "roadmap":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#7c3aed" />
          <path d="M6 12h12M9 8v8M15 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#06b6d4" />
          <path d="M12 7v10M8 11h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "product":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#1e293b" />
          <path d="M4 7h16M4 12h16M4 17h16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "docs":
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/Taskflow_logo.png" alt="TaskFlow" width={64} height={64} className="rounded-md" />
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {description && <p className="text-sm text-slate-400">{description}</p>}
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">Home</Link>
            <Link href="/docs" className="text-sm text-slate-300 hover:text-white">Docs</Link>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16 py-12">
        <div className="mb-8 flex items-center gap-6">
          <div className="rounded-2xl bg-white/5 p-3">
            <Icon name={icon} />
          </div>
          <div>
            <h2 className="text-3xl font-semibold leading-tight">{title}</h2>
            {description && <p className="mt-2 text-slate-400">{description}</p>}
          </div>
        </div>

        <section className="space-y-6">{children}</section>
      </main>
    </div>
  );
}
