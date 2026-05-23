// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

abstract contract Pausable {
    bool public paused;
    address public pauseAdmin;

    event Paused(address by);
    event Unpaused(address by);

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier onlyPauseAdmin() {
        require(msg.sender == pauseAdmin, "Not pause admin");
        _;
    }

    constructor(address _admin) {
        pauseAdmin = _admin;
    }

    function pause() external onlyPauseAdmin {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyPauseAdmin {
        paused = false;
        emit Unpaused(msg.sender);
    }
}
