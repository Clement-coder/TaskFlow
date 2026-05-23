// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskVote — team voting on task priority and approach
contract TaskVote {
    mapping(uint256 => mapping(address => int8)) public votes; // 1 = up, -1 = down
    mapping(uint256 => int256) public taskScore;

    event Voted(uint256 indexed taskId, address indexed voter, int8 vote);

    function vote(uint256 taskId, bool upvote) external {
        int8 prev = votes[taskId][msg.sender];
        int8 v    = upvote ? int8(1) : int8(-1);
        taskScore[taskId] -= prev;
        taskScore[taskId] += v;
        votes[taskId][msg.sender] = v;
        emit Voted(taskId, msg.sender, v);
    }

    function getScore(uint256 taskId) external view returns (int256) {
        return taskScore[taskId];
    }
}
