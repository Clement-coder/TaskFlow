"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { reputationLevel, formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { userProfile, tasks, projects, activityFeed, walletConnected, walletAddress, stxBalance, connectWallet } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile.name);

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const level = reputationLevel(userProfile.reputation);

  const levelProgress = {
    Foundational: { pct: 20, next: "Rising", needed: 300 },
    Rising: { pct: 45, next: "Advanced", needed: 700 },
    Advanced: { pct: 72, next: "Stellar", needed: 1200 },
    Stellar: { pct: 100, next: "Max", needed: 9999 },
  }[level] ?? { pct: 0, next: "Rising", needed: 300 };

  const achievements = [
    { icon: "🚀", label: "First Task", desc: "Completed your first task", earned: completedTasks >= 1 },
    { icon: "🔥", label: "On a Roll", desc: "Completed 5 tasks", earned: completedTasks >= 5 },
    { icon: "💎", label: "Advanced", desc: "Reached Advanced reputation", earned: userProfile.reputation >= 700 },
    { icon: "⭐", label: "Stellar", desc: "Reached Stellar reputation", earned: userProfile.reputation >= 1200 },
    { icon: "🏗️", label: "Builder", desc: "Created 3+ projects", earned: projects.length >= 3 },
    { icon: "🔗", label: "Web3 Native", desc: "Connected a wallet", earned: walletConnected },
  ];

  return (
    <div className="space-y-7 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Profile</h1>
          <p className="text-sm text-slate-400 mt-1">Your on-chain identity and reputation</p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition duration-150"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {editMode ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Left: identity card */}
        <div className="space-y-4">
          {/* Avatar + name */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl ring-4 ring-sky-500/20">
                {userProfile.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {editMode ? (
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="text-center rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition w-full"
              />
            ) : (
              <div>
                <h2 className="text-lg font-bold text-white">{userProfile.name}</h2>
                <p className="text-sm text-slate-400">{userProfile.handle}</p>
              </div>
            )}

            <Badge variant={userProfile.role === "owner" ? "accent" : "muted"} className="capitalize">
              {userProfile.role}
            </Badge>
          </div>

          {/* Reputation */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Reputation</h3>
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg">{level}</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold tabular-nums text-white">{userProfile.reputation}</span>
              <span className="text-sm text-slate-500 mb-1">/ {levelProgress.needed} pts</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress.pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
              />
            </div>
            <p className="text-xs text-slate-500">{levelProgress.pct}% to {levelProgress.next}</p>
          </div>

          {/* Wallet */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-white">Wallet</h3>
            {walletConnected && walletAddress ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-300">{walletAddress.slice(0, 10)}…{walletAddress.slice(-6)}</span>
                </div>
                <p className="text-sm font-bold tabular-nums text-white">{stxBalance} <span className="text-slate-400 font-normal text-xs">STX</span></p>
              </div>
            ) : (
              <button onClick={connectWallet}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Right: stats + achievements + activity */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Tasks Done", value: completedTasks, color: "text-emerald-400" },
              { label: "In Progress", value: inProgressTasks, color: "text-amber-400" },
              { label: "Projects", value: projects.length, color: "text-purple-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-slate-900/60 p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {achievements.map((a) => (
                <div key={a.label} className={`flex items-center gap-3 rounded-xl p-3 border transition ${a.earned ? "border-sky-500/20 bg-sky-500/5" : "border-white/[0.05] bg-slate-950/30 opacity-40"}`}>
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{a.label}</p>
                    <p className="text-[10px] text-slate-500">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {activityFeed.slice(0, 6).map((log) => (
                <div key={log.id} className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${log.type === "contract" ? "bg-emerald-400" : "bg-sky-400"}`} />
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed">{log.text}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{formatDate(log.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
