export const heirholdFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "CreateHeirholdWallet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "claimGracePeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimDepositFeeAmount",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "allowedHeirAdresses",
        type: "address[]",
      },
    ],
    name: "createHeirholdWallet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
