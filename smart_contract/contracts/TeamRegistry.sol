// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TeamRegistry — register and manage team members on-chain
contract TeamRegistry {
    enum Role { Viewer, Contributor, Developer, Owner }

    struct Member {
        address wallet;
        string  name;
        Role    role;
        uint256 joinedAt;
        bool    active;
    }

    address public admin;
    mapping(address => Member) public members;
    address[] public memberList;

    event MemberAdded(address indexed wallet, string name, Role role);
    event MemberRemoved(address indexed wallet);
    event RoleUpdated(address indexed wallet, Role newRole);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function addMember(address wallet, string calldata name, Role role) external onlyAdmin {
        require(!members[wallet].active, "Already member");
        members[wallet] = Member(wallet, name, role, block.timestamp, true);
        memberList.push(wallet);
        emit MemberAdded(wallet, name, role);
    }

    function removeMember(address wallet) external onlyAdmin {
        require(members[wallet].active, "Not a member");
        members[wallet].active = false;
        emit MemberRemoved(wallet);
    }

    function updateRole(address wallet, Role role) external onlyAdmin {
        require(members[wallet].active, "Not a member");
        members[wallet].role = role;
        emit RoleUpdated(wallet, role);
    }

    function getMemberCount() external view returns (uint256) {
        return memberList.length;
    }

    function isMember(address wallet) external view returns (bool) {
        return members[wallet].active;
    }
}
