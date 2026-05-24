"use client";

import React, { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I connect my Stacks wallet?",
    a: "Click the 'Connect Wallet' button in the top navigation bar. You'll need the Hiro Wallet browser extension installed. Once connected, your STX balance and address will appear in the header.",
  },
  {
    q: "What is token gating?",
    a: "Token gating restricts workspace access to users who hold a minimum amount of STX tokens. You can enable this in Workspace Settings under 'Clarity Token-Gating'.",
  },
  {
    q: "How is reputation calculated?",
    a: "Reputation points are earned by completing tasks, contributing to projects, and having your work verified on-chain. Each completed task awards points based on its priority level.",
  },
  {
    q: "Can I export my task data?",
    a: "Yes. Go to Settings → Integrations to export your tasks and project data as JSON or CSV.",
  },
  {
    q: "How do I create a new workspace?",
    a: "Click the workspace selector in the top bar and choose 'New workspace', or navigate to /start from the main menu.",
  },
  {
    q: "What blockchains are supported?",
    a: "TaskFlow currently supports Stacks (Bitcoin L2) for reputation and task verification, and Celo for additional payment options.",
  },
];

const guides = [
  { icon: "🚀", title: "Getting Started", desc: "Set up your first workspace and invite your team", href: "/docs" },
  { icon: "🔗", title: "Wallet Integration", desc: "Connect Hiro or Celo wallet to unlock Web3 features", href: "/docs" },
  { icon: "📋", title: "Task Management", desc: "Create, assign, and track tasks with on-chain proofs", href: "/docs" },
  { icon: "🏆", title: "Reputation System", desc: "Understand how reputation points are earned and used", href: "/docs" },
  { icon: "⚙️", title: "Smart Contracts", desc: "Configure Clarity contracts for your workspace", href: "/docs" },
  { icon: "📊", title: "Analytics Guide", desc: "Interpret your team's performance metrics", href: "/docs" },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <p className="text-sm text-slate-400 mt-0.5">Find answers, guides, and contact support</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search help articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-slate-900/60 border border-white/[0.07] pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
        />
      </div>

      {/* Quick guides */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Quick Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {guides.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 hover:border-sky-500/30 hover:bg-sky-500/5 transition group"
            >
              <div className="text-2xl mb-3">{g.icon}</div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition">{g.title}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden hover:border-white/[0.12] transition duration-150">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition"
              >
                <span className="text-sm font-semibold text-slate-200">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-slate-500 flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-8">No results found for "{search}"</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Still need help?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Our team is available to assist you with any questions</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition"
          >
            View Docs
          </Link>
          <a
            href="mailto:support@taskflow.xyz"
            className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
