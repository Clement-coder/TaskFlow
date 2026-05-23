// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TaskRegistry.sol";
import "./ReputationLedger.sol";
import "./WorkspaceGate.sol";

/// @title TaskFlowFactory — deploys all TaskFlow contracts in one transaction
contract TaskFlowFactory {
    event Deployed(
        address indexed deployer,
        address taskRegistry,
        address reputationLedger,
        address workspaceGate
    );

    /// @param gateToken  ERC20 token address for workspace gating (use cUSD on Celo)
    /// @param threshold  Minimum token balance required for workspace access
    function deploy(address gateToken, uint256 threshold)
        external
        returns (address registry, address ledger, address gate)
    {
        TaskRegistry reg = new TaskRegistry();
        ReputationLedger rep = new ReputationLedger(address(reg));
        WorkspaceGate wg = new WorkspaceGate(gateToken, threshold);

        registry = address(reg);
        ledger   = address(rep);
        gate     = address(wg);

        emit Deployed(msg.sender, registry, ledger, gate);
    }
}
