import hre from "hardhat";

// Usage: hardhat run scripts/verify.js --network celo
// Set CONTRACT_ADDRESS and CONTRACT_NAME in env or edit below
const ADDRESS = process.env.CONTRACT_ADDRESS;
const NAME    = process.env.CONTRACT_NAME || "TaskRegistry";

async function main() {
  if (!ADDRESS) throw new Error("Set CONTRACT_ADDRESS env var");
  console.log(`Verifying ${NAME} at ${ADDRESS} on ${hre.network.name}...`);
  await hre.run("verify:verify", { address: ADDRESS, constructorArguments: [] });
  console.log("✅ Verified");
}

main().catch((err) => { console.error(err); process.exit(1); });
