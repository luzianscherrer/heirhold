# Heirhold

## Introduction

It is a well-known fact that a considerable amount of cryptocurrency holdings are inaccessible and permanently locked due to lost private keys. According to an estimate by Chainalysis, about [one-fifth](https://www.chainalysis.com/blog/bitcoin-market-data-exchanges-trading/) of all Bitcoin is affected.

Heirhold is a smart wallet solution that addresses this problem by implementing a secure, time-locked recovery mechanism.

A Heirhold wallet owner designates a list of authorized heirs and defines a claim grace period and claim fee. At any time, these heirs can make a claim for ownership of the wallet. Such a claim is legitimate if the owner has passed away or lost access to the private key. In that case, the claimant will assume ownership once the claim grace period has elapsed. The claim fee, which acts as a deterrent against misuse, is fully refunded.

It is the owner's responsibility to periodically check their Heirhold wallet for claims. The suggested default claim grace period is one year, so owners should check their wallet annually to reject any unwanted claims. If an owner rejects a claim, they retain the claim fee.

All steps of the process are enforced by a smart contract, ensuring secure and verifiable proceedings.

## ETHOnline Hackathon

This is my contribution to the [ETHOnline 2024 Hackathon](https://ethglobal.com/events/ethonline2024) taking place from August 23rd to September 13th, 2024.

## Used Technology

- [Rootstock](https://rootstock.io)
- [Ethereum](https://ethereum.org)
- [ethers.js](https://github.com/ethers-io/ethers.js)
- [React](https://react.dev)
- [React Bootstrap](https://react-bootstrap.netlify.app)

## Deployment

The protoype is deployed on [Rootstock Testnet](https://rootstock.io) and [Ethereum Sepolia](https://ethereum.org) to cover both bitcoin and ether holdings.

| Network           | Address | Description               |
| ----------------- | ------- | ------------------------- |
| Rootstock Testnet | 0x...   | Heirhold factory contract |
| Rootstock Testnet | 0x...   | Heirhold example wallet   |
| Ethereum Sepolia  | 0x...   | Heirhold factory contract |
| Ethereum Sepolia  | 0x...   | Heirhold example wallet   |
