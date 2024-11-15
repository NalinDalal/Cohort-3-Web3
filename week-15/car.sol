import "./Vehicle.sol"; // Import the Vehicle contract
contract Car is Vehicle {
uint public numberOfDoors;
// Constructor that also initializes the parent contract
constructor(string memory _brand, uint _numberOfDoors) Vehicle(_brand) {
numberOfDoors = _numberOfDoors;
}
// Override the description function to make it more specific for a car
function description() public pure override returns (string memory) { {
return "This is a car";}}
