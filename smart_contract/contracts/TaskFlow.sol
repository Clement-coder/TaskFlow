// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TaskRegistry.sol";
import "./ReputationLedger.sol";

/// @title TaskFlow — orchestrator that wires TaskRegistry + ReputationLedger together
contract TaskFlow {
    TaskRegistry     public registry;
    ReputationLedger public ledger;
    address          public owner;

    event TaskCompletedWithReputation(address indexed user, uint256 taskId, uint256 repPoints);

    constructor(address _registry, address _ledger) {
        registry = TaskRegistry(_registry);
        ledger   = ReputationLedger(_ledger);
        owner    = msg.sender;
    }

    /// @notice Complete a task and automatically mint reputation in one tx
    function completeTask(uint256 taskId) external {
        registry.updateStatus(taskId, TaskRegistry.Status.Done);
        TaskRegistry.Task memory t = registry.getTask(taskId);
        require(t.owner == msg.sender, "Not task owner");
        uint8 priority = uint8(t.priority);
        ledger.mintForTask(msg.sender, priority);
        uint256 points = priority == 2 ? 70 : priority == 1 ? 50 : 30;
        emit TaskCompletedWithReputation(msg.sender, taskId, points);
    }
}
