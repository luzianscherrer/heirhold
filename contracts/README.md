### Local Development Rootstock Testnet Fork

```
source .env
npx hardhat node --fork $ROOTSTOCK_URL
```

### Local Development Sepolia Fork

```
source .env
npx hardhat node --fork $EPOLIA_URL
```

### Deploy Contracts

```
npx hardhat ignition deploy ./ignition/modules/Heirhold.ts --network localhost
```
