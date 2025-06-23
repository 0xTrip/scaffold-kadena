import { defineChain } from "viem";

// DEFAULT_ALCHEMY_API_KEY is incluided here for compatibility - although this is not needed
export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// Helper function to create Kadena chains
const createKadenaChain = (chainNum: number, environment: "sandbox" | "testnet") => {
  const isTestnet = environment === "testnet";
  const chainId = isTestnet ? 5920 + (chainNum - 20) : 1789 + (chainNum - 20);
  const rpcUrl = isTestnet 
    ? `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/${chainNum}/evm/rpc`
    : `http://localhost:1848/chainweb/0.0/evm-development/chain/${chainNum}/evm/rpc`;

  return defineChain({
    id: chainId,
    name: `Kadena ${environment === "testnet" ? "Testnet" : "Sandbox"} Chain ${chainNum}`,
    network: `${environment}${chainNum}`, 
    nativeCurrency: {
      name: "Kadena",
      symbol: "KDA", 
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] },
    },
    blockExplorers: isTestnet ? {
      default: {
        name: "Blockscout",
        url: `http://chain-${chainNum}.evm-testnet-blockscout.chainweb.com`,
      },
    } : undefined,
  });
};

// Create chains 20-24 for both environments
export const kadenaTestnet20 = createKadenaChain(20, "testnet");
export const kadenaTestnet21 = createKadenaChain(21, "testnet"); 
export const kadenaTestnet22 = createKadenaChain(22, "testnet");
export const kadenaTestnet23 = createKadenaChain(23, "testnet");
export const kadenaTestnet24 = createKadenaChain(24, "testnet");

export const kadenaSandbox20 = createKadenaChain(20, "sandbox");
export const kadenaSandbox21 = createKadenaChain(21, "sandbox");
export const kadenaSandbox22 = createKadenaChain(22, "sandbox");
export const kadenaSandbox23 = createKadenaChain(23, "sandbox");
export const kadenaSandbox24 = createKadenaChain(24, "sandbox");

export type ScaffoldConfig = {
  targetNetworks: readonly any[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const scaffoldConfig = {
  // Target networks - defaults to testnet, use NEXT_PUBLIC_USE_SANDBOX=true in .env.local for sandbox
  targetNetworks: process.env.NEXT_PUBLIC_USE_SANDBOX === "true"
    ? [kadenaSandbox20, kadenaSandbox21, kadenaSandbox22, kadenaSandbox23, kadenaSandbox24]
    : [kadenaTestnet20, kadenaTestnet21, kadenaTestnet22, kadenaTestnet23, kadenaTestnet24],

  // Polling interval
  pollingInterval: 5000,

  // Alchemy API key (for compatibility, not used with Kadena)
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // WalletConnect project ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Use local burner wallet only in sandbox mode
  onlyLocalBurnerWallet: process.env.NEXT_PUBLIC_USE_SANDBOX === "true",
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;