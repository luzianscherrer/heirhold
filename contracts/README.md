### Local Development Rootstock Testnet Fork

```
source .env
npx hardhat node --fork $ROOTSTOCK_URL
```

### Local Development Sepolia Fork

```
source .env
npx hardhat node --fork $SEPOLIA_URL
```

### Deploy Contracts

```
npx hardhat ignition deploy ./ignition/modules/Heirhold.ts --network localhost
```

### Useful Commands

```
npx hardhat console --network localhost
const helpers = require("@nomicfoundation/hardhat-network-helpers");
await helpers.setBalance("...address...", ethers.parseEther("1.5"));
await helpers.setNonce("...address...", 10);
new Date(await helpers.time.latest()*1000).toLocaleString();
await helpers.time.setNextBlockTimestamp(Math.floor(Date.now() / 1000));
```
