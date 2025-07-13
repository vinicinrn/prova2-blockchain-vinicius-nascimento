import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Get the contract factory
  const Counter = await ethers.getContractFactory("Counter");
  
  // Attach to the deployed contract
  const counter = Counter.attach(contractAddress);
  
  try {
    console.log("Testing contract at:", contractAddress);
    
    // Try to read the count
    const count = await counter.count();
    console.log("Current count:", count.toString());
    
    // Try to call getCount
    const getCountResult = await counter.getCount();
    console.log("getCount result:", getCountResult.toString());
    
    // Try to increment
    console.log("Incrementing...");
    const tx = await counter.increment();
    await tx.wait();
    console.log("Increment transaction confirmed");
    
    // Read count again
    const newCount = await counter.count();
    console.log("New count after increment:", newCount.toString());
    
  } catch (error) {
    console.error("Error testing contract:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 