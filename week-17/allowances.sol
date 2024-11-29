// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "KiratCoin";
    uint public totalSupply = 0;
    address public owner;

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowances;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() {
        owner = msg.sender;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function mintTo(address to, uint amount) public {
        require(msg.sender == owner, "Only the owner can mint tokens");
        balances[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "You do not have enough balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function burn(uint amount) public {
        require(balances[msg.sender] >= amount, "You do not have enough balance");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
    
    function transferFrom(address from, address to, uint amount) public {
        require(balances[from] >= amount, "Sender does not have enough balance");
        require(allowances[from][msg.sender] >= amount, "Allowance exceeded");
        
        balances[from] -= amount;
        balances[to] += amount;
        allowances[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
    }
}

