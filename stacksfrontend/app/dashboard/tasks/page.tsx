"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate, priorityBadge } from "@/lib/utils";

export default function TasksPage() {
  const { tasks, projects, updateTaskStatus, addTask } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [assocProj, setAssocProj] = useState(projects[0]?.name || "");
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [mintingTaskId, setMintingTaskId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask(taskTitle, assocProj, taskPriority, taskDueDate);
    setTaskTitle("");
    setTaskDueDate("");
    setModalOpen(false);
  };

  const handleComplete = (taskId: string) => {
    setMintingTaskId(taskId);
    setTimeout(() => {
      updateTaskStatus(taskId, "done");
      setMintingTaskId(null);
    }, 1500);
  };

  const columns = [
    { id: "todo", title: "To Do", bg: "bg-slate-900/40" },
    { id: "in-progress", title: "In Progress", bg: "bg-slate-900/60" },
    { id: "done", title: "Completed & Verified", bg: "bg-slate-900/80" },
  ] as const;

  return (
    <div className="space-y-6 relative h-full flex flex-col">
      {/* Toast Overlay for Minting */}
      <AnimatePresence>
        {mintingTaskId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
          >
            <div className="rounded-3xl border border-sky-400/20 bg-slate-900 p-8 shadow-2xl max-w-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-sky-400/20 bg-sky-500/10 flex items-center justify-center mx-auto animate-spin">
                <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <title>Minting Spinner</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Minting Proof on Stacks</h4>
                <p className="text-xs text-slate-400">Deploying task completion metadata signature to Clarity block anchor ledger...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Tasks Board</h1>
          <p className="text-xs text-slate-400">Track and advance task flows with secure on-chain proofs-of-work.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-sky-500 hover:bg-sky-400 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <title>Create Task Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Task</span>
        </button>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid gap-6 lg:grid-cols-3 flex-1">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-3xl border border-white/5 ${col.bg} p-5 flex flex-col h-full min-h-[550px] shadow-xl backdrop-blur-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    col.id === "todo" ? "bg-slate-500" : col.id === "in-progress" ? "bg-amber-400" : "bg-emerald-400"
                  }`} />
                  <span>{col.title}</span>
                </h3>
                <span className="text-[10px] font-black text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {colTasks.map((t, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={t.id}
                      className="group rounded-2xl border border-white/5 bg-slate-950/80 p-5 shadow-lg hover:border-sky-400/20 transition duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">
                            {t.project}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">
                            Due {formatDate(t.dueDate)}
                          </span>
                        </div>
                        
                        <h4 className="text-xs font-bold leading-relaxed text-slate-200 group-hover:text-sky-300 transition duration-200">
                          {t.title}
                        </h4>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[9px] text-slate-500 font-medium">
                            Assignee: <strong className="text-slate-300">{t.assignee}</strong>
                          </span>
                          <div className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${priorityBadge(t.priority)}`}>
                            {t.priority}
                          </div>
                        </div>

                        {/* Action buttons based on Column state */}
                        <div className="border-t border-white/5 pt-3 mt-1 flex justify-end gap-2">
                          {col.id === "todo" && (
                            <button
                              onClick={() => updateTaskStatus(t.id, "in-progress")}
                              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-sky-500/10 hover:text-sky-300 py-2 text-[10px] font-bold text-slate-400 transition"
                            >
                              <span>Start Sprint</span>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <title>Start Sprint Arrow</title>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          )}
                          {col.id === "in-progress" && (
                            <button
                              onClick={() => handleComplete(t.id)}
                              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-white py-2 text-[10px] font-bold transition shadow-lg shadow-sky-500/5"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <title>Complete Icon</title>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                              </svg>
                              <span>Complete & Mint</span>
                            </button>
                          )}
                          {col.id === "done" && (
                            <button
                              onClick={() => updateTaskStatus(t.id, "todo")}
                              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 py-2 text-[10px] font-bold text-slate-400 transition"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <title>Reopen Icon</title>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                              </svg>
                              <span>Reopen task</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creation Modal for task */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-45 bg-slate-950/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-[480px] rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Create Sprint Task</h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    aria-label="Close modal"
                    className="rounded-full bg-white/5 p-1.5 text-slate-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <title>Close Modal Icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Task Title</label>
                    <input
                      type="text"
                      required
                      placeholder="What task needs to be performed?"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                    />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Associate Project</label>
                      <select
                        value={assocProj}
                        onChange={(e) => setAssocProj(e.target.value)}
                        className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-sky-400 transition"
                      >
                        {projects.map((proj) => (
                          <option key={proj.id} value={proj.name}>
                            {proj.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Due Date</label>
                      <input
                        type="date"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                        className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-sky-400 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Priority Level</label>
                    <div className="flex gap-2">
                      {(["low", "medium", "high"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setTaskPriority(p)}
                          className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize border transition ${
                            taskPriority === p
                              ? "bg-sky-500/10 border-sky-400/50 text-sky-300"
                              : "bg-slate-950 border-white/10 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 rounded-2xl bg-white/5 hover:bg-white/10 py-3 text-xs font-bold text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-2xl bg-sky-500 hover:bg-sky-400 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/10"
                    >
                      Inject Task
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
