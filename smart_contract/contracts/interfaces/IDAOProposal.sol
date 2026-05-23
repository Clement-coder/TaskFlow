// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IDAOProposal {
    function createProposal(string calldata title, string calldata description) external returns (uint256);
    function vote(uint256 id, bool upvote) external;
    function proposalCount() external view returns (uint256);
}
