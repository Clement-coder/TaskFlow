import hre from "hardhat";

// Deploy all remaining feature contracts
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying feature contracts with:", deployer.address);

  const contracts = [
    "CeloNameRegistry", "TaskComment", "TaskTag", "ReputationStaking",
    "TaskAssignment", "WorkspaceInvite", "TaskDueDate", "CUSDTipJar",
    "TaskPriority", "SprintReview", "AchievementBadge", "ContributorLeaderboard",
    "TaskVote", "ProjectLabel", "OnChainProfile", "TaskFlowConfig",
    "TaskFlowTreasury", "TaskFlowEvents", "MiniPayIntegration",
    "ActivityLogger", "ProjectRegistry", "WorkspaceRegistry", "TeamRegistry",
  ];

  const deployed = {};
  for (const name of contracts) {
    const Factory = await hre.ethers.getContractFactory(name);
    const contract = await Factory.deploy();
    await contract.waitForDeployment();
    deployed[name] = await contract.getAddress();
    console.log(`${name}: ${deployed[name]}`);
  }

  console.log("\n✅ All feature contracts deployed on", hre.network.name);
  console.log(JSON.stringify(deployed, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
