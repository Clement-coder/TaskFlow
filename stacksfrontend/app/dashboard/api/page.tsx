"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";

const endpoints = [
  { method: "GET", path: "/api/v1/tasks", desc: "List all tasks in the active workspace", auth: true },
  { method: "POST", path: "/api/v1/tasks", desc: "Create a new task", auth: true },
  { method: "PATCH", path: "/api/v1/tasks/:id", desc: "Update task status or title", auth: true },
  { method: "DELETE", path: "/api/v1/tasks/:id", desc: "Delete a task by ID", auth: true },
  { method: "GET", path: "/api/v1/projects", desc: "List all projects", auth: true },
  { method: "POST", path: "/api/v1/projects", desc: "Create a new project", auth: true },
  { method: "GET", path: "/api/v1/profile", desc: "Get current user profile and reputation", auth: true },
  { method: "GET", path: "/api/v1/leaderboard", desc: "Get global leaderboard rankings", auth: false },
  { method: "POST", path: "/api/v1/reputation/mint", desc: "Mint reputation proof on Celo", auth: true },
  { method: "GET", path: "/api/v1/workspace", desc: "Get active workspace details", auth: true },
];

const methodColor: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-300",
  POST: "bg-sky-500/15 text-sky-300",
  PATCH: "bg-amber-500/15 text-amber-300",
  DELETE: "bg-rose-500/15 text-rose-400",
};

export default function ApiPage() {
  const { walletConnected } = useApp();
  const [apiKey, setApiKey] = useState("tf_live_••••••••••••••••••••••••••••••••");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"endpoints" | "keys" | "docs">("endpoints");

  const fakeKey = "tf_live_sk_a9f3c2e1b8d74f6a0e5c9b2d1f8a3e7c";

  const handleReveal = () => setRevealed(!revealed);

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setApiKey("tf_live_••••••••••••••••••••••••••••••••");
    setRevealed(false);
  };

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">API</h1>
        <p className="text-sm text-slate-400 mt-1">Manage API keys and explore available endpoints</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-slate-900/60 p-1.5 w-fit">
        {(["endpoints", "keys", "docs"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition ${activeTab === tab ? "bg-sky-500/15 text-sky-300 border border-sky-500/20" : "text-slate-400 hover:text-slate-200"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "endpoints" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-300">Base URL: <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">https://api.taskflow.xyz</code> — All authenticated endpoints require <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">Authorization: Bearer &lt;api_key&gt;</code></p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden shadow-md">
            <div className="hidden sm:grid grid-cols-[80px_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-white/[0.06] text-[10px] uppercase tracking-[0.12em] font-bold text-slate-500">
              <span>Method</span><span>Endpoint</span><span>Description</span><span className="text-center">Auth</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {endpoints.map((ep) => (
                <div key={ep.path} className="flex flex-col sm:grid sm:grid-cols-[80px_1fr_1fr_80px] gap-2 sm:gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition duration-150">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md w-fit ${methodColor[ep.method]}`}>{ep.method}</span>
                  <code className="text-xs font-mono text-slate-300">{ep.path}</code>
                  <p className="text-xs text-slate-500">{ep.desc}</p>
                  <div className="sm:text-center">
                    {ep.auth ? (
                      <span className="text-[10px] font-bold bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-md">Required</span>
                    ) : (
                      <span className="text-[10px] font-bold bg-slate-700/50 text-slate-500 px-2 py-0.5 rounded-md">Public</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "keys" && (
        <div className="space-y-6">
          {!walletConnected && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-300">
              Connect your Celo wallet to generate and manage API keys.
            </div>
          )}
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white tracking-tight">Live API Key</h2>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg">Active</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3">
              <code className="flex-1 text-xs font-mono text-slate-300 truncate">
                {revealed ? fakeKey : apiKey}
              </code>
              <button onClick={handleReveal} className="text-slate-500 hover:text-slate-300 transition text-xs font-semibold flex-shrink-0">
                {revealed ? "Hide" : "Reveal"}
              </button>
              <button onClick={handleCopy} className={`text-xs font-semibold flex-shrink-0 transition ${copied ? "text-emerald-400" : "text-sky-400 hover:text-sky-300"}`}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={handleRegenerate} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition duration-150">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                </svg>
                Regenerate Key
              </button>
            </div>
            <p className="text-xs text-slate-600">Keep your API key secret. Never expose it in client-side code or public repositories.</p>
          </div>
        </div>
      )}

      {activeTab === "docs" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-base font-bold text-white tracking-tight">Quick Start</h2>
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Make your first API request:</p>
              <div className="rounded-xl bg-slate-950 border border-white/[0.06] p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-slate-300 whitespace-pre">{`curl -X GET https://api.taskflow.xyz/api/v1/tasks \\
  -H "Authorization: Bearer tf_live_sk_..." \\
  -H "Content-Type: application/json"`}</pre>
              </div>
              <p className="text-sm text-slate-400">Example response:</p>
              <div className="rounded-xl bg-slate-950 border border-white/[0.06] p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-slate-300 whitespace-pre">{`{
  "tasks": [
    {
      "id": "task_abc123",
      "title": "Deploy reputation contract",
      "status": "done",
      "priority": "high",
      "project": "TaskFlow Core",
      "onChainProof": "0x9f3c2e1b..."
    }
  ],
  "total": 1
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
