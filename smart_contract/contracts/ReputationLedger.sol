// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ReputationLedger — mints on-chain reputation points for completed tasks
contract ReputationLedger {
    address public taskRegistry;
    address public owner;

    mapping(address => uint256) public reputation;
    mapping(address => uint256) public completedTasks;
    mapping(address => uint256) public lastMintedAt;

    event ReputationMinted(address indexed user, uint256 points, string reason);

    modifier onlyOwnerOrRegistry() {
        require(msg.sender == owner || msg.sender == taskRegistry, "Unauthorized");
        _;
    }

    constructor(address _taskRegistry) {
        owner = msg.sender;
        taskRegistry = _taskRegistry;
    }

    function mint(address user, uint256 points, string calldata reason) external onlyOwnerOrRegistry {
        reputation[user] += points;
        completedTasks[user] += 1;
        lastMintedAt[user] = block.timestamp;
        emit ReputationMinted(user, points, reason);
    }

    /// @notice Points awarded: High=70, Medium=50, Low=30 — matches TaskFlow app logic
    function mintForTask(address user, uint8 priority) external onlyOwnerOrRegistry {
        uint256 points = priority == 2 ? 70 : priority == 1 ? 50 : 30;
        reputation[user] += points;
        completedTasks[user] += 1;
        lastMintedAt[user] = block.timestamp;
        emit ReputationMinted(user, points, "task_completed");
    }

    function getReputation(address user) external view returns (uint256) {
        return reputation[user];
    }

    function getLevel(address user) external view returns (string memory) {
        uint256 rep = reputation[user];
        if (rep >= 1200) return "Stellar";
        if (rep >= 700)  return "Advanced";
        if (rep >= 300)  return "Rising";
        return "Foundational";
    }

    function getLeaderboard(address[] calldata users)
        external view returns (address[] memory, uint256[] memory)
    {
        uint256[] memory scores = new uint256[](users.length);
        for (uint256 i = 0; i < users.length; i++) {
            scores[i] = reputation[users[i]];
        }
        return (users, scores);
    }

    function setTaskRegistry(address _taskRegistry) external {
        require(msg.sender == owner, "Not owner");
        taskRegistry = _taskRegistry;
    }
}
