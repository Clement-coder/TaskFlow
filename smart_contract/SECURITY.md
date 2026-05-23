# Security Considerations

## Access Control
All admin functions use `require(msg.sender == owner)` guards. `ReputationLedger` uses dual-auth allowing owner or registered `taskRegistry` to mint.

## Reentrancy
`TaskBounty.claimBounty` and `cancelBounty` are protected with `ReentrancyGuard`.

## Integer Overflow
Solidity `^0.8.24` has built-in overflow/underflow protection.

## Input Validation
- Task existence checked before status updates
- Progress capped at 100 in `ProjectRegistry`
- Duplicate vote prevention in `DAOProposal` and `MilestoneTracker`
- Duplicate membership prevention in `WorkspaceRegistry` and `TeamRegistry`

## Pre-Mainnet Checklist
- [ ] Third-party security audit
- [ ] Time-locks on admin functions
- [ ] Upgradeability pattern (UUPS or Transparent Proxy)
- [ ] Fuzz testing
