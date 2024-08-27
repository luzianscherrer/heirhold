import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      accounts: [process.env.DEVELOPMENT_KEY ?? "unknown"],
    },
    "rootstock-testnet": {
      url: process.env.ROOTSTOCK_URL ?? "unknown",
      accounts: [process.env.DEVELOPMENT_KEY ?? "unknown"],
    },
    sepolia: {
      url: process.env.SEPOLIA_URL ?? "unknown",
      accounts: [process.env.DEVELOPMENT_KEY ?? "unknown"],
    },
  },
};

export default config;
