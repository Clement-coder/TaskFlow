"use client";

import React, { useState } from "react";

const integrations = [
  { id: "github", name: "GitHub", desc: "Link commits and PRs to tasks. Sync repo activity with your workspace.", icon: "🐙", status: "available", category: "Development" },
  { id: "hiro", name: "Hiro Wallet", desc: "Stacks L2 wallet for on-chain reputation minting and smart contract interactions.", icon: "🔗", status: "connected", category: "Web3" },
  { id: "celo", name: "Celo Network", desc: "EVM-compatible wallet support for CELO and cUSD payments.", icon: "🌿", status: "available", category: "Web3" },
  { id: "supabase", name: "Supabase", desc: "Real-time database sync for collaborative task updates across your team.", icon: "⚡", status: "coming-soon", category: "Database" },
  { id: "slack", name: "Slack", desc: "Receive task notifications, deadline reminders, and on-chain events in Slack.", icon: "💬", status: "coming-soon", category: "Communication" },
  { id: "discord", name: "Discord", desc: "Post workspace activity and reputation milestones to your Discord server.", icon: "🎮", status: "coming-soon", category: "Communication" },
  { id: "linear", name: "Linear", desc: "Sync issues and sprints between Linear and TaskFlow boards.", icon: "📐", status: "coming-soon", category: "Development" },
  { id: "notion", name: "Notion", desc: "Export task summaries and project reports to Notion pages.", icon: "📝", status: "coming-soon", category: "Productivity" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  connected: { label: "Connected", color: "bg-emerald-500/15 text-emerald-300" },
  available: { label: "Connect", color: "bg-sky-500/15 text-sky-300" },
  "coming-soon": { label: "Coming Soon", color: "bg-slate-700/50 text-slate-500" },
};

const categories = ["All", "Web3", "Development", "Communication", "Database", "Productivity"];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [connected, setConnected] = useState<string[]>(["hiro"]);

  const filtered = activeCategory === "All" ? integrations : integrations.filter((i) => i.category === activeCategory);

  const toggle = (id: string, status: string) => {
    if (status === "coming-soon") return;
    setConnected((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
        <p className="text-sm text-slate-400 mt-0.5">Connect your favorite tools to supercharge your workflow</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Connected", value: connected.length, color: "text-emerald-400" },
          { label: "Available", value: integrations.filter((i) => i.status === "available").length, color: "text-sky-400" },
          { label: "Coming Soon", value: integrations.filter((i) => i.status === "coming-soon").length, color: "text-slate-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${activeCategory === cat ? "bg-sky-500/15 text-sky-300 border border-sky-500/20" : "bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent hover:border-white/10"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {filtered.map((item) => {
          const isConnected = connected.includes(item.id);
          const cfg = statusConfig[isConnected ? "connected" : item.status];
          return (
            <div key={item.id} className={`rounded-2xl border bg-slate-900/60 p-5 flex flex-col gap-4 transition ${isConnected ? "border-emerald-500/20" : "border-white/[0.07] hover:border-white/[0.15] transition duration-200"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{item.name}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">{item.category}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0 ${cfg.color}`}>{cfg.label}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">{item.desc}</p>
              <button onClick={() => toggle(item.id, item.status)} disabled={item.status === "coming-soon"}
                className={`w-full flex items-center justify-center rounded-xl py-2.5 text-xs font-semibold transition ${item.status === "coming-soon" ? "bg-white/5 text-slate-600 cursor-not-allowed" : isConnected ? "border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400" : "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"}`}>
                {item.status === "coming-soon" ? "Coming Soon" : isConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
