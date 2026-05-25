"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";

const sessions = [
  { id: "s1", device: "Chrome on macOS", location: "Lagos, Nigeria", ip: "102.89.xx.xx", time: "Active now", current: true },
  { id: "s2", device: "Firefox on Windows", location: "Abuja, Nigeria", ip: "197.210.xx.xx", time: "2 hours ago", current: false },
  { id: "s3", device: "Safari on iPhone", location: "Lagos, Nigeria", ip: "102.89.xx.xx", time: "Yesterday", current: false },
];

export default function SecurityPage() {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useApp();
  const [activeSessions, setActiveSessions] = useState(sessions);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);

  const revokeSession = (id: string) => setActiveSessions((prev) => prev.filter((s) => s.current || s.id !== id));

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Security</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account security, sessions, and wallet authentication</p>
      </div>

      {/* Wallet auth */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 space-y-5">
        <h2 className="text-base font-bold text-white tracking-tight">Wallet Authentication</h2>
        <p className="text-sm text-slate-400">Your Celo wallet acts as your primary authentication method on TaskFlow.</p>
        {walletConnected && walletAddress ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-white">Wallet Connected</p>
                  <p className="text-xs font-mono text-emerald-300 mt-0.5 break-all">{walletAddress}</p>
                </div>
              </div>
              <button onClick={disconnectWallet} className="flex-shrink-0 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition">
                Disconnect
              </button>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-200">Signature Verification</p>
                <p className="text-xs text-slate-500 mt-0.5">Verify wallet ownership on every login</p>
              </div>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg">Enabled</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-amber-300">No wallet connected. Connect your Celo wallet to enable Web3 authentication.</p>
            </div>
            <button onClick={connectWallet} className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect Celo Wallet
            </button>
          </div>
        )}
      </div>

      {/* 2FA */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">Two-Factor Authentication</h2>
        <div className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-200">Wallet Signature 2FA</p>
            <p className="text-xs text-slate-500 mt-0.5">Require wallet signature on every login for extra security</p>
          </div>
          <button onClick={() => setTwoFAEnabled(!twoFAEnabled)} disabled={!walletConnected}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${twoFAEnabled ? "bg-sky-500" : "bg-slate-700"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${twoFAEnabled ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
        {!walletConnected && <p className="text-xs text-slate-500">Connect your wallet to enable 2FA.</p>}
      </div>

      {/* Active sessions */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-base font-bold text-white tracking-tight">Active Sessions</h2>
          <button onClick={() => setShowRevokeConfirm(true)} className="text-xs text-rose-400 hover:text-rose-300 transition">
            Revoke all others
          </button>
        </div>
        {showRevokeConfirm && (
          <div className="px-6 py-3 bg-rose-500/5 border-b border-rose-500/20 flex items-center justify-between gap-4">
            <p className="text-xs text-rose-300">This will sign out all other devices. Continue?</p>
            <div className="flex gap-3">
              <button onClick={() => { setActiveSessions([sessions[0]]); setShowRevokeConfirm(false); }} className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition">Confirm</button>
              <button onClick={() => setShowRevokeConfirm(false)} className="text-xs text-slate-500 hover:text-slate-300 transition">Cancel</button>
            </div>
          </div>
        )}
        <div className="divide-y divide-white/[0.04]">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition duration-150">
              <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${session.current ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-200">{session.device}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{session.location} · {session.ip} · {session.time}</p>
                </div>
              </div>
              {session.current ? (
                <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg">Current</span>
              ) : (
                <button onClick={() => revokeSession(session.id)} className="text-xs text-slate-500 hover:text-rose-400 transition px-2 py-1 rounded-lg hover:bg-rose-500/10">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-4">
        <h2 className="text-base font-bold text-rose-400 tracking-tight">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-200">Delete Account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
          </div>
          <button className="flex-shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-400 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
