"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const {
    tasks,
    projects,
    userProfile,
    activityFeed,
    addTask,
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]?.name || "");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [showToast, setShowToast] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const activeTasks = tasks.filter((t) => t.status !== "done").length;
  const activeProjects = projects.filter((p) => p.status === "active").length;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask(newTaskTitle, selectedProject, selectedPriority, dueDate);
    setNewTaskTitle("");
    setDueDate("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-8 z-50 rounded-2xl bg-slate-900 border border-emerald-500/30 p-4 shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Task Dispatched!</p>
              <p className="text-[10px] text-slate-400">Created task and synced on-chain ledger.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview Cards Row */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Reputation score",
            value: userProfile.reputation,
            desc: "Minted on Stacks L2",
            color: "text-sky-400",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
          },
          {
            label: "Active Projects",
            value: activeProjects,
            desc: "Goal sprints running",
            color: "text-purple-400",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
            ),
          },
          {
            label: "Completed Tasks",
            value: completedTasks,
            desc: "Verified completions",
            color: "text-emerald-400",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: "Pending Sprints",
            value: activeTasks,
            desc: "Awaiting resolution",
            color: "text-amber-400",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ].map((card, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            key={card.label}
            className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-500">{card.label}</span>
              <div className={`p-2 rounded-xl bg-white/5 ${card.color}`}>{card.icon}</div>
            </div>
            <p className="mt-4 text-4xl font-extrabold text-white">{card.value}</p>
            <p className="mt-2 text-xs text-slate-400 font-medium">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Section: Analytics Overview & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {/* Projects progress card */}
          <Card>
            <CardHeader>
              <CardTitle>Team productivity</CardTitle>
              <CardDescription>Live progression index from current workspace sprints.</CardDescription>
            </CardHeader>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-slate-950/60 border border-white/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{project.name}</span>
                      <Badge
                        variant={project.status === "active" ? "accent" : project.status === "launched" ? "success" : "warning"}
                        className="text-[8px] font-black"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-4 sm:w-1/3">
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-300 w-8 text-right">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Add Task */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg">Quick-Add Sprint Task</CardTitle>
              <CardDescription>Instantly inject collaborative tasks into the current board flow.</CardDescription>
            </CardHeader>
            <form onSubmit={handleQuickAdd} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter sprint task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Associate Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-400 transition"
                  >
                    {projects.map((proj) => (
                      <option key={proj.id} value={proj.name}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Priority Level</label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSelectedPriority(p)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize border transition ${
                          selectedPriority === p
                            ? "bg-sky-500/10 border-sky-400/50 text-sky-300"
                            : "bg-slate-950 border-white/10 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 hover:bg-sky-400 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition"
              >
                Dispatch Smart Task
              </button>
            </form>
          </Card>
        </div>

        {/* Live Activity Feed Sidebar Pane */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Smart Audit Stream</CardTitle>
            <CardDescription>Live telemetry from Stacks block confirmation logs.</CardDescription>
          </CardHeader>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
            <AnimatePresence initial={false}>
              {activityFeed.map((log) => (
                <motion.div
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  key={log.id}
                  className="rounded-2xl bg-slate-950/40 border border-white/5 p-4 flex gap-3 items-start hover:bg-slate-950/80 transition duration-200"
                >
                  <div
                    className={`rounded-full p-2 mt-0.5 ${
                      log.type === "contract"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    }`}
                  >
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
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{log.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-500">{formatDate(log.timestamp)}</span>
                      <span className="text-[9px] font-black text-slate-600">•</span>
                      <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">
                        {log.type === "contract" ? "Stacks Tx" : "Node Log"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
