# 🏗 Scaffold Kadena (EVM Chains)

A custom fork of Scaffold-ETH 2 with specialized support for Kadena EVM networks, making it easier to build and deploy dApps on Kadena's blockchain across multiple environments.

**Kadena-Specific Dependencies:**
- `@kadena/hardhat-chainweb` - For simplified Kadena EVM chain interaction with multi-environment support and contract verification via blockscout
- `@kadena/hardhat-kadena-create2` - For CREATE2 deployments on Kadena (if needed)

**Multi-Environment Support:**
- **Hardhat (Local)**
- **[Sandbox](https://github.com/kadena-io/kadena-evm-sandbox) (Local):** `http://localhost:1848` - For local development with testnet constraints
- **Testnet:** `https://evm-testnet.chainweb.com` - For production testing

## 🚀 Quick Start

### Prerequisites

- [Node (>= v20.18.3)](https://nodejs.org/en/)
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

## Running on localhost
### 1. Run two local Hardhat chains in the first terminal:

```bash
yarn chain
```

### 2. In a SECOND terminal, deploy the contract to localhost:

```bash
cd scaffold-kadena
yarn deploy:localhost
```

### 3. In a THIRD terminal, start your NextJS app:
First setup the nextjs env file:

```bash
cd scaffold-kadena/packages/nextjs
cp .env.example .env
```

Then run from that directory or the top level directory
```bash
yarn start
```

Your application will be available at: http://localhost:3000

### 4:  🦊 Connect MetaMask to Kadena Hardhat localhost:
Open a browser where you have MetaMask installed

Configure the known Hardhat account 0 and account 1 by importing the following private keys into MetaMask:
* account 0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
* account 1: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

In MetaMask, you accomplish this by clickig the active account and then clicking the `Add account or hardhare wallet button`.
Select `Private Key` from the list. Copy and paste the account0 private key. Repeat for account 1.

In the frontend (http://localhost:3000), click on the "Connect Wallet" button in the top right corner. Follow the prompt to add Kadena Localhost Chain 0. Repeat for Kadena localhost chain 1 by clicking on the wallet addres that is now connected. click "Switch Network" in the drop-down menu and follow the prompt to add (switch to) Kadena Localhost 1. You can now switch between the chains in MetMask.

### 5:  Interact with the smart contract
Click on on `Debug Contracts` in the top left corner or on the main page. You may have to click this twice. Interact with the 
`packages/hardhat/contracts/YourContract.sol`.

## Running against Kadena Testnet Chains
### 1. First setup the Hardhat env file:

```bash
cd scaffold-kadena/packages/hardhat
cp .env.example .env

```

### 2. Configure your deployer account
Scaffoled-eth2 (the project from which this template is forked), provides the possibility of deploying using an unencrypted or encrypted private key.

If you want to deploy your contract using your own account with an unencrypted key, you should replace the `DEPLOYER_PRIVATE_KEY `value
in `packages/hardhat/.env `with your own private key.

Another option is to use an encrypted private key by either importing and encrypting your own private key:

```bash
yarn account:import

```
or letting the project generate an encrypted private key (and associated address) for you:
```bash
yarn account:generate

```
Both of these options will populate a value for `DEPLOYER_PRIVATE_KEY_ENCRYPTED` in your `packages/hardhat/.env` file (which you should have created in step 1 above).

In both of thse scenarios, you will need to fund your account on all Kadena Testnet chains using the Kadena EVM [faucet](https://tools.kadena.io/faucet/evm)


### 3. In the SECOND terminal (where you previously ran `yarn deploy:localhost`), deploy to all Kadena testnet chains using CREATE2 and verify contracts by running

Return to the root directory

```bash
cd ../../

```
run 
```bash

yarn deploy:testnet

```


Note: After you run the deploy command to deploy your contracts deterministically using [CREATE2](https://medium.com/@joichiro.sai/what-is-create2-a-guide-to-pre-determining-smart-contract-addresses-in-ethereum-deec22e70a6f), subsequent `yarn deploy:testnet` commands will report that the contract is already deployed and will not redeploy it if you haven't modified the code. To deploy the same code to a different address, you can change the salt in the deployment [script](https://github.com/0xTrip/scaffold-kadena/blob/a09908dae654f3a3d4a21cfa601f9f474cabb60e/packages/hardhat/scripts/deployToRemoteChains.ts#L20https://github.com/0xTrip/scaffold-kadena/blob/a09908dae654f3a3d4a21cfa601f9f474cabb60e/packages/hardhat/scripts/deployToRemoteChains.ts#L20).

Note also that if you prefer to not deploy deterministically, you can modify the `packages/hardhat/scripts/deployToRemoteChains.ts` to use `chainweb.deployContractOnChains`, as is currently being demonstrated for local deployments in the packages/hardhat/scripts/runHardhatDeployWithPK.ts [script](https://github.com/0xTrip/scaffold-kadena/blob/a46c71a16b4d282208037e255fc89eb740ece536/packages/hardhat/scripts/runHardhatDeployWithPK.ts#L33).


### 4. Modify the frontend to run against testnet
* cd to packages/nextjs
* Change `NEXT_PUBLIC_USE_LOCALHOST=true` to `false`
* The frontend should automatically update to point to testnet


### 5. 🦊 Connect MetaMask to Kadena Testnet Chains

The project supports **5 chains per environment**. Add any or all of them to MetaMask.
The Kadena Testnet Explorer has a button that you can use to easily add the chains to MetaMask.
To do this, first go tho the block explorer for Kadena Testnet Chain [20](https://chain-20.evm-testnet-blockscout.chainweb.com/).  Scroll down to the bottom of the page, and click on the `Add testnet@chain20` button.

Swtich to chain 21 using one of the drop-downs at the top of the page. Scroll to the botom and click the 
`Add testnet@chain21` button.

Repeat for chains 22 - 24.

To manually configure the Kadena Testnet chains, add the chains below as custom networks in MetaMask

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


**For all networks:**
- **Currency Symbol**: KDA

## 🔍 Contract Verification & Block Explorers

Each chain has its own Blockscout instance for contract verification, replace ```ChainId``` with target chain ID:

- **Testnet**: `http://chain-<ChainId>.evm-testnet-blockscout.chainweb.com/` 


## 🔍 Project Structure

```
scaffold-kadena/
├── packages/
│   ├── hardhat/                      # Solidity contracts & deployment
│   │   ├── contracts/                # Smart contract code
│   │   ├── .env.example              # Environment variables (copy this - see instructions above)
│   │   └── hardhat.config.ts         # Multi-environment Hardhat configuration
│   │
│   └── nextjs/                       # Frontend application
│       ├── components/               # React components
│       ├── pages/                    # Next.js pages
│       ├── public/                   # Static assets
│       ├── hooks/                    # Custom React hooks
|       |__ .env.example              # Environment variables (copy this - see instructions above)
│       ├── scaffold.config.ts        # Scaffold-ETH configuration
│       └── next.config.js            # Next.js configuration
```

## 📙 Docs

This repository is forked from Scaffold-ETH 2. In depth usage instructions can be found here:

 - [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io/)

## 📚 Additional Resources

- [Kadena Documentation](https://docs.kadena.io/)
- [Hardhat Kadena Plugin](https://www.npmjs.com/package/@kadena/hardhat-chainweb)
- [Hardhat Kadena Create2 Plugin](https://www.npmjs.com/package/@kadena/hardhat-kadena-create2)

## Troubleshooting Known Issues

If you see SWC dependency warnings when starting the frontend:

```bash
# Stop the dev server and again run:
yarn install
yarn start
```
## 🙏 Acknowledgments

- BuidlGuidl and the Scaffold-ETH team for the original framework

## 📄 License

MIT

---

Made with ❤️ by [SolidityDegen](https://x.com/SolidityDegen)
