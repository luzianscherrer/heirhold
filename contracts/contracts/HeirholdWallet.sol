// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract HeirholdWallet {
    event HeirholdWalletBalanceChange(uint256 balance);
    event HeirholdWalletTransferOwnership(address indexed newOwner);
    event HeirholdWalletSettingsChange(
        uint256 claimGracePeriod,
        uint256 claimDepositFeeAmount,
        address[] indexed allowedClaimants,
        Claim[] indexed claims
    );
    event HeirholdWalletExecuteClaimTransferOwnership(address indexed newOwner);

    struct Claim {
        address claimant;
        uint256 timestamp;
    }

    address payable public owner;
    uint256 public claimGracePeriod;
    uint256 public claimDepositFeeAmount;
    address[] public allowedClaimants;
    Claim[] public claims;

    constructor(
        uint256 _claimGracePeriod,
        uint256 _claimDepositFeeAmount,
        address[] memory _allowedClaimants
    ) payable {
        owner = payable(msg.sender);
        claimGracePeriod = _claimGracePeriod;
        claimDepositFeeAmount = _claimDepositFeeAmount;
        allowedClaimants = _allowedClaimants;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier allowedClaimant() {
        require(isAllowedClaimant(msg.sender), "Not in allowed claimants");
        _;
    }

    receive() external payable {
        emit HeirholdWalletBalanceChange(address(this).balance);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        owner.transfer(address(this).balance);

        emit HeirholdWalletBalanceChange(address(this).balance);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAllowedClaimants() external view returns (address[] memory) {
        return allowedClaimants;
    }

    function getClaims() external view returns (Claim[] memory) {
        return claims;
    }

    function transferOwnership(address payable newOwner) external onlyOwner {
        require(newOwner != address(0), "Address zero");
        require(newOwner != owner, "Already owner");
        owner = newOwner;

        emit HeirholdWalletTransferOwnership(newOwner);
    }

    function emitWalletSettingsChangedEvent() internal {
        emit HeirholdWalletSettingsChange(
            claimGracePeriod,
            claimDepositFeeAmount,
            allowedClaimants,
            claims
        );
    }

    function setClaimGracePeriod(uint256 _claimGracePeriod) external onlyOwner {
        claimGracePeriod = _claimGracePeriod;

        emitWalletSettingsChangedEvent();
    }

    function setClaimFeeDepositAmount(
        uint256 _claimFeeDepositAmount
    ) external onlyOwner {
        claimDepositFeeAmount = _claimFeeDepositAmount;

        emitWalletSettingsChangedEvent();
    }

    function addAllowedClaimant(address _allowedClaimant) external onlyOwner {
        require(
            isAllowedClaimant(_allowedClaimant) == false,
            "Already in allowed claimants"
        );
        allowedClaimants.push(_allowedClaimant);

        emitWalletSettingsChangedEvent();
    }

    function removeAllowedClaimant(
        address _allowedClaimant
    ) external onlyOwner {
        require(
            isAllowedClaimant(_allowedClaimant),
            "Not in allowed claimants"
        );
        for (uint i = 0; i < allowedClaimants.length; i++) {
            if (allowedClaimants[i] == _allowedClaimant) {
                allowedClaimants[i] = allowedClaimants[
                    allowedClaimants.length - 1
                ];
                allowedClaimants.pop();

                emitWalletSettingsChangedEvent();
                break;
            }
        }
    }

    function isAllowedClaimant(address claimant) internal view returns (bool) {
        for (uint i = 0; i < allowedClaimants.length; i++) {
            if (allowedClaimants[i] == claimant) {
                return true;
            }
        }
        return false;
    }

    function addClaim(address _claimant) internal {
        claims.push(Claim(_claimant, block.timestamp));

        emitWalletSettingsChangedEvent();
    }

    function removeClaim(address _claimant) internal {
        for (uint i = 0; i < claims.length; i++) {
            if (claims[i].claimant == _claimant) {
                claims[i] = claims[claims.length - 1];
                claims.pop();

                emitWalletSettingsChangedEvent();
                break;
            }
        }
    }

    function createOrUpdateClaim() external payable allowedClaimant {
        require(
            msg.value == claimDepositFeeAmount,
            "Incorrect claim deposit fee amount sent"
        );
        removeClaim(msg.sender);
        addClaim(msg.sender);
    }

    function removeClaim() external allowedClaimant {
        removeClaim(msg.sender);
    }

    function rejectClaim(address _claimant) external onlyOwner {
        removeClaim(_claimant);
    }

    function executeClaimTransferOwnership() external {
        bool foundClaim = false;
        for (uint i = 0; i < claims.length; i++) {
            if (claims[i].claimant == msg.sender) {
                require(
                    block.timestamp >= claims[i].timestamp + claimGracePeriod,
                    "Claim in grace period"
                );
                foundClaim = true;
                owner = payable(msg.sender);
                delete allowedClaimants;
                delete claims;

                emit HeirholdWalletExecuteClaimTransferOwnership(owner);
                break;
            }
        }
        require(foundClaim, "Not in claims");
    }
}
