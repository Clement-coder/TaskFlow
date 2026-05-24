"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { cn, reputationLevel } from "@/lib/utils";
import { leaderboard } from "@/data/mock-data";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg> },
  { label: "Projects", href: "/dashboard/projects", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Tasks Board", href: "/dashboard/tasks", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
  { label: "Team", href: "/dashboard/team", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Analytics", href: "/dashboard/analytics", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { label: "Workspace", href: "/dashboard/workspace", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Activity", href: "/dashboard/activity", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { label: "Rewards", href: "/dashboard/rewards", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Notifications", href: "/dashboard/notifications", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
];

const accountLinks = [
  { label: "Profile", href: "/dashboard/profile", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  { label: "Settings", href: "/dashboard/settings", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> },
  { label: "Security", href: "/dashboard/security", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { label: "Billing", href: "/dashboard/billing", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
  { label: "Integrations", href: "/dashboard/integrations", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
  { label: "API", href: "/dashboard/api", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
];

const resourceLinks = [
  { href: "/docs", label: "Documentation", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { href: "/roadmap", label: "Roadmap", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
  { href: "/dashboard/changelog", label: "Changelog", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { href: "/dashboard/help", label: "Help & Support", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { href: "/pricing", label: "Upgrade Plan", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
];

export function Sidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { projects, tasks, activeWorkspace, userProfile } = useApp();

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

  const NavLink = ({ item, showBadge = false }: { item: { label: string; href: string; icon: React.ReactNode }; showBadge?: boolean }) => {
    const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
    const badge = showBadge ? badges[item.href] : undefined;
    return (
      <Link href={item.href} onClick={onNavigate}
        className={cn("flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition duration-150 group border",
          isActive ? "bg-sky-500/15 text-sky-300 border-sky-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent")}>
        <div className="flex items-center gap-3">
          <span className={cn("transition duration-150", isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-400")}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
        {badge && (
          <span className={cn("text-[10px] font-bold rounded-lg px-2 py-0.5", isActive ? "bg-sky-500/20 text-sky-300" : "bg-white/5 text-slate-500")}>{badge}</span>
        )}
      </Link>
    );
  };

  return (
    <aside className={cn("hidden xl:flex w-[260px] flex-col gap-2 rounded-2xl border border-white/[0.07] bg-slate-900/60 p-4 shadow-2xl backdrop-blur-xl", className)}>
      {/* Logo */}
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 px-1 py-1 group mb-1">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-xl bg-sky-500/20 blur-sm group-hover:bg-sky-500/30 transition" />
          <Image src="/Taskflowlogo.png" alt="TaskFlow" width={34} height={34} className="relative rounded-xl object-contain" priority />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold leading-none mb-0.5">TaskFlow</p>
          <p className="text-sm font-bold text-slate-100 leading-none">Decentralized OS</p>
        </div>
      </Link>

      <div className="border-t border-white/[0.06]" />

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-none space-y-0.5 pr-0.5 min-h-0">
        <p className="px-2 mb-1.5 mt-1 text-[10px] uppercase tracking-widest font-bold text-slate-600">Workspace</p>
        {navItems.map((item) => <NavLink key={item.href} item={item} showBadge />)}

        <div className="border-t border-white/[0.06] my-2.5" />

        <p className="px-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-600">Account</p>
        {accountLinks.map((item) => <NavLink key={item.href} item={item} />)}
      </nav>

      <div className="border-t border-white/[0.06]" />

      {/* Resources */}
      <nav className="space-y-0.5">
        <p className="px-2 mb-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-600">Resources</p>
        {resourceLinks.map((item) => (
          <Link key={item.href} href={item.href} onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-200 hover:bg-white/5 transition duration-150">
            <span className="text-slate-600">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User card */}
      <div className="rounded-xl border border-white/[0.07] bg-slate-950/60 p-3 flex items-center gap-3 mt-1">
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
    </aside>
  );
}
