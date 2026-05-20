"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      setCreating(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <StandardPage
      title="Start a Workspace"
      description="Create a decentralized workspace to invite members, manage sprints, and earn reputation."
      icon="start"
    >
      <div className="max-w-xl mx-auto">
        <Card className="p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl">Create Workspace</CardTitle>
            <CardDescription>
              Configure the default parameters for this Web3 operations board.
            </CardDescription>
          </CardHeader>

          <AnimatePresence>
            {creating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border border-sky-400/20 bg-sky-500/10 flex items-center justify-center mx-auto animate-spin">
                  <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <title>Workspace Deploying Spinner</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Deploying Workspace Shell</h4>
                  <p className="text-xs text-slate-500 mt-1">Simulating node validation and smart contract setup...</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Workspace Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delta Sprint Board"
                    value={wsName}
                    onChange={(e) => setWsName(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief summary of this team's goals..."
                    value={wsDesc}
                    onChange={(e) => setWsDesc(e.target.value)}
                    className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition resize-none"
                  />
                </div>

                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Enable Token Gating</p>
                    <p className="text-[10px] text-slate-500">
                      Restrict task viewing to members holding Stacks tokens or contract keys.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWsPremium(!wsPremium)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      wsPremium ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        wsPremium ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Link
                    href="/"
                    className="flex-1 rounded-2xl bg-white/5 hover:bg-white/10 py-3 text-xs font-bold text-slate-400 text-center transition"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 rounded-2xl bg-sky-500 hover:bg-sky-400 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition"
                  >
                    Deploy Workspace
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </StandardPage>
  );
}
