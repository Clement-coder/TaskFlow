// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IMilestoneTracker {
    function createMilestone(string calldata title, string calldata quarter) external returns (uint256);
    function upvote(uint256 id) external;
    function complete(uint256 id) external;
    function milestoneCount() external view returns (uint256);
}
