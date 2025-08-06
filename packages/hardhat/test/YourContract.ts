import { expect } from "chai";
import { ethers, chainweb } from "hardhat";
import { YourContract } from "../typechain-types";
import type { DeployedContractsOnChains } from "@kadena/hardhat-chainweb/lib/utils";

describe("YourContract", function () {
  let deployments: DeployedContractsOnChains<YourContract>[];

  let yourContract: YourContract;
  before(async () => {
    // Get signers for the first chain to set up the test
    const [owner] = await ethers.getSigners();
    const deployed = await chainweb.deployContractOnChains<YourContract>({
      name: "YourContract",
      constructorArgs: [owner.address],
    });

    deployments = deployed.deployments;
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      // Use the chainweb plugin's runOverChains function to test on all chains.
      // runOverChains switches from the default chain to each chain in the deployment for you.
      await chainweb.runOverChains(async (chainId: number) => {
        const deployment = deployments.find(d => d.chain === chainId);
        expect(deployment).to.not.equal(undefined);
        yourContract = deployment.contract;
        expect(await yourContract.greeting()).to.equal("Build on Kadena!!!");
      });
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      // Alternative: Use a regular for loop to loop over deployments
      // You have switch chains yourself
      for (const deployment of deployments) {
        const { contract: yourContract, chain } = deployment;

        // Make sure we're on the right chain before AND after the transaction
        await chainweb.switchChain(chain);
        const tx = await yourContract.setGreeting(newGreeting);
        await tx.wait();
        expect(await yourContract.greeting()).to.equal(newGreeting);
      }
    });
  });
});
