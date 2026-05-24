"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { useApp } from "@/lib/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function StartPage() {
  const { addWorkspace } = useApp();
  const router = useRouter();
  const [wsName, setWsName] = useState("");
  const [wsDesc, setWsDesc] = useState("");
  const [wsPremium, setWsPremium] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsName.trim()) return;
    setCreating(true);
    setTimeout(() => {
      addWorkspace(wsName, wsDesc, wsPremium);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <StandardPage
      title="Start a Workspace"
      description="Create a decentralized workspace to invite members, manage sprints, and earn on-chain reputation."
      fullWidth
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-6 sm:p-8 shadow-2xl w-full hover:border-white/[0.12] transition duration-200">
            <AnimatePresence mode="wait">
              {creating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-5"
                >
                  <div className="w-14 h-14 rounded-full border border-sky-400/20 bg-sky-500/10 flex items-center justify-center animate-spin">
                    <svg
                      className="w-7 h-7 text-sky-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white">
                      Deploying Workspace
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Deploying smart contract shell on Stacks L2...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Workspace Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delta Sprint Board"
                      value={wsName}
                      onChange={(e) => setWsName(e.target.value)}
                      className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief summary of this team's goals..."
                      value={wsDesc}
                      onChange={(e) => setWsDesc(e.target.value)}
                      className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition resize-none"
                    />
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Enable Token Gating
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Restrict access to members holding STX tokens.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWsPremium(!wsPremium)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0 ${
                        wsPremium ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          wsPremium ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Link
                      href="/"
                      className="flex-1 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-sm font-semibold text-slate-400 hover:text-white transition"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition"
                    >
                      Deploy Workspace
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: "⚡", label: "Instant setup", desc: "Live in seconds" },
              { icon: "🔒", label: "Token gated", desc: "STX-based access" },
              { icon: "🏆", label: "Earn rep", desc: "On-chain proofs" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.07] bg-slate-900/40 p-4 text-center hover:border-white/[0.12] transition duration-150"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs font-semibold text-slate-200">
                  {item.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StandardPage>
  );
}
