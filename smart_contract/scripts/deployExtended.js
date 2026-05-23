import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await hre.ethers.getContractFactory("TaskFlowToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("TaskFlowToken (TFT):", await token.getAddress());

  const POW = await hre.ethers.getContractFactory("ProofOfWork");
  const pow = await POW.deploy();
  await pow.waitForDeployment();
  console.log("ProofOfWork (TFPOW):", await pow.getAddress());

  const DAO = await hre.ethers.getContractFactory("DAOProposal");
  const dao = await DAO.deploy();
  await dao.waitForDeployment();
  console.log("DAOProposal:", await dao.getAddress());

  const Sprint = await hre.ethers.getContractFactory("SprintBoard");
  const sprint = await Sprint.deploy();
  await sprint.waitForDeployment();
  console.log("SprintBoard:", await sprint.getAddress());

  console.log("\n✅ Extended suite deployed on", hre.network.name);
}

main().catch((err) => { console.error(err); process.exit(1); });
