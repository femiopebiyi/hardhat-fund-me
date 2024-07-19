import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-deploy"
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: "0.8.8"}, {version: "0.8.0"}]
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY!],
      chainId: 11155111
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
