"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { motion } from "framer-motion";
import { reputationLevel } from "@/lib/utils";

interface Reward {
  id: string;
  icon: string;
  title: string;
  desc: string;
  cost: number;
  category: "badge" | "boost" | "access";
  claimed: boolean;
}

const rewards: Reward[] = [
  { id: "r1", icon: "🥇", title: "Gold Contributor Badge", desc: "Display a gold badge on your profile permanently.", cost: 200, category: "badge", claimed: false },
  { id: "r2", icon: "⚡", title: "2x Reputation Boost", desc: "Double your reputation gains for 7 days.", cost: 350, category: "boost", claimed: false },
  { id: "r3", icon: "🔓", title: "Pro Workspace Access", desc: "Unlock Pro workspace features for 30 days.", cost: 500, category: "access", claimed: false },
  { id: "r4", icon: "🎨", title: "Custom Avatar Frame", desc: "Exclusive animated frame for your profile avatar.", cost: 150, category: "badge", claimed: false },
  { id: "r5", icon: "🚀", title: "Priority Task Queue", desc: "Your tasks get priority visibility in the board.", cost: 250, category: "boost", claimed: false },
  { id: "r6", icon: "🏛️", title: "DAO Voting Rights", desc: "Participate in TaskFlow governance votes.", cost: 800, category: "access", claimed: false },
  { id: "r7", icon: "💎", title: "Diamond Status", desc: "Exclusive diamond tier status on leaderboard.", cost: 1000, category: "badge", claimed: false },
  { id: "r8", icon: "🔥", title: "Streak Shield", desc: "Protect your task streak for 3 days.", cost: 100, category: "boost", claimed: false },
];

const milestones = [
  { pts: 100, label: "Newcomer", icon: "🌱", earned: true },
  { pts: 300, label: "Contributor", icon: "⚡", earned: true },
  { pts: 700, label: "Advanced", icon: "🔥", earned: true },
  { pts: 1200, label: "Stellar", icon: "⭐", earned: false },
  { pts: 2000, label: "Legend", icon: "💎", earned: false },
  { pts: 5000, label: "Mythic", icon: "🏛️", earned: false },
];

export default function RewardsPage() {
  const { userProfile } = useApp();
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "badge" | "boost" | "access">("all");
  const [points, setPoints] = useState(userProfile.reputation);

  const handleClaim = (reward: Reward) => {
    if (points < reward.cost || claimedIds.includes(reward.id)) return;
    setClaimedIds((prev) => [...prev, reward.id]);
    setPoints((prev) => prev - reward.cost);
  };

  const filtered = filter === "all" ? rewards : rewards.filter((r) => r.category === filter);
  const level = reputationLevel(points);

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Rewards</h1>
        <p className="text-sm text-slate-400 mt-1">Spend your reputation points on exclusive perks and upgrades</p>
      </div>

      {/* Points balance */}
      <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1">Your Balance</p>
          <p className="text-4xl font-bold text-white">{points.toLocaleString()}</p>
          <p className="text-sm text-slate-400 mt-1">Reputation Points · <span className="text-sky-400 font-semibold">{level}</span></p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-white/[0.07] bg-slate-900/60 px-4 py-3 text-center">
            <p className="text-xs text-slate-500">Claimed</p>
            <p className="text-xl font-bold text-white mt-0.5">{claimedIds.length}</p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-slate-900/60 px-4 py-3 text-center">
            <p className="text-xs text-slate-500">Available</p>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{rewards.length - claimedIds.length}</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4">Reputation Milestones</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {milestones.map((m) => (
            <div
              key={m.label}
              className={`rounded-xl border p-3 text-center transition ${
                m.earned
                  ? "border-sky-500/20 bg-sky-500/5"
                  : "border-white/[0.05] bg-slate-950/30 opacity-50"
              }`}
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              <p className="text-xs font-semibold text-slate-200">{m.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{m.pts.toLocaleString()} pts</p>
              {m.earned && (
                <span className="mt-1.5 inline-block text-[9px] font-bold bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded-md">
                  Earned
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "badge", "boost", "access"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === f
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                : "bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent hover:border-white/10"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Rewards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {filtered.map((reward, i) => {
          const isClaimed = claimedIds.includes(reward.id);
          const canAfford = points >= reward.cost;
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border p-5 flex flex-col gap-3 transition ${
                isClaimed
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-white/[0.07] bg-slate-900/60 hover:border-white/[0.12]"
              }`}
            >
              <div className="text-3xl">{reward.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{reward.title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{reward.desc}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-bold ${canAfford || isClaimed ? "text-sky-400" : "text-slate-600"}`}>
                  {reward.cost.toLocaleString()} pts
                </span>
                <button
                  onClick={() => handleClaim(reward)}
                  disabled={isClaimed || !canAfford}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    isClaimed
                      ? "bg-emerald-500/15 text-emerald-300 cursor-default"
                      : canAfford
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  {isClaimed ? "✓ Claimed" : canAfford ? "Claim" : "Need more pts"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
