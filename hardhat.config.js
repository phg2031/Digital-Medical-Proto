require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

task("deploy", "Deploys all scripts in the scripts folder").setAction(
  async (taskArgs, hre) => {
    const scriptsDir = path.join(__dirname, "scripts");

    // Lese alle Dateien im scripts-Ordner
    const scripts = fs
      .readdirSync(scriptsDir)
      .filter((file) => file.endsWith(".js"));

    for (const script of scripts) {
      console.log(`Deploying ${script}...`);
      await hre.run("run", { script: path.join(scriptsDir, script) });
    }

    console.log("All scripts have been deployed.");
  }
);
const Api_Sep = process.env.SepoliaRPC;
const pv_key = process.env.PK;
const apiKey = process.env.api_etherscan;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: Api_Sep,
      accounts: [pv_key],
      chainId: 11155111,
      blockConfirmations: 5,
    },
  },
  etherscan: {
    apiKey: apiKey,
  },
};
