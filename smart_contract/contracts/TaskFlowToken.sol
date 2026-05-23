// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title TaskFlowToken — ERC20 governance token for TaskFlow DAO on Celo
contract TaskFlowToken is ERC20 {
    address public owner;
    uint256 public constant MAX_SUPPLY = 100_000_000 * 1e18; // 100M TFT

    event Minted(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() ERC20("TaskFlow Token", "TFT") {
        owner = msg.sender;
        _mint(msg.sender, 10_000_000 * 1e18); // 10M initial supply to deployer
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit Minted(to, amount);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
