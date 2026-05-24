"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import { leaderboard } from "@/data/mock-data";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Tasks Board",
    href: "/dashboard/tasks",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Workspace",
    href: "/dashboard/workspace",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { projects, tasks, activeWorkspace, userProfile } = useApp();

  const activeTasksCount = tasks.filter((t) => t.status !== "done").length;
  const currentUserEntry = leaderboard.find((e) => e.isCurrentUser);
  const userRank = currentUserEntry ? `#${currentUserEntry.rank}` : "—";

  const badges: Record<string, string> = {
    "/dashboard": "Live",
    "/dashboard/projects": String(projects.length),
    "/dashboard/tasks": String(activeTasksCount),
    "/dashboard/workspace": activeWorkspace?.premium ? "Pro" : "Free",
    "/dashboard/leaderboard": userRank,
  };

  return (
    <aside className={cn("hidden xl:flex w-[260px] flex-col gap-5 rounded-2xl border border-white/[0.07] bg-slate-900/60 p-5 shadow-2xl backdrop-blur-xl", className)}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-1 group">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-xl bg-sky-500/20 blur-sm group-hover:bg-sky-500/30 transition" />
          <Image
            src="/Taskflowlogo.png"
            alt="TaskFlow"
            width={36}
            height={36}
            className="relative rounded-xl object-contain"
            priority
          />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold leading-none mb-0.5">TaskFlow</p>
          <p className="text-sm font-bold text-slate-100 leading-none">Decentralized OS</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="space-y-1">
        <p className="px-2 mb-2 text-[10px] uppercase tracking-widest font-bold text-slate-600">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const badge = badges[item.href];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition duration-150 group",
                isActive
                  ? "bg-sky-500/15 text-sky-300 border border-sky-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("transition duration-150", isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-400")}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {badge && (
                <span className={cn(
                  "text-[10px] font-bold rounded-lg px-2 py-0.5",
                  isActive ? "bg-sky-500/20 text-sky-300" : "bg-white/5 text-slate-500"
                )}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-white/[0.06]" />

      {/* Quick links */}
      <nav className="space-y-1">
        <p className="px-2 mb-2 text-[10px] uppercase tracking-widest font-bold text-slate-600">Resources</p>
        {[
          { href: "/docs", label: "Documentation", icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )},
          { href: "/roadmap", label: "Roadmap", icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          )},
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition duration-150"
          >
            <span className="text-slate-600">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User card at bottom */}
      <div className="mt-auto rounded-xl border border-white/[0.07] bg-slate-950/60 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {userProfile.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-200 truncate">{userProfile.name}</p>
          <p className="text-[10px] text-slate-500 truncate">{userProfile.handle}</p>
        </div>
        <div className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg flex-shrink-0">
          {userProfile.reputation}
        </div>
      </div>
    </aside>
  );
}
