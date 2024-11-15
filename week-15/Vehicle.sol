pragma solidity ^0.8.0;
contract Vehicle {
string public brand;
constructor(string memory _brand) {
brand =_brand;
}
//infinit gas 121400 gas
function description() public pure virtual returns (string memory){ "This is a vehicle";}}
