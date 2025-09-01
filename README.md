# 🚀 Scaffold-Kadena

> **A developer toolkit for building and deploying dApps on Kadena EVM using Foundry**

Scaffold-Kadena is a specialized fork of Scaffold-ETH 2, optimized for Kadena EVM development with Foundry. It provides a complete development environment for building, testing, and deploying smart contracts across all Kadena EVM chains.

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

# Restart your terminal

# Install Foundry components
foundryup
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

# Edit .env and set your deployer private key
# Generate a new private key for testing: openssl rand -hex 32
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

## 🔧 Development Commands

### Building and Testing

```bash
# Build contracts
yarn forge:build

# Run tests
yarn forge:test

# Run tests with gas reporting
yarn forge:test --gas-report
```

### Deployment

```bash
# Deploy to local Anvil chains
yarn forge:deploy:anvil

# Deploy to Kadena testnet (all chains)
yarn forge:deploy:testnet

# Generate frontend contract files
yarn forge:gen-contracts
```

### Frontend

```bash
# Start development server
yarn start

# Build frontend
yarn next:build

# Lint and format
yarn next:lint
yarn next:format
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

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DEPLOYER_PRIVATE_KEY` | Private key for contract deployment | Yes | - |
| `CHAINWEB` | Chainweb environment to use | No | `anvil` |
| `BLOCKSCOUT_API_KEY` | API key for contract verification | No | - |

### Kadena EVM Networks

#### Local Development (Anvil)
- **Chain 20**: `http://127.0.0.1:8545` (Chain ID: 31337)
- **Chain 21**: `http://127.0.0.1:8546` (Chain ID: 31338)

#### Testnet
- **Chain 20**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc` (Chain ID: 5920)
- **Chain 21**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc` (Chain ID: 5921)
- **Chain 22**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc` (Chain ID: 5922)
- **Chain 23**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/23/evm/rpc` (Chain ID: 5923)
- **Chain 24**: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/24/evm/rpc` (Chain ID: 5924)

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

#### Environment Setup Issues
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your private key
echo "DEPLOYER_PRIVATE_KEY=your_private_key_here" >> .env
```

### Getting Help

- **Foundry Documentation**: [https://book.getfoundry.sh/](https://book.getfoundry.sh/)
- **Kadena Documentation**: [https://docs.kadena.io/](https://docs.kadena.io/)
- **Issues**: [GitHub Issues](https://github.com/0xTrip/scaffold-kadena/issues)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

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