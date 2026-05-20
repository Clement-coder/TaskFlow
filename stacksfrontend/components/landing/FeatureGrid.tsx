import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "On-chain proof of completion",
    description: "Persist task evidence securely on Stacks and verify delivery with trustless proof.",
    label: "Web3",
  },
  {
    title: "Premium board and analytics",
    description: "Track velocity, deadlines, and team performance with polished charts and cards.",
    label: "Analytics",
  },
  {
    title: "Wallet-first collaboration",
    description: "Authenticate via Hiro Wallet and assign work across token-gated teams.",
    label: "Security",
  },
  {
    title: "AI task intelligence",
    description: "Auto-prioritize, summarize, and turn goals into actionable project plans.",
    label: "AI",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Smart workflow essentials</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Everything your team needs to ship with confidence.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-white/5 bg-slate-900/80">
              <CardHeader>
                <Badge variant="accent">{feature.label}</Badge>
                <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
