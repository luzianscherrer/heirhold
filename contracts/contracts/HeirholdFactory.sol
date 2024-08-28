// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./HeirholdWallet.sol";

contract HeirholdFactory {
    event CreateHeirholdWallet(
        address indexed walletAddress,
        address indexed owner
    );

    function createHeirholdWallet(
        uint256 claimGracePeriod,
        uint256 claimDepositFeeAmount,
        address[] memory allowedHeirAdresses
    ) external payable {
        HeirholdWallet wallet = new HeirholdWallet{value: msg.value}(
            claimGracePeriod,
            claimDepositFeeAmount,
            allowedHeirAdresses
        );
        wallet.transferOwnership(payable(msg.sender));

        emit CreateHeirholdWallet(address(wallet), msg.sender);
    }
}
