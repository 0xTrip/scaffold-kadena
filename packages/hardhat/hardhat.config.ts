import "@nomicfoundation/hardhat-toolbox";
import "@kadena/hardhat-chainweb";
import "@kadena/hardhat-kadena-create2";
import "dotenv/config";
import { readFileSync } from "fs";
import { HardhatUserConfig } from "hardhat/config";

const devnetAccounts = JSON.parse(readFileSync("./devnet-accounts.json", "utf-8"));

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      evmVersion: "prague",
    },
  },

  // default environment is Kadena EVM testnet (can be overridden in here, or with --chainweb flag)
  defaultChainweb: "testnet",

  chainweb: {
    hardhat: {
      chains: 5,
    },
    sandbox: {
      type: "external",
      chains: 5,
      accounts: devnetAccounts.accounts.map((account: { privateKey: string }) => account.privateKey),
      chainIdOffset: 1789,
      chainwebChainIdOffset: 20,
      externalHostUrl: "http://localhost:1848/chainweb/0.0/evm-development",
      // config for sandbox when running locally
      etherscan: {
        apiKey: "abc", // Any non-empty string works for Blockscout
        apiURLTemplate: "http://chain-{cid}.evm.kadena.local:8000/api/",
        browserURLTemplate: "http://chain-{cid}.evm.kadena.local:8000/",
      },
    },
    devnet: {
      type: "external",
      chains: 5,
      accounts: devnetAccounts.accounts.map((account: { privateKey: string }) => account.privateKey),
      chainIdOffset: 1789,
      chainwebChainIdOffset: 20,
      externalHostUrl: "https://evm-devnet.kadena.network/chainweb/0.0/evm-development",
      etherscan: {
        apiKey: "abc",
        apiURLTemplate: "http://chain-{cid}.evm.kadena.network:8000/api/",
        browserURLTemplate: "http://chain-{cid}.evm.kadena.network:8000",
      },
    },
    testnet: {
      type: "external",
      chains: 5,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY, process.env.FAUCET_PRIVATE_KEY],
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
