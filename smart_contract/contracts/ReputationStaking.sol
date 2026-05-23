// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ReputationStaking — stake reputation points to signal commitment on tasks
contract ReputationStaking {
    mapping(address => uint256) public stakedRep;
    mapping(address => uint256) public stakedOnTask;

    event Staked(address indexed user, uint256 taskId, uint256 amount);
    event Unstaked(address indexed user, uint256 taskId, uint256 amount);

    function stake(uint256 taskId, uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        stakedRep[msg.sender]    += amount;
        stakedOnTask[msg.sender]  = taskId;
        emit Staked(msg.sender, taskId, amount);
    }

    function unstake(uint256 taskId) external {
        uint256 amount = stakedRep[msg.sender];
        require(amount > 0, "Nothing staked");
        stakedRep[msg.sender]   = 0;
        stakedOnTask[msg.sender] = 0;
        emit Unstaked(msg.sender, taskId, amount);
    }

    function getStake(address user) external view returns (uint256 amount, uint256 taskId) {
        return (stakedRep[user], stakedOnTask[user]);
    }
}
