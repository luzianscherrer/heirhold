import { http, createConfig } from "wagmi";
import { rootstockTestnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [rootstockTestnet, sepolia],
  connectors: [injected()],
  transports: {
    [rootstockTestnet.id]: http(),
    [sepolia.id]: http(),
  },
});
