# 🚀 Scaffold-Kadena

> **A developer toolkit for building and deploying dApps on Kadena EVM using Foundry**

Scaffold-Kadena is a specialized fork of Scaffold-ETH 2, optimized for Kadena EVM development with Foundry. It provides a complete development environment for building, testing, and deploying smart contracts across all Kadena EVM chains.

## ✨ Key Features

- **🚀 Foundry-Based Development** - Lightning-fast compilation and testing
- **🔗 Multi-Chain Kadena Support** - Deploy to all 5 Kadena EVM chains
- **🎯 Zero Frontend Changes** - Existing UI hooks work seamlessly
- **🧪 Advanced Testing** - Fuzzing, gas reporting, and parallel execution
- **🔍 Built-in Verification** - Blockscout integration for contract verification
- **⚡ Modern Tooling** - Latest Solidity practices and EVM versions
- **📱 Next.js Frontend** - React-based UI with Web3 integration
- **🔐 Multi-Environment** - Local, sandbox, and testnet support

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (>=20.18.3)
- [Yarn](https://yarnpkg.com/) (>=1.22.0)
- [Git](https://git-scm.com/downloads)
- [Foundry](https://getfoundry.sh/) (Forge, Cast, Anvil)

### Installing Foundry

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash

# Restart your terminal or source your shell config
source ~/.zshenv  # For Zsh
# OR
source ~/.bashrc  # For Bash

# Install Foundry components
foundryup
```

Verify the installation:
```bash
forge --version
cast --version
anvil --version
```

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/0xTrip/scaffold-kadena.git
cd scaffold-kadena

# Install dependencies
yarn install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Set your deployer private key
export DEPLOYER_PRIVATE_KEY=your_private_key_here

# For testnet verification (optional)
export BLOCKSCOUT_API_KEY=your_blockscout_api_key_here
```

### 3. Local Development

```bash
# Start local Anvil chains (in separate terminals)
anvil --chain-id 31337 --port 8545 &
anvil --chain-id 31338 --port 8546 &

# Build contracts
yarn forge:build

# Run tests
yarn forge:test

# Deploy to local chains
yarn forge:deploy:anvil

# Generate frontend contract files
yarn forge:gen-contracts

# Start the frontend
yarn start
```

Visit [http://localhost:3000](http://localhost:3000) to interact with your contracts!

## 🔧 Development Workflow

### Building Contracts

```bash
# Build all contracts
yarn forge:build

# Build with specific settings
forge build --optimize --via-ir
```

### Testing

```bash
# Run all tests
yarn forge:test

# Run tests with verbose output
yarn forge:test -vvv

# Run specific test
forge test --match-test test_SetGreeting

# Run tests with gas reporting
forge test --gas-report
```

### Local Deployment

```bash
# Deploy to local Anvil chains
yarn forge:deploy:anvil

# Deploy to specific chain
forge script script/Deploy.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --private-key $DEPLOYER_PRIVATE_KEY --broadcast
```

### Testnet Deployment

```bash
# Deploy to Kadena testnet (all chains)
yarn forge:deploy:testnet

# Deploy to specific testnet chain
forge script script/Deploy.s.sol:Deploy --rpc-url https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc --private-key $DEPLOYER_PRIVATE_KEY --broadcast
```

### Contract Verification

```bash
# Verify on Blockscout (Chain 20)
yarn forge:verify:testnet

# Or use the verification script
cd packages/foundry/script
./verify.sh <CONTRACT_ADDRESS> YourContract 5920

# Manual verification
forge verify-contract \
  <CONTRACT_ADDRESS> \
  YourContract \
  --chain-id 5920 \
  --etherscan-api-key $BLOCKSCOUT_API_KEY \
  --compiler-version v0.8.24
```

## 📁 Project Structure

```
scaffold-kadena/
├── packages/
│   ├── foundry/                 # Foundry workspace
│   │   ├── src/                 # Smart contracts
│   │   ├── script/              # Deployment scripts
│   │   ├── test/                # Test files
│   │   ├── lib/                 # Dependencies
│   │   ├── foundry.toml         # Foundry configuration
│   │   └── remappings.txt       # Import mappings
│   └── nextjs/                  # Frontend application
├── chainweb.config.json         # Kadena chain configuration
├── package.json                 # Root package configuration
└── README.md                    # This file
```

## ⚙️ Configuration Files

### `foundry.toml`

Foundry's main configuration file with Kadena-specific settings:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "prague"
optimizer = true
optimizer_runs = 1000
ffi = true
fs_permissions = [{ access = "read", path = "./chainweb.config.json" }]

[rpc_endpoints]
localhost = "http://127.0.0.1:8545"
testnet20 = "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc"
testnet21 = "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc"
testnet22 = "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc"
testnet23 = "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc"
testnet24 = "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc"
```

### `chainweb.config.json`

Configuration for different Kadena environments:

```json
{
  "anvil": {
    "numberOfChains": 2,
    "chainwebChainIdOffset": 0,
    "chainIdOffset": 31337
  },
  "sandbox": {
    "numberOfChains": 5,
    "chainwebChainIdOffset": 20,
    "chainIdOffset": 1789
  },
  "testnet": {
    "numberOfChains": 5,
    "chainwebChainIdOffset": 20,
    "chainIdOffset": 5920
  }
}
```

### `remappings.txt`

Solidity import mappings for the foundry-chainweb plugin:

```txt
kadena-io/foundry-chainweb/=lib/foundry-chainweb/src/
```

## 🎯 Available Commands

### Root Level Commands

```bash
# Build and compile
yarn build                    # Build contracts
yarn compile                  # Alias for build

# Testing
yarn test                     # Run all tests

# Deployment
yarn deploy                   # Deploy to local chains
yarn deploy:localhost         # Deploy to local chains
yarn deploy:testnet          # Deploy to testnet

# Frontend
yarn start                    # Start development server
yarn next:build              # Build frontend
yarn next:lint               # Lint frontend code
yarn next:format             # Format frontend code

# Deployment
yarn vercel                   # Deploy to Vercel
yarn ipfs                     # Deploy to IPFS
```

### Foundry Commands

```bash
# Build and test
yarn forge:build             # Build contracts
yarn forge:test              # Run tests with verbose output

# Deployment
yarn forge:deploy:anvil      # Deploy to local Anvil chains
yarn forge:deploy:testnet    # Deploy to Kadena testnet

# Utilities
yarn forge:gen-contracts     # Generate frontend contract files
yarn forge:verify:testnet    # Verify contract on testnet
```

### Direct Foundry Commands

```bash
# Build
forge build

# Test
forge test -vvv

# Deploy
forge script script/Deploy.s.sol:Deploy --multi --private-key $DEPLOYER_PRIVATE_KEY --broadcast

# Verify
forge verify-contract <ADDRESS> YourContract --chain-id 5920 --etherscan-api-key $BLOCKSCOUT_API_KEY
```

## 🔗 Kadena EVM Networks

### Local Development (Anvil)
- **Chain 20**: `http://127.0.0.1:8545` (Chain ID: 31337)
- **Chain 21**: `http://127.0.0.1:8546` (Chain ID: 31338)

### Testnet
- **Chain 20**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc` (Chain ID: 5920)
- **Chain 21**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc` (Chain ID: 5921)
- **Chain 22**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc` (Chain ID: 5922)
- **Chain 23**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc` (Chain ID: 5923)
- **Chain 24**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc` (Chain ID: 5924)

### Mainnet (Coming Soon)
- **Chain 20**: `https://evm.chainweb.com/chainweb/0.0/mainnet01/chain/20/evm/rpc` (Chain ID: 20)
- **Chain 21**: `https://evm.chainweb.com/chainweb/0.0/mainnet01/chain/21/evm/rpc` (Chain ID: 21)
- **Chain 22**: `https://evm.chainweb.com/chainweb/0.0/mainnet01/chain/22/evm/rpc` (Chain ID: 22)
- **Chain 23**: `https://evm.chainweb.com/chainweb/0.0/mainnet01/chain/23/evm/rpc` (Chain ID: 23)
- **Chain 24**: `https://evm.chainweb.com/chainweb/0.0/mainnet01/chain/24/evm/rpc` (Chain ID: 24)

## 🧪 Testing Your Contracts

### Writing Tests

Tests are written in Solidity using Foundry's `Test.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {YourContract} from "../src/YourContract.sol";

contract YourContractTest is Test {
    YourContract public yourContract;
    
    function setUp() public {
        yourContract = new YourContract(msg.sender);
    }
    
    function test_Constructor() public {
        assertEq(yourContract.owner(), msg.sender);
    }
}
```

### Running Tests

```bash
# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test
forge test --match-test test_Constructor

# Run with gas reporting
forge test --gas-report

# Run with coverage
forge coverage
```

## 🚀 Deployment

### Local Deployment

1. **Start Anvil chains**:
   ```bash
   anvil --chain-id 31337 --port 8545 &
   anvil --chain-id 31338 --port 8546 &
   ```

2. **Deploy contracts**:
   ```bash
   yarn forge:deploy:anvil
   ```

3. **Generate frontend files**:
   ```bash
   yarn forge:gen-contracts
   ```

### Testnet Deployment

1. **Set environment variables**:
   ```bash
   export DEPLOYER_PRIVATE_KEY=your_private_key
   export BLOCKSCOUT_API_KEY=your_api_key
   ```

2. **Deploy to testnet**:
   ```bash
   yarn forge:deploy:testnet
   ```

3. **Verify contracts**:
   ```bash
   yarn forge:verify:testnet
   ```

## 🔍 Contract Verification

### Blockscout Verification

Kadena EVM uses Blockscout for contract verification:

```bash
# Using the verification script
cd packages/foundry/script
./verify.sh <CONTRACT_ADDRESS> YourContract 5920

# Manual verification
forge verify-contract \
  <CONTRACT_ADDRESS> \
  YourContract \
  --chain-id 5920 \
  --etherscan-api-key $BLOCKSCOUT_API_KEY \
  --compiler-version v0.8.24
```

### Verification Requirements

- **Contract Address**: The deployed contract address
- **Contract Name**: The name of your contract (e.g., `YourContract`)
- **Chain ID**: The Kadena EVM chain ID (e.g., `5920` for testnet chain 20)
- **API Key**: Your Blockscout API key
- **Compiler Version**: The Solidity compiler version used

## 🎨 Frontend Development

### Contract Integration

The frontend automatically uses the generated `deployedContracts.ts` file:

```typescript
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

const { data: greeting } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "greeting",
});
```

### Available Hooks

- `useScaffoldReadContract` - Read contract data
- `useScaffoldWriteContract` - Write to contracts
- `useScaffoldWatchContractEvent` - Watch contract events
- `useScaffoldEventHistory` - Get event history

### UI Components

- `Address` - Display Ethereum addresses
- `AddressInput` - Input Ethereum addresses
- `Balance` - Display token balances
- `EtherInput` - Input with ETH/USD conversion

## 🚨 Troubleshooting

### Common Issues

#### Foundry Not Found
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
source ~/.zshenv
foundryup
```

#### Build Failures
```bash
# Clean and rebuild
forge clean
forge build
```

#### Deployment Issues
```bash
# Check environment variables
echo $DEPLOYER_PRIVATE_KEY
echo $BLOCKSCOUT_API_KEY

# Verify RPC endpoints
forge script script/Deploy.s.sol:Deploy --dry-run
```

#### Frontend Integration Issues
```bash
# Regenerate contract files
yarn forge:gen-contracts

# Check deployedContracts.ts
cat packages/nextjs/contracts/deployedContracts.ts
```

### Getting Help

- **Foundry Documentation**: [https://book.getfoundry.sh/](https://book.getfoundry.sh/)
- **Kadena Documentation**: [https://docs.kadena.io/](https://docs.kadena.io/)
- **Issues**: [GitHub Issues](https://github.com/0xTrip/scaffold-kadena/issues)

## 🔄 Migration from Hardhat

If you're migrating from Hardhat, see our comprehensive [Migration Guide](MIGRATION_GUIDE.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone
git clone https://github.com/your-username/scaffold-kadena.git
cd scaffold-kadena

# Install dependencies
yarn install

# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
yarn forge:test
yarn next:lint

# Commit and push
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Scaffold-ETH 2** - The original framework
- **Foundry** - The amazing Solidity toolkit
- **Kadena** - The blockchain platform
- **foundry-chainweb** - The Kadena EVM plugin

## 📞 Support

- **Documentation**: [https://docs.kadena.io/](https://docs.kadena.io/)
- **Discord**: [Kadena Discord](https://discord.gg/kadena)
- **Twitter**: [@Kadena_io](https://twitter.com/Kadena_io)

---

**Built with ❤️ for the Kadena community**