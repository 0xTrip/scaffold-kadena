import { chainweb, ethers, run } from "hardhat";
import { generateDeployedContractsFile } from "./utils";

async function main() {
  console.log("Remote deployment starting...");

  const verificationDelay = process.env.VERIFICATION_DELAY ? parseInt(process.env.VERIFICATION_DELAY) : 10000; // Default 10 seconds

  const chains = await chainweb.getChainIds();
  console.log("chains,", chains);
  await chainweb.switchChain(chains[0]);

  // Now the signer will be available because __RUNTIME_DEPLOYER_PRIVATE_KEY was set!
  const [deployer] = await ethers.getSigners();

  const [factoryAddress] = await chainweb.create2.deployCreate2Factory();
  console.log(`Create2 factory deployed at: ${factoryAddress}`);

  // This creates a bytes32 hash of the string. Change as needed to redeploy same contract code to different address.
  const salt = ethers.id("mySalt");

  // Deploy the contract using standard Create2 factory functionality to ensure the same address across all chains
  console.log("Deploying contract using Create2...");
  const deployed = await chainweb.create2.deployOnChainsUsingCreate2({
    name: "YourContract",
    constructorArgs: [deployer.address],
    create2Factory: factoryAddress,
    salt: salt,
  });

  deployed.deployments.forEach(async deployment => {
    console.log(`${deployment.address} on ${deployment.chain}`);
  });

  const successfulDeployments = deployed.deployments.filter(d => d !== null);

  if (successfulDeployments.length > 0) {
    console.log(`Contract successfully deployed to ${successfulDeployments.length} chains`);

    // Generate the deployed contracts file
    await generateDeployedContractsFile(successfulDeployments);

    // Verify smart contracts on each chain
    const deploymentsByChain: Record<number, any> = {};
    for (const deployment of successfulDeployments) {
      deploymentsByChain[deployment.chain] = deployment;
    }

    // Process deployments using runOverChains
    await chainweb.runOverChains(async (chainId: number) => {
      // Skip chains that weren't in our successful deployments
      if (!deploymentsByChain[chainId]) {
        console.log(`No deployment for chain ${chainId}, skipping verification`);
        return;
      }

      const deployment = deploymentsByChain[chainId];
      const contractAddress = deployment.address;

      console.log(`Verifying contract with address ${contractAddress} on chain ${chainId}...`);

      try {
        console.log(`Waiting ${verificationDelay / 1000} seconds before verification...`);

        // Optional delay for verification API to index the contract
        if (verificationDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, verificationDelay));
        }

        console.log(`Attempting to verify contract on chain ${chainId}...`);
        await run("verify:verify", {
          address: contractAddress,
          constructorArguments: [deployer.address], // Match your constructor args
          force: true,
        });

        console.log(`✅ Contract successfully verified on chain ${chainId}`);
      } catch (verifyError: any) {
        console.error(`Error verifying contract on chain ${chainId}:`, verifyError.message);
      }
    });
  }
}

main().catch(console.error);
