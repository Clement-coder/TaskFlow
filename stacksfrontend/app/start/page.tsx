import StandardPage from "@/components/layout/StandardPage";
import Link from "next/link";

export default function StartPage() {
  return (
    <StandardPage title="Start a Workspace" description="Create your first workspace to invite members, create projects, and earn reputation." icon="start">
      <div className="rounded-2xl bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold">Create workspace</h3>
        <p className="mt-2 text-slate-400">Set a name, description, and invite members. Later you can configure token gating and membership roles.</p>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-sky-500 px-4 py-2 text-white">Create workspace</button>
          <Link href="/" className="text-slate-300">Cancel</Link>
        </div>
      </div>
    </StandardPage>
  );
}
