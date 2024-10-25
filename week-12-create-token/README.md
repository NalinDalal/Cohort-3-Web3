25.10.2024

# Solana v/s Ethereum

In case of ETH, we need to first learn Solidity to be able to extend ERC20 contracts and deploy them to create our own token

Solana is fast as compared to Ethereum

Liquidty Pool - Single contract where we hold some USDC,SOL-> USDCxSOL=Const
`Constant product algorithm`

x × y= k

Where:

x is the reserve of Token A. y is the reserve of Token B. k is a constant, meaning it does not change as trades are executed.

Demand of SOL increase, avg price increases
Demand Decrease, avg price decrease

# Impermanent Loss
dude its simple. lets say, you bought a pizza which costs 10 usd but instead you paid it with equivalent bitcoin, later after a year bc becomes 100x, if you look back and calculate the cost of that pizza you bought with btc back a year ago, the pizza costed you 1000 usd. which caused an impermanent loss of 990 usd


# Creating a Token
Program - https://github.com/raydium-io/raydium-cp-swap

There are a few steps if you ever want to create your own token on Solana and make it `tradeable` (let people buy and sell it).

- Create your own token
- Create a `liquidity pool` for your token
- Add `liquidity` of both the tokens
- Wait for people to trade on that pool

Link - https://github.com/100xdevs-cohort-3/week-12-create-token

A token launchpad on solana
1. Initialise a react project
2. Add wallet adapter to it
3. Add a polyfill that lets you access node functions
4. figure out the calls to create a mint
5. figure out the calls to create an ata
6. figure out the calls to mint a token

# Creating a pool (CP AMM)

Via code - https://github.com/raydium-io/raydium-cp-swap/blob/master/tests/initialize.test.ts

Via UI - https://raydium.io/liquidity-pools/

# Fucking Project Ideas
TOKEN LAUNCHPAD
WALLET
BONKBOT
Cloud Wallet in Node.js
1. Create a client side wallet in JS, supporting transfers, txns and swaps
2. Create a token launch and transfer program on solana
3. Create a cloud wallet in Node.js
4. Creating BonkBot on SOL
