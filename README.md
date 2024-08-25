# Heirhold

## Introduction

It is estimated that around [one-fifth](https://www.nytimes.com/2021/01/13/business/tens-of-billions-worth-of-bitcoin-have-been-locked-by-people-who-forgot-their-key.html) of all cryptocurrency holdings are inaccessible and permanently locked forever due to lost private keys.

Heirhold is a smart wallet solution that addresses this problem by implementing a secure, time-locked recovery mechanism.

A Heirhold wallet owner designates a list of authorized heirs and defines a claim grace period and claim fee. At any time, these heirs can make a claim for ownership of the wallet. Such a claim is legitimate if the owner has passed away or lost access to the private key. In that case, the claimant will assume ownership once the claim grace period has elapsed. The claim fee, which acts as a deterrent against misuse, is fully refunded.

It is the owner's responsibility to periodically check their Heirhold wallet for claims. The suggested default claim grace period is one year, so owners should check their wallet annually to reject any unwanted claims. If an owner rejects a claim, they retain the claim fee.

All steps of the process are enforced by a smart contract, ensuring secure and verifiable proceedings.

## ETHOnline Hackathon

This is my contribution to the [ETHOnline 2024 Hackathon](https://ethglobal.com/events/ethonline2024) taking place from August 23rd to September 13th, 2024.
