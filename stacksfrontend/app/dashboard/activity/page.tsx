"use client";

import React from "react";
import { useApp } from "@/lib/AppContext";
import { formatDate } from "@/lib/utils";

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  contract: { color: "text-emerald-400", bg: "bg-emerald-400", label: "Contract" },
  system: { color: "text-sky-400", bg: "bg-sky-400", label: "System" },
  task: { color: "text-purple-400", bg: "bg-purple-400", label: "Task" },
  user: { color: "text-amber-400", bg: "bg-amber-400", label: "User" },
};

export default function ActivityPage() {
  const { activityFeed } = useApp();

  const grouped = activityFeed.reduce<Record<string, typeof activityFeed>>((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Activity Feed</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time log of all workspace events and on-chain actions</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Events", value: activityFeed.length, color: "text-sky-400" },
          { label: "Contract Calls", value: activityFeed.filter((l) => l.type === "contract").length, color: "text-emerald-400" },
          { label: "System Events", value: activityFeed.filter((l) => l.type === "system").length, color: "text-purple-400" },
          { label: "Today", value: activityFeed.filter((l) => new Date(l.timestamp).toDateString() === new Date().toDateString()).length, color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, logs]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{date}</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
              <span className="text-[10px] text-slate-600">{logs.length} events</span>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 divide-y divide-white/[0.04] overflow-hidden shadow-md">
              {logs.map((log) => {
                const cfg = typeConfig[log.type] ?? typeConfig.system;
                return (
                  <div key={log.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${cfg.bg}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 leading-relaxed">{log.text}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{formatDate(log.timestamp)}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-white/5 ${cfg.color} flex-shrink-0`}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {activityFeed.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-12 text-center">
            <p className="text-slate-500 text-sm">No activity yet. Start working on tasks to see events here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
