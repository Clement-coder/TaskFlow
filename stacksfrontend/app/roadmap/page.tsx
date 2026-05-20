import StandardPage from "@/components/layout/StandardPage";
import Link from "next/link";

export default function RoadmapPage() {
  return (
    <StandardPage title="Product Roadmap" description="Planned features, milestones, and public roadmap for TaskFlow." icon="roadmap">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="font-semibold">Q2 2026</h4>
          <p className="mt-2 text-slate-400">On-chain reputation, task-proof contracts, and Hiro Wallet integration.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/60 p-6">
          <h4 className="font-semibold">Q3 2026</h4>
          <p className="mt-2 text-slate-400">AI task summarizer, NFT achievement minting, and token-gated workspaces.</p>
        </div>
      </div>
    </StandardPage>
  );
}
