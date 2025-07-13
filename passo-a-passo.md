# Passo a Passo: Personalização e Configuração do Projeto Counter com Ganache

## 1. Alterar o nome do autor no contrato

1. Abra o arquivo `contracts/Counter.sol`.
2. Localize a linha:
   ```solidity
   author = "Vinicius Nascimento";
   ```
3. Altere para o nome desejado, por exemplo:
   ```solidity
   author = "Seu Nome Aqui";
   ```
4. Salve o arquivo.

## 2. Compilar e redeployar o contrato

1. No terminal, execute:
   ```sh
   npx hardhat compile
   ```
2. Em seguida, faça o deploy para o Ganache:
   ```sh
   npx hardhat run scripts/deploy.ts --network ganache
   ```
3. Copie o endereço do contrato exibido após o deploy.

## 3. Atualizar o ABI no frontend

1. Copie o arquivo gerado em `artifacts/contracts/Counter.sol/Counter.json`.
2. Cole e substitua em `client/src/Counter.json`.

## 4. Configurar as chaves privadas do Ganache

1. Abra o arquivo `hardhat.config.ts`.
2. Na seção `networks.ganache`, coloque as chaves privadas das contas do Ganache:
   ```js
   ganache: {
     url: "http://127.0.0.1:8545", // ou a porta configurada no Ganache
     accounts: [
       "0xSUA_PRIVATE_KEY_1",
       "0xSUA_PRIVATE_KEY_2",
       // ...adicione quantas quiser
     ]
   }
   ```
3. Salve o arquivo.

## 5. Configurar a porta do Ganache no frontend

1. No arquivo `client/src/App.tsx`, altere a linha do provider para a porta correta do Ganache:
   ```js
   const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
   ```
   > Se o Ganache estiver rodando em outra porta, ajuste o número conforme necessário.

## 6. Atualizar o endereço do contrato no frontend

1. No arquivo `client/src/App.tsx`, altere a linha:
   ```js
   const contractAddress = "0xSEU_ENDERECO_DO_DEPLOY";
   ```
   para o endereço exibido após o deploy.

## 7. Alterar a mensagem de parabéns no frontend

1. No arquivo `client/src/App.tsx`, localize o trecho:
   ```jsx
   {showCongrats && (
     <div style={{ color: "green", fontWeight: "bold", margin: "10px 0" }}>
       🎉 Parabéns! Você atingiu {PARABENS_NUMERO} incrementos! 🎉
     </div>
   )}
   ```
2. Altere o texto dentro da `<div>` para a mensagem desejada, por exemplo:
   ```jsx
   <div style={{ color: "green", fontWeight: "bold", margin: "10px 0" }}>
     🏆 Você chegou ao número mágico! 🏆
   </div>
   ```
3. Salve o arquivo.

## 8. Recarregar o frontend

1. Salve todas as alterações.
2. Recarregue a página do app.
3. Pronto! O nome do autor, as contas, a porta do Ganache e a mensagem de parabéns estarão atualizados.

---

Se tiver dúvidas, revise cada passo ou peça ajuda! 🚀 