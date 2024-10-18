18.10.2024

# Introduction to ETH and EVM

## World State

In Ethereum, the world state refers to a mapping of all account addresses (both externally owned accounts (EOA) and contract accounts) to their
current states.

Ethereum is a state machine whose state changes as more blocks are added to the blockchain.

# Types of accounts on ETH(EOA vs Contract accounts)
**Externally Owned Accounts:** In Ethereum, an Externally Owned Account (EOA) is a type of account controlled by a user (i.e., a person)
through the use of a private key.
**Contract Accounts:** In Ethereum, a Contract Account is an account that is controlled by smart contract code rather than by a private key, as 
is the case with Externally Owned Accounts (EOAs).

# Key Characteristics of Externally Owned Accounts (EOAs):
1. Controlled by Private Keys:
• EAs are controlled by private keys that are held by individuals or entities. If you possess the private key to an EOA, you can initiate transactions from that account, such as sending Ether (ETH) or interacting with smart contracts.
2. No Code or Smart Contracts:
• EAs do not have any associated code or logic, unlike contract accounts which contain smart contract code. They are simply used to store Ether or send transactions to other accounts (including contract accounts).
3. Transaction Initiation:
• EOAs are the only type of accounts that can initiate transactions. A Contract Account can only respond to transactions, but it cannot start one on its own.
4. Ether Balance:
• EAs can hold a balance of Ether (ETH). Contract accounts can also hold ETH, but they need EAs to initiate transactions to move or use this balance.
5. Gas Costs:
• EAs must pay gas (in ETH) for any transactions they send. Gas is required to incentivise miners or validators to process and validate the transaction.

## Nonce:
| Aspect              | Externally Owned Account (EOA)      | Contract Account (Smart Contract)    |
|---------------------|-------------------------------------|--------------------------------------|
| **Definition of Nonce** | Number of transactions sent by the EOA | Number of contracts created by the account |
| **Purpose**          | Ensures unique transaction ordering | Ensures unique contract addresses    |
| **Incrementing**     | Increases after each transaction    | Increases after each contract creation |
| **Used For**         | Preventing double-spending, replay attacks, and ensuring transaction order | Determining the address of newly created contracts |


## Balance:
| Feature              | Externally Owned Accounts (EOAs)      | Contract Accounts (Smart Contracts)  |
|----------------------|---------------------------------------|--------------------------------------|
| **Balance**           | Holds and manages Ether directly      | Holds and manages Ether based on contract code |
| **Control**           | Controlled by private key             | Controlled by contract code          |
| **Can Send Ether**    | Yes, via transactions                 | Yes, but only based on logic in the code |
| **Can Receive Ether** | Yes                                   | Yes                                  |
| **Pays Gas Fees**     | Yes, from its balance                 | No (the gas fees are paid by the EOA that called the contract) |



1. Storage Hash:
• Each smart contract in Ethereum can store data in its own storage, which is a key-value store. The storage contains things like variables defined in the contract (e.g., balances, state flags).
• The storage hash is the root hash of the contract's storage tree, which is a compact cryptographic structure used to store key-value data.

2. Code Hash:
• Smart contracts in Ethereum are written in high-level languages (like Solidity), but they are compiled into EVM bytecode for execution on the Ethereum
Virtual Machine (EVM).
• The code hash is a cryptographic hash (usually SHA3) of the contract's bytecode. It uniquely identifies the code of the contract.
• Once a smart contract is deployed on Ethereum, its code hash is permanently fixed unless the contract is destroyed

# Ethereum Virtual machine

The Ethereum Virtual Machine (EVM) is conceptually similar to the Java Virtual Machine (JVM) in that both are virtual machines designed to run 
platform-independent code, but they differ significantly in their purpose, design, and what they execute.

Solidity Code-->ByteCode --> EVM

Solidity is a high-level programming language designed for writing smart contracts that run on the Ethereum Virtual Machine (EVM).  Developers use
Solidity to implement smart contracts that can be deployed on blockchain platforms like Ethereum, allowing for the creation of decentralized
applications (dApps).

# ABIs

In Ethereum, an ABI (Application Binary Interface) is a standardized way for interacting with smart contracts. It defines how data should be 
encoded and decoded when being sent to and from a contract on the Ethereum blockchain.

## Usecasess of ABIs

Testing smart contracts
Understanding the structure of smart contracts
Autogenerating UIs for interacting with the contract


# Simple Counter Contract - 1.sol
This is short term memory

It it wiped off after the contract call is done

Usually used for storing temp
arrays/collections
