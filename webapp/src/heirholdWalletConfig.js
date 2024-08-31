export const heirholdWalletConfig = {
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_claimGracePeriod",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_claimDepositFeeAmount",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "_allowedClaimants",
          type: "address[]",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
      ],
      name: "HeirholdWalletBalanceChange",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "HeirholdWalletExecuteClaimTransferOwnership",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "claimGracePeriod",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "claimDepositFeeAmount",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address[]",
          name: "allowedClaimants",
          type: "address[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "claimant",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          indexed: true,
          internalType: "struct HeirholdWallet.Claim[]",
          name: "claims",
          type: "tuple[]",
        },
      ],
      name: "HeirholdWalletSettingsChange",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "HeirholdWalletTransferOwnership",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_allowedClaimant",
          type: "address",
        },
      ],
      name: "addAllowedClaimant",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "allowedClaimants",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "claimDepositFeeAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "claimGracePeriod",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "claims",
      outputs: [
        {
          internalType: "address",
          name: "claimant",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createOrUpdateClaim",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "executeClaimTransferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_claimant",
          type: "address",
        },
      ],
      name: "rejectClaim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_allowedClaimant",
          type: "address",
        },
      ],
      name: "removeAllowedClaimant",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "removeClaim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_claimFeeDepositAmount",
          type: "uint256",
        },
      ],
      name: "setClaimFeeDepositAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_claimGracePeriod",
          type: "uint256",
        },
      ],
      name: "setClaimGracePeriod",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
