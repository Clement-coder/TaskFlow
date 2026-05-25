"use client";

import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/lib/AppContext";
import { formatDate } from "@/lib/utils";

export function AnalyticsOverview() {
  const { tasks, projects, userProfile } = useApp();
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const activeProjects = projects.filter((project) => project.status === "active").length;
  const recentTasks = tasks.slice(0, 3);

  return (
    <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Team productivity</CardTitle>
          <CardDescription>Live insights from current projects and task velocity.</CardDescription>
        </CardHeader>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[30px] bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Reputation score</p>
            <p className="mt-4 text-5xl font-semibold text-white">{userProfile.reputation}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Progress toward Stellar status on Celo.</p>
          </div>
          <div className="rounded-[30px] bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Completed tasks</p>
            <p className="mt-4 text-5xl font-semibold text-white">{completedTasks}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Tasks verified on-chain this sprint across {activeProjects} active projects.</p>
          </div>
        </div>
      </Card>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="rounded-[30px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{project.status}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
              </div>
              <p className="text-2xl font-semibold text-sky-300">{project.progress}%</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 items-center justify-between text-slate-500">
              <span className="text-xs uppercase tracking-[0.18em]">Due {formatDate(project.dueDate)}</span>
              <span className="text-xs text-slate-400">{project.labels.join(" • ")}</span>
            </div>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}