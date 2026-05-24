const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    label: "On-Chain Proof",
    title: "Trustless proof of completion",
    description: "Every completed task mints a cryptographic proof on Stacks. Immutable, verifiable, and permanently tied to your wallet identity.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    label: "Analytics",
    title: "Premium boards & analytics",
    description: "Track sprint velocity, project progress, and team performance with polished real-time dashboards built for serious teams.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    label: "Wallet-Native",
    title: "Wallet-first collaboration",
    description: "Authenticate with Hiro Wallet, assign tasks across token-gated workspaces, and manage permissions entirely on-chain.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    label: "Reputation",
    title: "On-chain reputation engine",
    description: "Earn reputation points for every verified task. Your score is minted on Stacks L2 and visible across the entire ecosystem.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    label: "Teams",
    title: "Token-gated workspaces",
    description: "Restrict access to private boards using Clarity smart contracts. Only wallets meeting your STX threshold can join.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    label: "AI",
    title: "AI task intelligence",
    description: "Auto-prioritize backlogs, generate sprint summaries, and turn vague goals into structured, actionable project plans.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 pb-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-400">
            <svg className="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
            </svg>
            Core capabilities
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl max-w-2xl">
            Everything your team needs to ship with confidence
          </h2>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            From on-chain proofs to AI-powered planning — TaskFlow is the complete operating system for Web3 teams.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-white/[0.07] bg-slate-900/50 p-6 hover:border-white/15 hover:bg-slate-900/80 transition duration-300"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.bg} ${f.color} mb-5`}>
                {f.icon}
              </div>
              <div className="mb-1.5 flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-sky-400 transition">
                <span className={`w-1.5 h-1.5 rounded-full ${f.bg.split(" ")[0].replace("bg-", "bg-").replace("/10", "/60")}`} />
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
