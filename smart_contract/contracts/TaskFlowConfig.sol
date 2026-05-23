// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskFlowConfig — on-chain configuration store for TaskFlow workspace settings
contract TaskFlowConfig {
    address public owner;
    mapping(string => string) private config;

    event ConfigSet(string key, string value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    function set(string calldata key, string calldata value) external onlyOwner {
        config[key] = value;
        emit ConfigSet(key, value);
    }

    function get(string calldata key) external view returns (string memory) {
        return config[key];
    }
}
