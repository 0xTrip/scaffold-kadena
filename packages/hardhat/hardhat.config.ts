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

  defaultNetwork: "hardhat",
  defaultChainweb: "testnet",

  networks: {
    hardhat: { chainId: 31337 },

    // Testnet networks
    testnet20: {
      chainId: 5920,
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc",
      accounts,
    },
    testnet21: {
      chainId: 5921,
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc",
      accounts,
    },
    testnet22: {
      chainId: 5922,
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc",
      accounts,
    },
    testnet23: {
      chainId: 5923,
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc",
      accounts,
    },
    testnet24: {
      chainId: 5924,
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc",
      accounts,
    },

    // Sandbox networks
    sandbox20: { chainId: 1789, url: "http://localhost:1848/chainweb/0.0/evm-development/chain/20/evm/rpc", accounts },
    sandbox21: { chainId: 1790, url: "http://localhost:1848/chainweb/0.0/evm-development/chain/21/evm/rpc", accounts },
    sandbox22: { chainId: 1791, url: "http://localhost:1848/chainweb/0.0/evm-development/chain/22/evm/rpc", accounts },
    sandbox23: { chainId: 1792, url: "http://localhost:1848/chainweb/0.0/evm-development/chain/23/evm/rpc", accounts },
    sandbox24: { chainId: 1793, url: "http://localhost:1848/chainweb/0.0/evm-development/chain/24/evm/rpc", accounts },
  },

  namedAccounts: {
    deployer: { default: 0 },
  },

  chainweb: {
    hardhat: { chains: 5 },
    sandbox: {
      type: "external",
      chains: 5,
      accounts,
      chainIdOffset: 1789,
      chainwebChainIdOffset: 20,
      externalHostUrl: "http://localhost:1848/chainweb/0.0/evm-development",
      etherscan: {
        apiKey: "abc",
        apiURLTemplate: "http://chain-{cid}.evm.kadena.local:8000/api/",
        browserURLTemplate: "http://chain-{cid}.evm.kadena.local:8000/",
      },
    },
    testnet: {
      type: "external",
      chains: 5,
      accounts,
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
