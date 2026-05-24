"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  title: string;
  category: string;
  desc: string;
  codeBlock?: string;
  sandbox?: {
    endpoint: string;
    method: "GET" | "POST";
    response: string;
  };
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiExecuting, setApiExecuting] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const articles: Article[] = [
    {
      title: "Hiro Wallet Connection",
      category: "SDK Auth",
      desc: "Connect your application to Stacks using the connect SDK to authenticate users and request transaction signatures.",
      codeBlock: `import { showConnect } from "@stacks/connect";

showConnect({
  appDetails: {
    name: "TaskFlow",
    icon: "https://taskflow.so/logo.png"
  },
  onFinish: (session) => {
    console.log("Connected", session.userSession.loadUserData());
  }
});`,
    },
    {
      title: "Minting Proof-of-Work Contracts",
      category: "Clarity Contracts",
      desc: "Mint an on-chain cryptographic proof of task completion by anchoring a Clarity contract call.",
      codeBlock: `(define-public (mint-proof (task-id (string-ascii 32)) (title (string-utf8 80)) (rep-points uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (nft-mint? task-proof task-id tx-sender)
    (ok true)
  )
)`,
    },
    {
      title: "Fetch Active Sprints",
      category: "REST API",
      desc: "Fetch all active tasks and sprints within a workspace via REST endpoint.",
      sandbox: {
        endpoint: "/api/v1/workspace/sprints",
        method: "GET",
        response: JSON.stringify(
          {
            status: "success",
            workspace: "TaskFlow Core",
            sprints: [
              { id: "task_01", title: "Draft on-chain task proof contract", priority: "high" },
              { id: "task_02", title: "Design premium dashboard visuals", priority: "medium" },
            ],
          },
          null,
          2
        ),
      },
    },
  ];

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const runSandbox = (resp: string) => {
    setApiExecuting(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse(resp);
      setApiExecuting(false);
    }, 1200);
  };

  return (
    <StandardPage title="Documentation" description="Guides, code snippets, and API sandboxes for TaskFlow.">
      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <title>Search Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search articles, SDK guides, smart contracts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl bg-slate-900/60 border border-white/5 pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition shadow-xl"
        />
      </div>

      {/* Articles Stream */}
      <div className="space-y-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">No matching documentation found.</div>
        ) : (
          filteredArticles.map((art) => (
            <Card key={art.title} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  {art.category}
                </span>
              </div>
              
              <div>
                <h4 className="text-base font-bold text-white">{art.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{art.desc}</p>
              </div>

              {/* Code block preview */}
              {art.codeBlock && (
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-4 border border-white/5">
                  <pre className="text-[10px] font-mono text-slate-300 leading-relaxed overflow-x-auto">
                    <code>{art.codeBlock}</code>
                  </pre>
                </div>
              )}

              {/* Sandbox Endpoint */}
              {art.sandbox && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                        {art.sandbox.method}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{art.sandbox.endpoint}</span>
                    </div>
                    <button
                      onClick={() => runSandbox(art.sandbox!.response)}
                      disabled={apiExecuting}
                      className="rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 px-4 py-1.5 text-[10px] font-bold text-white shadow transition"
                    >
                      {apiExecuting ? "Running..." : "Test Endpoint"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {apiResponse && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-2xl bg-slate-950 p-4 border border-white/5 relative"
                      >
                        <button
                          onClick={() => setApiResponse(null)}
                          className="absolute top-2 right-2 text-slate-500 hover:text-slate-300 text-[10px] font-bold"
                        >
                          Clear
                        </button>
                        <pre className="text-[10px] font-mono text-emerald-400 leading-relaxed overflow-x-auto">
                          <code>{apiResponse}</code>
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </StandardPage>
  );
}
