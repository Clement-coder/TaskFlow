"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

// Dashboard overview page
export default function DashboardPage() {
  const { tasks, projects, userProfile, activityFeed, addTask } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]?.name || "");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [showToast, setShowToast] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const activeTasks = tasks.filter((t) => t.status !== "done").length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, selectedProject, selectedPriority, dueDate);
    setNewTaskTitle("");
    setDueDate("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const stats = [
    {
      label: "Reputation",
      value: userProfile.reputation,
      desc: "Minted on Stacks L2",
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "Active Projects",
      value: activeProjects,
      desc: "Sprints in progress",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      desc: "Verified on-chain",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      desc: `${activeTasks} tasks pending`,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            className="fixed top-20 right-6 z-50 rounded-xl border border-emerald-500/25 bg-slate-900/95 p-4 shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-100">Task created</p>
              <p className="text-[10px] text-slate-400">Synced to on-chain ledger.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-sm text-slate-400 mt-0.5">Your workspace at a glance — live from Stacks.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 hover:border-white/15 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{s.label}</span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
            </div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1.5 text-xs text-slate-500">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Projects progress */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Team Productivity</h2>
                <p className="text-xs text-slate-500 mt-0.5">Sprint progress across all active projects</p>
              </div>
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-white/[0.05] bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-slate-200">{project.name}</span>
                      <Badge
                        variant={project.status === "active" ? "accent" : project.status === "launched" ? "success" : "warning"}
                        className="text-[9px] font-bold"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-1">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick add task */}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Quick Add Task</h2>
                <p className="text-xs text-slate-500">Inject a task directly into the board</p>
              </div>
            </div>
            <form onSubmit={handleQuickAdd} className="space-y-3">
              <input
                type="text"
                required
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition"
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="rounded-xl bg-slate-950/60 border border-white/[0.08] px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 transition"
                >
                  {projects.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
                <div className="flex gap-1.5">
                  {(["low", "medium", "high"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPriority(p)}
                      className={`flex-1 rounded-xl py-2.5 text-[10px] font-bold capitalize border transition ${
                        selectedPriority === p
                          ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                          : "bg-slate-950/60 border-white/[0.08] text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="rounded-xl bg-slate-950/60 border border-white/[0.08] px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/15 transition duration-150"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-white">Activity Feed</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live telemetry from Stacks</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>
          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[520px] pr-1">
            <AnimatePresence initial={false}>
              {activityFeed.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="flex gap-3 items-start rounded-xl border border-white/[0.05] bg-slate-950/40 p-3.5 hover:bg-slate-950/70 transition duration-200"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    log.type === "contract"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  }`}>
                    {log.type === "contract" ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-relaxed">{log.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-600">{formatDate(log.timestamp)}</span>
                      <span className="text-[10px] text-slate-700">·</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${log.type === "contract" ? "text-emerald-600" : "text-sky-600"}`}>
                        {log.type === "contract" ? "Stacks Tx" : "System"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
