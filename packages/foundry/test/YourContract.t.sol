// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {YourContract} from "../src/YourContract.sol";

contract YourContractTest is Test {
    YourContract public yourContract;
    address public owner;
    address public user;

    event GreetingChange(
        address indexed greetingSetter,
        string newGreeting,
        bool premium,
        uint256 value
    );

    function setUp() public {
        owner = makeAddr("owner");
        user = makeAddr("user");
        
        vm.startPrank(owner);
        yourContract = new YourContract(owner);
        vm.stopPrank();
    }

    function test_Constructor() public {
        assertEq(yourContract.owner(), owner);
        assertEq(yourContract.greeting(), "Build on Kadena!!!");
        assertEq(yourContract.premium(), false);
        assertEq(yourContract.totalCounter(), 0);
    }

    function test_SetGreeting() public {
        vm.startPrank(user);
        
        string memory newGreeting = "Hello Foundry!";
        
        vm.expectEmit(true, false, false, true);
        emit GreetingChange(user, newGreeting, false, 0);
        
        yourContract.setGreeting(newGreeting);
        
        assertEq(yourContract.greeting(), newGreeting);
        assertEq(yourContract.totalCounter(), 1);
        assertEq(yourContract.userGreetingCounter(user), 1);
        assertEq(yourContract.premium(), false);
        
        vm.stopPrank();
    }

    function test_SetGreetingWithValue() public {
        vm.startPrank(user);
        
        string memory newGreeting = "Premium Greeting!";
        uint256 value = 0.1 ether;
        
        vm.deal(user, value);
        
        vm.expectEmit(true, false, false, true);
        emit GreetingChange(user, newGreeting, true, value);
        
        yourContract.setGreeting{value: value}(newGreeting);
        
        assertEq(yourContract.greeting(), newGreeting);
        assertEq(yourContract.premium(), true);
        assertEq(yourContract.totalCounter(), 1);
        assertEq(yourContract.userGreetingCounter(user), 1);
        
        vm.stopPrank();
    }

    function test_Withdraw() public {
        // First, send some ETH to the contract
        vm.deal(user, 1 ether);
        vm.prank(user);
        yourContract.setGreeting{value: 1 ether}("Test");
        
        uint256 initialBalance = owner.balance;
        uint256 contractBalance = address(yourContract).balance;
        
        vm.prank(owner);
        yourContract.withdraw();
        
        assertEq(owner.balance, initialBalance + contractBalance);
        assertEq(address(yourContract).balance, 0);
    }

    function test_WithdrawNotOwner() public {
        vm.expectRevert("Not the Owner");
        vm.prank(user);
        yourContract.withdraw();
    }

    function test_Receive() public {
        uint256 value = 1 ether;
        vm.deal(user, value);
        
        vm.prank(user);
        (bool success,) = address(yourContract).call{value: value}("");
        
        assertTrue(success);
        assertEq(address(yourContract).balance, value);
    }

    function test_UserGreetingCounter() public {
        vm.startPrank(user);
        
        yourContract.setGreeting("First");
        yourContract.setGreeting("Second");
        yourContract.setGreeting("Third");
        
        assertEq(yourContract.userGreetingCounter(user), 3);
        assertEq(yourContract.totalCounter(), 3);
        
        vm.stopPrank();
    }

    function testFuzz_SetGreeting(string memory greeting) public {
        vm.assume(bytes(greeting).length > 0);
        vm.assume(bytes(greeting).length < 100); // Reasonable length
        
        vm.prank(user);
        yourContract.setGreeting(greeting);
        
        assertEq(yourContract.greeting(), greeting);
        assertEq(yourContract.totalCounter(), 1);
        assertEq(yourContract.userGreetingCounter(user), 1);
    }
}
