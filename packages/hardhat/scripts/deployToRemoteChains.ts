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
  console.log("Remote deployer:", deployer.address);

  const deployed = await chainweb.deployContractOnChains({
    name: "YourContract",
    constructorArgs: [deployer.address],
  });

  if (deployed.deployments.length === 0) {
    console.log("No contracts deployed");
    return;
  }

  const successfulDeployments = deployed.deployments.filter(d => d !== null);
  console.log("Successful deployments:", successfulDeployments);

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
