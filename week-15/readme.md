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

# Memory vs Stack vs Storage
store data either in stack or heap
stack-> static array
heap->dynamic array


In Solidity, Memory, Stack, and Storage are three distinct locations where data can be stored. Each has its own characteristics, use cases, and costs.

# Storage
Storage refers to the persistent data that is saved on the blockchain. It is used for state variables that you declare at the contract level. 
Data stored in storage is written to the blockchain and remains there permanently, across function calls and transactions, until it is explicitly modified.

Writing to storage is costly in terms of gas because it requires changes to the blockchain state, which involves network consensus and storage allocation on the blockchain.

# Memory
Memory refers to temporary data storage that only exists during the execution of a function. It is cheaper than storage because it is not stored on the blockchain and is only kept in the node's memory while the function is executing. Once the function finishes execution, the data is discarded.
Not permanently stored, in house only


Temporary: Data in memory is erased once the function execution ends.
Cheaper than storage: Writing to memory is significantly cheaper in terms of gas costs compared to storage because it does not involve writing to the blockchain.
Not persistent: Data in memory is not stored permanently annanaetbe accessed outside the function that created it.
Used for Function Arguments/Local Variables:
When passing large structures or arrays into functions, they are often stered in memory for cheaper gas consumption.

unknown,dynamic length-> heap
known,const length-> stack

# Stack
The stack in Solidity is a limited, low-level data structure used to store small, temporary values that are used during the execution of a 
function. Its akin to a "call stack" in other programming languages. When you call a function, the EVM pushes temporary values (such as function 
arguments and local variables) onto the stack.

# Modifiers
In Solidity, modifiers are a powerful feature that allows you to modify the behavior of functions in a reusable and declarative way. 
They are used to add additional checks or functionality to a function or group of functions, before or after the main logic is executed.

we can store the owner of store into constructor
```solidity
//can store owner here in constructor
    constructor(){
        owner=msg.sender;
    }
    function add(uint a) public{
        number=number+a;
    }
```

they stops everything if checks are not passed.

own custom modifier->
```sol
pragma solidity ^0.8.0;|
contract Example {
address public owner;
constructor() {
owner = msg.sender; // Set the deployer as the owner
}
modifier onlyOwner() {
require(msg sender = owner, "You are not the owner!");
_;}
// Function that only the owner can call
function setOwner(address newOwner) public onlyOwner {
owner = newOwner;}
function sum(uint a, uint b) public view onlyOwner returns (uint) €
return a + b;}}
```

# Returning Tuples
```solidity
function getNumber() public view returns (uint, uint, bool) ( R' infinite gas
return (number, number, true);}}
``````

# Pure Function
In Solidity, pure functions are functions that do not read from or modify the blockchain state. They only rely on their input parameters to perform calculations or operations and return a result.
Importantly, pure functions do not interact with any state variables or external contracts.
```sol
function sumAndMul(uint a, uint b) public pure returns (uint, uint) {
return (a + b, a * b);}
```

# Events
In Ethereum, events are a mechanism that allows smart contracts to log information on the blockchain, which can then be accessed by external consumers (e.g., front-end applications, other contracts, or off-chain services like oracles). Events enable smart contracts to emit logs that can be used for debugging, indexing, or triggering external actions based on contract activity.

```sol
pragma solidity ^0.8.0;
contract EventExample{
// Declare the event with two parameters: an address and a uint
    event Transfer(address indexed from, address indexed to, uint256 value);
        // A function that emits the Transfer event
        function transfer(address to, uint256 value) public {
            // Emitting the event with the specified parameters
            emit Transfer(msg-sender, to,value);
    }
}
```

indexed-> Can be used to search all txns from a specific user later

# External Contracts
we import external contracts which are actually deployed
they are sort of reusable code

do assignments on quiz.100xdevs.com
