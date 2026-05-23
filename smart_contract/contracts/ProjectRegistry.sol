// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ProjectRegistry — register projects on-chain with status tracking
contract ProjectRegistry {
    enum Status { Active, Paused, Launched }

    struct Project {
        uint256 id;
        address owner;
        string  name;
        string  description;
        Status  status;
        uint256 progress; // 0-100
        uint256 createdAt;
        uint256 updatedAt;
    }

    uint256 public projectCount;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public ownerProjects;

    event ProjectCreated(uint256 indexed id, address indexed owner, string name);
    event ProjectUpdated(uint256 indexed id, Status status, uint256 progress);

    function createProject(string calldata name, string calldata description)
        external returns (uint256)
    {
        uint256 id = ++projectCount;
        projects[id] = Project(id, msg.sender, name, description, Status.Active, 0, block.timestamp, block.timestamp);
        ownerProjects[msg.sender].push(id);
        emit ProjectCreated(id, msg.sender, name);
        return id;
    }

    function updateProject(uint256 id, Status status, uint256 progress) external {
        require(projects[id].owner == msg.sender, "Not owner");
        require(progress <= 100, "Progress max 100");
        projects[id].status   = status;
        projects[id].progress = progress;
        projects[id].updatedAt = block.timestamp;
        emit ProjectUpdated(id, status, progress);
    }

    function getOwnerProjects(address owner) external view returns (uint256[] memory) {
        return ownerProjects[owner];
    }
}
