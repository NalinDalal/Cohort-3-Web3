// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MyMintableToken is ERC20, Ownable {

    constructor() ERC20("MyMintableToken", "MMT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000000);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}
