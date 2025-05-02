#!/usr/bin/env node

// Simple deployment script for Kadena Devnet
const { execSync } = require("child_process");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

// Check which chain to deploy to
const chain = process.argv[2] || process.env.ACTIVE_CHAIN || "0";
const validChains = ["0", "1"];

if (!validChains.includes(chain)) {
  console.error(`Error: Invalid chain ${chain}. Please use 0 or 1.`);
  process.exit(1);
}

// Set the active chain in the environment
process.env.ACTIVE_CHAIN = chain;
// Removed: process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log(`Deploying to Kadena Devnet Chain ${chain}...`);

try {
  // Execute the deployment command
  execSync(`npx hardhat deploy --network kadenaDevnet${chain}`, { stdio: "inherit" });
  console.log(`\nDeployment to Kadena Devnet Chain ${chain} completed successfully!`);
} catch (error) {
  console.error(`\nDeployment failed: ${error.message}`);
  process.exit(1);
}
