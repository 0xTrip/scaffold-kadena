// Create this new file: scripts/deployToRemoteChains.ts
import { chainweb, ethers } from "hardhat";
import { generateDeployedContractsFile } from "./utils";

/**
 * This script deploys contracts to remote chains using a private key from environment variables.
 * Called from the spawn hardhat process in scripts/runHardhatDeployWithPK.ts
 */
async function main() {
  console.log("Remote deployment starting...");

  const chains = await chainweb.getChainIds();
  console.log("chains,", chains);
  await chainweb.switchChain(chains[0]);

  // Now the signer will be available because __RUNTIME_DEPLOYER_PRIVATE_KEY was set!
  const [deployer] = await ethers.getSigners();
  console.log("Remote deployer:", deployer.address);

  const deployed = await chainweb.deployContractOnChains({
    name: "YourContract",
    constructorArgs: [deployer.address], // No explicit signer needed!
  });

  if (deployed.deployments.length === 0) {
    console.log("No contracts deployed");
    return;
  }

  const successfulDeployments = deployed.deployments.filter(d => d !== null);
  console.log("Successful deployments:", successfulDeployments);

  if (successfulDeployments.length > 0) {
    console.log(`Contract successfully deployed to ${successfulDeployments.length} chains`);
    await generateDeployedContractsFile(successfulDeployments);
  }
}

main().catch(console.error);
