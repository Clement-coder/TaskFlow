// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MilestoneTracker — track project milestones on-chain with upvoting
contract MilestoneTracker {
    struct Milestone {
        uint256 id;
        address creator;
        string  title;
        string  quarter;
        uint256 upvotes;
        bool    completed;
        uint256 createdAt;
    }

    uint256 public milestoneCount;
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => mapping(address => bool)) public hasUpvoted;

    event MilestoneCreated(uint256 indexed id, string title, string quarter);
    event MilestoneUpvoted(uint256 indexed id, address indexed voter);
    event MilestoneCompleted(uint256 indexed id);

    function createMilestone(string calldata title, string calldata quarter)
        external returns (uint256)
    {
        uint256 id = ++milestoneCount;
        milestones[id] = Milestone(id, msg.sender, title, quarter, 0, false, block.timestamp);
        emit MilestoneCreated(id, title, quarter);
        return id;
    }

    function upvote(uint256 id) external {
        require(milestones[id].id != 0, "Not found");
        require(!hasUpvoted[id][msg.sender], "Already upvoted");
        hasUpvoted[id][msg.sender] = true;
        milestones[id].upvotes++;
        emit MilestoneUpvoted(id, msg.sender);
    }

    function complete(uint256 id) external {
        Milestone storage m = milestones[id];
        require(m.creator == msg.sender, "Not creator");
        m.completed = true;
        emit MilestoneCompleted(id);
    }

    function getTopMilestone() external view returns (uint256 topId, uint256 topVotes) {
        for (uint256 i = 1; i <= milestoneCount; i++) {
            if (milestones[i].upvotes > topVotes) {
                topVotes = milestones[i].upvotes;
                topId    = i;
            }
        }
    }
}
