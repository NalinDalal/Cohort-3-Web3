# upgradability

render everything on a bundle. not backend, just keep everything reconfigurable
cause it takes time to get deployed, not like website like ci/cd

need a new publish

same thing can be done for contract

things which can be changed can be parameterised

setMultiplier had been parameterised and hence can be upgradable

some specific use cases can be upgraded, but can't add new function

`a.sol`

## Parameterize everything

Make everything `configurable` by default so if there is ever a change you need to make, there is a `backdoor` for you to make it. 

This is very similar to how `mobile apps` are made highly `configurable` so they can be updated in the background without needing to go through `App store` / `Play store` approval.

a.sol

### Migrating contracts

Ask everyone to upgrade to a new smart contract address. 

### Pros -

1. Easy enough. No need to understand proxies/upgrades

**Cons -** 

1. Storage needs to be migrated to the new contract
2. Everyone needs to update the contract address in their clients

we know what is cci so change the state via cci

# delegateCall
b.sol
In Solidity, `delegatecall` is a low-level function used to execute code from another contract while maintaining the context (i.e., storage, msg.sender, msg.value) of the calling contract.

`delegatecall` is a special type of message call used to execute functions of another contract, but it runs in the context of the calling contract. This means:

- The code of the target contract is executed.
- The target contract’s code is executed as though it’s part of the calling contract.
- The **state** (storage) and other context (like `msg.sender` and `msg.value`) are maintained from the calling contract.

### **Syntax of `delegatecall`**

Here’s how `delegatecall` is typically used in Solidity:

```solidity
(bool success, bytes memory returnData) = targetContract.delegatecall(data);
```

- `targetContract`: The address of the contract you want to delegate the call to.
- `data`: The ABI-encoded data (including function signature and parameters) that will be executed on the target contract.
- `success`: A boolean indicating whether the call was successful or not.
- `returnData`: The data returned by the function call (if any).

## Usecase of `delegateCall`

1. Proxy contracts
2. Storing big contracts across multiple small contracts (because of the size limit of smart contracts)

## Difference b/w CCIs and delegateCall

| **Aspect** | **`call`** | **`delegatecall`** |
| --- | --- | --- |
| **Code Execution** | Executes code in the target contract. | Executes code in the target contract, but in the context of the calling contract. |
| **Storage** | Modifies the target contract’s storage. | Modifies the calling contract's storage. |
| **`msg.sender`** | Contract address of the contract calling the target contract | Stays the same as the calling contract's `msg.sender`. |
| **Use Case** | Interacting with another contract. | Upgradable proxies, modular contracts. |

## Caveats

- **Storage Layout**: The key limitation with `delegatecall` is that the storage of the calling contract is used. Therefore, both the calling contract and the called contract must have the same **storage layout** (i.e., the same variable types and order in storage). Otherwise, you could risk corrupting the contract's storage.
- **Gas Considerations**: `delegatecall` is relatively cheap because it allows you to reuse code, but the logic executed must be carefully managed to prevent high gas costs, especially in large or complex functions.
- **Security Risks**: While `delegatecall` is powerful, it also opens up security risks, especially if you don’t carefully manage access control or if you call an untrusted contract. If the logic contract is compromised, it can affect the calling contract’s state.
- **Reverts and Error Handling**: If the delegated call fails, it will revert the state changes and any changes made by the called contract will not be persisted. Error handling is crucial to ensure smooth execution.


high level 2 type contract - proxy and logic
proxy contract and logic contract are often used together to implement an upgradeable contract pattern


1. Proxy Contract
A proxy contract is a lightweight contract that delegates function calls to another contract (the logic contract) using the delegatecall opcode. It stores the actual contract's address (the logic contract) in its storage and forwards calls to it.

Purpose:

To enable contract upgrades without changing the deployed contract's address.
To keep the storage state of the proxy while swapping out the logic.
Key Features:

Minimal code to forward calls.
Acts as a single point of entry for users.
2. Logic Contract
The logic contract contains the core functionality and business logic. It is the implementation that the proxy delegates calls to.

Purpose:
To separate logic from storage and make the system upgradeable.
Developers can deploy a new logic contract to fix bugs or add features, then point the proxy to the updated contract.
3. How It Works (Delegatecall Mechanism)
When a function is called on the proxy, the call is forwarded to the logic contract using delegatecall.
delegatecall executes the function in the context of the proxy's storage.
This ensures that the state remains consistent and is stored in the proxy.

contract 1 has a function which on calling brings function2 from contract2 like
function2 was originally in contract1 then runs it

run implementation get value, set it to storage and then run it

# Proxy Pattern

The most common design pattern for upgradable contracts is the *Proxy Pattern*. This involves separating the contract's data (storage) and logic (code).


## Basic example - d.sol

# Adding onlyOwner to it

