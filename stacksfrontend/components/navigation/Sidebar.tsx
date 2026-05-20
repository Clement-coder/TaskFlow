import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", badge: "Live" },
  { label: "Projects", href: "/dashboard", badge: "3" },
  { label: "Tasks", href: "/dashboard", badge: "4" },
  { label: "Workspace", href: "/dashboard", badge: "Pro" },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden w-[280px] flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/40 xl:flex", className)}>
      <div className="space-y-3">
        <div className="rounded-3xl bg-slate-900/80 p-4 shadow-inner shadow-slate-950/20 flex items-center gap-3">
          <Image src="/Taskflowlogo.png" alt="TaskFlow" width={48} height={48} className="rounded-md" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">TaskFlow</p>
            <h2 className="text-2xl font-semibold text-slate-100">Flow control</h2>
          </div>
        </div>
        <div className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-400/20 hover:bg-slate-900"
            >
              <span>{item.label}</span>
              <Badge variant="muted">{item.badge}</Badge>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-5 shadow-inner shadow-slate-950/20">
        <p className="text-sm text-slate-400">Premium workspace</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-100">Token gated access</h3>
        <p className="mt-2 text-sm text-slate-500">Unlock private boards and member-only automation.</p>
      </div>
    </aside>
  );
}
