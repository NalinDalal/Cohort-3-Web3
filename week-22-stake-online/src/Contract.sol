// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract SimpleStaking {
       mapping(address => uint256) public balances;

      event Staked(address indexed user, uint256 amount);

   
    event Unstaked(address indexed user, uint256 amount);

      function stake() external payable {
        require(msg.value > 0, "Must send ETH to stake");
        
               balances[msg.sender] += msg.value;

        emit Staked(msg.sender, msg.value);
    }

       function unstake(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance to unstake");
        require(_amount > 0, "Amount must be greater than 0");

              balances[msg.sender] -= _amount;

      payable(msg.sender).transfer(_amount);

        emit Unstaked(msg.sender, _amount);
    }

}

/*
pragma solidity ^0.8.13;
contract StakingContract {
mapping (address => uint) stakes; 
uint public totalStake;

constrctor(){}
function stake(uint _amount) public payable{
    require (_amount > 0);
require(_amount = msg. value) ;
stakes [msg. sender] += _amount; totalStake += _amount;
}
function unstake(uint _amount) public payable{
require(stakes [msg.sender] >= _amount);
payable (msg. sender). transfer (1); 
totalStake -= _amount;
stakes [msg. sender] -= _amount;}*/
