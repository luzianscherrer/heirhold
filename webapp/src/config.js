import { http, createConfig } from "wagmi";
import { hardhat, rootstockTestnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [rootstockTestnet, sepolia, hardhat],
  connectors: [injected()],
  transports: {
    [rootstockTestnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});
