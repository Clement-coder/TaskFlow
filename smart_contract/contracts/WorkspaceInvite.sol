// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title WorkspaceInvite — invite-code based workspace access on Celo
contract WorkspaceInvite {
    mapping(bytes32 => uint256) public inviteCodes; // hash => workspaceId
    mapping(bytes32 => bool)    public usedCodes;
    mapping(bytes32 => uint256) public codeExpiry;

    event InviteCreated(uint256 indexed workspaceId, bytes32 codeHash, uint256 expiry);
    event InviteUsed(uint256 indexed workspaceId, address indexed user, bytes32 codeHash);

    function createInvite(uint256 workspaceId, string calldata code, uint256 validFor) external {
        bytes32 h = keccak256(abi.encodePacked(code));
        inviteCodes[h] = workspaceId;
        codeExpiry[h]  = block.timestamp + validFor;
        emit InviteCreated(workspaceId, h, block.timestamp + validFor);
    }

    function useInvite(string calldata code) external returns (uint256 workspaceId) {
        bytes32 h = keccak256(abi.encodePacked(code));
        require(inviteCodes[h] != 0, "Invalid code");
        require(!usedCodes[h], "Code already used");
        require(block.timestamp <= codeExpiry[h], "Code expired");
        usedCodes[h] = true;
        workspaceId  = inviteCodes[h];
        emit InviteUsed(workspaceId, msg.sender, h);
    }
}
