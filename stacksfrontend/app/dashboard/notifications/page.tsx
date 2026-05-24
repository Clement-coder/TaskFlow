"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

type NotifType = "task" | "contract" | "system" | "reward";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "n1", type: "contract", title: "Proof minted on-chain", body: "Task 'Deploy reputation contract' was verified. +70 reputation earned.", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
  { id: "n2", type: "task", title: "Task assigned to you", body: "You were assigned 'Design premium dashboard visuals' in TaskFlow Core.", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
  { id: "n3", type: "reward", title: "Achievement unlocked 🏆", body: "You earned the 'On a Roll' badge for completing 5 tasks!", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), read: false },
  { id: "n4", type: "system", title: "Workspace updated", body: "Token gating was activated for 'TaskFlow Core' workspace.", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), read: true },
  { id: "n5", type: "task", title: "Task deadline approaching", body: "'Enable Hiro Wallet auth flow' is due in 2 days.", timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), read: true },
  { id: "n6", type: "contract", title: "Smart contract deployed", body: "proof-of-work-v1 contract is live on Stacks mainnet.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), read: true },
  { id: "n7", type: "system", title: "New member joined", body: "Mira Vance joined your workspace as Developer.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), read: true },
  { id: "n8", type: "reward", title: "Reputation milestone", body: "You crossed 800 reputation points! You're now Advanced level.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
];

const typeConfig: Record<NotifType, { color: string; bg: string; icon: React.ReactNode }> = {
  contract: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  task: {
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  reward: {
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  system: {
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | NotifType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const filtered =
    filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <div className="space-y-7 pb-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Notifications</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "task", "contract", "reward", "system"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === f
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                : "bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent hover:border-white/10"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-12 text-center">
              <div className="text-5xl mb-4">🔔</div>
              <p className="text-sm font-semibold text-slate-300">No notifications</p>
              <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            filtered.map((notif) => {
              const cfg = typeConfig[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`rounded-xl border p-4 flex items-start gap-4 transition ${
                    notif.read
                      ? "border-white/[0.06] bg-slate-900/40"
                      : "border-white/[0.1] bg-slate-900/70"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${notif.read ? "text-slate-300" : "text-white"}`}>
                        {notif.title}
                        {!notif.read && (
                          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-sky-400 align-middle" />
                        )}
                      </p>
                      <span className="text-[10px] text-slate-600 flex-shrink-0">{formatDate(notif.timestamp)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.body}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markRead(notif.id)}
                        title="Mark as read"
                        className="p-1.5 rounded-lg text-slate-600 hover:text-sky-400 hover:bg-sky-500/10 transition"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => dismiss(notif.id)}
                      title="Dismiss"
                      className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
