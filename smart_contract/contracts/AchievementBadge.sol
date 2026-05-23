// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AchievementBadge — award achievement badges to contributors on Celo
contract AchievementBadge {
    struct Badge {
        string  name;
        string  description;
        uint256 awardedAt;
    }

    mapping(address => Badge[]) public badges;
    address public owner;

    event BadgeAwarded(address indexed user, string name);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    function awardBadge(address user, string calldata name, string calldata description) external onlyOwner {
        badges[user].push(Badge(name, description, block.timestamp));
        emit BadgeAwarded(user, name);
    }

    function getBadges(address user) external view returns (Badge[] memory) {
        return badges[user];
    }

    function getBadgeCount(address user) external view returns (uint256) {
        return badges[user].length;
    }
}
