# Interfaces, CCIs and Payables

# CCI(Cross Contact Invocation)
user calls a contract, then that contract invoked another function in another contract

A cross-contract call refers to a scenario where one smart contract interacts with another smart contract by invoking its functions.
This is a fundamental concept in blockchain programming, enabling modular, reusable, and composable systems.

# Interfaces
An interface in Solidity is a way to define a contract's external functions without providing their implementation.

## Properties of interfaces
1. Function declarations only:
    a. Interfaces only allow function declarations without implementations.
    b. Functions must be external.
2. No state variables or constructors:
    a. Interfaces cannot have state variables or constructors.
3. No inheritance from other contracts:
    a. Interfaces can inherit only from other interfaces.
4. Interactions with other contracts:
    a. Interfaces are commonly used to interact with already deployed contracts, enabling modularity and upgradability.

they are abstract, can't instantiate a new object

```sol
pragma solidity >=0.8.2 <0.9.0;

contract Storage {
uint public num;
constructor (uint _num) {
num = _num;
}
function getNum() public view returns (uint) {
return num;
}
function add() public {
num = num + 1;
}}
```

# Payables
Payable keyword is used to allows someone to send ether to a contract and run code to account for this deposit
```sol
pragma solidity ^0.8.0;
contract MyContract {
uint public amount;
function deposit() public payable {
amount += msg.value;
｝
function withdraw(address payable recipient) public {
payable(recipient).transfer (amount) ;
amount=0;}
function getBalance() public view returns (uint256) {
return address(this).balance;}}
```

Create an will contract
1. Every user will deploy their own Will Contract.
2. When initialized, set the owner to be the person initializing
3. The owner can define a recipient in the constructor
4. Owner should be allowed to change the recipient
5. Owner should be allowed to interact with the contract via a ping function
6. If ping hasnt been called for > 1 year, the recipient should be allowed to call a drain function

