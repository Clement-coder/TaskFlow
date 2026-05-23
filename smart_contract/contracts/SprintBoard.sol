// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title SprintBoard — on-chain sprint management for TaskFlow teams
contract SprintBoard {
    struct Sprint {
        uint256 id;
        string  name;
        address owner;
        uint256 startDate;
        uint256 endDate;
        bool    active;
        uint256 taskCount;
    }

    uint256 public sprintCount;
    mapping(uint256 => Sprint) public sprints;
    mapping(address => uint256[]) public userSprints;

    event SprintCreated(uint256 indexed id, address indexed owner, string name);
    event SprintClosed(uint256 indexed id);

    function createSprint(string calldata name, uint256 startDate, uint256 endDate)
        external returns (uint256)
    {
        require(endDate > startDate, "Invalid dates");
        uint256 id = ++sprintCount;
        sprints[id] = Sprint(id, name, msg.sender, startDate, endDate, true, 0);
        userSprints[msg.sender].push(id);
        emit SprintCreated(id, msg.sender, name);
        return id;
    }

    function closeSprint(uint256 id) external {
        Sprint storage s = sprints[id];
        require(s.owner == msg.sender, "Not owner");
        require(s.active, "Already closed");
        s.active = false;
        emit SprintClosed(id);
    }

    function incrementTaskCount(uint256 sprintId) external {
        require(sprints[sprintId].active, "Sprint not active");
        sprints[sprintId].taskCount++;
    }

    function getUserSprints(address user) external view returns (uint256[] memory) {
        return userSprints[user];
    }
}
