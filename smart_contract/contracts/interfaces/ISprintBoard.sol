// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ISprintBoard {
    function createSprint(string calldata name, uint256 startDate, uint256 endDate) external returns (uint256);
    function closeSprint(uint256 id) external;
    function incrementTaskCount(uint256 sprintId) external;
    function getUserSprints(address user) external view returns (uint256[] memory);
    function sprintCount() external view returns (uint256);
}
