import { task } from "hardhat/config";

task("verify-chainweb", "Verify contract on all Chainweb chains")
  .addParam("address", "Contract address to verify")
  .addParam("chainweb", "Chainweb config (testnet, etc.)")
  .addOptionalParam("args", "Constructor arguments (comma-separated)", "")
  .setAction(async (taskArgs, hre) => {
    const { chainweb } = hre;
    const { address: contractAddress, chainweb: networkName, args } = taskArgs;

    console.log(`Setting chainweb network to: ${networkName}`);
    console.log("Chainweb verification starting...");
    console.log("Contract Address:", contractAddress);

    // Set the default chainweb before initializing
    hre.config.defaultChainweb = networkName;

    // Initialize chainweb plugin
    try {
      await chainweb.initialize();
      console.log(`Chainweb plugin initialized for ${networkName}`);
    } catch (error) {
      console.error("Error initializing chainweb:", error);
      throw error;
    }

    const constructorArgs = args ? args.split(",") : [];
    console.log("Constructor Arguments:", constructorArgs);

    await chainweb.runOverChains(async (chainId: number) => {
      console.log(`Verifying contract ${contractAddress} on chain ${chainId}...`);

      try {
        console.log(`Attempting to verify contract on chain ${chainId}...`);
        await run("verify:verify", {
          address: contractAddress,
          constructorArguments: constructorArgs,
          force: true,
        });

        console.log(`✅ Contract successfully verified on chain ${chainId}`);
      } catch (verifyError: any) {
        console.error(`Error verifying contract on chain ${chainId}:`, verifyError.message);
      }
    });
  });
