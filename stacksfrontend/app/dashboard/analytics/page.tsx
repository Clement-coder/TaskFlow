"use client";

import React from "react";
import { useApp } from "@/lib/AppContext";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { priorityBadge } from "@/lib/utils";
import { getIcon } from "@/lib/iconMap";

export default function AnalyticsPage() {
  const { tasks, projects, userProfile, activityFeed } = useApp();

  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const total = tasks.length || 1;

  const highPriority = tasks.filter((t) => t.priority === "high").length;
  const medPriority = tasks.filter((t) => t.priority === "medium").length;
  const lowPriority = tasks.filter((t) => t.priority === "low").length;

  const contractEvents = activityFeed.filter((l) => l.type === "contract").length;
  const systemEvents = activityFeed.filter((l) => l.type === "system").length;

  const bars = [
    { label: "Done", value: done, total, color: "bg-emerald-400" },
    { label: "In Progress", value: inProgress, total, color: "bg-amber-400" },
    { label: "To Do", value: todo, total, color: "bg-slate-500" },
  ];

  const priorityBars = [
    { label: "High", value: highPriority, total, color: "bg-fuchsia-400" },
    { label: "Medium", value: medPriority, total, color: "bg-amber-400" },
    { label: "Low", value: lowPriority, total, color: "bg-emerald-400" },
  ];

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">Workspace performance and on-chain activity insights</p>
      </div>

      {/* KPI row */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Tasks", value: tasks.length, color: "text-sky-400", iconName: "clipboard" },
          { label: "Completion Rate", value: `${Math.round((done / total) * 100)}%`, color: "text-emerald-400", iconName: "check-circle" },
          { label: "Reputation", value: userProfile.reputation, color: "text-purple-400", iconName: "zap" },
          { label: "On-Chain Events", value: contractEvents, color: "text-amber-400", iconName: "link" },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 hover:border-white/[0.12] transition duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500">{k.label}</span>
              <span className="flex">
                {React.createElement(getIcon(k.iconName), { className: `w-4 h-4 ${k.color}` })}
              </span>
            </div>
            <p className={`text-3xl font-bold tabular-nums ${k.color}`}>{k.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:gap-6 lg:grid-cols-2">
        {/* Task status breakdown */}
        <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-white">Task Status Breakdown</h2>
          <div className="space-y-3">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400">{b.label}</span>
                  <span className="text-xs font-bold tabular-nums text-slate-300">{b.value} <span className="text-slate-600">/ {tasks.length}</span></span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(b.value / b.total) * 100}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${b.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority breakdown */}
        <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-bold text-white">Priority Distribution</h2>
          <div className="space-y-3">
            {priorityBars.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400">{b.label}</span>
                  <span className="text-xs font-bold text-slate-300">{b.value}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(b.value / b.total) * 100}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${b.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project progress */}
        <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-bold text-white">Project Progress</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300 font-medium">{p.name}</span>
                    <Badge variant={p.status === "active" ? "accent" : p.status === "launched" ? "success" : "warning"} className="text-[9px]">
                      {p.status}
                    </Badge>
                  </div>
                  <span className="text-xs font-bold tabular-nums text-slate-400">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity log summary */}
        <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-bold text-white">Activity Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Contract Events", value: contractEvents, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "System Events", value: systemEvents, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
              { label: "Total Logged", value: activityFeed.length, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
              { label: "Active Projects", value: projects.filter(p => p.status === "active").length, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border p-3 ${s.bg}`}>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent tasks list */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <p className="text-xs font-semibold text-slate-500">Recent Tasks</p>
            {tasks.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between">
                <span className="text-xs text-slate-300 truncate max-w-[60%]">{t.title}</span>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${priorityBadge(t.priority)}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
