"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { leaderboard } from "@/data/mock-data";
import { LeaderboardEntry } from "@/types";
import { cn } from "@/lib/utils";

type Category = "all" | "github" | "onchain" | "npm";

const CATEGORY_TABS: { id: Category; label: string }[] = [
  { id: "all", label: "Overall" },
  { id: "github", label: "GitHub" },
  { id: "onchain", label: "On-Chain" },
  { id: "npm", label: "NPM" },
];

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("h-full rounded-full", color)}
      />
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-slate-950/60 border border-white/5 px-3 py-2 min-w-[72px]">
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</span>
      <span className="text-xs font-bold text-slate-200">{value}</span>
    </div>
  );
}

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const sorted = [...leaderboard].sort((a, b) => {
    if (activeCategory === "github")
      return (b.github.stacksCommits + b.github.otherCommits) - (a.github.stacksCommits + a.github.otherCommits);
    if (activeCategory === "onchain")
      return (b.onchain.feesGeneratedMicroStx + b.onchain.transactions) - (a.onchain.feesGeneratedMicroStx + a.onchain.transactions);
    if (activeCategory === "npm")
      return b.npm.packageDownloads - a.npm.packageDownloads;
    return a.rank - b.rank;
  });

  const maxScore = Math.max(...leaderboard.map((e) => e.totalScore));
  const currentUser = leaderboard.find((e) => e.isCurrentUser);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Campaign Leaderboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Rankings determined by impact across GitHub, on-chain activity, and NPM contributions.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900/60 border border-white/5 px-4 py-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Campaign window active</span>
        </div>
      </div>

      {/* Your rank banner */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-indigo-500/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl font-extrabold text-sky-400">#{currentUser.rank}</div>
            <div>
              <p className="text-sm font-bold text-white">Your current rank</p>
              <p className="text-xs text-slate-400">Score: <span className="text-sky-300 font-bold">{currentUser.totalScore.toLocaleString()} pts</span></p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatPill label="Stacks Commits" value={currentUser.github.stacksCommits} />
            <StatPill label="Txns" value={fmt(currentUser.onchain.transactions)} />
            <StatPill label="NPM DLs" value={fmt(currentUser.npm.packageDownloads)} />
            <StatPill label="Contracts" value={currentUser.onchain.contractDeployments} />
          </div>
        </motion.div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold border transition duration-200",
              activeCategory === tab.id
                ? "bg-sky-500/10 border-sky-400/40 text-sky-300"
                : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ranking info callout */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-xs text-slate-400 leading-relaxed">
        <span className="font-bold text-slate-300">How do I rank? </span>
        Ranking is determined by impact and activity during the campaign window. Rewards are distributed based on final leaderboard position at the end of the campaign. Signals include:{" "}
        <span className="text-sky-400 font-semibold">GitHub commits to Stacks ecosystem repos</span>,{" "}
        <span className="text-emerald-400 font-semibold">mainnet fees, unique callers, contract deployments & transactions</span>, and{" "}
        <span className="text-purple-400 font-semibold">NPM package downloads</span>.
      </div>

      {/* Leaderboard table */}
      <div className="rounded-3xl border border-white/5 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Column headers */}
        <div className="grid grid-cols-[40px_1fr_120px_repeat(3,80px)] gap-4 px-6 py-3 border-b border-white/5 text-[10px] uppercase tracking-widest font-extrabold text-slate-500">
          <span>#</span>
          <span>Contributor</span>
          <span>Score</span>
          <span className="text-center hidden sm:block">GitHub</span>
          <span className="text-center hidden sm:block">On-Chain</span>
          <span className="text-center hidden sm:block">NPM</span>
        </div>

        <div className="divide-y divide-white/5">
          {sorted.map((entry, idx) => (
            <LeaderboardRow
              key={entry.handle}
              entry={entry}
              displayRank={idx + 1}
              maxScore={maxScore}
              activeCategory={activeCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({
  entry,
  displayRank,
  maxScore,
  activeCategory,
}: {
  entry: LeaderboardEntry;
  displayRank: number;
  maxScore: number;
  activeCategory: Category;
}) {
  const [expanded, setExpanded] = useState(false);
  const medal = RANK_MEDAL[displayRank];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: displayRank * 0.04 }}
      className={cn(
        "transition duration-200",
        entry.isCurrentUser ? "bg-sky-500/5" : "hover:bg-white/[0.02]"
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full grid grid-cols-[40px_1fr_120px_repeat(3,80px)] gap-4 px-6 py-4 items-center text-left"
      >
        {/* Rank */}
        <div className="text-sm font-extrabold text-slate-400">
          {medal ?? <span className="text-slate-500">{displayRank}</span>}
        </div>

        {/* Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={entry.avatar}
            alt={entry.name}
            width={36}
            height={36}
            className={cn(
              "w-9 h-9 rounded-full object-cover border-2 flex-shrink-0",
              entry.isCurrentUser ? "border-sky-400/60" : "border-white/10"
            )}
          />
          <div className="min-w-0">
            <p className={cn("text-sm font-bold truncate", entry.isCurrentUser ? "text-sky-300" : "text-slate-200")}>
              {entry.name}
              {entry.isCurrentUser && <span className="ml-2 text-[9px] font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded-md">You</span>}
            </p>
            <p className="text-[11px] text-slate-500 truncate">{entry.handle}</p>
          </div>
        </div>

        {/* Score + bar */}
        <div className="space-y-1.5">
          <span className="text-sm font-extrabold text-white">{entry.totalScore.toLocaleString()}</span>
          <ScoreBar
            value={entry.totalScore}
            max={maxScore}
            color={
              activeCategory === "github" ? "bg-violet-400" :
              activeCategory === "onchain" ? "bg-emerald-400" :
              activeCategory === "npm" ? "bg-purple-400" :
              "bg-gradient-to-r from-sky-400 to-indigo-400"
            }
          />
        </div>

        {/* GitHub */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-violet-300">{entry.github.stacksCommits}</span>
          <span className="text-[9px] text-slate-500">stacks</span>
        </div>

        {/* On-chain */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-emerald-300">{fmt(entry.onchain.transactions)}</span>
          <span className="text-[9px] text-slate-500">txns</span>
        </div>

        {/* NPM */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-purple-300">{fmt(entry.npm.packageDownloads)}</span>
          <span className="text-[9px] text-slate-500">dls</span>
        </div>
      </button>

      {/* Expanded breakdown */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-5"
        >
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* GitHub */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-violet-400 mb-2">GitHub</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Stacks Commits" value={entry.github.stacksCommits} />
                <StatPill label="Other Commits" value={entry.github.otherCommits} />
              </div>
            </div>
            {/* On-chain */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-3">
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400 mb-2">On-Chain</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Fees (µSTX)" value={fmt(entry.onchain.feesGeneratedMicroStx)} />
                <StatPill label="Callers" value={entry.onchain.uniqueCallers} />
                <StatPill label="Deployments" value={entry.onchain.contractDeployments} />
                <StatPill label="Txns" value={fmt(entry.onchain.transactions)} />
              </div>
            </div>
            {/* NPM */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-purple-400 mb-2">NPM</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Downloads" value={fmt(entry.npm.packageDownloads)} />
                <StatPill label="Packages" value={entry.npm.packages} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
