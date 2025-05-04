#!/usr/bin/env node
const { execSync } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

// Check which chain to deploy to
const chain = process.argv[2] || process.env.ACTIVE_CHAIN || "0";

if (chain !== "0" && chain !== "1") {
  console.error(`Error: Invalid chain ${chain}. Please use 0 or 1.`);
  process.exit(1);
}

// Set the active chain in the environment
process.env.ACTIVE_CHAIN = chain;

console.log(`Deploying to Kadena Devnet Chain ${chain}...`);

try {
  execSync(`npx hardhat deploy --network kadenaDevnet${chain}`, { stdio: "inherit" });
  console.log(`\nDeployment to Kadena Devnet Chain ${chain} completed successfully!`);
} catch (error) {
  console.error(`\nDeployment failed: ${error.message}`);
  process.exit(1);
}
