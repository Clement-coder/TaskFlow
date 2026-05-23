// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title WorkspaceRegistry — register named workspaces on-chain
contract WorkspaceRegistry {
    struct Workspace {
        uint256 id;
        address owner;
        string  name;
        string  description;
        bool    premium;
        uint256 memberCount;
        uint256 createdAt;
    }

    uint256 public workspaceCount;
    mapping(uint256 => Workspace) public workspaces;
    mapping(address => uint256[]) public ownerWorkspaces;
    mapping(uint256 => mapping(address => bool)) public members;

    event WorkspaceCreated(uint256 indexed id, address indexed owner, string name, bool premium);
    event MemberJoined(uint256 indexed workspaceId, address indexed member);

    function createWorkspace(string calldata name, string calldata description, bool premium)
        external returns (uint256)
    {
        uint256 id = ++workspaceCount;
        workspaces[id] = Workspace(id, msg.sender, name, description, premium, 1, block.timestamp);
        ownerWorkspaces[msg.sender].push(id);
        members[id][msg.sender] = true;
        emit WorkspaceCreated(id, msg.sender, name, premium);
        return id;
    }

    function joinWorkspace(uint256 id) external {
        require(workspaces[id].id != 0, "Not found");
        require(!members[id][msg.sender], "Already member");
        members[id][msg.sender] = true;
        workspaces[id].memberCount++;
        emit MemberJoined(id, msg.sender);
    }

    function isMember(uint256 workspaceId, address user) external view returns (bool) {
        return members[workspaceId][user];
    }
}
