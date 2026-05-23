// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TaskFlowTreasury — simple on-chain treasury for TaskFlow DAO funds
contract TaskFlowTreasury {
    address public owner;
    uint256 public totalDeposited;

    event Deposited(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    receive() external payable {
        totalDeposited += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
        emit Withdrawn(to, amount);
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}
