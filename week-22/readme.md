10.01.2025

## What we’re building

a `Staking` contract where people can come and `stake` native ETH. 

### More complex approach #0 -

Issue the users an ERC-20 based on the time they are staking it for.

### More complex approach #1 -

Lock the tokens for the user during withdrawal for 21 days. They don’t get the new token for that amount of time. 

### More complex approach #2 -

Stake an ERC-20 token and not native ETH.

### Use case -

Staking ETH over to a new blockchain/protocol in lieu of the tokens of the new blockchain

create a file stake.sol; initialise the empty template
```bash
 forge init --template https://github.com/foundry-rs/forge-template stake
```

now code

when sending out eth, no need to make function payable; while for receiving make
it payable
```sol
pragma solidity ^0.8.13;
contract StakingContract ‹
mapping (address => uint) stakes; uint public totalStake;
constructor() {
}
function stake(uint _amount) public payable {
require(_amount > 0);
require (_amount = msg. value);
stakes[msg.sender] += _amount; totalStake += _amount;
}
function unstake(uint _amount) public {
require(stakes [msg. sender] >= _amount);
payable (msg. sender). transfer (_amount) ;
totalStake -= _amount;
stakes[msg.sender] -= _amount;}}
```

goal for now-> make it buggy

so we wrote test
then wrote the test w/o bugs
 
now 
# Proxy contract

To ensure smooth upgradability, we should introduce a `proxy` contract that lets us upgrade from `one implementation` to `another`
```sol
pragma solidity ^0.8.0;

contract StakingProxy {
    uint256 public totalStaked;
    mapping(address => uint256) public stakedBalances;

    address public implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    fallback() external payable {
        // Forward the call to the implementation contract
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }
}
```

## Test
```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/StakingContract.sol";
import "src/StakingContract2.sol";
import "src/StakingProxy.sol";

contract StakingProxyTestContract is Test {
    StakingContract wrongStakeContract;
    StakingContract2 rightStakeContract;
    StakingProxy c;

    function setUp() public {
        wrongStakeContract = new StakingContract();
        rightStakeContract = new StakingContract2();
        c = new StakingProxy(address(wrongStakeContract));
    }

    function testStake() public {
        uint value = 10 ether;
        vm.deal(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f, value);
        vm.prank(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f);
        (bool success, ) = address(c).call{value: value}(
            abi.encodeWithSignature("stake(uint256)", value)
        );
        assert(success);
        (bool success2, bytes memory data) = address(c).delegatecall(abi.encodeWithSignature("getTotalStaked()"));
        assert(success2);
        console.logBytes(data);
        uint currentStake = abi.decode(data, (uint256));
        console.log(currentStake);
        assert(currentStake == value);
    }
}

```

### Assignment

Write the end to end test for it
