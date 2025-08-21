# 🚀 Hardhat to Foundry Migration Guide

This document outlines the complete migration from Hardhat to Foundry in the Scaffold-Kadena project, explaining what changed, what stayed the same, and how to use the new workflow.

## 📋 Migration Overview

### What Changed
- **Build System**: Hardhat → Foundry (Forge)
- **Testing Framework**: Hardhat → Foundry (Forge)
- **Local Node**: Hardhat Network → Anvil
- **Deployment**: Hardhat scripts → Foundry scripts
- **Plugin**: `@kadena/hardhat-chainweb` → `kadena-io/foundry-chainweb`

### What Stayed the Same
- **Frontend**: Next.js app remains unchanged
- **Contract Logic**: Solidity contracts are identical
- **UI Hooks**: `useScaffoldReadContract` and `useScaffoldWriteContract` work the same
- **Contract Artifacts**: `deployedContracts.ts` format is preserved
- **Multi-chain Support**: All 5 Kadena EVM chains are supported

## 🔄 Migration Steps Completed

### 1. ✅ Foundry Workspace Setup
- Created `packages/foundry/` directory
- Initialized Foundry project with `forge init`
- Installed `kadena-io/foundry-chainweb` plugin

### 2. ✅ Contract Migration
- Copied `YourContract.sol` from Hardhat to Foundry
- Updated imports: `hardhat/console.sol` → `forge-std/console.sol`
- Verified compilation with `forge build`

### 3. ✅ Configuration Migration
- **`foundry.toml`**: Configured for Kadena EVM with Prague EVM version
- **`remappings.txt`**: Added plugin import mappings
- **`chainweb.config.json`**: Preserved Kadena chain configurations

### 4. ✅ Deployment Script Migration
- **Hardhat**: `packages/hardhat/scripts/deployToRemoteChains.ts`
- **Foundry**: `packages/foundry/script/Deploy.s.sol`
- **Key Change**: TypeScript → Solidity script using `ChainwebScript`

### 5. ✅ Frontend Integration
- **Contract Generator**: `generateDeployedContracts.mjs` reads Foundry outputs
- **Output Format**: Maintains exact `deployedContracts.ts` structure
- **UI Compatibility**: Frontend hooks work without modification

### 6. ✅ NPM Scripts Migration
- **Old**: `yarn hardhat:compile`, `yarn hardhat:deploy`
- **New**: `yarn forge:build`, `yarn forge:deploy:anvil`
- **Aliases**: `yarn build`, `yarn deploy` point to Foundry commands

## 🆕 New Foundry Commands

### Build & Test
```bash
# Build contracts
yarn forge:build
# or
yarn build

# Run tests
yarn forge:test
# or
yarn test
```

### Deployment
```bash
# Deploy to local Anvil chains
yarn forge:deploy:anvil

# Deploy to Kadena testnet
yarn forge:deploy:testnet

# Deploy to local chains (alias)
yarn deploy
```

### Contract Management
```bash
# Generate frontend artifacts
yarn forge:gen-contracts

# Verify contracts on testnet
yarn forge:verify:testnet
```

## 🔧 Configuration Changes

### Environment Variables
```bash
# Required for deployment
export DEPLOYER_PRIVATE_KEY=your_private_key_here

# Required for verification
export BLOCKSCOUT_API_KEY=your_api_key_here
```

### Chain Configuration
The `chainweb.config.json` file defines three environments:
- **`anvil`**: Local development (chains 31337, 31338)
- **`sandbox`**: Local sandbox (chains 1789-1793)
- **`testnet`**: Kadena testnet (chains 5920-5924)

## 📁 File Structure Changes

### Before (Hardhat)
```
packages/
├── hardhat/
│   ├── contracts/
│   ├── scripts/
│   └── hardhat.config.ts
└── nextjs/
```

### After (Foundry)
```
packages/
├── foundry/
│   ├── src/
│   ├── script/
│   ├── test/
│   ├── foundry.toml
│   └── remappings.txt
└── nextjs/
├── contracts/          # Auto-generated
└── ...
```

## 🚀 New Development Workflow

### 1. Local Development
```bash
# Start Anvil chains
anvil --chain-id 31337 --port 8545 &
anvil --chain-id 31338 --port 8546 &

# Deploy contracts
export DEPLOYER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
yarn forge:deploy:anvil

# Generate frontend artifacts
yarn forge:gen-contracts

# Start frontend
yarn start
```

### 2. Testnet Deployment
```bash
# Set environment variables
export DEPLOYER_PRIVATE_KEY=your_key_here
export BLOCKSCOUT_API_KEY=your_api_key_here

# Deploy to testnet
yarn forge:deploy:testnet

# Generate artifacts
yarn forge:gen-contracts

# Verify contracts (optional)
cd packages/foundry/script
./verify.sh <ADDRESS> YourContract 5920
```

