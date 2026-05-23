import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying TaskFlowFactory with:", deployer.address);

  const cUSD = hre.network.name === "celo"
    ? "0x765DE816845861e75A25fCA122bb6898B8B1282a"
    : "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

  const Factory = await hre.ethers.getContractFactory("TaskFlowFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();
  console.log("TaskFlowFactory:", await factory.getAddress());

  const tx = await factory.deploy(cUSD, hre.ethers.parseUnits("100", 18));
  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log) => { try { return factory.interface.parseLog(log); } catch { return null; } })
    .find((e) => e?.name === "Deployed");

  if (event) {
    console.log("TaskRegistry:    ", event.args.taskRegistry);
    console.log("ReputationLedger:", event.args.reputationLedger);
    console.log("WorkspaceGate:   ", event.args.workspaceGate);
  }

  console.log("\n✅ Full TaskFlow suite deployed on", hre.network.name);
}

main().catch((err) => { console.error(err); process.exit(1); });
