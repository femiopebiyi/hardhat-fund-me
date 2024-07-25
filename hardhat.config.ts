import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-deploy"
import "dotenv/config"

import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import "typechain"
import "hardhat-gas-reporter"


const coinmarketcapKey = process.env.COINMARKETCAP_API;
const etherscanApi = process.env.ETHERSCAN_API_KEY

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
  },

  etherscan: {
    apiKey: etherscanApi,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: coinmarketcapKey,
    gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=J9I6RGSK8FEA54CC3H5ZY4GQU3C5PMIHD4"

  },

};

export default config;
