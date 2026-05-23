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
    mapping(address => uint256) public completedCount;

    event TaskCreated(uint256 indexed id, address indexed owner, string title, Priority priority);
    event TaskUpdated(uint256 indexed id, Status status);
    event TaskDeleted(uint256 indexed id);

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
        if (status == Status.Done) {
            t.completedAt = block.timestamp;
            completedCount[t.owner]++;
        }
        emit TaskUpdated(id, status);
    }

    function getUserTasks(address user) external view returns (uint256[] memory) {
        return userTasks[user];
    }

    function getTask(uint256 id) external view returns (Task memory) {
        require(tasks[id].id != 0, "Task not found");
        return tasks[id];
    }

    function getTasksByStatus(address user, Status status) external view returns (uint256[] memory) {
        uint256[] memory all = userTasks[user];
        uint256 count;
        for (uint256 i = 0; i < all.length; i++) {
            if (tasks[all[i]].status == status) count++;
        }
        uint256[] memory result = new uint256[](count);
        uint256 idx;
        for (uint256 i = 0; i < all.length; i++) {
            if (tasks[all[i]].status == status) result[idx++] = all[i];
        }
        return result;
    }
}
