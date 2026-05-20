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
            <div className="text-lg font-semibold">TaskFlow</div>
            <nav className="hidden gap-6 md:flex">
              <a className="text-sm text-slate-300 hover:text-white">Product</a>
              <a className="text-sm text-slate-300 hover:text-white">Pricing</a>
              <a className="text-sm text-slate-300 hover:text-white">Docs</a>
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
