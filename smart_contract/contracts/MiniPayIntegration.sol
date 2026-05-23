// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title MiniPayIntegration — MiniPay booster integration for Talent Protocol campaign
/// @dev MiniPay is Celo's mobile wallet — integrating it boosts campaign ranking
contract MiniPayIntegration {
    mapping(address => bool) public miniPayUsers;
    uint256 public miniPayUserCount;

    event MiniPayUserRegistered(address indexed user, uint256 timestamp);

    /// @notice Register as a MiniPay user to activate the campaign booster
    function registerMiniPayUser() external {
        require(!miniPayUsers[msg.sender], "Already registered");
        miniPayUsers[msg.sender] = true;
        miniPayUserCount++;
        emit MiniPayUserRegistered(msg.sender, block.timestamp);
    }

    function isMiniPayUser(address user) external view returns (bool) {
        return miniPayUsers[user];
    }
}
