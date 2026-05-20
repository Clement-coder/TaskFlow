import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingSection } from "@/components/landing/PricingSection";

export const metadata: Metadata = {
  title: "TaskFlow — Premium Web3 Task OS",
  description: "The next-generation decentralized project management platform built on Stacks L2.",
  other: {
    "talentapp:project_verification":
      "44dad16503de4ec34a02690a4eff3b17cda597b190e68125f0aa51cc4505b4c0a6dbfce2c04bd8d6524b5e6d92c8c206dc8739c088dac483ba7a45a4671491fb",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Premium Header */}
      <header className="border-b border-white/5 py-4 sticky top-0 bg-slate-950/80 backdrop-blur-md z-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 p-1.5 shadow-lg group-hover:scale-105 transition duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
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

      {/* Landing Blocks */}
      <div className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <Testimonials />
        <PricingSection />
      </div>

      {/* Premium Footer */}
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
    </main>
  );
}
