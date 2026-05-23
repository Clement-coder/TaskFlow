import hre from "hardhat";

const ADDRESS = process.env.TASK_REGISTRY_ADDRESS;

async function main() {
  if (!ADDRESS) throw new Error("Set TASK_REGISTRY_ADDRESS env var");
  const registry = await hre.ethers.getContractAt("TaskRegistry", ADDRESS);
  const count = await registry.taskCount();
  console.log("TaskRegistry:", ADDRESS);
  console.log("Total tasks on-chain:", count.toString());
}

main().catch((err) => { console.error(err); process.exit(1); });
