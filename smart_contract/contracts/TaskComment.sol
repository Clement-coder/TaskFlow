// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskComment — on-chain comments on tasks
contract TaskComment {
    struct Comment {
        uint256 id;
        uint256 taskId;
        address author;
        string  content;
        uint256 createdAt;
    }

    uint256 public commentCount;
    mapping(uint256 => Comment[]) public taskComments; // taskId => comments

    event CommentAdded(uint256 indexed taskId, address indexed author, uint256 commentId);

    function addComment(uint256 taskId, string calldata content) external returns (uint256) {
        require(bytes(content).length > 0, "Empty comment");
        uint256 id = ++commentCount;
        taskComments[taskId].push(Comment(id, taskId, msg.sender, content, block.timestamp));
        emit CommentAdded(taskId, msg.sender, id);
        return id;
    }

    function getComments(uint256 taskId) external view returns (Comment[] memory) {
        return taskComments[taskId];
    }

    function getCommentCount(uint256 taskId) external view returns (uint256) {
        return taskComments[taskId].length;
    }
}
