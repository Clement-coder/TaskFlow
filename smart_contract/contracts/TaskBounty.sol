// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title TaskBounty — post cUSD bounties for tasks, claimable on completion
contract TaskBounty is ReentrancyGuard {
    struct Bounty {
        uint256 taskId;
        address poster;
        address token;
        uint256 amount;
        address claimer;
        bool    claimed;
    }

    mapping(uint256 => Bounty) public bounties;

    event BountyPosted(uint256 indexed taskId, address indexed poster, uint256 amount);
    event BountyClaimed(uint256 indexed taskId, address indexed claimer, uint256 amount);
    event BountyCancelled(uint256 indexed taskId);

    function postBounty(uint256 taskId, address token, uint256 amount) external {
        require(bounties[taskId].amount == 0, "Bounty exists");
        require(amount > 0, "Amount must be > 0");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        bounties[taskId] = Bounty(taskId, msg.sender, token, amount, address(0), false);
        emit BountyPosted(taskId, msg.sender, amount);
    }

    function claimBounty(uint256 taskId) external nonReentrant {
        Bounty storage b = bounties[taskId];
        require(b.amount > 0, "No bounty");
        require(!b.claimed, "Already claimed");
        b.claimed = true;
        b.claimer = msg.sender;
        IERC20(b.token).transfer(msg.sender, b.amount);
        emit BountyClaimed(taskId, msg.sender, b.amount);
    }

    function cancelBounty(uint256 taskId) external nonReentrant {
        Bounty storage b = bounties[taskId];
        require(b.poster == msg.sender, "Not poster");
        require(!b.claimed, "Already claimed");
        uint256 amount = b.amount;
        b.amount = 0;
        IERC20(b.token).transfer(msg.sender, amount);
        emit BountyCancelled(taskId);
    }
}
