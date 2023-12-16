require("@nomicfoundation/hardhat-toolbox");

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

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};
