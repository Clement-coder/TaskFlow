// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CeloNameRegistry — map wallet addresses to human-readable names on Celo
contract CeloNameRegistry {
    mapping(address => string) public names;
    mapping(string  => address) public addresses;

    event NameRegistered(address indexed wallet, string name);
    event NameUpdated(address indexed wallet, string oldName, string newName);

    function register(string calldata name) external {
        require(bytes(name).length > 0 && bytes(name).length <= 32, "Invalid name length");
        require(addresses[name] == address(0), "Name taken");
        string memory old = names[msg.sender];
        if (bytes(old).length > 0) delete addresses[old];
        names[msg.sender] = name;
        addresses[name]   = msg.sender;
        if (bytes(old).length > 0) emit NameUpdated(msg.sender, old, name);
        else emit NameRegistered(msg.sender, name);
    }

    function resolve(string calldata name) external view returns (address) {
        return addresses[name];
    }

    function lookup(address wallet) external view returns (string memory) {
        return names[wallet];
    }
}
