"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useApp } from "@/lib/AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  id: string;
  quarter: string;
  title: string;
  desc: string;
  status: "Completed" | "In Development" | "Planned";
}

export default function RoadmapPage() {
  const { roadmapUpvotes, upvoteMilestone } = useApp();
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const milestones: Milestone[] = [
    {
      id: "q2-1",
      quarter: "Q2 2026",
      title: "On-Chain Task Proofs",
      desc: "Implement Clarity smart contract signatures for verifying task completion directly on Bitcoin L2.",
      status: "In Development",
    },
    {
      id: "q2-2",
      quarter: "Q2 2026",
      title: "Hiro Connect Integration",
      desc: "Allow secure wallet-native workspace gating, credential validation, and reputation queries.",
      status: "In Development",
    },
    {
      id: "q3-1",
      quarter: "Q3 2026",
      title: "AI Productivity Summarizer",
      desc: "Introduce LLM-powered velocity summaries, daily task prioritizations, and block insights.",
      status: "Planned",
    },
    {
      id: "q3-2",
      quarter: "Q3 2026",
      title: "NFT Milestone Badges",
      desc: "Enable DAO members to mint non-fungible reputation credentials for achieving Stellar status.",
      status: "Planned",
    },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setFeedbackText("");
    }, 3000);
  };

  return (
    <StandardPage
      title="Product Roadmap"
      description="Track planned integrations, vote on upcoming features, and suggest new modules."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Milestones stream */}
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <Card
              key={milestone.id}
              className="p-6 flex items-start justify-between gap-6 hover:border-sky-500/10 transition duration-300"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
                    {milestone.quarter}
                  </span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    milestone.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : milestone.status === "In Development"
                      ? "bg-sky-500/15 text-sky-300"
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {milestone.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{milestone.title}</h4>
                <p className="text-xs leading-relaxed text-slate-400">{milestone.desc}</p>
              </div>

              {/* Upvote Widget */}
              <button
                onClick={() => upvoteMilestone(milestone.id)}
                className="rounded-2xl border border-white/5 bg-slate-950 hover:bg-sky-500/10 hover:border-sky-500/30 p-3.5 flex flex-col items-center justify-center min-w-[64px] transition duration-200 group/btn"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover/btn:text-sky-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                  <title>Upvote Arrow</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <span className="text-xs font-black text-slate-300 mt-1.5">
                  {roadmapUpvotes[milestone.id] || 0}
                </span>
              </button>
            </Card>
          ))}
        </div>

        {/* Suggestion Form Sidebar */}
        <Card className="p-6 h-fit">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg">Propose Feature</CardTitle>
            <CardDescription>Submit feature suggestions directly to the Stacks DAO pipeline.</CardDescription>
          </CardHeader>

          {feedbackSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                  <title>Proposal Success Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Proposal Dispatched!</p>
                <p className="text-[10px] text-slate-500 mt-1">Submitted to DAO sprint backlog.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Proposal scope</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Integrate token gating for Discord invite bots..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 hover:bg-sky-400 py-3 text-xs font-bold text-white shadow-lg transition"
              >
                Submit Proposal
              </button>
            </form>
          )}
        </Card>
      </div>
    </StandardPage>
  );
}
