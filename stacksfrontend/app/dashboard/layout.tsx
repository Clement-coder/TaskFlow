"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useApp } from "@/lib/AppContext";
import { reputationLevel } from "@/lib/utils";
import { CeloConnectButton } from "@/components/wallet/CeloConnectButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    userProfile,
    workspaces,
    activeWorkspaceId,
    selectWorkspace,
    walletConnected,
    walletAddress,
    stxBalance,
    connectWallet,
    disconnectWallet,
    activeWorkspace,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden xl:block p-6 pr-0 flex-shrink-0">
        <Sidebar className="h-[calc(100vh-48px)] sticky top-6" />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 border-r border-white/[0.07] p-5 transform transition-transform duration-300 xl:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-white">TaskFlow</span>
          <button
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="rounded-xl bg-white/5 p-2 text-slate-400 hover:text-white transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Sidebar
          className="flex w-full border-none bg-transparent p-0 shadow-none backdrop-blur-none"
          onNavigate={closeMobile}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#020817]/80 backdrop-blur-xl px-4 lg:px-8 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="xl:hidden p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition flex-shrink-0"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Workspace selector */}
            <div className="relative">
              <button
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-slate-300 hover:text-white transition duration-150"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
                <span className="max-w-[120px] truncate">
                  {activeWorkspace?.name || "Select Workspace"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                    workspaceDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {workspaceDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setWorkspaceDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl z-20">
                    <p className="text-[10px] uppercase font-bold text-slate-600 px-2.5 py-1.5">
                      Workspaces
                    </p>
                    {workspaces.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => {
                          selectWorkspace(w.id);
                          setWorkspaceDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition duration-150 ${
                          w.id === activeWorkspaceId
                            ? "bg-sky-500/10 text-sky-300"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              w.id === activeWorkspaceId
                                ? "bg-sky-400"
                                : "bg-slate-600"
                            }`}
                          />
                          {w.name}
                        </div>
                        {w.premium && (
                          <span className="text-[9px] font-bold bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded-md">
                            Pro
                          </span>
                        )}
                      </button>
                    ))}
                    <div className="border-t border-white/[0.06] my-1" />
                    <Link
                      href="/start"
                      onClick={() => setWorkspaceDropdownOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-sky-400 hover:bg-sky-500/5 transition w-full"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      New workspace
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Celo wallet */}
            <CeloConnectButton />

            {/* Stacks/Hiro wallet — always visible */}
            {walletConnected ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="hidden sm:inline font-mono text-[11px]">
                  {walletAddress
                    ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
                    : ""}
                </span>
                <span className="font-bold text-emerald-300 hidden sm:inline">
                  {stxBalance} STX
                </span>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect wallet"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
            )}

            {/* Profile avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.06]">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-slate-200 leading-none mb-0.5">
                  {userProfile.name}
                </p>
                <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider leading-none">
                  {reputationLevel(userProfile.reputation)}
                </p>
              </div>
              <Link href="/dashboard/profile" title="View your profile" className="relative group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {/* Tooltip */}
                <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-white/10 rounded-xl p-3 shadow-2xl invisible group-hover:visible z-20 text-[10px] text-slate-400 pointer-events-none">
                  <p className="font-bold text-slate-200 mb-1">
                    On-Chain Reputation
                  </p>
                  <p className="text-sky-400 font-bold text-sm">
                    {userProfile.reputation} pts
                  </p>
                  <p className="mt-1">
                    Complete tasks to earn more reputation on Stacks L2.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto min-h-0">
          <div className="max-w-[1400px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