Currently, anyone can update the implementation of the contract. Lets change that so only owners can change the implementation

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract StorageProxy is Ownable {
    uint public num;
    address implementation;

    constructor(address _implementation) Ownable(msg.sender) {
        num = 0;
        implementation = _implementation;
    }

    function setNum(uint _num) public {
        (bool success, ) = implementation.delegatecall(
            abi.encodeWithSignature("setNum(uint256)", _num)
        );
        require(success, "Error while delegating call");
    }

    function setImplementation(address _implementation) public onlyOwner {
        implementation = _implementation;
    }

}
```

Try to test this, and you will notice that the variables dont update as expected.

# Storage layout

When using `delegatecall`, the **implementation contract’s code** is executed in the **proxy’s storage context**. For that to work properly, the **storage layout** in the proxy must match the **storage layout** in the implementation.

However, in your `StorageProxy`, you’ve inherited from OpenZeppelin’s `Ownable`, which adds its own storage variables—specifically `_owner`. This shifts around your storage slots in a way that your `ImplementationvX` contracts do not account for.

# Parent contract

The parent contract extends the `Ownable` contract from Openzeplin

## 1. OpenZeppelin’s Ownable

In the standard (simplified) OpenZeppelin **Ownable** contract, you typically have something like:

```solidity
abstract contract Ownable {
    address private _owner;
    // ...
}
```

So, for **Ownable**, the first storage slot (slot `0`) is `_owner`. 

---

## 2. StorageProxy

Your `StorageProxy` contract inherits from `Ownable` and declares two variables:

```solidity
contract StorageProxy is Ownable {
    uint public num;            // (1)
    address implementation;     // (2)
    ...
}
```

### So the layout in `StorageProxy` is effectively:

- **Slot 0** → `_owner`
- **Slot 1** → `num`
- **Slot 2** → `implementation`

---

## 3. Implementation v1 / v2 / v3

Each of your implementation contracts declares:

```solidity
solidity
Copy code
contract ImplementationvX {
    uint public num;  // Only variable
    ...
}
```

Because there’s just one variable (`uint public num`), it sits in **slot 0** in each of those contracts:

- **Slot 0** → `num`

## Storage layout mismatch
what if there's no function that is called to fallback to?

# Problem with current proxy

Ref - https://blog.openzeppelin.com/the-transparent-proxy-pattern

### Problem with the current proxy implementation

You have to specify all functions upfront when the `Proxy contract` is being deployed.

Solution
Push the num variable to Slot #1 in the implementation contract
Dumb solution (but also works)
```sol
contract Implementationv2 {
    uint public num1;
    uint public num;

    function setNum(uint _num) public {
        num = _num * 2;
    }
}

Better solution
```sol
contract Implementationv2 {
    uint public num1;
    address public _owner;

    function setNum(uint _num) public {
        num = _num * 2;
    }
}
```

# fallback Function

Ref - https://docs.soliditylang.org/en/v0.8.25/contracts.html#receive-ether-function

In Ethereum, the **fallback function** is a special function in a smart contract that is executed when the contract receives Ether and there is no other matching function signature for the call made. It is part of the low-level function set in Solidity and is commonly used for handling Ether transfers, handling unexpected function calls, or implementing custom logic for receiving Ether.

The fallback function is invoked when:

1. **The contract receives Ether** via a plain transfer or call (i.e., no data is provided with the transaction or the data doesn't match any existing function signature).
2. **The function call data does not match any function selector** in the contract.

## Properties of fallback fn

- It **does not have a name** (hence "fallback").
- It **cannot have any parameters**.
- It **cannot return anything** (i.e., no return values).
- It is **marked as `external`** and **payable** if it needs to accept Ether.
- It can be used to handle incoming Ether, execute arbitrary code, or forward calls to other contracts.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract FundReceiver {
    event FallbackCalled();
    
    fallback() external payable {
        emit FallbackCalled();			
    }
}

```

# Common Proxy patterns

There are three common `patterns` to do proxies/upgradable contracts in ETH.

1. Transparent proxy
2. Universal Upgradeable Proxy Standard (UUPS )
3. Beacon Proxy Pattern

## Transparent proxy

A **transparent proxy** in Ethereum (ETH) refers to a specific type of proxy contract that acts as an intermediary between a user and the actual logic or functionality of a smart contract, while remaining "transparent" in the sense that users or other contracts are unaware that they are interacting with a proxy instead of the underlying contract directly.

f.sol->

1. Deploy ImplementationV1
2. Deploy StorageProxy and give it the address of `ImplementationV1`
3. Select ImplementationV1 and change the `At address` field to the address of the proxy contract
4. Play with `setNum` and `num`
5. Try updating the implementation via the `ProxyAdmin` contract

### Problems

1. Function collissions (across implementation contract and logic contract)
2. Storage slot re-ordering

### **Simple Proxy vs Transparent proxy**

A **simple proxy** (often called a basic proxy) typically uses **delegatecall** to forward calls to another contract (implementation). However, it doesn't have the protections or additional features that come with the transparent proxy pattern:

- **Lack of transparency**: If the user interacts with a basic proxy, they may have more visibility into the proxy behavior, or the proxy could expose implementation-specific details.
- **Admin visibility**: In some proxies, the admin can interact with the contract through the same functions as the user, potentially making it more difficult to distinguish between admin-level functionality and regular contract behavior.

# UUPS 
UUPS stores the admin logic directly in the implementation contract instead of storing it the Proxy contract.

`g.sol`
