pragma solidity ^0.8.0;
contract FixedArrayExample {
// Declare a fixed-size array of uint with size 3
uint[3] public numbers;
function setNumbers(uint _numl, uint _num2, uint _num3) public {
numbers [0] =_num1;
numbers [1] = _num2;
numbers [2] = _num3;
function getNumber(uint index) public view returns (uint) { 
return numbers [index];}}
