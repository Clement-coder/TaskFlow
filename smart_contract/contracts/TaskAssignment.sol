// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskAssignment — assign tasks to specific wallet addresses on-chain
contract TaskAssignment {
    mapping(uint256 => address) public assignee;
    mapping(address => uint256[]) public assignedTasks;

    event TaskAssigned(uint256 indexed taskId, address indexed assignee);
    event TaskUnassigned(uint256 indexed taskId);

    function assign(uint256 taskId, address worker) external {
        require(worker != address(0), "Zero address");
        assignee[taskId] = worker;
        assignedTasks[worker].push(taskId);
        emit TaskAssigned(taskId, worker);
    }

    function unassign(uint256 taskId) external {
        emit TaskUnassigned(taskId);
        delete assignee[taskId];
    }

    function getAssignedTasks(address worker) external view returns (uint256[] memory) {
        return assignedTasks[worker];
    }
}
