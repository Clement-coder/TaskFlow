// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IReputationLedger interface
interface IReputationLedger {
    function mint(address user, uint256 points, string calldata reason) external;
    function mintForTask(address user, uint8 priority) external;
    function getReputation(address user) external view returns (uint256);
    function getLevel(address user) external view returns (string memory);
}
