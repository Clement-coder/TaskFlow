import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "muted" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-slate-800 text-slate-200",
    success: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20",
    warning: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20",
    muted: "bg-white/5 text-slate-400",
    accent: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20",
  };

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]", variantClasses[variant], className)} {...props} />
  );
}
