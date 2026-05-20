import StandardPage from "@/components/layout/StandardPage";
import Link from "next/link";

export default function PricingPage() {
  return (
    <StandardPage title="Pricing" description="Choose a plan for individuals, teams, or enterprises." icon="pricing">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="text-xl font-semibold">Starter</h4>
          <p className="mt-2 text-slate-400">Free for individuals. Basic task management and Hiro Wallet auth.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/60 p-6 border border-sky-500/20">
          <h4 className="text-xl font-semibold">Pro</h4>
          <p className="mt-2 text-slate-400">Team features, reputation scoring, and analytics.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="text-xl font-semibold">Enterprise</h4>
          <p className="mt-2 text-slate-400">Custom contracts, SSO, and advanced governance tools.</p>
        </div>
      </div>
    </StandardPage>
  );
}
