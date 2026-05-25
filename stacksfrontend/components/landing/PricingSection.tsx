import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals exploring Web3 workflows and on-chain task tracking.",
    features: [
      { icon: "✓", text: "Celo Wallet authentication" },
      { icon: "✓", text: "Up to 3 projects" },
      { icon: "✓", text: "Task proof snapshots" },
      { icon: "✓", text: "Basic reputation scoring" },
    ],
    cta: "Start for free",
    href: "/start",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$24",
    period: "per month",
    description: "For teams scaling reputation, collaboration, and on-chain governance.",
    features: [
      { icon: "✓", text: "Unlimited projects & tasks" },
      { icon: "✓", text: "On-chain proof minting" },
      { icon: "✓", text: "Shared workspaces" },
      { icon: "✓", text: "Advanced reputation engine" },
      { icon: "✓", text: "Priority support" },
    ],
    cta: "Get Pro",
    href: "/start",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Token-gated premium workflows, on-chain governance, and custom integrations.",
    features: [
      { icon: "✓", text: "NFT badge minting" },
      { icon: "✓", text: "Workspace access policies" },
      { icon: "✓", text: "Analytics API access" },
      { icon: "✓", text: "Custom Solidity contracts" },
      { icon: "✓", text: "Dedicated support" },
    ],
    cta: "Contact sales",
    href: "/docs",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="px-6 pb-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-400">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Flexible pricing
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Choose a plan that grows with your DAO
          </h2>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Start free, scale as your team grows. No hidden fees, no lock-in.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition duration-300 ${
                tier.highlight
                  ? "border-sky-500/40 bg-gradient-to-b from-sky-500/10 to-slate-900/80 shadow-2xl shadow-sky-500/10"
                  : "border-white/[0.07] bg-slate-900/50 hover:border-white/15"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-sky-500/30">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1.5">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-slate-500 mb-1">/ {tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${tier.highlight ? "bg-sky-500/20 text-sky-400" : "bg-white/5 text-slate-400"}`}>
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition duration-200 ${
                  tier.highlight
                    ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tier.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
