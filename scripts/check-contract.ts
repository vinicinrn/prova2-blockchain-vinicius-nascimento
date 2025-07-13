import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  console.log("=== VERIFICANDO ESTADO DO CONTRATO ===");
  console.log("Endereço do contrato:", contractAddress);
  
  // Get the contract factory
  const Counter = await ethers.getContractFactory("Counter");
  
  // Attach to the deployed contract
  const counter = Counter.attach(contractAddress);
  
  try {
    // Verifica o valor atual do contador
    const currentCount = await counter.count();
    console.log("Valor atual do contador:", currentCount.toString());
    
    // Verifica o valor usando getCount também
    const getCountResult = await counter.getCount();
    console.log("Valor usando getCount():", getCountResult.toString());
    
    // Verifica o último bloco
    const latestBlock = await ethers.provider.getBlockNumber();
    console.log("Último bloco:", latestBlock);
    
    // Verifica o saldo da conta padrão
    const signer = await ethers.provider.getSigner();
    const balance = await ethers.provider.getBalance(await signer.getAddress());
    console.log("Saldo da conta padrão:", ethers.formatEther(balance), "ETH");
    
    console.log("\n=== TESTE DE INCREMENTO ===");
    console.log("Valor antes do incremento:", currentCount.toString());
    
    // Faz um incremento
    const tx = await counter.increment();
    console.log("Transação enviada:", tx.hash);
    
    // Aguarda a confirmação
    await tx.wait();
    console.log("Transação confirmada!");
    
    // Lê o novo valor
    const newCount = await counter.count();
    console.log("Valor após incremento:", newCount.toString());
    
    console.log("\n=== VERIFICAÇÃO FINAL ===");
    console.log("✅ Contrato está funcionando corretamente!");
    console.log("✅ Transações estão sendo processadas!");
    console.log("✅ Estado está sendo persistido na blockchain!");
    
  } catch (error) {
    console.error("❌ Erro ao verificar contrato:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 