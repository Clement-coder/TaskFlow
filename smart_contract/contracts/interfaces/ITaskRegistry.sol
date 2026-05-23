// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ITaskRegistry interface
interface ITaskRegistry {
    enum Priority { Low, Medium, High }
    enum Status   { Todo, InProgress, Done }

    function createTask(string calldata title, string calldata project, Priority priority) external returns (uint256);
    function updateStatus(uint256 id, Status status) external;
    function getUserTasks(address user) external view returns (uint256[] memory);
    function taskCount() external view returns (uint256);
}
