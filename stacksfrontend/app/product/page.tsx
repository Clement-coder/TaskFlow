import StandardPage from "@/components/layout/StandardPage";
import Link from "next/link";

export default function ProductPage() {
  return (
    <StandardPage title="Product" description="Overview of TaskFlow features and capabilities." icon="product">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="font-semibold">Task Boards</h4>
          <p className="mt-2 text-slate-400">Kanban, lists, and timelines with drag-and-drop and real-time collaboration.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="font-semibold">On-chain Proofs</h4>
          <p className="mt-2 text-slate-400">Store completion proofs and reputation events on Stacks through Clarity contracts.</p>
        </div>
      </div>
    </StandardPage>
  );
}
