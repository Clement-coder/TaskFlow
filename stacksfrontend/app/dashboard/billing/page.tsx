"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 workspaces", "10 projects", "Basic analytics", "Community support"],
    current: true,
    color: "border-white/[0.07]",
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    period: "per month",
    features: ["Unlimited workspaces", "Unlimited projects", "Advanced analytics", "Priority support", "Token gating", "On-chain reputation"],
    current: false,
    color: "border-sky-500/30",
    badge: "Most Popular",
  },
  {
    id: "team",
    name: "Team",
    price: "$39",
    period: "per month",
    features: ["Everything in Pro", "Up to 25 members", "Custom contracts", "Dedicated support", "SLA guarantee", "Audit logs"],
    current: false,
    color: "border-indigo-500/30",
    badge: "Best Value",
  },
];

const invoices = [
  { id: "INV-001", date: "May 1, 2026", amount: "$0.00", status: "Free", plan: "Free" },
  { id: "INV-002", date: "Apr 1, 2026", amount: "$0.00", status: "Free", plan: "Free" },
  { id: "INV-003", date: "Mar 1, 2026", amount: "$0.00", status: "Free", plan: "Free" },
];

export default function BillingPage() {
  const { walletConnected, walletAddress } = useApp();
  const [selectedPlan, setSelectedPlan] = useState("free");

  return (
    <div className="space-y-7 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your subscription and payment methods</p>
      </div>

      {/* Current plan banner */}
      <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white">You are on the Free plan</p>
            <p className="text-xs text-slate-400 mt-0.5">Upgrade to unlock unlimited workspaces and advanced features</p>
          </div>
        </div>
        <Link
          href="/pricing"
          className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-150 flex-shrink-0"
        >
          Upgrade Now
        </Link>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-base font-bold text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border ${plan.color} bg-slate-900/60 p-5 flex flex-col gap-4 relative hover:bg-slate-900/80 transition duration-200`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-sky-500 text-white px-3 py-1 rounded-full shadow-lg shadow-sky-500/30">
                  {plan.badge}
                </span>
              )}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{plan.name}</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 mb-1">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                    <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                disabled={plan.current}
                className={`w-full flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition ${
                  plan.current || selectedPlan === plan.id
                    ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                    : "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                }`}
              >
                {plan.current ? "Current Plan" : selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Payment Method</h2>
        {walletConnected && walletAddress ? (
          <div className="flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Stacks Wallet Connected</p>
              <p className="text-xs font-mono text-emerald-300 mt-0.5">{walletAddress.slice(0, 12)}…{walletAddress.slice(-6)}</p>
            </div>
            <span className="ml-auto text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-lg">Active</span>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-300">
            Connect your Stacks wallet to enable STX-based payments.
          </div>
        )}
      </div>

      {/* Invoice history */}
      <div className="rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-base font-bold text-white">Invoice History</h2>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition duration-150">
              <div>
                <p className="text-sm font-semibold text-slate-200">{inv.id}</p>
                <p className="text-xs text-slate-500 mt-0.5">{inv.date} · {inv.plan}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white">{inv.amount}</span>
                <span className="text-[10px] font-bold bg-white/5 text-slate-400 px-2 py-0.5 rounded-lg">{inv.status}</span>
                <button className="text-xs text-sky-400 hover:text-sky-300 transition">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
