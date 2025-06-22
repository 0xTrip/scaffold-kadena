# 🏗 Scaffold Kadena (EVM Chains)

A custom fork of Scaffold-ETH 2 with specialized support for Kadena EVM networks, making it easier to build and deploy dApps on Kadena's blockchain across multiple environments.

## ✨ Key Features

**Kadena-Specific Dependencies:**
- `@kadena/hardhat-chainweb` - For Kadena EVM chain interaction with multi-environment support
- `@kadena/hardhat-kadena-create2` - For CREATE2 deployments on Kadena

**Enhanced Development Scripts:**
- Multi-environment deployment support (sandbox, devnet (soon to be removed), testnet)
- Smart contract verification on Blockscout across all environments
- Dynamic environment switching with `--chainweb` CLI flag
- Support for all 5 Kadena EVM chains per environment
- Contract quality scripts (`check:contracts`, `tidy:contracts`)

**Multi-Environment Support:**
- **[Sandbox](https://github.com/kadena-io/kadena-evm-sandbox) (Local):** `http://localhost:1848` - For local development
- **Testnet:** `https://evm-testnet.chainweb.com` - For production testing

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.15.0 or later)
- [Yarn](https://yarnpkg.com/) (v1.22.19 or later)
- [Git](https://git-scm.com/downloads)
- [MetaMask](https://metamask.io/) browser extension

### 1. Clone the repository

```bash
git clone https://github.com/0xTrip/scaffold-kadena.git
cd scaffold-kadena
```

### 2. Install dependencies

```bash
yarn install
```
## 🔥 Deployment & Development

### Deploy Smart Contracts

**Deploy to default environment (testnet):**
```bash
cd packages/hardhat
yarn hardhat deploy
```

**Deploy to specific environment:**
```bash
# Deploy to sandbox (local)
yarn hardhat deploy --chainweb sandbox

# Deploy to devnet (hosted)
yarn hardhat deploy --chainweb devnet

# Deploy to testnet
yarn hardhat deploy --chainweb testnet
```

**Deploy to specific chain:**
```bash
# Deploy to sandbox chain 20
yarn hardhat deploy --chainweb sandbox --network sandbox20

# Deploy to testnet chain 22
yarn hardhat deploy --chainweb testnet --network testnet22
```

### Verify Contracts on Blockscout

**Automatic verification** (works with any environment):
```bash
# Verify on current environment
yarn hardhat verify --network testnet20 <contract-address>

# Verify on different environment
yarn hardhat verify --chainweb devnet --network devnet21 <contract-address>
```

### Start the Frontend

```bash
cd ../nextjs
yarn start
```

Your application will be available at: http://localhost:3000

## 🦊 Connect MetaMask to Kadena Networks

The project supports **5 chains per environment**. Add any or all of them to MetaMask:

### Testnet (Production Testing)
- **Chain 20**: Chain ID `5920`, RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc`
- **Chain 21**: Chain ID `5921`, RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc`
- **Chain 22**: Chain ID `5922`, RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc`
- **Chain 23**: Chain ID `5923`, RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc`
- **Chain 24**: Chain ID `5924`, RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc`

### Sandbox (Local Development)
- **Chain 20**: Chain ID `1789`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/20/evm/rpc`
- **Chain 21**: Chain ID `1790`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/21/evm/rpc`
- **Chain 22**: Chain ID `1791`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/22/evm/rpc`
- **Chain 23**: Chain ID `1792`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/23/evm/rpc`
- **Chain 24**: Chain ID `1793`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/24/evm/rpc`

**For all networks:**
- **Currency Symbol**: KDA
- **Block Explorer**: See respective Blockscout instances per environment

## 🔍 Contract Verification & Block Explorers

Each environment has its own Blockscout instance for contract verification and exploration:

- **Testnet**: `http://chain-20.evm-testnet-blockscout.chainweb.com/` (chain 20, replace with 20-24)
- **Sandbox**: `http://chain-{cid}.evm.kadena.local:8000`

## 🚢 Using Your dApp

1. Deploy contracts to your preferred environment using the commands above
2. Start the frontend and connect MetaMask to the appropriate Kadena network
3. **Funded accounts** are available through `devnet-accounts.json` for development
4. **For testnet**, you'll need your own funded accounts (see Environment Variables section)
5. Interact with your contracts through the UI

## 🧰 Development Workflow

### Local Development (Sandbox)
```bash
# 1. Start local Kadena node (separately)
# 2. Deploy contracts
yarn hardhat deploy --chainweb sandbox
# 3. Verify contracts  
yarn hardhat verify --chainweb sandbox --network sandbox20 <address>
```

### Production Testing (Testnet)
```bash
# Deploy to testnet (requires .env setup)
yarn hardhat deploy --chainweb testnet
yarn hardhat verify --chainweb testnet --network testnet20 <address>
```

### Multi-Chain Deployments
Deploy the same contract across multiple chains:
```bash
# Deploy to all chains in testnet
for chain in {20..24}; do
  yarn hardhat deploy --chainweb testnet --network "testnet$chain"
done
```

## 🔍 Project Structure

```
scaffold-kadena/
├── packages/
│   ├── hardhat/                      # Solidity contracts & deployment
│   │   ├── contracts/                # Smart contract code
│   │   ├── deploy/                   # Deployment scripts
│   │   ├── devnet-accounts.json      # Funded development accounts
│   │   ├── .env                      # Environment variables (create this)
│   │   └── hardhat.config.ts         # Multi-environment Hardhat configuration
│   │
│   └── nextjs/                       # Frontend application
│       ├── components/               # React components
│       ├── pages/                    # Next.js pages
│       ├── public/                   # Static assets
│       ├── hooks/                    # Custom React hooks
│       ├── scaffold.config.ts        # Scaffold-ETH configuration
│       └── next.config.js            # Next.js configuration
```

## 🆕 What's New in This Version

- **🔄 Environment Switching**: Switch between sandbox/devnet/testnet with `--chainweb` flag
- **✅ Contract Verification**: Built-in Blockscout verification for all environments  
- **🌐 5-Chain Support**: Full support for chains 20-24 in each environment
- **🔧 Simplified Config**: Single hardhat.config.ts handles all environments
- **🏗️ Latest Plugin**: Uses updated @kadena/hardhat-chainweb with advanced features
- **🔑 Environment Variables**: Proper .env support for sensitive keys

## 📚 Additional Resources

- [Kadena Documentation](https://docs.kadena.io/)
- [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io/)
- [Hardhat Kadena Plugin](https://github.com/kadena-io/hardhat-kadena-plugin)

## 🙏 Acknowledgments

- BuidlGuidl and the Scaffold-ETH team for the original framework

## 📄 License

MIT

---

Made with ❤️ by [SolidityDegen](https://x.com/SolidityDegen)