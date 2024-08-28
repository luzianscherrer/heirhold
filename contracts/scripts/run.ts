import { ethers } from "hardhat";

const contractAddress = "0xEf06B4970F659E8B5025Ec588241F703d2467605";

async function createHeirholdWallet() {
  try {
    const HeirholdFactory = await ethers.getContractFactory("HeirholdFactory");
    const heirholdFactory = HeirholdFactory.attach(contractAddress);

    heirholdFactory.on("CreateHeirholdWallet", async (walletAddress, owner) => {
      console.log(`HeirholdWalletCreate fired`);
      console.log(`Wallet Address: ${walletAddress}`);
      console.log(`Owner: ${owner}`);
    });

    const tx = await heirholdFactory.createHeirholdWallet(
      10 * 60,
      ethers.parseUnits("0.0001", "ether"),
      [
        ethers.getAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"),
        ethers.getAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"),
      ],
      { value: ethers.parseUnits("0.0009", "ether") }
    );
    const receipt = await tx.wait();
    console.log(`Transaction ${receipt.hash})`);
  } catch (error) {
    console.error(`Error during contract interaction: ${error}`);
  }
}

async function main() {
  await createHeirholdWallet();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
