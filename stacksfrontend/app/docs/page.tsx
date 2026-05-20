import StandardPage from "@/components/layout/StandardPage";
import Link from "next/link";

export default function DocsPage() {
  return (
    <StandardPage title="Documentation" description="Developer docs, API references, and guides for TaskFlow." icon="docs">
      <div className="rounded-2xl bg-slate-900/60 p-6">
        <h4 className="font-semibold">Getting started</h4>
        <p className="mt-2 text-slate-400">Learn how to authenticate with Hiro Wallet, create workspaces, and publish task proofs.</p>
      </div>
      <div className="rounded-2xl bg-slate-900/60 p-6">
        <h4 className="font-semibold">API reference</h4>
        <p className="mt-2 text-slate-400">REST and Edge functions to integrate TaskFlow into your tooling.</p>
      </div>
    </StandardPage>
  );
}
