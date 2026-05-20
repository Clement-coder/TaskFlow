"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

export default function ProjectsPage() {
  const { projects, addProject } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projLabels, setProjLabels] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const parsedLabels = projLabels
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    addProject(projName, projDesc, parsedLabels.length > 0 ? parsedLabels : ["General"]);
    setProjName("");
    setProjDesc("");
    setProjLabels("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Projects</h1>
          <p className="text-xs text-slate-400">Manage and create active development modules inside this workspace.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-sky-500 hover:bg-sky-400 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Project</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            key={p.id}
            className="group flex flex-col justify-between rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-xl hover:border-sky-400/25 transition duration-300 backdrop-blur-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] uppercase font-black text-sky-400 tracking-wider">
                  Due {formatDate(p.dueDate)}
                </span>
                <Badge
                  variant={p.status === "active" ? "accent" : p.status === "launched" ? "success" : "warning"}
                  className="text-[8px] font-black"
                >
                  {p.status}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition duration-200">
                {p.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.description}</p>
            </div>

            <div className="mt-6 space-y-4">
              {/* Labels Row */}
              <div className="flex flex-wrap gap-1.5">
                {p.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/5 rounded-md px-2 py-0.5"
                  >
                    {lbl}
                  </span>
                ))}
              </div>

              {/* Progress Index */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>Sprint Completion</span>
                  <span className="text-slate-300">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Creation Modal Modal overlay */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-[20%] sm:left-1/2 sm:-translate-x-1/2 z-50 w-full max-w-[480px] rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Initialize Project Module</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full bg-white/5 p-1.5 text-slate-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter project name..."
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Description</label>
                  <textarea
                    rows={3}
                    placeholder="What is this sprint's scope of work?"
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Labels (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. DeFi, Clarity, Frontend"
                    value={projLabels}
                    onChange={(e) => setProjLabels(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                  />
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
                    Initialize Sprint
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
