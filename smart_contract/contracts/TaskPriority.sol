// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskPriority — on-chain priority escalation with voting
contract TaskPriority {
    enum Priority { Low, Medium, High, Critical }

    mapping(uint256 => Priority) public priorities;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => uint256) public escalationVotes;

    event PrioritySet(uint256 indexed taskId, Priority priority);
    event EscalationVoted(uint256 indexed taskId, address indexed voter, uint256 totalVotes);

    function setPriority(uint256 taskId, Priority priority) external {
        priorities[taskId] = priority;
        emit PrioritySet(taskId, priority);
    }

    function voteEscalate(uint256 taskId) external {
        require(!hasVoted[taskId][msg.sender], "Already voted");
        hasVoted[taskId][msg.sender] = true;
        escalationVotes[taskId]++;
        if (escalationVotes[taskId] >= 3 && priorities[taskId] != Priority.Critical) {
            priorities[taskId] = Priority.Critical;
            emit PrioritySet(taskId, Priority.Critical);
        }
        emit EscalationVoted(taskId, msg.sender, escalationVotes[taskId]);
    }
}
