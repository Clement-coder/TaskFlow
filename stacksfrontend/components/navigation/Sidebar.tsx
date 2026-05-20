"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { projects, tasks, activeWorkspace } = useApp();

  const activeTasksCount = tasks.filter((t) => t.status !== "done").length;

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      badge: "Live",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      badge: String(projects.length),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: "Tasks Board",
      href: "/dashboard/tasks",
      badge: String(activeTasksCount),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: "Workspace settings",
      href: "/dashboard/workspace",
      badge: activeWorkspace?.premium ? "Pro" : "Free",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className={cn("hidden w-[280px] flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl xl:flex", className)}>
      <div className="space-y-6">
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-2 shadow-lg shadow-sky-500/10 group-hover:scale-105 transition duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400 font-bold">TaskFlow</p>
            <h2 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition duration-200">Decentralized OS</h2>
          </div>
        </Link>

        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-medium transition duration-200",
                  isActive
                    ? "border-sky-400/20 bg-gradient-to-r from-sky-500/15 to-indigo-500/5 text-sky-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_16px_-6px_rgba(14,165,233,0.3)]"
                    : "border-transparent bg-transparent text-slate-400 hover:border-white/5 hover:bg-white/5 hover:text-slate-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("transition duration-200", isActive ? "text-sky-400 animate-pulse" : "text-slate-500")}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                <Badge
                  variant={isActive ? "accent" : "muted"}
                  className={cn(
                    "text-[10px] font-bold rounded-lg px-2 py-0.5",
                    isActive ? "bg-sky-400/20 text-sky-300" : "bg-white/5 text-slate-400"
                  )}
                >
                  {item.badge}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border border-white/5 p-5 shadow-inner">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-400">Premium workspace</p>
        <h3 className="mt-2 text-sm font-bold text-slate-200">Token gated access</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Unlock private boards and advanced Clarify automation gating.
        </p>
      </div>
    </aside>
  );
}
