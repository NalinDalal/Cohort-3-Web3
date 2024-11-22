/* Create an will contract
1. Every user will deploy their own Will Contract.
2. When initialized, set the owner to be the person initializing
3. The owner can define a recipient in the constructor
4. Owner should be allowed to change the recipient
5. Owner should be allowed to interact with the contract via a ping function
6. If ping hasnt been called for > 1 year, the recipient should be allowed to call a drain function
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WillContract {
    address public owner;          // Owner of the will
    address public recipient;      // Recipient of the will
    uint256 public lastPingTime;   // Timestamp of the last ping from the owner

    uint256 constant ONE_YEAR = 365 days;

    event RecipientChanged(address indexed oldRecipient, address indexed newRecipient);
    event Ping(address indexed owner, uint256 time);
event Drained(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address _recipient) {
        require(_recipient != address(0), "Recipient address cannot be zero");
        owner = msg.sender;
        recipient = _recipient;
        lastPingTime = block.timestamp;
    }

    /// @notice Allows the owner to update the recipient of the will
    /// @param _newRecipient The new recipient address
    function changeRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Recipient address cannot be zero");
        address oldRecipient = recipient;
        recipient = _newRecipient;
        emit RecipientChanged(oldRecipient, _newRecipient);
    }

    /// @notice Allows the owner to "ping" the contract to reset the timer
    function ping() external onlyOwner {
        lastPingTime = block.timestamp;
        emit Ping(msg.sender, lastPingTime);
    }

    /// @notice Allows the recipient to drain the contract if no ping has been received for over a year
    function drain() external {
        require(msg.sender == recipient, "Only the recipient can call this function");
        require(block.timestamp > lastPingTime + ONE_YEAR, "Owner is still active");

        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to transfer");

        (bool success, ) = recipient.call{value: contractBalance}("");
        require(success, "Transfer failed");

        emit Drained(recipient, contractBalance);
    }

    /// @notice Allow the contract to receive funds
    receive() external payable {}

    /// @notice Retrieve the contract balance
    /// @return The balance of the contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

