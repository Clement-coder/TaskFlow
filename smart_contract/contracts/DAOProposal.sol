// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title DAOProposal — on-chain DAO proposal and voting for TaskFlow roadmap
contract DAOProposal {
    struct Proposal {
        uint256 id;
        address proposer;
        string  title;
        string  description;
        uint256 upvotes;
        uint256 downvotes;
        bool    executed;
        uint256 createdAt;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed id, address indexed proposer, string title);
    event Voted(uint256 indexed id, address indexed voter, bool upvote);

    function createProposal(string calldata title, string calldata description)
        external returns (uint256)
    {
        uint256 id = ++proposalCount;
        proposals[id] = Proposal(id, msg.sender, title, description, 0, 0, false, block.timestamp);
        emit ProposalCreated(id, msg.sender, title);
        return id;
    }

    function vote(uint256 id, bool upvote) external {
        require(proposals[id].id != 0, "Proposal not found");
        require(!hasVoted[id][msg.sender], "Already voted");
        hasVoted[id][msg.sender] = true;
        if (upvote) proposals[id].upvotes++;
        else proposals[id].downvotes++;
        emit Voted(id, msg.sender, upvote);
    }

    function getProposal(uint256 id) external view returns (Proposal memory) {
        return proposals[id];
    }

    function getVoteResult(uint256 id) external view returns (bool passed, uint256 upvotes, uint256 downvotes) {
        Proposal memory p = proposals[id];
        return (p.upvotes > p.downvotes, p.upvotes, p.downvotes);
    }
}
