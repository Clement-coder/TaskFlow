import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const bal = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Wallet :", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(bal), "CELO");
  console.log("Network:", hre.network.name);
}

main().catch((err) => { console.error(err); process.exit(1); });
