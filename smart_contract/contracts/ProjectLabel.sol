// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ProjectLabel — on-chain label management for projects
contract ProjectLabel {
    mapping(uint256 => string[]) public projectLabels;

    event LabelAdded(uint256 indexed projectId, string label);
    event LabelRemoved(uint256 indexed projectId, string label);

    function addLabel(uint256 projectId, string calldata label) external {
        require(bytes(label).length > 0 && bytes(label).length <= 24, "Invalid label");
        projectLabels[projectId].push(label);
        emit LabelAdded(projectId, label);
    }

    function getLabels(uint256 projectId) external view returns (string[] memory) {
        return projectLabels[projectId];
    }
}
