import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingSection } from "@/components/landing/PricingSection";
import LandingNav from "@/components/landing/LandingNav";

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
    <main className="min-h-screen bg-[#020817] text-slate-100 flex flex-col">
      <LandingNav />

      {/* Page content */}
      <div className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <Testimonials />
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#020817]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/Taskflowlogo.png" alt="TaskFlow" width={28} height={28} className="rounded-lg object-contain" />
                <span className="text-sm font-bold text-white">TaskFlow</span>
              </Link>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                The premium decentralized task OS for teams building on Bitcoin L2 and Stacks.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Product</p>
                <div className="space-y-2">
                  <Link href="/product" className="block text-slate-400 hover:text-white transition">Features</Link>
                  <Link href="/pricing" className="block text-slate-400 hover:text-white transition">Pricing</Link>
                  <Link href="/roadmap" className="block text-slate-400 hover:text-white transition">Roadmap</Link>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Developers</p>
                <div className="space-y-2">
                  <Link href="/docs" className="block text-slate-400 hover:text-white transition">Docs</Link>
                  <Link href="/docs" className="block text-slate-400 hover:text-white transition">API</Link>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Company</p>
                <div className="space-y-2">
                  <Link href="/start" className="block text-slate-400 hover:text-white transition">Get started</Link>
                  <Link href="/dashboard" className="block text-slate-400 hover:text-white transition">Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">© 2026 TaskFlow. All rights secured on Bitcoin L2.</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
