"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";

const entries = [
  { version: "v2.4.0", date: "May 24, 2026", tag: "Latest", tagColor: "bg-emerald-500/15 text-emerald-300", changes: [
    { type: "feat", text: "Added Team, Activity, Billing, Help, Security, Integrations, Changelog, API pages" },
    { type: "feat", text: "Sidebar now closes automatically when navigating to a new page" },
    { type: "fix", text: "Connect/Disconnect wallet button now visible on all screen sizes" },
    { type: "fix", text: "Fixed viewport scaling to allow user zoom for accessibility" },
    { type: "style", text: "Hero section CTA buttons are now full width and centered" },
    { type: "style", text: "Sidebar reorganized with Workspace, Account, and Resources sections" },
  ]},
  { version: "v2.3.0", date: "May 10, 2026", tag: "Stable", tagColor: "bg-sky-500/15 text-sky-300", changes: [
    { type: "feat", text: "Celo wallet integration with live balance display" },
    { type: "feat", text: "Token gating via Clarity smart contracts in workspace settings" },
    { type: "feat", text: "On-chain reputation minting when tasks are marked complete" },
    { type: "fix", text: "Mobile sidebar drawer now closes on navigation" },
    { type: "perf", text: "Reduced bundle size by lazy-loading dashboard charts" },
  ]},
  { version: "v2.2.0", date: "Apr 22, 2026", tag: null, tagColor: "", changes: [
    { type: "feat", text: "Leaderboard with real-time rank tracking across GitHub, on-chain, and NPM" },
    { type: "feat", text: "Rewards store with reputation point redemption and milestones" },
    { type: "feat", text: "Notifications center with read/unread state and type filters" },
    { type: "style", text: "Dark theme refinements across all dashboard pages" },
  ]},
  { version: "v2.1.0", date: "Apr 5, 2026", tag: null, tagColor: "", changes: [
    { type: "feat", text: "Kanban task board with status columns and inline editing" },
    { type: "feat", text: "Project management with labels, progress bars, and status tracking" },
    { type: "feat", text: "Analytics dashboard with task completion and priority charts" },
    { type: "fix", text: "Fixed workspace selector dropdown z-index on mobile" },
  ]},
  { version: "v2.0.0", date: "Mar 15, 2026", tag: "Major", tagColor: "bg-purple-500/15 text-purple-300", changes: [
    { type: "feat", text: "Complete rewrite with Next.js 16 and Tailwind CSS v4" },
    { type: "feat", text: "Stacks L2 wallet integration via Hiro Wallet" },
    { type: "feat", text: "Decentralized workspace creation with Clarity smart contracts" },
    { type: "feat", text: "Profile page with on-chain reputation and achievement badges" },
  ]},
];

const typeConfig: Record<string, { color: string }> = {
  feat: { color: "text-sky-400 bg-sky-500/10" },
  fix: { color: "text-rose-400 bg-rose-500/10" },
  style: { color: "text-purple-400 bg-purple-500/10" },
  perf: { color: "text-amber-400 bg-amber-500/10" },
  chore: { color: "text-slate-400 bg-slate-500/10" },
};

export default function ChangelogPage() {
  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Changelog</h1>
        <p className="text-sm text-slate-400 mt-0.5">Release history and feature updates for TaskFlow</p>
      </div>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06] hidden sm:block" />
        <div className="space-y-8 pb-4">
          {entries.map((entry) => (
            <div key={entry.version} className="sm:pl-8 relative">
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-sky-500/40 bg-slate-900 hidden sm:block" />
              <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden hover:border-white/[0.12] transition duration-200">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-bold text-white">{entry.version}</h2>
                    {entry.tag && (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${entry.tagColor}`}>{entry.tag}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{entry.date}</span>
                </div>
                <div className="p-5 space-y-2.5">
                  {entry.changes.map((change, i) => {
                    const cfg = typeConfig[change.type] ?? typeConfig.chore;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${cfg.color}`}>{change.type}</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{change.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
