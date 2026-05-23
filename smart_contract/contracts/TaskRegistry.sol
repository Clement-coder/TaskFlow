// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskRegistry — on-chain task management for TaskFlow on Celo
contract TaskRegistry {
    enum Priority { Low, Medium, High }
    enum Status  { Todo, InProgress, Done }

    struct Task {
        uint256 id;
        address owner;
        string  title;
        string  project;
        Priority priority;
        Status   status;
        uint256  createdAt;
        uint256  completedAt;
    }

    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;
    mapping(address => uint256[]) public userTasks;

    event TaskCreated(uint256 indexed id, address indexed owner, string title, Priority priority);
    event TaskUpdated(uint256 indexed id, Status status);

    function createTask(
        string calldata title,
        string calldata project,
        Priority priority
    ) external returns (uint256) {
        uint256 id = ++taskCount;
        tasks[id] = Task(id, msg.sender, title, project, priority, Status.Todo, block.timestamp, 0);
        userTasks[msg.sender].push(id);
        emit TaskCreated(id, msg.sender, title, priority);
        return id;
    }

    function updateStatus(uint256 id, Status status) external {
        Task storage t = tasks[id];
        require(t.owner == msg.sender, "Not owner");
        require(t.id != 0, "Task not found");
        t.status = status;
        if (status == Status.Done) t.completedAt = block.timestamp;
        emit TaskUpdated(id, status);
    }

    function getUserTasks(address user) external view returns (uint256[] memory) {
        return userTasks[user];
    }
}
