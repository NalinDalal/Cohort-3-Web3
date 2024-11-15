function categorizeNumber(uint256 _number) public pure returns (string memory) {
if (_number < 10) {
return "Small";
} else if (_number >= 10 && _number <100) {
return "Medium";
} else {
return "Large";}}
