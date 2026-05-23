// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title ProofOfWork — ERC721 NFT minted as proof of task completion on Celo
contract ProofOfWork is ERC721 {
    address public owner;
    uint256 public tokenCount;

    struct Proof {
        address worker;
        string  taskTitle;
        uint8   priority;
        uint256 mintedAt;
    }

    mapping(uint256 => Proof) public proofs;

    event ProofMinted(uint256 indexed tokenId, address indexed worker, string taskTitle);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() ERC721("TaskFlow Proof of Work", "TFPOW") {
        owner = msg.sender;
    }

    function mint(address worker, string calldata taskTitle, uint8 priority)
        external onlyOwner returns (uint256)
    {
        uint256 tokenId = ++tokenCount;
        _mint(worker, tokenId);
        proofs[tokenId] = Proof(worker, taskTitle, priority, block.timestamp);
        emit ProofMinted(tokenId, worker, taskTitle);
        return tokenId;
    }

    function getProof(uint256 tokenId) external view returns (Proof memory) {
        return proofs[tokenId];
    }
}
