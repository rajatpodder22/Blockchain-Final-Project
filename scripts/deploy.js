const hre = require("hardhat");

async function main() {
  console.log("Deploying Verifier contract...");
  const Verifier = await hre.ethers.getContractFactory("PlonkVerifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log(`Verifier deployed to: ${verifier.address}`);

  console.log("Deploying Voting contract...");
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.deployed();
  console.log(`Voting deployed to: ${voting.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });