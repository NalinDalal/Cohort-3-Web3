pragma solidity ^0.8.0;
contract PersonContract{
struct Person {
string name;
uint age;
address addr;
}
Person public person;
function setPerson(string memory _name, uint _age, address _addr) public {
person.name = _name;
person.age = _age;
person.addr = _addr;
function getPerson() public view returns (string memory, uint, address) {
return (person.name, person.age, person.addr);
}}
