// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title TaskBounty — post cUSD bounties for tasks, claimable on completion
contract TaskBounty {
    struct Bounty {
        uint256 taskId;
        address poster;
        address token;
        uint256 amount;
        address claimer;
        bool    claimed;
    }

    mapping(uint256 => Bounty) public bounties; // taskId => Bounty

    event BountyPosted(uint256 indexed taskId, address indexed poster, uint256 amount);
    event BountyClaimed(uint256 indexed taskId, address indexed claimer, uint256 amount);

    function postBounty(uint256 taskId, address token, uint256 amount) external {
        require(bounties[taskId].amount == 0, "Bounty exists");
        require(amount > 0, "Amount must be > 0");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        bounties[taskId] = Bounty(taskId, msg.sender, token, amount, address(0), false);
        emit BountyPosted(taskId, msg.sender, amount);
    }

    function claimBounty(uint256 taskId) external {
        Bounty storage b = bounties[taskId];
        require(b.amount > 0, "No bounty");
        require(!b.claimed, "Already claimed");
        b.claimed = true;
        b.claimer = msg.sender;
        IERC20(b.token).transfer(msg.sender, b.amount);
        emit BountyClaimed(taskId, msg.sender, b.amount);
    }
}
