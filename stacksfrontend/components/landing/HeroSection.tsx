"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-2xl space-y-6">
            <Badge variant="accent">Built for Web3 productivity</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              TaskFlow — the premium decentralized task OS for teams on Stacks.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Manage your work with polished workflows, on-chain reputation, and wallet-native collaboration that feels modern, fast, and secure.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="min-w-[170px]" size="lg">Start your workspace</Button>
              <Button variant="secondary" className="min-w-[170px]" size="lg">View roadmap</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-2xl">
            <div className="rounded-[40px] border border-sky-500/10 bg-slate-950/80 p-7 shadow-[0_80px_180px_-90px_rgba(14,165,233,0.45)] backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between rounded-3xl bg-slate-900/70 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-300/80">Live task feed</p>
                  <p className="mt-1 text-sm text-slate-300">Stacks dashboard snapshot</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-2 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Active sync
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] bg-slate-900/60 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Today</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">12</h2>
                  <p className="mt-2 text-sm text-slate-400">tasks assigned</p>
                </div>
                <div className="rounded-[28px] bg-slate-900/60 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Streak</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">7</h2>
                  <p className="mt-2 text-sm text-slate-400">days of task momentum</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
