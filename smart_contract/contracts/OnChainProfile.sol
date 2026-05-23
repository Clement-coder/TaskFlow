// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title OnChainProfile — store contributor profile metadata on Celo
contract OnChainProfile {
    struct Profile {
        string  name;
        string  handle;
        string  bio;
        string  avatarURI;
        uint256 updatedAt;
    }

    mapping(address => Profile) public profiles;

    event ProfileUpdated(address indexed user, string handle);

    function setProfile(
        string calldata name,
        string calldata handle,
        string calldata bio,
        string calldata avatarURI
    ) external {
        profiles[msg.sender] = Profile(name, handle, bio, avatarURI, block.timestamp);
        emit ProfileUpdated(msg.sender, handle);
    }

    function getProfile(address user) external view returns (Profile memory) {
        return profiles[user];
    }
}
