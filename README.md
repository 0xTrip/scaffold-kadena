# 🏗 Scaffold Kadena (EVM Chains)

A custom fork of Scaffold-ETH 2 with specialized support for Kadena EVM networks, making it easier to build and deploy dApps on Kadena's blockchain across multiple environments.

## ✨ Key Features

**Kadena-Specific Dependencies:**
- `@kadena/hardhat-chainweb` - For Kadena EVM chain interaction with multi-environment support
- `@kadena/hardhat-kadena-create2` - For CREATE2 deployments on Kadena

**Multi-Environment Support:**
- **Hardhat (Local)**
- **[Sandbox](https://github.com/kadena-io/kadena-evm-sandbox) (Local):** `http://localhost:1848` - For local development with testnet constraints
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

### 3. Set up environment variables (if using an encrypted private key, follow the instructions in .env.example)

```bash
cd packages/hardhat
cp .env.example .env
```

## 🔥 Deployment & Development

### Writing Smart Contracts

**Create new contracts** in `packages/hardhat/contracts/`:

```solidity
// packages/hardhat/contracts/MyAwesomeContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyKadenaContract {
    address public owner;
    
    constructor(address _owner) {
        owner = _owner;
    }
    
    // Extremely based contract logic goes here...
}

### Deploy Smart Contracts

**Deploy to default environment (local):**
```bash
cd packages/hardhat
yarn deploy
```

**Deploy to testnet:**
```bash
yarn deploy --network testnet20
```

**Deploy to specific testnet chain:**
```bash
# Deploy to testnet chain 21
yarn deploy --network testnet21
```

### Verify Contracts on Blockscout

**Contract verification** (works with any environment):
```bash
# Verify on testnet 20
yarn hardhat verify --network testnet20 <CONTRACT_ADDRESS> "<DEPLOYER_ADDRESS>"
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
- **Chain 20**:
  - **Chain ID**: `5920`
  - **RPC**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc`
  - **Block Explorer**: `http://chain-20.evm-testnet-blockscout.chainweb.com/`

### Other Chains

- **Chain 21**:
  - **Chain ID**: `5921`
  - **RPC**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc`
  - **Block Explorer**: `http://chain-21.evm-testnet-blockscout.chainweb.com/`

- **Chain 22**:
  - **Chain ID**: `5922`
  - **RPC**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc`
  - **Block Explorer**: `http://chain-22.evm-testnet-blockscout.chainweb.com/`

- **Chain 23**:
  - **Chain ID**: `5923`
  - **RPC**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc`
  - **Block Explorer**: `http://chain-23.evm-testnet-blockscout.chainweb.com/`

- **Chain 24**:
  - **Chain ID**: `5924`
  - **RPC**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc`
  - **Block Explorer**: `http://chain-24.evm-testnet-blockscout.chainweb.com/`

### [Sandbox](https://github.com/kadena-io/kadena-evm-sandbox) (Local Development)
- **Chain 20**: Chain ID `1789`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/20/evm/rpc`
- **Chain 21**: Chain ID `1790`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/21/evm/rpc`
- **Chain 22**: Chain ID `1791`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/22/evm/rpc`
- **Chain 23**: Chain ID `1792`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/23/evm/rpc`
- **Chain 24**: Chain ID `1793`, RPC: `http://localhost:1848/chainweb/0.0/evm-development/chain/24/evm/rpc`

**For all networks:**
- **Currency Symbol**: KDA

## 🔍 Contract Verification & Block Explorers

Each environment has its own Blockscout instance for contract verification, replace ```ChainId``` with target chain ID:

- **Testnet**: `http://chain-<ChainId>.evm-testnet-blockscout.chainweb.com/` 
- **Sandbox**: `http://chain-<ChainId>.evm.kadena.local:8000`

## 🚢 Using Your dApp

1. Deploy contracts to your preferred environment using the commands above
2. Start the frontend and connect MetaMask to the appropriate Kadena network
3. **For testnet**, you'll need your own funded accounts (see Environment Variables section and [Faucet](https://tools.kadena.io/faucet/new))
4. Interact with your contracts through the UI

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