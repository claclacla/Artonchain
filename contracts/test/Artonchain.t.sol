// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Artonchain} from "../src/Artonchain.sol";

contract ArtonchainTest is Test {
    Artonchain nft;
    address me = address(0xBEEF);

    function setUp() public {
        nft = new Artonchain();
    }

    function testMint() public {
        uint256 id = nft.mintArt(me);
        assertEq(nft.ownerOf(id), me);
    }
}
