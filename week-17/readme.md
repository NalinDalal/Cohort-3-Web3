#  ERC-20 and OpenZeplin contracts.

What are custom tokens?

Any token other than native ETH on the eth blockchain is a custom token. To
launch it, deploy fresh contract on blockchain, you can't call any existing one.

There are types of Tokens

Ethereum -> Native ETH
USDC, USDT -> Custom Token (ERC20 Contract)

EOA(Externally Owned Account)->An EOA is controlled by a private key and represents a human user or external entity.
Contract Account->A Contract Account represents a smart contract deployed on the blockchain.

- Think of an EOA as a user with a wallet, capable of performing any action on the blockchain within the bounds of gas and permissions.
- A Contract Account is like an automated service or program, waiting for input (transactions) to execute pre-defined tasks.

# Custom token on ETH

Every custom token on ETH is a new contract. This is in contracts to Solana, where there is a single Token Program
Ex-
![USDC on ETH]( https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)
![USDC on SOL]( https://solscan.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)

# Wtf is a token?

- It is a type of currency
- It has an owner/issuer/minter
- There is mapping of which address owns how much of the token
- Addresses should be allowed to transfer tokens to other addresses

# Token Contract
1. Initializing the metadata/balances
2. Declaring the `mintTo` function
3. Implement the `transfer` function
4. Implement the `burn` function

to compile the contract-> `solc --bin --abi contract.sol -o build/`
it will have a .abi and .bin file
.bin-> bytecode
.abi-> used to interact with the contract programmatically.

open remix ide, keep the .sol file there, compile and deploy it


# Allowances/Delegation

An allowance refers to the mechanism that allows a token holder to grant permission to another address (typically a smart contract) to spend a specified amount of their tokens.

Balances and Allowances should be condition
like you must have the balance, and then the allowance must also be in such a way that it should be in limit

# Decimals
The decimals parameter refers to the number of decimal places the token can be divided into. It is an important property that definesthe smallest 
unit of the token, enabling more granular transactions and better user experience in terms of handling very small amounts of the token.

# ERC-20 spec
totalSupply()
Returns the total number of tokens in circulation (the total supply of the token).

balanceOf (address account)
Returns the balance of tokens held by a specific address (account).

transfer(address recipient, uint256 amount)
Transfers a specified number of tokens (amount) from the caller's account to the recipient address. This function returns true if the transfer is successful.

allowance(address owner, address spender)
Returns the amount of tokens that the spender is allowed to transfer on behalf of the owner based on the allowance previously set by the owner using the approve) function.

approve(address spender, uint256 amount)
Approves the spender to spend up to a specified number of tokens (amount) from the caller's account. This creates an "allowance" that the spender can use with the transferFrom) function.

transferFrom(address sender, address recipient, uint256 amount)
Allows the spender (who must have been approved by the sender) to transfer tokens from the sender's account to the recipient's account.

## Whats missing?

Minting and burning logic

The ERC-20 standard only defines the basic functions and events that a token contract must implement to ensure interoperability across platforms 
(wallets, exchanges, etc.), such as transferring tokens, checking balances, and setting allowances.

# How to mint/launch a token?

1. Initial Coin Offering (ICO)

2. Airdrop

3. Fair Launch

4. Token Vesting / Token Unlocking

![Common Implementation of ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)


Now we may make some mistakes and the contract can be screwed up, so we will use
extension of ERC-20

erc-20.sol-> an example extension
see when we compile it on Remix it just collect the necessary dependency by default, but locally we need to install and call it

