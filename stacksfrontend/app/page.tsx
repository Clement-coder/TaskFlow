import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingSection } from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100">
      <header className="border-b border-white/5 py-6">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/Taskflow_logo.png" alt="TaskFlow" width={56} height={56} className="rounded-md" />
              <span className="text-xl font-semibold">TaskFlow</span>
            </div>
            <nav className="hidden gap-6 md:flex">
              <Link href="/product" className="text-sm text-slate-300 hover:text-white">Product</Link>
              <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">Pricing</Link>
              <Link href="/docs" className="text-sm text-slate-300 hover:text-white">Docs</Link>
            </nav>
          </div>
        </div>
      </header>

      <HeroSection />
      <FeatureGrid />
      <Testimonials />
      <PricingSection />
    </main>
  );
}
