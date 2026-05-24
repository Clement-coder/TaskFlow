"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28 lg:px-10">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-7"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Built on Stacks · Bitcoin L2
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.1] sm:text-6xl">
              The task OS for{" "}
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Web3 teams
              </span>
            </h1>

            <p className="text-lg leading-relaxed text-slate-400">
              Manage projects, verify work on-chain, and build reputation — all in one polished workspace powered by Stacks smart contracts.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/20 transition duration-200"
              >
                Start free workspace
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live demo
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["AQ", "MV", "NB", "CP"].map((initials) => (
                  <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 border-2 border-[#020817] flex items-center justify-center text-[9px] font-bold text-white">
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-white">2,400+</span> builders already shipping
              </p>
            </div>
          </motion.div>

          {/* Right: dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-lg"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-950/60">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[11px] text-slate-500 font-mono">taskflow.app/dashboard</span>
              </div>

              <div className="p-5 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Reputation", value: "860", color: "text-sky-400", icon: "⚡" },
                    { label: "Tasks Done", value: "24", color: "text-emerald-400", icon: "✓" },
                    { label: "STX Balance", value: "450", color: "text-purple-400", icon: "◈" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-slate-950/60 border border-white/5 p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{s.label}</span>
                        <span className={`text-xs ${s.color}`}>{s.icon}</span>
                      </div>
                      <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Task cards */}
                <div className="space-y-2">
                  {[
                    { title: "Draft on-chain task proof contract", project: "Reputation engine", priority: "high", status: "in-progress" },
                    { title: "Enable Hiro Wallet auth flow", project: "TaskFlow Core", priority: "high", status: "todo" },
                    { title: "Design premium dashboard visuals", project: "TaskFlow Core", priority: "medium", status: "todo" },
                  ].map((task) => (
                    <div key={task.title} className="flex items-center gap-3 rounded-xl bg-slate-950/40 border border-white/5 px-3 py-2.5">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === "in-progress" ? "bg-amber-400" : "bg-slate-600"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">{task.title}</p>
                        <p className="text-[10px] text-slate-500">{task.project}</p>
                      </div>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        task.priority === "high" ? "bg-fuchsia-500/15 text-fuchsia-300" : "bg-amber-500/15 text-amber-300"
                      }`}>{task.priority}</span>
                    </div>
                  ))}
                </div>

                {/* Activity */}
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 px-3 py-2.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-emerald-300">Proof minted on Stacks</p>
                    <p className="text-[9px] text-slate-500">+70 reputation · task_04 verified on-chain</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trusted by logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <p className="text-xs uppercase tracking-widest text-slate-600 font-bold">Trusted by teams building on</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Stacks", "Bitcoin L2", "Hiro Wallet", "Clarity VM", "Supabase"].map((name) => (
              <span key={name} className="text-sm font-semibold text-slate-600 hover:text-slate-400 transition">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
