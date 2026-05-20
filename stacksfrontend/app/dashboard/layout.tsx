"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useApp } from "@/lib/AppContext";
import { Badge } from "@/components/ui/badge";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden xl:block p-8 pr-0">
        <Sidebar className="h-[calc(100vh-64px)] sticky top-8" />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[300px] bg-slate-900 border-r border-white/10 p-6 transform transition-transform duration-300 xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-extrabold text-white uppercase tracking-wider">TaskFlow Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full bg-white/5 p-2 text-slate-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Sidebar className="flex w-full border-none bg-transparent p-0 shadow-none backdrop-blur-none" />
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Topbar Header */}
        <header className="border-b border-white/5 bg-slate-900/20 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger trigger for mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-2xl bg-white/5 text-slate-300 hover:text-white transition duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Workspace Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-sky-500/30 text-sm font-semibold text-slate-200 transition duration-200"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span>{activeWorkspace?.name || "Select Workspace"}</span>
                <svg
                  className={`w-4 h-4 ml-1 text-slate-400 transition-transform duration-200 ${
                    workspaceDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {workspaceDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setWorkspaceDropdownOpen(false)} />
                  <div className="absolute left-0 mt-2 w-[240px] rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-2">Select Workspace</p>
                    {workspaces.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => {
                          selectWorkspace(w.id);
                          setWorkspaceDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          w.id === activeWorkspaceId
                            ? "bg-sky-500/10 text-sky-400"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{w.name}</span>
                        {w.premium && (
                          <Badge variant="accent" className="text-[9px] px-1 py-0.5 font-extrabold bg-sky-500/20 text-sky-300">
                            Pro
                          </Badge>
                        )}
                      </button>
                    ))}
                    <div className="border-t border-white/5 my-1" />
                    <Link
                      href="/start"
                      onClick={() => setWorkspaceDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-sky-400 hover:bg-sky-500/5 transition w-full"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Create Workspace</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Integration Section */}
            {walletConnected ? (
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="hidden sm:inline">
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}
                </span>
                <span className="bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-md font-extrabold ml-1">
                  {stxBalance} STX
                </span>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="ml-2 text-slate-400 hover:text-rose-400 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white shadow-lg shadow-sky-500/10 transition duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Connect Wallet</span>
              </button>
            )}

            {/* Profile Reputation Counter */}
            <div className="flex items-center gap-3 pl-2 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-200">{userProfile.name}</p>
                <p className="text-[10px] text-sky-400 font-extrabold tracking-wider uppercase">
                  {userProfile.reputation >= 1200
                    ? "Stellar Status"
                    : userProfile.reputation >= 700
                    ? "Advanced"
                    : "Rising Team"}
                </p>
              </div>
              <div className="relative group">
                <div className="w-10 h-10 rounded-full border border-sky-400/20 bg-slate-800 flex items-center justify-center font-black text-xs text-sky-300 shadow-md">
                  {userProfile.reputation}
                </div>
                <div className="absolute right-0 mt-2 w-[160px] bg-slate-900 border border-white/10 rounded-xl p-3 shadow-2xl invisible group-hover:visible z-20 text-[10px] text-slate-400">
                  <p className="font-bold text-slate-200 mb-1">On-Chain Reputation</p>
                  Perform tasks and verify completion to mint more proof scores on Stacks L2!
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body Pane */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
