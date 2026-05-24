"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkspacePage() {
  const {
    activeWorkspace,
    walletConnected,
    addActivityLog,
    workspaces,
    toggleWorkspacePremium,
    activeWorkspaceId,
  } = useApp();

  const [members, setMembers] = useState([
    { name: "Avery Quinn", role: "Owner", avatar: "AQ" },
    { name: "Mira Vance", role: "Developer", avatar: "MV" },
    { name: "Noah Brooks", role: "Contributor", avatar: "NB" },
  ]);
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Contributor");
  const [showInviteToast, setShowInviteToast] = useState(false);
  const [tokenGated, setTokenGated] = useState(activeWorkspace?.premium || false);
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;

    setMembers([...members, { name: inviteName, role: inviteRole, avatar: inviteName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) }]);
    addActivityLog(`Invited simulated member '${inviteName}' as '${inviteRole}' to workspace`, "system");
    setInviteName("");
    setShowInviteToast(true);
    setTimeout(() => setShowInviteToast(false), 3000);
  };

  const handleToggleGate = () => {
    if (!walletConnected) return;
    const nextState = !tokenGated;
    setTokenGated(nextState);
    if (activeWorkspaceId) toggleWorkspacePremium(activeWorkspaceId);
    addActivityLog(
      `Clarity gating contract state ${nextState ? "ACTIVATED" : "DEACTIVATED"} for workspace '${activeWorkspace?.name}'`,
      "contract"
    );
  };

  if (!activeWorkspace) {
    return <div className="text-center py-12 text-slate-400">Please select or initialize a workspace.</div>;
  }

  return (
    <div className="space-y-7 relative pb-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {showInviteToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-8 z-50 rounded-2xl bg-slate-900 border border-emerald-500/30 p-4 shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <title>Success Check Icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Invite Dispatched!</p>
              <p className="text-[10px] text-slate-400">Simulated member successfully registered.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Workspace Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Configure member privileges, Clarity smart contracts, and Web3 gating.</p>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {/* Gating Card */}
          <Card className="p-5 sm:p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg tracking-tight">Clarity Token-Gating</CardTitle>
                <Badge variant={tokenGated ? "accent" : "muted"} className="text-[8px] font-black">
                  {tokenGated ? "Gated Active" : "Gating Disabled"}
                </Badge>
              </div>
              <CardDescription>
                Restrict workspace access and sprint updates to users holding a designated STX token threshold.
              </CardDescription>
            </CardHeader>

            <div className="space-y-4">
              {!walletConnected ? (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex gap-3 items-start">
                  <div className="rounded-full bg-amber-500/10 p-2 text-amber-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <title>Warning Alert Icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Wallet connection required</p>
                    <p className="text-[10px] text-slate-400">
                      You must connect your Stacks wallet in the top header to configure token-gating permissions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Clarity Smart Gating (STX balance &gt; 100)</p>
                    <p className="text-[10px] text-slate-500">
                      Require users to verify a signature proving they hold at least 100 STX on-chain.
                    </p>
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <button
                    onClick={handleToggleGate}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      tokenGated ? "bg-sky-500" : "bg-slate-800"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        tokenGated ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* Smart Contract Parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Clarity smart contracts</CardTitle>
              <CardDescription>On-chain parameters tracking proof-of-work minting nodes.</CardDescription>
            </CardHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4 space-y-1">
                <p className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Reputation Contract</p>
                <p className="text-xs font-mono text-sky-400 truncate">ST2J...proof-of-work-v1</p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4 space-y-1">
                <p className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Estimated Tx Cost</p>
                <p className="text-xs font-semibold text-slate-300">0.00018 STX (~$0.0004)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Member Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg tracking-tight">Workspace Members</CardTitle>
              <CardDescription>Invite and configure team members roles.</CardDescription>
            </CardHeader>
            
            <div className="space-y-3.5">
              {members.map((member) => (
                <div key={member.name} className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-bold text-xs text-sky-300">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{member.name}</p>
                      <p className="text-[9px] text-slate-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <Badge variant="muted" className="text-[8px] font-black">
                    Active
                  </Badge>
                </div>
              ))}
            </div>

            {/* Invite Form */}
            <form onSubmit={handleInvite} className="mt-6 pt-4 border-t border-white/5 space-y-3">
              <p className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Invite new member</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter full name..."
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 transition"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="rounded-xl bg-slate-950 border border-white/10 px-2 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                >
                  <option value="Contributor">Contributor</option>
                  <option value="Developer">Developer</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 py-2.5 text-xs font-bold text-white shadow-lg transition duration-150"
              >
                Send Workspace Invite
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
