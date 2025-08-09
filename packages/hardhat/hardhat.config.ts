import "@nomicfoundation/hardhat-toolbox";
import "@kadena/hardhat-chainweb";
import "@kadena/hardhat-kadena-create2";
import "hardhat-deploy-ethers";
import "./tasks/verify-chainweb";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const deployerKey = process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY || process.env.DEPLOYER_PRIVATE_KEY;
const accounts = deployerKey ? [deployerKey] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 1000 },
      evmVersion: "prague",
    },
  },

  chainweb: {
    hardhat: {
      chains: 2,
      logging: "info",
      networkOptions: {
        forking: {
          url: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc`,
          enabled: process.env.TESTNET_FORKING_ENABLED === "true",
        },
      },
    },
    testnet: {
      type: "external",
      chains: 5,
      accounts: accounts,
      chainIdOffset: 5920,
      chainwebChainIdOffset: 20,
      externalHostUrl: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet",
      etherscan: {
        apiKey: "abc", // Any non-empty string works for Blockscout
        apiURLTemplate: "https://chain-{cid}.evm-testnet-blockscout.chainweb.com/api/",
        browserURLTemplate: "https://chain-{cid}.evm-testnet-blockscout.chainweb.com",
      },
    },
  },
};

export default config;
