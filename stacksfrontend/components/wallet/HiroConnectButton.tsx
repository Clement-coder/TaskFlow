"use client";

import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/AppContext";
import { useState } from "react";

export function HiroConnectButton() {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useApp();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      connectWallet();
    } finally {
      setConnecting(false);
    }
  };

  if (walletConnected && walletAddress) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden sm:inline font-mono text-[11px]">
          {walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
        </span>
        <button
          onClick={disconnectWallet}
          title="Disconnect wallet"
          className="ml-1 text-slate-400 hover:text-rose-400 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={connecting} variant="secondary" size="lg" className="w-full md:w-auto">
      {connecting ? "Connecting…" : "Connect Celo Wallet"}
    </Button>
  );
}