## 🔍 Contract Verification

### Foundry Verification
```bash
# Using the verification script
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
- **Blockscout API Key**: Required for verification
- **Contract Address**: Must exist on target chain
- **Compiler Version**: Must match deployment version
- **Chain ID**: Must be one of the supported Kadena chains

## 🧪 Testing Changes

### Before (Hardhat)
```typescript
// packages/hardhat/test/YourContract.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("YourContract", function () {
  // Test implementation
});
```

### After (Foundry)
```solidity
// packages/foundry/test/YourContract.t.sol
import {Test} from "forge-std/Test.sol";
import {YourContract} from "../src/YourContract.sol";

contract YourContractTest is Test {
    // Test implementation
}
```

## 🚨 Common Issues & Solutions

### 1. Contract Not Found
**Problem**: Frontend can't find deployed contracts
**Solution**: Run `yarn forge:gen-contracts` after deployment

### 2. Verification Fails
**Problem**: Contract verification fails on Blockscout
**Solution**: 
- Check `BLOCKSCOUT_API_KEY` is set
- Verify contract address exists on target chain
- Ensure compiler version matches

### 3. Deployment Fails
**Problem**: Deployment script fails
**Solution**:
- Check `DEPLOYER_PRIVATE_KEY` is set
- Ensure account has sufficient KDA
- Verify RPC endpoints are accessible

### 4. Import Errors
**Problem**: Solidity import errors
**Solution**: Check `remappings.txt` and `foundry.toml` configuration

## 📚 Learning Resources

### Foundry Documentation
- [Foundry Book](https://book.getfoundry.sh/) - Official documentation
- [Foundry Examples](https://github.com/foundry-rs/foundry/tree/master/examples)

### Kadena Resources
- [Kadena EVM Documentation](https://docs.kadena.io/)
- [Foundry Chainweb Plugin](https://github.com/kadena-io/foundry-chainweb)

### Migration References
- [Hardhat to Foundry Migration](https://book.getfoundry.sh/tutorials/hardhat-migration)
- [Foundry vs Hardhat Comparison](https://book.getfoundry.sh/getting-started/hardhat-migration)

## 🔮 Future Enhancements

### Potential Improvements
1. **Automated Testing**: Add comprehensive Foundry tests
2. **Gas Optimization**: Use Foundry's gas reporting features
3. **Fuzzing**: Implement property-based testing with Foundry
4. **Benchmarking**: Compare performance with Hardhat
5. **CI/CD**: Integrate Foundry into GitHub Actions

### Plugin Features
- **Multi-chain Deployment**: Already implemented
- **Contract Verification**: Already implemented
- **Chain Management**: Already implemented
- **Future**: Additional Kadena-specific features

## 📝 Migration Checklist

### For Developers
- [ ] Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
- [ ] Clone updated repository
- [ ] Run `yarn install` and `forge install`
- [ ] Test local deployment: `yarn forge:deploy:anvil`
- [ ] Verify frontend integration: `yarn forge:gen-contracts`
- [ ] Test contract interaction in UI

### For DevOps
- [ ] Update CI/CD pipelines to use Foundry
- [ ] Configure environment variables
- [ ] Update deployment scripts
- [ ] Test testnet deployment
- [ ] Verify contract verification process

### For Documentation
- [ ] Update team documentation
- [ ] Create Foundry-specific guides
- [ ] Update troubleshooting guides
- [ ] Train team on new workflow

## 🎯 Benefits of Migration

### Performance Improvements
- **Compilation**: 2-10x faster than Hardhat
- **Testing**: Parallel test execution
- **Gas Reporting**: Built-in gas optimization tools

### Developer Experience
- **Standard Library**: Battle-tested testing utilities
- **Fuzzing**: Property-based testing support
- **Debugging**: Enhanced debugging capabilities
- **Tooling**: Modern CLI tools (Forge, Cast, Anvil)

### Ecosystem Benefits
- **Community**: Growing Foundry ecosystem
- **Innovation**: Latest Solidity development practices
- **Integration**: Better tooling integration
- **Future-proof**: Industry standard for Solidity development

## 🤝 Support & Questions

### Getting Help
1. **Foundry Issues**: Check [Foundry Book](https://book.getfoundry.sh/)
2. **Kadena Issues**: Review [Kadena Documentation](https://docs.kadena.io/)
3. **Migration Issues**: Open issue on repository
4. **Team Support**: Reach out to team members

### Contributing
- Report bugs and issues
- Suggest improvements
- Share migration experiences
- Help document best practices

---

**Migration completed successfully! 🎉**

The project now uses Foundry for a faster, more efficient development experience while maintaining full compatibility with the existing frontend and Kadena EVM infrastructure.
