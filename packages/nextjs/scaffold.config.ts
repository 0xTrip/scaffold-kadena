import { defineChain } from "viem";

// Define Kadena Devnet Chain 0
export const kadenaDevnet0 = defineChain({
  id: 1789,
  name: "Kadena Devnet Chain 0",
  network: "kadenaDevnet0",
  nativeCurrency: {
    name: "Kadena",
    symbol: "KDA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/0/evm/rpc"],
    },
    public: {
      http: ["https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/0/evm/rpc"],
    },
  },
});

// Define Kadena Devnet Chain 1
export const kadenaDevnet1 = defineChain({
  id: 1790,
  name: "Kadena Devnet Chain 1",
  network: "kadenaDevnet1",
  nativeCurrency: {
    name: "Kadena",
    symbol: "KDA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/1/evm/rpc"],
    },
    public: {
      http: ["https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/1/evm/rpc"],
    },
  },
});

// Add back the DEFAULT_ALCHEMY_API_KEY
export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

export type ScaffoldConfig = {
  targetNetworks: readonly any[];
  pollingInterval: number;
  alchemyApiKey: string; // Add this back
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const scaffoldConfig = {
  // Only target Kadena devnet chains
  targetNetworks: [kadenaDevnet0, kadenaDevnet1],

  // Using a shorter polling interval for devnet
  pollingInterval: 5000,

  // Add back alchemyApiKey
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // RPC overrides if needed
  rpcOverrides: {
    1789:
      process.env.RPC_URL_CHAIN0 || "https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/0/evm/rpc",
    1790:
      process.env.RPC_URL_CHAIN1 || "https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/1/evm/rpc",
  },

  // WalletConnect project ID (keep for wallet connections)
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Disable local burner wallet
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
