// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ChainwebScript} from "kadena-io/foundry-chainweb/Chainweb.sol";
import {console} from "forge-std/console.sol";
import {YourContract} from "src/YourContract.sol";

contract Deploy is ChainwebScript {
    function run() public {
        uint256[] memory chainIds = chainweb.getChainIds();
        for (uint256 i = 0; i < chainIds.length; i++) {
            chainweb.switchChain(chainIds[i]);
            console.log("Deploying YourContract on chain:", block.chainid);
            vm.startBroadcast();
            YourContract yc = new YourContract(msg.sender);
            vm.stopBroadcast();
            console.log("YourContract deployed at:", address(yc));
        }
    }
}


