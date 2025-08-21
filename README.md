# 🏗 Scaffold Kadena (EVM Chains) - Foundry Edition

A custom fork of Scaffold-ETH 2 with specialized support for Kadena EVM networks using **Foundry** instead of Hardhat. This provides a modern, fast, and efficient development experience for building and deploying dApps on Kadena's blockchain across multiple environments.

## ✨ Key Features

**Foundry-Based Development:**
- **Forge** - Fast contract compilation and testing
- **Cast** - Command-line contract interaction
- **Anvil** - Local blockchain node for development
- **Foundry Standard Library** - Battle-tested testing utilities

**Kadena-Specific Integration:**
- `kadena-io/foundry-chainweb` - Multi-chain deployment and interaction with Kadena EVM
- Multi-environment support for local, sandbox, and testnet deployments
- Automatic contract verification on Blockscout

**Multi-Environment Support:**
- **Anvil (Local)** - Fast local development chains
- **Sandbox (Local)** - Local development with testnet constraints
- **Testnet** - Production testing on Kadena EVM testnet

## 🚀 Quick Start

### Prerequisites

- [Node (>= v20.18.3)](https://nodejs.org/en/)
- [Foundry](https://getfoundry.sh/) - Install with `curl -L https://foundry.paradigm.xyz | bash`
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
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

### 3. Install Foundry dependencies

```bash
cd packages/foundry
forge install
cd ../..
```

## 🏃‍♂️ Running Locally

### 1. Start local Anvil chains

```bash
# Start Anvil with multiple chains (in background)
anvil --chain-id 31337 --port 8545 &
anvil --chain-id 31338 --port 8546 &
```

### 2. Deploy contracts to local chains

```bash
# Set your deployer private key
export DEPLOYER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Deploy to local chains
yarn forge:deploy:anvil
```

### 3. Generate frontend contract artifacts

```bash
yarn forge:gen-contracts
```

### 4. Start the Next.js frontend

```bash
# Setup environment
cd packages/nextjs
cp .env.example .env
cd ../..

# Start the app
yarn start
```

Your application will be available at: http://localhost:3000

### 5. 🦊 Connect MetaMask to local chains

Configure MetaMask with the local chains:

**Chain 31337 (Port 8545):**
- Chain ID: `31337`
- RPC URL: `http://127.0.0.1:8545`
- Currency Symbol: `ETH`

**Chain 31338 (Port 8546):**
- Chain ID: `31338`
- RPC URL: `http://127.0.0.1:8546`
- Currency Symbol: `ETH`

Import the test accounts using these private keys:
- Account 0: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Account 1: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

### 6. Interact with smart contracts

Navigate to the "Debug Contracts" page and interact with `YourContract.sol`.

## 🌐 Deploying to Kadena Testnet

### 1. Setup environment variables

```bash
# Set your deployer private key (fund your account first!)
export DEPLOYER_PRIVATE_KEY=your_private_key_here

# Set Blockscout API key for verification
export BLOCKSCOUT_API_KEY=your_api_key_here
```

### 2. Deploy to testnet

```bash
# Deploy to all Kadena testnet chains
yarn forge:deploy:testnet
```

### 3. Verify contracts

```bash
# Verify on a specific chain
cd packages/foundry/script
./verify.sh <CONTRACT_ADDRESS> YourContract 5920
```

### 4. Generate frontend artifacts

```bash
yarn forge:gen-contracts
```

### 5. 🦊 Connect MetaMask to Kadena Testnet

Add the testnet chains to MetaMask:

**Chain 20:**
- Chain ID: `5920`
- RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc`
- Explorer: `https://chain-20.evm-testnet-blockscout.chainweb.com/`

**Chain 21:**
- Chain ID: `5921`
- RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc`
- Explorer: `https://chain-21.evm-testnet-blockscout.chainweb.com/`

**Chain 22:**
- Chain ID: `5922`
- RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc`
- Explorer: `https://chain-22.evm-testnet-blockscout.chainweb.com/`

**Chain 23:**
- Chain ID: `5923`
- RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc`
- Explorer: `https://chain-23.evm-testnet-blockscout.chainweb.com/`

**Chain 24:**
- Chain ID: `5924`
- RPC: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc`
- Explorer: `https://chain-24.evm-testnet-blockscout.chainweb.com/`

**For all networks:**
- Currency Symbol: `KDA`

## 🛠 Available Commands

### Foundry Commands
- `yarn forge:build` - Build contracts
- `yarn forge:test` - Run tests with verbose output
- `yarn forge:deploy:anvil` - Deploy to local Anvil chains
- `yarn forge:deploy:testnet` - Deploy to Kadena testnet
- `yarn forge:gen-contracts` - Generate frontend contract artifacts
- `yarn forge:verify:testnet` - Verify contracts on testnet

### Standard Commands
- `yarn build` - Build contracts (aliased to `forge:build`)
- `yarn compile` - Compile contracts (aliased to `forge:build`)
- `yarn deploy` - Deploy to local chains (aliased to `forge:deploy:anvil`)
- `yarn test` - Run tests (aliased to `forge:test`)
- `yarn start` - Start the Next.js frontend

## 🔍 Project Structure

```
scaffold-kadena/
├── packages/
│   ├── foundry/                      # Foundry workspace
│   │   ├── src/                      # Smart contract source code
│   │   ├── script/                   # Deployment & verification scripts
│   │   ├── test/                     # Contract tests
│   │   ├── foundry.toml             # Foundry configuration
│   │   ├── remappings.txt           # Solidity import remappings
│   │   └── chainweb.config.json     # Kadena chain configuration
│   │
│   └── nextjs/                       # Frontend application
│       ├── components/               # React components
│       ├── pages/                    # Next.js pages
│       ├── public/                   # Static assets
│       ├── hooks/                    # Custom React hooks
│       ├── contracts/                # Auto-generated contract artifacts
│       ├── .env.example              # Environment variables
│       ├── scaffold.config.ts        # Scaffold-ETH configuration
│       └── next.config.js            # Next.js configuration
│
├── chainweb.config.json              # Root chain configuration
└── package.json                      # Root package configuration
```

## 🔧 Configuration Files

### `foundry.toml`
Foundry configuration with Kadena EVM settings, RPC endpoints, and FFI permissions.

### `chainweb.config.json`
Kadena chain configuration for different environments (anvil, sandbox, testnet).

### `remappings.txt`
Solidity import remappings for the `foundry-chainweb` plugin.

## 📚 Additional Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [Kadena Documentation](https://docs.kadena.io/)
- [Foundry Chainweb Plugin](https://github.com/kadena-io/foundry-chainweb)
- [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io/)

## 🚨 Troubleshooting

### Common Issues

**Contract verification fails:**
- Ensure `BLOCKSCOUT_API_KEY` is set
- Check that the contract address exists on the target chain
- Verify the compiler version matches your deployment

**Deployment fails:**
- Check that `DEPLOYER_PRIVATE_KEY` is set
- Ensure your account has sufficient KDA for gas fees
- Verify the RPC endpoints are accessible

**Frontend can't find contracts:**
- Run `yarn forge:gen-contracts` after deployment
- Check that `deployedContracts.ts` was generated correctly

### Getting Help

- Check the [Foundry Book](https://book.getfoundry.sh/) for Foundry-specific issues
- Review [Kadena EVM documentation](https://docs.kadena.io/) for network-specific questions
- Open an issue on the repository for scaffold-specific problems

## 🙏 Acknowledgments

- BuidlGuidl and the Scaffold-ETH team for the original framework
- Paradigm for creating Foundry
- Kadena team for EVM support and tooling

## 📄 License

MIT

---

Made with ❤️ by [SolidityDegen](https://x.com/SolidityDegen)

*Migrated from Hardhat to Foundry for improved performance and developer experience.*