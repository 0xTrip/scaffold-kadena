#!/bin/bash

# Contract verification script for Kadena EVM networks
# Usage: ./verify.sh <CONTRACT_ADDRESS> <CONTRACT_NAME> <CHAIN_ID>

if [ $# -ne 3 ]; then
    echo "Usage: $0 <CONTRACT_ADDRESS> <CONTRACT_NAME> <CHAIN_ID>"
    echo "Example: $0 0x1234... YourContract 5920"
    echo ""
    echo "Available chain IDs:"
    echo "  5920 - Kadena Testnet Chain 20"
    echo "  5921 - Kadena Testnet Chain 21"
    echo "  5922 - Kadena Testnet Chain 22"
    echo "  5923 - Kadena Testnet Chain 23"
    echo "  5924 - Kadena Testnet Chain 24"
    exit 1
fi

CONTRACT_ADDRESS=$1
CONTRACT_NAME=$2
CHAIN_ID=$3

# Check if BLOCKSCOUT_API_KEY is set
if [ -z "$BLOCKSCOUT_API_KEY" ]; then
    echo "Error: BLOCKSCOUT_API_KEY environment variable is not set"
    echo "Please set it to your Blockscout API key:"
    echo "export BLOCKSCOUT_API_KEY=your_api_key_here"
    exit 1
fi

echo "Verifying contract $CONTRACT_NAME at $CONTRACT_ADDRESS on chain $CHAIN_ID..."

# Run the verification
forge verify-contract \
    $CONTRACT_ADDRESS \
    $CONTRACT_NAME \
    --chain-id $CHAIN_ID \
    --etherscan-api-key $BLOCKSCOUT_API_KEY \
    --compiler-version v0.8.24 \
    --watch

echo "Verification completed!"
