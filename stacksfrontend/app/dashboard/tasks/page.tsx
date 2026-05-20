import StandardPage from "@/components/layout/StandardPage";
import { tasks } from "@/data/mock-data";
import { formatDate, priorityBadge } from "@/lib/utils";

export default function TasksPage() {
  return (
    <StandardPage title="Tasks" description="All tasks across your projects." icon="start">
      <div className="grid gap-4">
        {tasks.map((t) => (
          <div key={t.id} className="rounded-2xl bg-slate-900/60 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.project} • assigned to {t.assignee}</p>
              </div>
              <div className="text-sm text-slate-300">Due {formatDate(t.dueDate)}</div>
            </div>
            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${priorityBadge(t.priority)}`}>
              {t.priority.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </StandardPage>
  );
}
