// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskFlowEvents — central event emitter for cross-contract indexing
contract TaskFlowEvents {
    event WorkspaceAction(address indexed actor, string action, uint256 entityId, uint256 timestamp);
    event TaskAction(address indexed actor, string action, uint256 taskId, uint256 timestamp);
    event ReputationAction(address indexed actor, uint256 points, string reason, uint256 timestamp);

    function emitWorkspace(string calldata action, uint256 entityId) external {
        emit WorkspaceAction(msg.sender, action, entityId, block.timestamp);
    }

    function emitTask(string calldata action, uint256 taskId) external {
        emit TaskAction(msg.sender, action, taskId, block.timestamp);
    }

    function emitReputation(uint256 points, string calldata reason) external {
        emit ReputationAction(msg.sender, points, reason, block.timestamp);
    }
}
