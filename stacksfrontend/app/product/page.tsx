"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

type TabId = "kanban" | "proofs" | "gating" | "reputation";

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<TabId>("kanban");

  const tabs = [
    { id: "kanban", label: "Task Boards", icon: "📋" },
    { id: "proofs", label: "Clarity Proofs", icon: "🔒" },
    { id: "gating", label: "Token Gating", icon: "🔑" },
    { id: "reputation", label: "On-Chain Rep", icon: "🏆" },
  ] as const;

  const getTabContent = (id: TabId) => {
    switch (id) {
      case "kanban":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Intuitive Team Kanban Sprints</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transition tasks effortlessly between columns. Perfect clarity on who's doing what, with visual priority chips and automated notification systems.
            </p>
            <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-slate-500 font-bold">
                <span>Task</span>
                <span>Column</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Draft on-chain task proof contract</span>
                <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md font-bold">In Progress</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Publish project milestones to Supabase</span>
                <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md font-bold">Completed</span>
              </div>
            </div>
          </div>
        );
      case "proofs":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Bitcoin-Anchored Task Verification</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              When sprint items are marked done, TaskFlow compiles the cryptographic proof of work and signs it on Stacks L2 using state-of-the-art Clarity smart contracts.
            </p>
            <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400">tx-verified: 0x93fac8...a210</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 leading-relaxed">
                (contract-call? .proof-of-work mint-proof u104 "Enable Hiro Wallet auth flow" u70)
              </p>
            </div>
          </div>
        );
      case "gating":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Hiro Native Token Gating</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Restructure workspaces with token gating. Require members to authenticate with their Hiro wallet and prove ownership of specific NFTs or a STX balance of at least 100 to access sensitive task sprint records.
            </p>
            <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 flex justify-between items-center text-xs text-slate-300">
              <span>Token Gated Status</span>
              <span className="text-sky-300 font-bold bg-sky-500/15 border border-sky-500/30 px-3 py-1 rounded-full">
                Locked: STX &gt;= 100
              </span>
            </div>
          </div>
        );
      case "reputation":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Dynamic Cryptographic Reputation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ditch outdated performance metrics. Earn reputation points minted directly on Stacks as a proof of performance. Unlock levels (Foundational, Rising, Advanced, Stellar) visible across all decentralized networks.
            </p>
            <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-extrabold text-sky-400">
                  AQ
                </div>
                <div>
                  <p className="font-bold">Avery Quinn</p>
                  <p className="text-[10px] text-slate-500">Stellar reputation status</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-sky-300 bg-sky-500/10 px-3 py-1 rounded-xl">
                860 Points
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <StandardPage title="Product" description="Overview of TaskFlow features, smart contracts, and Web3 project management." icon="product">
      {/* Product Interactive Tabs Grid */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start">
        {/* Left selector */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-xs font-bold transition duration-200 ${
                activeTab === tab.id
                  ? "border-sky-500/20 bg-sky-500/10 text-sky-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "border-transparent bg-transparent text-slate-400 hover:border-white/5 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Preview Card */}
        <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden min-h-[340px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getTabContent(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </StandardPage>
  );
}
