import { spawn } from "child_process";
import { chainweb, network, ethers } from "hardhat";
import { Wallet } from "ethers";
import password from "@inquirer/password";
import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import type { DeployedContractsOnChains } from "@kadena/hardhat-chainweb/lib/utils";
import { generateDeployedContractsFile } from "./utils";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Deploys using the Hardhat Kadena plugin direcftly for local. It decrypts the encrypted PK (if used)
 * and spawns a new process for remote deployment
 */
async function main() {
  let deployed: { deployments: DeployedContractsOnChains[] };
  let successfulDeployments: DeployedContractsOnChains[];
  let deployer: SignerWithAddress;
  let decryptedPrivateKey: string;

  // Make sure we're on the first chainweb chain
  const chains = await chainweb.getChainIds();
  await chainweb.switchChain(chains[0]);

  const isLocalNetwork = network.name.includes("hardhat") || network.name.includes("localhost");

  if (isLocalNetwork) {
    // LOCAL: Simple deployment with built-in Hardhat accounts
    [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with deployer account: ${deployer.address} on network: ${network.name}`);

    deployed = await chainweb.deployContractOnChains({
      name: "YourContract",
      constructorArgs: [deployer.address],
    });
    if (deployed.deployments.length === 0) {
      console.log("No contracts deployed");
      process.exit(0);
      return;
    }

    // Filter out failed deployments
    successfulDeployments = deployed.deployments.filter(d => d !== null);

    if (successfulDeployments.length > 0) {
      console.log(`Contract successfully deployed to ${successfulDeployments.length} chains`);

      // Generate file for local deployments
      await generateDeployedContractsFile(successfulDeployments);
      process.exit(0);
    }
  }

  // REMOTE: Use spawn pattern for encrypted keys
  const encryptedKey = process.env.DEPLOYER_PRIVATE_KEY_ENCRYPTED;
  const plainKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (encryptedKey) {
    console.log("Using encrypted private key...");
    const pass = await password({ message: "Enter password to decrypt private key:" });

    try {
      const wallet = await Wallet.fromEncryptedJson(encryptedKey, pass);
      decryptedPrivateKey = wallet.privateKey;
    } catch (e) {
      console.error("Failed to decrypt private key. Wrong password?", e);
      process.exit(1);
    }
  } else if (plainKey) {
    console.log("Using plain private key from .env...");
    decryptedPrivateKey = plainKey;
  } else {
    console.log("🚫️ No private key found. Set DEPLOYER_PRIVATE_KEY or DEPLOYER_PRIVATE_KEY_ENCRYPTED");
    return;
  }

  // Spawn a new hardhat process with the decrypted key
  console.log("Spawning hardhat process for remote deployment...");

  const env = {
    ...process.env,
    __RUNTIME_DEPLOYER_PRIVATE_KEY: decryptedPrivateKey,
  };

  if (!network.name.includes("testnet")) {
    console.error(`❌ Unsupported network: ${network.name}`);
    console.error("Currently only testnet networks are supported");
    process.exit(1);
  }

  const chainwebNetwork = "testnet";
  console.log("Using chainweb network:", chainwebNetwork);

  const chainwebArgs = ["--chainweb", chainwebNetwork];

  const spawnedProcess = spawn("npx", ["hardhat", "run", "scripts/deployToRemoteChains.ts", ...chainwebArgs], {
    stdio: "inherit",
    env: env,
    cwd: process.cwd(),
  });

  spawnedProcess.on("close", code => {
    if (code === 0) {
      console.log("✅ Remote deployment completed successfully");
    } else {
      console.error(`❌ Remote deployment failed with exit code ${code}`);
      process.exit(code || 1);
    }
  });
}

main().catch(console.error);
