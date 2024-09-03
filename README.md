# Heirhold

## TL;DR

Just visit the [online demo](https://luzianscherrer.github.io/heirhold/) or [watch the video](https://youtu.be/gcEogddpur4).

## Introduction

It is a well-known fact that a considerable amount of cryptocurrency holdings are inaccessible and permanently locked due to lost private keys. According to an estimate by Chainalysis, about [one-fifth](https://www.chainalysis.com/blog/bitcoin-market-data-exchanges-trading/) of all bitcoin is affected.

Heirhold is a smart wallet solution that addresses this problem by implementing a secure, time-locked recovery mechanism.

A Heirhold wallet owner designates a list of authorized claimants and defines a claim grace period and claim fee. At any time, the authorized claimants can make a claim for ownership of the wallet. Such a claim is usually considered legitimate if the owner has passed away or lost access to the private key. In that case, the claimant will assume ownership once the claim grace period has elapsed. The claim fee, which acts as a deterrent against misuse, is fully refunded to the claimant.

It is the owner's responsibility to periodically check their Heirhold wallet for claims. The suggested default claim grace period is one year, so owners should check their wallet annually to reject any unwanted claims. If an owner rejects a claim, they retain the claim fee payed by the claimant.

All steps of the process are enforced by a smart contract, ensuring secure and verifiable proceedings.

## ETHOnline Hackathon

This is my contribution to the [ETHOnline 2024 Hackathon](https://ethglobal.com/events/ethonline2024). I developed it as a pastime endeavor from initial concept to deployed prototype in 10 days. There's a [project showcase](https://ethglobal.com/showcase/heirhold-0c9ua) over at the ETHGlobal website.

## Used Technology

- [Rootstock](https://rootstock.io)
- [Ethereum](https://ethereum.org)
- [Solidity](https://soliditylang.org)
- [Hardhat](https://hardhat.org/)
- [Wagmi](https://wagmi.sh)
- [ethers.js](https://github.com/ethers-io/ethers.js)
- [React](https://react.dev)
- [React Bootstrap](https://react-bootstrap.netlify.app)

## Deployment

The frontend can be accessed on GitHub Pages: https://luzianscherrer.github.io/heirhold/

The contracts are deployed on [Rootstock Testnet](https://rootstock.io) and [Ethereum Sepolia](https://chainlist.org/chain/11155111) to cover both bitcion and ether holdings.

You might want to head over to the [Rootstock Testnet Faucet](https://faucet.rootstock.io) to get some tRBTC for testing. Sepolia ETH might be found at the [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).

| Chain             | Address                                                                                                                                                     | Description      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Rootstock Testnet | [<tt>0xEf06B4970F659E8B5025Ec588241F703d2467605</tt>](https://explorer.testnet.rootstock.io/address/0xef06b4970f659e8b5025ec588241f703d2467605?__ctab=Code) | Factory contract |
| Rootstock Testnet | [<tt>0x81947143dfab529ce9fe55c4297cd7bb90daaa78</tt>](https://explorer.testnet.rootstock.io/address/0x81947143dfab529ce9fe55c4297cd7bb90daaa78)             | Example wallet   |
| Ethereum Sepolia  | [<tt>0x18fBE49332ADFb8e3986c210d3e0dc3Fc89154b6</tt>](https://sepolia.etherscan.io/address/0x18fBE49332ADFb8e3986c210d3e0dc3Fc89154b6#code)                 | Factory contract |
| Ethereum Sepolia  | [<tt>0xc7Cb10BCD1b24a4c801970477Ca1Dc1369e8C876</tt>](https://sepolia.etherscan.io/address/0xc7Cb10BCD1b24a4c801970477Ca1Dc1369e8C876)                      | Example wallet   |

## Screenshots

![Heirhold screenshot 01](/assets/screenshots/screenshot_01.png?raw=true)

More screenshots can be found in the [assets](/assets/screenshots) folder.
