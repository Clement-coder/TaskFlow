import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "For individuals building Web3 workflows.",
    features: ["Hiro Wallet auth", "Task tracking", "Task proof snapshots"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$24",
    description: "Ideal for teams scaling reputation and collaboration.",
    features: ["Project boards", "Reputation scoring", "Shared workspaces"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Token-gated premium workflows and on-chain governance.",
    features: ["NFT badge minting", "Workspace policies", "Analytics API"],
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Flexible pricing</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Choose a plan that grows with your DAO.</h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className={`rounded-[32px] border p-8 shadow-xl ${tier.highlight ? "border-sky-400/25 bg-slate-900/90" : "border-white/5 bg-slate-950/90"}`}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                {tier.highlight && <Badge variant="accent">Popular</Badge>}
              </div>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-white">{tier.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-white/5 p-3">{feature}</li>
                ))}
              </ul>
              <Button variant={tier.highlight ? "default" : "secondary"} className="mt-8 w-full">
                {tier.highlight ? "Get Pro" : "Learn More"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
