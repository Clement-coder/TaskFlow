import StandardPage from "@/components/layout/StandardPage";
import { projects } from "@/data/mock-data";

export default function ProjectsPage() {
  return (
    <StandardPage title="Projects" description="All projects in your workspace." icon="product">
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-2xl bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="text-sm text-slate-300">{p.progress}%</div>
            </div>
            <p className="mt-2 text-slate-400">{p.description}</p>
          </div>
        ))}
      </div>
    </StandardPage>
  );
}
