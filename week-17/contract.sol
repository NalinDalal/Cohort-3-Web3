// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    //1. Initialise the metadata of token
    string public name = "KiratCoin";
    uint public supply = 0;
    address public owner;
    mapping(address => uint) public balances;

    constructor() {
        owner = msg.sender;
    }
    //2. Declaring the `mintTo` function
    function mintTo(address to, uint amount) public {
        require(msg.sender == owner);
        balances[to] += amount;
        supply += amount;
    }

    //3. Implement the `transfer` function
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        require(balance >= amount, "You dont have enough baance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    //4. Implement the `burn` function
    function burn(uint amount) public {
        uint balance = balances[msg.sender];
        require(balance >= amount, "You dont have enough baance");
        balances[msg.sender] -= amount;
        supply -= amount;
    }

}
