// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Artonchain is ERC721, Ownable {
    uint256 private _nextId = 1;

    constructor() ERC721("Artonchain", "ARTC") Ownable(msg.sender) {}

    // MVP: owner mints to any address; later you can open this to everyone or add a price
    function mintArt(address to) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextId++;
        _safeMint(to, tokenId);
    }
}
