"use client";

import { CeloWalletClient } from "celo-wallet-connect-sdk";
import { useEffect, useRef, useState } from "react";
import type { WalletState } from "celo-wallet-connect-sdk";

// Singleton client — shared across the component tree
const celoClient = new CeloWalletClient({ defaultChainId: 42220, autoConnect: true });

export function CeloConnectButton() {
  const [state, setState] = useState<WalletState>(celoClient.getState());
  const [balanceStr, setBalanceStr] = useState<string | null>(null);

  useEffect(() => {
    return celoClient.subscribe((s) => {
      setState(s);
      if (s.status === "connected") {
        celoClient.getBalance().then((b) => setBalanceStr(`${parseFloat(b.formatted).toFixed(2)} ${b.symbol}`)).catch(() => null);
      } else {
        setBalanceStr(null);
      }
    });
  }, []);

  if (state.status === "connected" && state.address) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden sm:inline font-mono text-[11px]">
          {state.address.slice(0, 6)}…{state.address.slice(-4)}
        </span>
        {balanceStr && <span className="font-bold">{balanceStr}</span>}
        <button
          onClick={() => celoClient.disconnectWallet()}
          title="Disconnect Celo"
          className="ml-1 text-slate-500 hover:text-rose-400 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => celoClient.connectWallet("metamask")}
      disabled={state.status === "connecting"}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition duration-150 disabled:opacity-50"
    >
      <svg className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
      <span className="hidden sm:inline">{state.status === "connecting" ? "Connecting…" : "Connect Celo"}</span>
    </button>
  );
}
