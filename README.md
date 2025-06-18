# 🏗 Scaffold Kadena (EVM Chains)

A custom fork of Scaffold-ETH 2 with specialized support for Kadena EVM Devnet, making it easier to build and deploy dApps on Kadena's blockchain.

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

## 📝 Environment Setup

### Hardhat Configuration

The hardhat configuration is already set up to work with Kadena Devnet. This is a temporary hard code of .env variables via hardhat.config. 

Users of this repo share a private key loaded with funds, but you can swap out the key if desired. Key features:

- Pre-configured RPCs for Kadena Devnet Chain 0 and Chain 1
- Simplified deployment process
- Account loaded with funds

### Frontend Configuration

The NextJS frontend is pre-configured to connect to your deployed contracts on Kadena Devnet. Deployment via the script will generate typings.

## 🔥 Deployment & Development

### Deploy Smart Contracts

To deploy your contracts to Kadena Devnet Chain 0:

```bash
cd packages/hardhat
yarn deploy:kadena0
```

For Kadena Devnet Chain 1:

```bash
cd packages/hardhat
yarn deploy:kadena1
```

### Navigate to the Nextjs Folder and Start the Frontend

```bash
cd ../nextjs
yarn start
```

Your application will be available at: http://localhost:3000

## 🦊 Connect MetaMask to Kadena Devnet

1. Open MetaMask and click on the network dropdown at the top
2. Click "Add Network" > "Add Network Manually"
3. Enter the following details:

#### For Kadena Devnet Chain 0:

- **Network Name**: Kadena Devnet Chain 0
- **RPC URL**: https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/0/evm/rpc
- **Chain ID**: 1789
- **Currency Symbol**: KDA
- **Block Explorer URL**: (leave blank)

#### For Kadena Devnet Chain 1:

- **Network Name**: Kadena Devnet Chain 1
- **RPC URL**: https://evm-devnet.kadena.network/chainweb/0.0/evm-development/chain/1/evm/rpc
- **Chain ID**: 1790
- **Currency Symbol**: KDA
- **Block Explorer URL**: (leave blank)

## 🚢 Using Your dApp

1. Once your contracts are deployed and the frontend is running, connect your MetaMask wallet to the site
2. Ensure your MetaMask is connected to the Kadena Devnet
3. Right now there is a private key with funds hardcoded. If using your own wallet, you will need KDA tokens for gas - these are available through Kadena's devnet faucet.
4. Interact with your contracts through the UI

## 🧰 Modifying Contracts

1. Edit or add contracts in the `packages/hardhat/contracts` directory
2. Deploy them using the deployment scripts
3. Your frontend will automatically update with the new contract interfaces

## 🔍 Project Structure

```
scaffold-eth-kadena/
├── packages/
│   ├── hardhat/                      # Solidity contracts & deployment
│   │   ├── contracts/                # Smart contract code
│   │   ├── deploy/                   # Deployment scripts
│   │   └── hardhat.config.ts         # Hardhat configuration
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

## 🙏 Acknowledgments

- BuidlGuidl and the Scaffold-ETH team for the original framework

## 📄 License

MIT

---

Made with ❤️ by [SolidityDegen](https://x.com/SolidityDegen)
