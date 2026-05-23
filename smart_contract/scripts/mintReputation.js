import hre from "hardhat";

const LEDGER_ADDRESS = process.env.REPUTATION_LEDGER_ADDRESS;

// Fill in recipients before running
const RECIPIENTS = [
  // { address: "0x...", points: 70, reason: "high_task" },
];

async function main() {
  if (!LEDGER_ADDRESS) throw new Error("Set REPUTATION_LEDGER_ADDRESS env var");
  if (!RECIPIENTS.length) { console.log("No recipients configured."); return; }
  const [signer] = await hre.ethers.getSigners();
  const ledger = await hre.ethers.getContractAt("ReputationLedger", LEDGER_ADDRESS, signer);
  for (const r of RECIPIENTS) {
    const tx = await ledger.mint(r.address, r.points, r.reason);
    await tx.wait();
    console.log(`Minted ${r.points} rep → ${r.address}`);
  }
  console.log("✅ Done");
}

main().catch((err) => { console.error(err); process.exit(1); });
