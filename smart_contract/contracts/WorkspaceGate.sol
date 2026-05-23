// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title WorkspaceGate — token-gated workspace access on Celo
/// @dev Uses any ERC20 (e.g. cUSD) as the gate token; default threshold = 100 tokens
contract WorkspaceGate {
    address public owner;
    IERC20  public gateToken;
    uint256 public threshold;

    mapping(address => bool) public overrides; // manual access grants

    event AccessGranted(address indexed user);
    event ThresholdUpdated(uint256 newThreshold);

    constructor(address _gateToken, uint256 _threshold) {
        owner     = msg.sender;
        gateToken = IERC20(_gateToken);
        threshold = _threshold;
    }

    /// @notice Returns true if the wallet holds enough tokens OR has a manual override
    function hasAccess(address user) external view returns (bool) {
        return overrides[user] || gateToken.balanceOf(user) >= threshold;
    }

    function setThreshold(uint256 _threshold) external {
        require(msg.sender == owner, "Not owner");
        threshold = _threshold;
        emit ThresholdUpdated(_threshold);
    }

    function grantOverride(address user) external {
        require(msg.sender == owner, "Not owner");
        overrides[user] = true;
        emit AccessGranted(user);
    }

    function revokeOverride(address user) external {
        require(msg.sender == owner, "Not owner");
        overrides[user] = false;
    }
}
