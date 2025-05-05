import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { task } from "hardhat/config";
import generateTsAbis from "./scripts/generateTsAbis";

// Removed: process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// TLS/SSL issues have been fixed

// Get active chain from environment variables
const activeChain = process.env.ACTIVE_CHAIN || "0";
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY || "0xad60b8572e3d37cf8305a164f035d90982e554b36eb0dc7ed54839a60107aa0a";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: `kadenaDevnet${activeChain}`,
  namedAccounts: {
    deployer: {
      default: 0,
      kadenaDevnet0: 0,
      kadenaDevnet1: 0,
    },
  },
  networks: {
    // Kadena Devnet Chain 0
    kadenaDevnet0: {
      url:
        process.env.RPC_URL_CHAIN0 || "https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/0/evm/rpc",
      chainId: 1789,
      accounts: [deployerPrivateKey],
      timeout: 60000,
      gas: 8000000,
      gasPrice: "auto",
      httpHeaders: {
        "Content-Type": "application/json",
      },
    },
    // Kadena Devnet Chain 1
    kadenaDevnet1: {
      url:
        process.env.RPC_URL_CHAIN1 || "https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/1/evm/rpc",
      chainId: 1790,
      accounts: [deployerPrivateKey],
      timeout: 60000,
      gas: 8000000,
      gasPrice: "auto",
      httpHeaders: {
        "Content-Type": "application/json",
      },
    },
  },
  // Removed unnecessary configurations
};

// Extend the deploy task
task("deploy").setAction(async (args, hre, runSuper) => {
  await runSuper(args);
  await generateTsAbis(hre);
});

export default config;
