import "@nomicfoundation/hardhat-toolbox";
import "@kadena/hardhat-chainweb";
import "@kadena/hardhat-kadena-create2";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
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

  namedAccounts: {
    deployer: { default: 0 },
  },

  chainweb: {
    hardhat: { chains: 5 },
    testnet: {
      type: "external",
      chains: 5,
      accounts: [accounts],
      chainIdOffset: 5920,
      chainwebChainIdOffset: 20,
      externalHostUrl: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet",
      etherscan: {
        apiKey: "abc",
        apiURLTemplate: "http://chain-{cid}.evm-testnet-blockscout.chainweb.com/api/",
        browserURLTemplate: "http://chain-{cid}.evm-testnet-blockscout.chainweb.com",
      },
    },
  },
};

export default config;
