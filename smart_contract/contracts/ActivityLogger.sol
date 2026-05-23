// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ActivityLogger — on-chain audit log for TaskFlow workspace events
contract ActivityLogger {
    enum LogType { System, Contract, Wallet, Task }

    struct Log {
        uint256 id;
        address actor;
        string  message;
        LogType logType;
        uint256 timestamp;
    }

    uint256 public logCount;
    mapping(uint256 => Log) public logs;
    mapping(address => uint256[]) public actorLogs;

    event Logged(uint256 indexed id, address indexed actor, LogType logType, string message);

    function log(string calldata message, LogType logType) external {
        uint256 id = ++logCount;
        logs[id] = Log(id, msg.sender, message, logType, block.timestamp);
        actorLogs[msg.sender].push(id);
        emit Logged(id, msg.sender, logType, message);
    }

    function getActorLogs(address actor) external view returns (uint256[] memory) {
        return actorLogs[actor];
    }

    function getLog(uint256 id) external view returns (Log memory) {
        return logs[id];
    }
}
