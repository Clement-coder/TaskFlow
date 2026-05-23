// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ContributorLeaderboard — on-chain leaderboard tracking contributor scores
contract ContributorLeaderboard {
    struct Contributor {
        address wallet;
        uint256 score;
        uint256 rank;
        uint256 lastUpdated;
    }

    address[] public contributors;
    mapping(address => Contributor) public leaderboard;
    address public owner;

    event ScoreUpdated(address indexed contributor, uint256 newScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    function updateScore(address contributor, uint256 score) external onlyOwner {
        if (leaderboard[contributor].wallet == address(0)) {
            contributors.push(contributor);
        }
        leaderboard[contributor] = Contributor(contributor, score, 0, block.timestamp);
        emit ScoreUpdated(contributor, score);
    }

    function getContributorCount() external view returns (uint256) {
        return contributors.length;
    }

    function getScore(address contributor) external view returns (uint256) {
        return leaderboard[contributor].score;
    }
}
