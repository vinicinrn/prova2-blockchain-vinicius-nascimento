import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0xfde6f837ed2b58781b7154686675084c23058063de8e6e13d4f4140d9d961591",
        "0x6ff33692274fed68c41181e4d070d541c9b6c7e02d6cffc07015668428f17df6",
        "0xa5fe64c6c24decd8e537ca75f1d8e04edb84e48352b5ab4696d3493992211fef",
        "0xd39f6f14d23a22a6d4e02922aa817abdc1228d3f0f25113f3babf2ad01c86268",
        "0x7accf2ccd1e5593cdb55e9f53aa40e35747a185857001467384eab2b339e710c",
        "0x841a3bf013d1a480962f7307307e1753cd6f204ce2894655e42e365328696434",
        "0x25d84a3caff6c13d09e2b9cd47722c460df3338ba070ddc2392103cf1f764f37",
        "0xaa9bc534d109d9ea61652bafe295a210fd6c84d34e833a2b45c7627b167abe13",
        "0x79ac0692f755caf5808b90ac3052c9e3d33771fea958b83186d87d9607dc1fa4",
        "0xa7aed668b4f23e9edf32aaa991f1f95e932c4e6c87ebac327a2d5a6276de87ad"
      ]
    }
  },
};

export default config;