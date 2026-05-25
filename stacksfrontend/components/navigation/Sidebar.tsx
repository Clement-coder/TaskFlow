"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { cn, reputationLevel } from "@/lib/utils";
import { leaderboard } from "@/data/mock-data";

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg className={cn("w-3.5 h-3.5 transition-transform duration-200", open ? "rotate-180" : "")}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const workspaceItems = [
  { label: "Overview", href: "/dashboard", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg> },
  { label: "Projects", href: "/dashboard/projects", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Tasks", href: "/dashboard/tasks", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
  { label: "Team", href: "/dashboard/team", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { label: "Workspace", href: "/dashboard/workspace", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

const insightsItems = [
  { label: "Analytics", href: "/dashboard/analytics", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Activity", href: "/dashboard/activity", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { label: "Rewards", href: "/dashboard/rewards", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Notifications", href: "/dashboard/notifications", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
];

const accountItems = [
  { label: "Profile", href: "/dashboard/profile", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  { label: "Settings", href: "/dashboard/settings", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> },
  { label: "Security", href: "/dashboard/security", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { label: "Billing", href: "/dashboard/billing", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
  { label: "Integrations", href: "/dashboard/integrations", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
  { label: "API", href: "/dashboard/api", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
];

const resourceItems = [
  { href: "/docs", label: "Docs" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/dashboard/changelog", label: "Changelog" },
  { href: "/dashboard/help", label: "Help & Support" },
  { href: "/pricing", label: "Upgrade Plan" },
];

function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className="w-full flex items-center justify-between px-2 py-1 group rounded-lg hover:bg-white/[0.03] transition duration-150">
      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500 group-hover:text-slate-400 transition">{label}</span>
      <span className="text-slate-600 group-hover:text-slate-500 transition"><ChevronIcon open={open} /></span>
    </button>
  );
}

export function Sidebar({ className, onNavigate, mobile = false }: { className?: string; onNavigate?: () => void; mobile?: boolean }) {
  const pathname = usePathname();
  const { projects, tasks, activeWorkspace, userProfile } = useApp();

  const [openSections, setOpenSections] = useState({ workspace: true, insights: true, account: false, resources: false });
  const toggle = (s: keyof typeof openSections) => setOpenSections(p => ({ ...p, [s]: !p[s] }));

  const activeTasksCount = tasks.filter((t) => t.status !== "done").length;
  const currentUserEntry = leaderboard.find((e) => e.isCurrentUser);
  const userRank = currentUserEntry ? `#${currentUserEntry.rank}` : "—";

  const badges: Record<string, string> = {
    "/dashboard": "Live",
    "/dashboard/projects": String(projects.length),
    "/dashboard/tasks": String(activeTasksCount),
    "/dashboard/leaderboard": userRank,
    "/dashboard/workspace": activeWorkspace?.premium ? "Pro" : "Free",
    "/dashboard/analytics": "New",
    "/dashboard/notifications": "3",
    "/dashboard/rewards": "🏆",
    "/dashboard/activity": "Live",
  };

  const NavLink = ({ item, badge }: { item: { label: string; href: string; icon: React.ReactNode }; badge?: string }) => {
    const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
    return (
      <Link href={item.href} onClick={onNavigate}
        className={cn("flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition duration-150 group border",
          isActive ? "bg-sky-500/15 text-sky-300 border-sky-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent")}>
        <div className="flex items-center gap-3">
          <span className={cn("transition duration-150 flex-shrink-0", isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-400")}>{item.icon}</span>
          <span className="truncate">{item.label}</span>
        </div>
        {badge && (
          <span className={cn("text-[10px] font-bold rounded-lg px-1.5 py-0.5 flex-shrink-0 ml-1", isActive ? "bg-sky-500/20 text-sky-300" : "bg-white/5 text-slate-500")}>{badge}</span>
        )}
      </Link>
    );
  };

  const Section = ({ id, label, items, showBadges = false }: {
    id: keyof typeof openSections; label: string;
    items: { label: string; href: string; icon: React.ReactNode }[];
    showBadges?: boolean;
  }) => (
    <div>
      <SectionHeader label={label} open={openSections[id]} onToggle={() => toggle(id)} />
      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openSections[id] ? "max-h-[500px] opacity-100 mt-0.5" : "max-h-0 opacity-0")}>
        <div className="space-y-0.5 pb-1">
          {items.map((item) => (
            <NavLink key={item.href} item={item} badge={showBadges ? badges[item.href] : undefined} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <aside className={cn(mobile ? "flex w-full flex-col h-full" : "hidden xl:flex w-[260px] flex-col", "rounded-2xl border border-white/[0.07] bg-slate-900/60 shadow-2xl backdrop-blur-xl overflow-hidden", className)}>
      {/* Logo — fixed top */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 group">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-xl bg-sky-500/20 blur-sm group-hover:bg-sky-500/30 transition" />
            <Image src="/Taskflowlogo.png" alt="TaskFlow" width={34} height={34} className="relative rounded-xl object-contain" priority />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold leading-none mb-0.5">TaskFlow</p>
            <p className="text-sm font-bold text-slate-100 leading-none">Decentralized OS</p>
          </div>
        </Link>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-3 space-y-1 min-h-0">
        <Section id="workspace" label="Workspace" items={workspaceItems} showBadges />
        <div className="h-px bg-white/[0.05] my-1" />
        <Section id="insights" label="Insights" items={insightsItems} showBadges />
        <div className="h-px bg-white/[0.05] my-1" />
        <Section id="account" label="Account" items={accountItems} />
        <div className="h-px bg-white/[0.05] my-1" />

        {/* Resources — simple collapsible */}
        <div>
          <SectionHeader label="Resources" open={openSections.resources} onToggle={() => toggle("resources")} />
          <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openSections.resources ? "max-h-64 opacity-100 mt-0.5" : "max-h-0 opacity-0")}>
            <div className="space-y-0.5 pb-1">
              {resourceItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={onNavigate}
                  className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-200 hover:bg-white/5 transition duration-150">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User card — fixed bottom */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-white/[0.06]">
        <div className="rounded-xl border border-white/[0.07] bg-slate-950/60 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ring-2 ring-sky-500/20">
            {userProfile.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{userProfile.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{reputationLevel(userProfile.reputation)} · {userProfile.reputation} pts</p>
          </div>
          <Link href="/dashboard/profile" onClick={onNavigate} title="View profile"
            className="text-slate-600 hover:text-sky-400 transition flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
