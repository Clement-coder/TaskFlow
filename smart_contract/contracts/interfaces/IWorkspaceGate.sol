// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IWorkspaceGate interface
interface IWorkspaceGate {
    function hasAccess(address user) external view returns (bool);
    function grantOverride(address user) external;
    function revokeOverride(address user) external;
    function setThreshold(uint256 threshold) external;
}
