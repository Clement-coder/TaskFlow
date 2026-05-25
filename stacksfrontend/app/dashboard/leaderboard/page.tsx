"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { leaderboard } from "@/data/mock-data";
import { LeaderboardEntry } from "@/types";
import { cn } from "@/lib/utils";

type Category = "all" | "tasks" | "reputation" | "rewards";

const CATEGORY_TABS: { id: Category; label: string }[] = [
  { id: "all", label: "Overall" },
  { id: "tasks", label: "Tasks" },
  { id: "reputation", label: "Reputation" },
  { id: "rewards", label: "Rewards" },
];

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function fmt(n: number) {
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
      <span className="text-xs font-bold tabular-nums text-slate-200">{value}</span>
    </div>
  );
}

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const sorted = [...leaderboard].sort((a, b) => {
    if (activeCategory === "tasks") return b.tasks.completed - a.tasks.completed;
    if (activeCategory === "reputation") return b.reputation.points - a.reputation.points;
    if (activeCategory === "rewards") return b.rewards.earned - a.rewards.earned;
    return a.rank - b.rank;
  });

  const maxScore = Math.max(...leaderboard.map((e) => e.totalScore));
  const currentUser = leaderboard.find((e) => e.isCurrentUser);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Leaderboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Rankings based on tasks completed, reputation earned, and rewards unlocked.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900/60 border border-white/5 px-4 py-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live rankings</span>
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
            <StatPill label="Tasks Done" value={currentUser.tasks.completed} />
            <StatPill label="Reputation" value={fmt(currentUser.reputation.points)} />
            <StatPill label="Rewards" value={currentUser.rewards.earned} />
            <StatPill label="Streak" value={`${currentUser.rewards.streakDays}d`} />
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
        Your score grows as you complete tasks, contribute to projects, and earn reputation on the platform. Rewards are unlocked for hitting milestones and maintaining streaks. Signals include:{" "}
        <span className="text-sky-400 font-semibold">tasks completed & high-priority work</span>,{" "}
        <span className="text-emerald-400 font-semibold">reputation points & level</span>, and{" "}
        <span className="text-purple-400 font-semibold">rewards earned & daily streaks</span>.
      </div>

      {/* Leaderboard table */}
      <div className="rounded-3xl border border-white/5 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-[40px_1fr_120px_repeat(3,80px)] gap-4 px-6 py-3 border-b border-white/5 text-[10px] uppercase tracking-widest font-extrabold text-slate-500">
          <span>#</span>
          <span>Member</span>
          <span>Score</span>
          <span className="text-center hidden sm:block">Tasks</span>
          <span className="text-center hidden sm:block">Rep</span>
          <span className="text-center hidden sm:block">Rewards</span>
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
        <div className="text-sm font-extrabold text-slate-400">
          {medal ?? <span className="text-slate-500">{displayRank}</span>}
        </div>

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
            <p className="text-[11px] text-slate-500 truncate">{entry.handle} · {entry.reputation.level}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-sm font-extrabold text-white">{entry.totalScore.toLocaleString()}</span>
          <ScoreBar
            value={entry.totalScore}
            max={maxScore}
            color={
              activeCategory === "tasks" ? "bg-sky-400" :
              activeCategory === "reputation" ? "bg-emerald-400" :
              activeCategory === "rewards" ? "bg-purple-400" :
              "bg-gradient-to-r from-sky-400 to-indigo-400"
            }
          />
        </div>

        {/* Tasks */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-sky-300">{entry.tasks.completed}</span>
          <span className="text-[9px] text-slate-500">done</span>
        </div>

        {/* Reputation */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-emerald-300">{fmt(entry.reputation.points)}</span>
          <span className="text-[9px] text-slate-500">pts</span>
        </div>

        {/* Rewards */}
        <div className="hidden sm:flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold text-purple-300">{entry.rewards.earned}</span>
          <span className="text-[9px] text-slate-500">earned</span>
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-5"
        >
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {/* Tasks */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-sky-400 mb-2">Tasks</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Completed" value={entry.tasks.completed} />
                <StatPill label="In Progress" value={entry.tasks.inProgress} />
                <StatPill label="High Priority" value={entry.tasks.highPriority} />
              </div>
            </div>
            {/* Projects */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400 mb-2">Projects</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Contributed" value={entry.projects.contributed} />
                <StatPill label="Launched" value={entry.projects.launched} />
              </div>
            </div>
            {/* Rewards */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-extrabold text-purple-400 mb-2">Rewards & Streak</p>
              <div className="flex flex-wrap gap-2">
                <StatPill label="Rewards" value={entry.rewards.earned} />
                <StatPill label="Streak" value={`${entry.rewards.streakDays}d`} />
                <StatPill label="Level" value={entry.reputation.level} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
/* leaderboard update 2 */
/* leaderboard update 3 */
/* leaderboard update 4 */
/* leaderboard update 5 */
/* leaderboard update 6 */
/* leaderboard update 7 */
/* leaderboard update 8 */
/* leaderboard update 9 */
/* leaderboard update 10 */
/* leaderboard update 11 */
/* leaderboard update 12 */
/* leaderboard update 13 */
/* leaderboard update 14 */
/* leaderboard update 15 */
/* leaderboard update 16 */
/* leaderboard update 17 */
/* leaderboard update 18 */
/* leaderboard update 19 */
/* leaderboard update 20 */
/* leaderboard update 21 */
/* leaderboard update 22 */
/* leaderboard update 23 */
/* leaderboard update 24 */
/* leaderboard update 25 */
/* leaderboard update 26 */
/* leaderboard update 27 */
/* leaderboard update 28 */
/* leaderboard update 29 */
/* leaderboard update 30 */
/* leaderboard update 31 */
/* leaderboard update 32 */
/* leaderboard update 33 */
/* leaderboard update 34 */
/* leaderboard update 35 */
/* leaderboard update 36 */
/* leaderboard update 37 */
/* leaderboard update 38 */
/* leaderboard update 39 */
/* leaderboard update 40 */
/* leaderboard update 41 */
/* leaderboard update 42 */
/* leaderboard update 43 */
/* leaderboard update 44 */
/* leaderboard update 45 */
/* leaderboard update 46 */
/* leaderboard update 47 */
/* leaderboard update 48 */
/* leaderboard update 49 */
/* leaderboard update 50 */
/* leaderboard update 51 */
/* leaderboard update 52 */
/* leaderboard update 53 */
/* leaderboard update 54 */
/* leaderboard update 55 */
/* leaderboard update 56 */
/* leaderboard update 57 */
/* leaderboard update 58 */
/* leaderboard update 59 */
/* leaderboard update 60 */
/* leaderboard update 61 */
/* leaderboard update 62 */
/* leaderboard update 63 */
/* leaderboard update 64 */
/* leaderboard update 65 */
/* leaderboard update 66 */
/* leaderboard update 67 */
/* leaderboard update 68 */
/* leaderboard update 69 */
/* leaderboard update 70 */
/* leaderboard update 71 */
/* leaderboard update 72 */
/* leaderboard update 73 */
/* leaderboard update 74 */
/* leaderboard update 75 */
/* leaderboard update 76 */
/* leaderboard update 77 */
/* leaderboard update 78 */
/* leaderboard update 79 */
/* leaderboard update 80 */
/* leaderboard update 81 */
/* leaderboard update 82 */
/* leaderboard update 83 */
/* leaderboard update 84 */
/* leaderboard update 85 */
/* leaderboard update 86 */
/* leaderboard update 87 */
/* leaderboard update 88 */
/* leaderboard update 89 */
/* leaderboard update 90 */
