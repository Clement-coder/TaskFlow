const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. TaskRegistry
  const TaskRegistry = await hre.ethers.getContractFactory("TaskRegistry");
  const taskRegistry = await TaskRegistry.deploy();
  await taskRegistry.waitForDeployment();
  console.log("TaskRegistry:", await taskRegistry.getAddress());

  // 2. ReputationLedger (linked to TaskRegistry)
  const ReputationLedger = await hre.ethers.getContractFactory("ReputationLedger");
  const reputation = await ReputationLedger.deploy(await taskRegistry.getAddress());
  await reputation.waitForDeployment();
  console.log("ReputationLedger:", await reputation.getAddress());

  // 3. WorkspaceGate — cUSD on Celo mainnet: 0x765DE816845861e75A25fCA122bb6898B8B1282a
  //    On Alfajores testnet cUSD: 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
  const cUSD = hre.network.name === "celo"
    ? "0x765DE816845861e75A25fCA122bb6898B8B1282a"
    : "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

  const WorkspaceGate = await hre.ethers.getContractFactory("WorkspaceGate");
  const gate = await WorkspaceGate.deploy(cUSD, hre.ethers.parseUnits("100", 18));
  await gate.waitForDeployment();
  console.log("WorkspaceGate:", await gate.getAddress());

  console.log("\n✅ All contracts deployed on", hre.network.name);
}

main().catch((err) => { console.error(err); process.exit(1); });
