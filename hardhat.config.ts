import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-deploy"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: "0.8.8"}, {version: "0.8.0"}]
  },
  networks: {
    sepolia: {
      url: "",
      accounts: []
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
