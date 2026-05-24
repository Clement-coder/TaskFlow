"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Owner", "Admin", "Developer", "Contributor", "Viewer"];

const initialMembers = [
  { id: "1", name: "Avery Quinn", handle: "@avery", role: "Owner", avatar: "AQ", status: "online", joined: "Jan 2026", tasks: 24, reputation: 1450 },
  { id: "2", name: "Mira Vance", handle: "@mira", role: "Developer", avatar: "MV", status: "online", joined: "Feb 2026", tasks: 18, reputation: 980 },
  { id: "3", name: "Noah Brooks", handle: "@noah", role: "Contributor", avatar: "NB", status: "away", joined: "Mar 2026", tasks: 11, reputation: 620 },
  { id: "4", name: "Cleo Park", handle: "@cleo", role: "Developer", avatar: "CP", status: "offline", joined: "Mar 2026", tasks: 9, reputation: 540 },
  { id: "5", name: "Eli Torres", handle: "@eli", role: "Viewer", avatar: "ET", status: "online", joined: "Apr 2026", tasks: 3, reputation: 120 },
];

const statusColor: Record<string, string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-slate-600",
};

export default function TeamPage() {
  const { addActivityLog } = useApp();
  const [members, setMembers] = useState(initialMembers);
  const [inviteName, setInviteName] = useState("");
  const [inviteHandle, setInviteHandle] = useState("");
  const [inviteRole, setInviteRole] = useState("Contributor");
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.handle.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;
    const newMember = {
      id: String(Date.now()),
      name: inviteName,
      handle: inviteHandle || `@${inviteName.split(" ")[0].toLowerCase()}`,
      role: inviteRole,
      avatar: inviteName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      status: "offline",
      joined: "May 2026",
      tasks: 0,
      reputation: 0,
    };
    setMembers([...members, newMember]);
    addActivityLog(`Invited ${inviteName} as ${inviteRole}`, "system");
    setInviteName("");
    setInviteHandle("");
    setShowForm(false);
    setToast(`${inviteName} invited successfully!`);
    setTimeout(() => setToast(""), 3000);
  };

  const handleRemove = (id: string, name: string) => {
    setMembers(members.filter((m) => m.id !== id));
    addActivityLog(`Removed ${name} from team`, "system");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 right-6 z-50 rounded-2xl bg-slate-900 border border-emerald-500/30 px-5 py-3 shadow-2xl text-sm font-semibold text-emerald-300 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage members, roles, and permissions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: members.length, color: "text-sky-400" },
          { label: "Online Now", value: members.filter((m) => m.status === "online").length, color: "text-emerald-400" },
          { label: "Developers", value: members.filter((m) => m.role === "Developer").length, color: "text-purple-400" },
          { label: "Avg Reputation", value: Math.round(members.reduce((a, m) => a + m.reputation, 0) / members.length), color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Invite form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleInvite}
              className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 space-y-4"
            >
              <h3 className="text-sm font-bold text-white">Invite a new member</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  required
                  type="text"
                  placeholder="Full name *"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="rounded-xl bg-slate-950/60 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition"
                />
                <input
                  type="text"
                  placeholder="Handle (optional)"
                  value={inviteHandle}
                  onChange={(e) => setInviteHandle(e.target.value)}
                  className="rounded-xl bg-slate-950/60 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="rounded-xl bg-slate-950/60 border border-white/10 px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-sky-500/50 transition"
                >
                  {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 py-2.5 text-sm font-semibold text-white transition"
                >
                  Send Invite
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-900/60 border border-white/[0.07] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/40 transition"
        />
      </div>

      {/* Members table */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.06] text-[10px] uppercase tracking-widest font-bold text-slate-600">
          <span>Member</span>
          <span className="text-center">Role</span>
          <span className="text-center">Tasks</span>
          <span className="text-center">Reputation</span>
          <span className="text-center">Actions</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.map((member) => (
            <div key={member.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 px-5 py-4 items-start sm:items-center hover:bg-white/[0.02] transition">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {member.avatar}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${statusColor[member.status]}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.handle} · Joined {member.joined}</p>
                </div>
              </div>
              <div className="sm:text-center">
                <Badge variant={member.role === "Owner" ? "accent" : "muted"} className="text-[10px]">
                  {member.role}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-slate-300 sm:text-center">{member.tasks}</p>
              <p className="text-sm font-semibold text-sky-400 sm:text-center">{member.reputation}</p>
              <div className="sm:text-center">
                {member.role !== "Owner" && (
                  <button
                    onClick={() => handleRemove(member.id, member.name)}
                    className="text-xs text-slate-500 hover:text-rose-400 transition px-2 py-1 rounded-lg hover:bg-rose-500/10"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
