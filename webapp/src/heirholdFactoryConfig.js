export const heirholdFactoryConfig = {
  address: {
    31: "0xEf06B4970F659E8B5025Ec588241F703d2467605",
    31337: "0xEf06B4970F659E8B5025Ec588241F703d2467605",
    11155111: "0x18fBE49332ADFb8e3986c210d3e0dc3Fc89154b6",
  },
  abi: [
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
  ],
};
