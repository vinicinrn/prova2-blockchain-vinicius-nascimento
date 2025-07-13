import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Counter contract...");
  
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  
  const address = await counter.getAddress();
  console.log("Counter deployed to:", address);
  
  // Verify the contract is working
  try {
    console.log("Verifying contract...");
    const count = await counter.count();
    console.log("Initial count:", count.toString());
    
    console.log("Testing increment...");
    const tx = await counter.increment();
    await tx.wait();
    console.log("Increment successful");
    
    const newCount = await counter.count();
    console.log("Count after increment:", newCount.toString());
    
    console.log("Contract verification successful!");
  } catch (error) {
    console.error("Contract verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

