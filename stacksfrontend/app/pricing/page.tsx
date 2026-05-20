"use client";

import React, { useState } from "react";
import StandardPage from "@/components/layout/StandardPage";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const plans = [
    {
      name: "Starter",
      desc: "Free for individual developers exploring Web3 tooling.",
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "Standard task sprint boards",
        "Basic Stacks wallet connect integration",
        "Single workspace setup",
        "Local performance tracking",
      ],
      cta: "Explore Starter",
      highlight: false,
    },
    {
      name: "Pro",
      desc: "Ideal for teams establishing professional on-chain reputation.",
      priceMonthly: 29,
      priceYearly: 19,
      features: [
        "Advanced Kanban status dashboards",
        "Simulated Clarity contract task gating",
        "Dynamic reputation scores and status tiers",
        "Interactive analytics and smart audit logging",
        "Unlimited simulated workspaces",
      ],
      cta: "Scale Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      desc: "For decentralized organizations requiring advanced governance.",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      features: [
        "Dedicated multisig smart contract gates",
        "SSO, SAML & custom workspace integrations",
        "Priority deployment validation queue",
        "24/7 technical block monitoring SLA",
      ],
      cta: "Contact Enterprise",
      highlight: false,
    },
  ];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail.trim()) return;

    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setShowCheckoutModal(false);
      setSelectedPlan(null);
      setCheckoutEmail("");
    }, 2500);
  };

  return (
    <StandardPage title="Pricing" description="Choose a plan tailored for your team's project sprints." icon="pricing">
      {/* Monthly / Yearly Toggle */}
      <div className="flex justify-center mb-12">
        <div className="relative rounded-2xl bg-slate-900 border border-white/5 p-1 flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition duration-200 ${
              billingCycle === "monthly" ? "bg-sky-500 text-white shadow" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition duration-200 ${
              billingCycle === "yearly" ? "bg-sky-500 text-white shadow" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Yearly Billing (Save 33%)
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isCustom = typeof plan.priceMonthly === "string";
          const displayPrice =
            billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

          return (
            <div
              key={plan.name}
              className={`rounded-3xl border flex flex-col justify-between p-6 shadow-xl relative overflow-hidden backdrop-blur-xl transition duration-300 ${
                plan.highlight
                  ? "border-sky-500/20 bg-slate-900/80 shadow-sky-500/5 hover:border-sky-500/40"
                  : "border-white/5 bg-slate-900/40 hover:border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gradient-to-br from-sky-400 to-indigo-600 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black text-white uppercase tracking-wider shadow">
                  Popular
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">{plan.name}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {isCustom ? displayPrice : `$${displayPrice}`}
                  </span>
                  {!isCustom && (
                    <span className="text-xs text-slate-500 font-bold">/ month</span>
                  )}
                </div>

                <div className="border-t border-white/5 my-4" />

                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-2 text-xs text-slate-300 items-start">
                      <svg className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <title>Checkmark Icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    setShowCheckoutModal(true);
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition shadow ${
                    plan.highlight
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/10"
                      : "bg-white/5 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutModal(false)}
              className="fixed inset-0 z-45 bg-slate-950/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Subscribe to {selectedPlan}</h3>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    aria-label="Close checkout modal"
                    className="rounded-full bg-white/5 p-1.5 text-slate-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <title>Close Modal Icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {checkoutSuccess ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <title>Checkout Success Icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Subscription Active!</h4>
                      <p className="text-xs text-slate-500 mt-1">Simulating block confirmation...</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      You have selected the <strong className="text-white">{selectedPlan}</strong> plan (billed {billingCycle}). Enter your email below to start simulated setup.
                    </p>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="w-full rounded-2xl bg-slate-950 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-sky-500 hover:bg-sky-400 py-3 text-xs font-bold text-white shadow-lg transition"
                    >
                      Confirm Subscription
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </StandardPage>
  );
}
