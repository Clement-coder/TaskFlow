"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";

const sections = [
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
];

export default function SettingsPage() {
  const { userProfile, walletConnected, walletAddress, connectWallet, disconnectWallet } = useApp();
  const [activeSection, setActiveSection] = useState("account");
  const [displayName, setDisplayName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle || "@user");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account preferences and configurations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
        {/* Sidebar nav */}
        <nav className="lg:w-52 flex-shrink-0">
          <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeSection === s.id
                    ? "bg-sky-500/15 text-sky-300 border border-sky-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 sm:p-6 space-y-6">
          {activeSection === "account" && (
            <>
              <h2 className="text-base font-bold text-white">Account Settings</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Display Name</label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Handle</label>
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Role</label>
                  <div className="w-full rounded-xl bg-slate-950/60 border border-white/[0.08] px-4 py-3 text-sm text-slate-400 capitalize">
                    {userProfile.role}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "appearance" && (
            <>
              <h2 className="text-base font-bold text-white">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-3">Theme</p>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {["dark", "darker", "midnight"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`rounded-xl border p-4 text-center transition ${
                          theme === t
                            ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
                            : "border-white/[0.07] bg-slate-950/40 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg mx-auto mb-2 ${
                          t === "dark" ? "bg-slate-800" : t === "darker" ? "bg-slate-950" : "bg-black"
                        }`} />
                        <p className="text-xs font-semibold capitalize">{t}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Compact Mode</p>
                    <p className="text-xs text-slate-500 mt-0.5">Reduce spacing for denser layouts</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 cursor-not-allowed opacity-50">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "notifications" && (
            <>
              <h2 className="text-base font-bold text-white">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", value: emailNotifs, set: setEmailNotifs },
                  { label: "Push Notifications", desc: "Browser push alerts", value: pushNotifs, set: setPushNotifs },
                  { label: "Task Reminders", desc: "Reminders for due tasks", value: taskReminders, set: setTaskReminders },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 flex-shrink-0 ${
                        item.value ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${item.value ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "security" && (
            <>
              <h2 className="text-base font-bold text-white">Security</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">Stacks Wallet</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {walletConnected && walletAddress
                          ? `${walletAddress.slice(0, 10)}…${walletAddress.slice(-6)}`
                          : "No wallet connected"}
                      </p>
                    </div>
                    {walletConnected ? (
                      <button
                        onClick={disconnectWallet}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={connectWallet}
                        className="rounded-xl bg-sky-500 hover:bg-sky-400 px-3 py-1.5 text-xs font-semibold text-white transition"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-300">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500 mt-1">2FA via wallet signature — coming soon in v2.0</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "integrations" && (
            <>
              <h2 className="text-base font-bold text-white">Integrations</h2>
              <div className="space-y-3">
                {[
                  { name: "GitHub", desc: "Link commits to tasks automatically", status: "available" },
                  { name: "Hiro Wallet", desc: "Stacks L2 wallet integration", status: "connected" },
                  { name: "Celo Network", desc: "EVM-compatible wallet support", status: "available" },
                  { name: "Supabase", desc: "Real-time database sync", status: "coming-soon" },
                  { name: "Slack", desc: "Task notifications in Slack", status: "coming-soon" },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      item.status === "connected"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : item.status === "available"
                        ? "bg-sky-500/15 text-sky-300"
                        : "bg-slate-700/50 text-slate-500"
                    }`}>
                      {item.status === "connected" ? "Connected" : item.status === "available" ? "Connect" : "Soon"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Save button */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                saved
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                  : "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
              }`}
            >
              {saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
