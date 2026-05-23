import hre from "hardhat";

const ADDRESS = process.env.TASK_REGISTRY_ADDRESS;

const SEED_TASKS = [
  { title: "Draft on-chain task proof contract", project: "Reputation engine",  priority: 2 },
  { title: "Design premium dashboard visuals",   project: "TaskFlow Core",      priority: 1 },
  { title: "Enable wallet auth flow",            project: "TaskFlow Core",      priority: 2 },
  { title: "Publish milestones to Supabase",     project: "Growth Ops",         priority: 0 },
  { title: "Deploy WorkspaceGate to mainnet",    project: "Stacks DAO launch",  priority: 2 },
  { title: "Integrate cowcare-sdk",              project: "TaskFlow Core",      priority: 1 },
  { title: "Write Clarity proof-of-work tests",  project: "Reputation engine",  priority: 1 },
];

async function main() {
  if (!ADDRESS) throw new Error("Set TASK_REGISTRY_ADDRESS env var");
  const [signer] = await hre.ethers.getSigners();
  const registry = await hre.ethers.getContractAt("TaskRegistry", ADDRESS, signer);
  for (const t of SEED_TASKS) {
    const tx = await registry.createTask(t.title, t.project, t.priority);
    await tx.wait();
    console.log(`Created: "${t.title}"`);
  }
  console.log(`\n✅ Seeded ${SEED_TASKS.length} tasks on ${hre.network.name}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
