import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CounterABI from "./Counter.json";
import "./App.css";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "0xcaF194B821db48F6830BdbCeBb1fa8c9158ecA0D"; // Substitua pelo endereço do contrato

const PARABENS_NUMERO = 3;

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        console.log("Loading contract...");
        const accounts = await provider.listAccounts();
        const signer = await provider.getSigner();
        setSigner(signer);

        if (accounts.length > 0) {
          const address = await accounts[0].getAddress();
          setAccount(address);
        }

        const contractInstance = new ethers.Contract(contractAddress, CounterABI.abi, signer);
        setContract(contractInstance);
        
        // Lê o nome do autor
        try {
          const authorName = await contractInstance.author();
          setAuthor(authorName);
        } catch (authorError) {
          setAuthor("");
        }
        
        // Tenta ler o valor inicial
        try {
          const currentCount = await contractInstance.getCount();
          console.log("Initial count loaded:", currentCount.toString());
          setCount(Number(currentCount));
        } catch (readError) {
          console.log("Could not read initial count, setting to 0");
          setCount(0);
        }
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (count === PARABENS_NUMERO) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
    }
  }, [count]);

  const increment = async () => {
    console.log("Increment button clicked, current count:", count);
    if (!signer || !contract) {
      console.log("Missing signer or contract");
      return;
    }
    
    setLoading(true);
    try {
      console.log("Sending increment transaction...");
      const tx = await contract.increment();
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");
      
      // Lê o valor imediatamente após a confirmação
      try {
        console.log("Reading new count...");
        const newCount = await contract.getCount();
        console.log("New count read:", newCount.toString());
        setCount(Number(newCount));
      } catch (readError) {
        console.error("Error reading new count:", readError);
        // Se não conseguir ler, incrementa manualmente
        setCount(prevCount => prevCount + 1);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error incrementing:", error);
      setLoading(false);
    }
  };

  const decrement = async () => {
    console.log("Decrement button clicked, current count:", count);
    if (!signer || !contract) {
      console.log("Missing signer or contract");
      return;
    }
    
    setLoading(true);
    try {
      console.log("Sending decrement transaction...");
      const tx = await contract.decrement();
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");
      
      // Lê o valor imediatamente após a confirmação
      try {
        console.log("Reading new count...");
        const newCount = await contract.getCount();
        console.log("New count read:", newCount.toString());
        setCount(Number(newCount));
      } catch (readError) {
        console.error("Error reading new count:", readError);
        // Se não conseguir ler, decrementa manualmente
        setCount(prevCount => Math.max(0, prevCount - 1));
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error decrementing:", error);
      setLoading(false);
    }
  };

  const reset = async () => {
    if (!signer || !contract) return;
    setLoading(true);
    try {
      const tx = await contract.reset();
      await tx.wait();
      const newCount = await contract.getCount();
      setCount(Number(newCount));
    } catch (error) {
      console.error("Error resetting count:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Contador Descentralizado</h1>
      {author && <p>Autor: {author}</p>}
      <p>Conta: {account}</p>
      <p>Contador: {count}</p>
      {showCongrats && (
        <div style={{ color: "green", fontWeight: "bold", margin: "10px 0" }}>
           Parabéns, pequeno gafanhoto! Você atingiu {PARABENS_NUMERO} incrementos! 🎉
        </div>
      )}
      <button onClick={increment} disabled={loading}>
        {loading ? "Processando..." : "Incrementar"}
      </button>
      <button onClick={decrement} disabled={loading}>
        {loading ? "Processando..." : "Decrementar"}
      </button>
      <button onClick={reset} disabled={loading}>
        {loading ? "Processando..." : "Zerar Contador"}
      </button>
      {loading && <p>Transação em andamento...</p>}
    </div>
  );
};

export default App;
