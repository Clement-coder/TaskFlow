"use client";

import { Sidebar } from "@/components/navigation/Sidebar";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { HiroConnectButton } from "@/components/wallet/HiroConnectButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-8 grid grid-cols-[280px_1fr] gap-8">
        <Sidebar />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-400">Avery Quinn</div>
              <HiroConnectButton />
            </div>
          </div>

          <AnalyticsOverview />
        </div>
      </div>
    </div>
  );
}
