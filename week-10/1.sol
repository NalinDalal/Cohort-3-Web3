// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
// State variable to store the counter value
uint256 private count;
// Constructor to initialize the counter with 0 (optional)
constructor () {
//127982 gas 122800 gas
count = 0;}
// Function to increment the counter
function increment() public {
count += 1;
}
// Function to decrement the counter
function decrement() public {
require(count > 0, "Counter cannot go below zero");
count -= 1;
}
// Function to get the current value of the counter
function getCount() public view returns (uint256) {
return count;}}
