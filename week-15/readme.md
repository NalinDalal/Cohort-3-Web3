# What is solidity

Solidity is a `high-level`, `statically-typed` programming language used to write smart contracts for `Ethereum` and other blockchain platforms that are compatible with the Ethereum Virtual Machine (EVM). These smart contracts are self-executing contracts with the terms of the agreement directly written into code.

### What is EVM?

![Screenshot 2024-11-15 at 2.50.22 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/e62f4d35-9564-4275-94d7-be032b93c574/Screenshot_2024-11-15_at_2.50.22_AM.png)

As the EVM developer, you are supposed to focus on writing the Solidity code.

Rarely (if you’re working on the blockchain/want to inspect something deeper) you decompile the bytecode and try to understand it.

### Solidity version
The version statement at the top of a Solidity contract specifies the version of the Solidity compiler that should be used to compile the contract.

`pragma solidity ^0.8.0;` -> version 0.8.0 or higher, but not 0.9.0 or above
`pragma solidity >=0.7.0 <0.9.0;`-> Any version betweek 0.7.0 to 0.9.0
`pragma solidity 0.8.26;` -> exact version

### Variables
1. Unsigned Numbers
    a. uint8 - Small numbers
    b. uint16 - 16 bit numbers
    c. uint256 - 256 bit number (uint)

2. Signed numbers
    a. int
    b. int32

3. Booleans

4. Addresses

5. Strings

### Constructor
A constructor in Solidity is a special function that is executed only once during the deployment of the contract. Its primary purpose is to initialize the contract's state
variables and set up any required logic when the contract is deployed to the Ethereum blockchain.

```sum.sol
pragma solidity >=0.8.2 <0.9.0;

contract Calculator{
    uint num=0;

    constructor(uint _num){ // `_` is to avoid names from conflicting
        num=_num;
    }
}
```

there are some testnet account, always give Estimated Gas
when we try to deploy, ask for a input(say 10)
gets deployed with the testnet account getting reduced eth

`view` tell that no gas shall be utilised for the function

note: compile the contract always

### Functions
```sol
pragma solidity ^0.8.0;
contract Calculator {
uint256 currentValue;
constructor(uint256 _initialValue) { 
currentValue =_initialValue; // Set the initial value
}
function add(uint256 value) public { //I infinite gas
currentValue += value;
}}
```

do for Subtraact, Multiply, Divide

### View
In Solidity, the view keyword indicates that the function does not modify the state of the blockchain. 

It is a type of function modifier that tells the Ethereum Virtual Machine (EVM) that the function is read-only and will not alter any state variables or perform any operations that would require a transaction.


### Two Types of Function 
State-changing functions: Functions that modify state variables, interact with other contracts, or send/receive Ether require a transaction and are considered "non-view" functions.

View functions: These are functions that only read from the blockchain state (like reading a variable) but do not modify it. They can be called without creating a transaction and do not consume gas when called externally via a call.

# Inheritance
Have a parent contract, and a child contract-> vehicle.sol, car.sol

# For Loop-> for_loop.sol
# if_else-> if-else.sol

# Mappings

In Solidity, a mapping is a data structure that allows you to store and look up key-value pairs. It's similar to a hash table or dictionary in other programming languages.

create
```sol
mapping(address=>string) public names;
```

insert
```sol
names[msg.sender]=_name;
```

get from a mapping
```sol
names[_address];
```

## Assignment
Create a User contract where users can come and sign up
```sol
pragma solidity ^0.8.0;
contract NameRegistry{
mapping (address => string) public names;
function setName(string memory _name) public {
names [msg.sender] =_name;
}
function getName(address _address) public view returns (string memory) {
return names _address!;
}
}```


# Arrays
There are two types of arrays in Solidity

Fixed-size arrays(array1): Arrays where the size is defined when the array is created, and it cannot be changed afterward.

Dynamic arrays(array2): Arrays where the size can change dynamically during execution (i.e., you can add or remove elements).


