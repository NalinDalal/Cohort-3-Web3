16.10.24

today’s class, we’ll understand about one of the biggest use-case that blockchains like Solana/ETH solve for - Programs/Smart contracts.

Smart Contract => Eth
Program => Solana


Solana ENgineers deployed their own PayTm, we are just using that to create our own coins, transfer coins, mint conis, delete coins

1. You deploy a smart contract
2. You can call the smart contract

we will be writing a ETH smart contract
common usecase -
1. Creating tokens
2. Swapping tokens
3. Lending money

# Accounts on Solana

## Accounts
On the Solana blockchain, an "account" is a fundamental data structure used to store various types of information.
1. `Data Storage`: Accounts on Solana are used to store data required by programs (smart contracts) or to maintain state
2. `Lamports`: Accounts hold a balance of Solana’s native cryptocurrency, lamports. Lamports are used to pay for transaction fees and to rent the space that the account occupies on the blockchain. 
3. `Programs`:  On Solana, programs are special accounts that contain executable code. These accounts are distinct from regular data accounts in that they are designed to be executed by the blockchain when triggered by a transaction.

# Install solana cli
You can install the solana cli locally by running the following command
`sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"`

generate a new key -> `solana-keygen new`
`/Users/nalindalal/.config/solana/id.json` - path for key pair

generated a new wallet, can import this in wallet

`solana address` - locally configured wallet

We can query the blockchain via RPC url

Main, Devnet, Testnet

Devnet is for gareed people like me
okay so airdrop ourselved the Devnet-> `
solana config get
solana config set --url https://api.devnet.solana.com
solana airdrop 5 #airdrop ourselves 5 solana
solana balance #check the balance
`

<h1> smart contracts are backend applications deployed on the blockchain</h1>

# Creating a token
Specifically, the way to create a `token` requires you to 
1. Create a token mint
2. Create an `associated token account` for this mint and for a specific user
3. Mint tokens to that user.

## Token mint
It’s like a `bank` that has the athority to create more coins. It can also have the authority to `freeze coins`.

## Associated token account
Before you can ask other people to send you a token, you need to create an `associated token account` for that token and your public key.

Create a new cli wallet- `solana-keygen new`

Set the RPC url - `solana config set --url https://api.devnet.solana.com`

Airdrop yourself some SOL - `solana airdrop 1`

Check your balance- `solana balance`

Create token mint - `spl-token create-token`

creates a USDC mint(`Address:  82d1NbiZ41pNNbptvXrC5a2rAEKjyxtBsxnao7A7Prwg`)

supply with sol(mint some token)- `spl-token mint `
