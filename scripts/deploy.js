const { network } = require("hardhat");
const { verify } = require("../utils/verify");

async function main() {
  const DigitalHealthRecord = await ethers.getContractFactory("DigProt");
  const digitalHealthRecord = await DigitalHealthRecord.deploy();
  await digitalHealthRecord.deploymentTransaction().wait(5);

  console.log("DigitalHealthRecord deployed to:", digitalHealthRecord.target);

  if (network.name === "sepolia") {
    await verify(digitalHealthRecord.target);
  } else {
    console.log(`Network is ${network.name} - no Verfiy on Non-testnets`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
