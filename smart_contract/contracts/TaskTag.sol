// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskTag — attach on-chain tags to tasks
contract TaskTag {
    mapping(uint256 => string[]) public taskTags;

    event TagAdded(uint256 indexed taskId, string tag);

    function addTag(uint256 taskId, string calldata tag) external {
        require(bytes(tag).length > 0 && bytes(tag).length <= 20, "Invalid tag");
        taskTags[taskId].push(tag);
        emit TagAdded(taskId, tag);
    }

    function getTags(uint256 taskId) external view returns (string[] memory) {
        return taskTags[taskId];
    }
}
