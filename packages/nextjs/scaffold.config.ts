import { defineChain } from "viem";

// DEFAULT_ALCHEMY_API_KEY is incluided here for compatibility - although this is not needed
export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// Helper function to create Kadena chains
const createKadenaChain = (chainNum: number, environment: "localhost" | "testnet") => {
  const isTestnet = environment === "testnet";
  const chainId = isTestnet ? 5920 + (chainNum - 20) : 626000 + chainNum;
  console.log("chainId in createKadenaChain");
  const rpcUrl = isTestnet
    ? `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/${chainNum}/evm/rpc`
    : `http://127.0.0.1:8545/chain/${chainNum}/evm/rpc`;

  return defineChain({
    id: chainId,
    name: `Kadena ${environment === "testnet" ? "Testnet" : "Localhost"} Chain ${chainNum}`,
    network: `${environment}${chainNum}`, // ← Fixed: matches hardhat network names
    nativeCurrency: {
      name: "Kadena",
      symbol: "KDA",
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] },
    },
    blockExplorers: isTestnet
      ? {
          default: {
            name: "Blockscout",
            url: `http://chain-${chainNum}.evm-testnet-blockscout.chainweb.com`,
          },
        }
      : undefined,
  });
};

// Create chains 20-24 for both environments
export const kadenaTestnet20 = createKadenaChain(20, "testnet");
export const kadenaTestnet21 = createKadenaChain(21, "testnet");
export const kadenaTestnet22 = createKadenaChain(22, "testnet");
export const kadenaTestnet23 = createKadenaChain(23, "testnet");
export const kadenaTestnet24 = createKadenaChain(24, "testnet");

export const kadenaLocalhost0 = createKadenaChain(0, "localhost");
export const kadenaLocalhost1 = createKadenaChain(1, "localhost");

export type ScaffoldConfig = {
  targetNetworks: readonly any[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const scaffoldConfig = {
  // Target networks - defaults to testnet, use NEXT_PUBLIC_USE_LOCALHOST=true for localhost
  targetNetworks:
    process.env.NEXT_PUBLIC_USE_LOCALHOST === "true"
      ? [kadenaLocalhost0, kadenaLocalhost1]
      : [kadenaTestnet20, kadenaTestnet21, kadenaTestnet22, kadenaTestnet23, kadenaTestnet24],

  // Polling interval
  pollingInterval: 5000,

  // Alchemy API key (for compatibility, not used with Kadena)
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // WalletConnect project ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Use local burner wallet only in localhost mode
  onlyLocalBurnerWallet: process.env.NEXT_PUBLIC_USE_LOCALHOST === "true",
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
