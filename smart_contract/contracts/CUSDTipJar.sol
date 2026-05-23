// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title CUSDTipJar — tip team members in cUSD on Celo
contract CUSDTipJar {
    address public constant CUSD_MAINNET = 0x765DE816845861e75A25fCA122bb6898B8B1282a;

    event TipSent(address indexed from, address indexed to, uint256 amount, string message);

    function tip(address to, uint256 amount, string calldata message) external {
        require(to != address(0), "Zero address");
        require(amount > 0, "Amount must be > 0");
        IERC20(CUSD_MAINNET).transferFrom(msg.sender, to, amount);
        emit TipSent(msg.sender, to, amount, message);
    }
}
