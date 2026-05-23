// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskDueDate — on-chain due date tracking with overdue detection
contract TaskDueDate {
    mapping(uint256 => uint256) public dueDates;

    event DueDateSet(uint256 indexed taskId, uint256 dueDate);

    function setDueDate(uint256 taskId, uint256 dueDate) external {
        require(dueDate > block.timestamp, "Due date must be in future");
        dueDates[taskId] = dueDate;
        emit DueDateSet(taskId, dueDate);
    }

    function isOverdue(uint256 taskId) external view returns (bool) {
        uint256 due = dueDates[taskId];
        return due != 0 && block.timestamp > due;
    }

    function timeRemaining(uint256 taskId) external view returns (uint256) {
        uint256 due = dueDates[taskId];
        if (due == 0 || block.timestamp >= due) return 0;
        return due - block.timestamp;
    }
}
