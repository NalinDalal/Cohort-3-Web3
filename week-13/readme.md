01.11.2024
# Building a Liquid Staking token

Wat is Staking?

Consensus - all nodes agreeing on a transaction.
Person with most sol will be leader of block- Block Proposer/Leader

Known as Proof of Stake

We can start mining if we are leader


# What is an LST?

Liquid Staking token -> 

Liquid: Can be traded/lended
Staking: Underlying token used for staking
token: Custom Token

An LST, or liquid staking token, is a type of token that represents a user's staked assets
in a proof-of-stake blockchain. When you stake your cryptocurrency, you often cannot
access or trade it while it’s staked. Liquid staking allows you to maintain liquidity
while still participating in the staking process.

1. Staking: When you stake your cryptocurrency with a liquid staking provider, you receive an equivalent amount of LSTs in return. These tokens represent your staked assets.
2. Liquidity: Since LSTs can be traded or used in other decentralized finance (DeFi) applications, you can take advantage of market opportunities while your original assets remain staked.
3. Earning Rewards: While holding LSTs, you still earn staking rewards on the underlying assets, typically reflected in the value of the LST.

# Creating a centralized LST

Write code that 

1. Tracks the blockchain for incoming transactions to an address we own
2. Anytime SOL comes to the address, we mint our custom token to that addresS. The amount depends on a mathamatical formula.
3. Whenever the user returns some Custom Token, we return them SOL in a similar amount. 


We are not actually staking the token so in the long term we will lose money. We should figure out a way to generate yeild on top of user asets.

Creating a centralized LST

1. Create a token.
2. Start monitoring an address.
3. Mint new tokens when some SOL comes.
4. Send back SOL when the minted token comes, burn the minted tokens.


## Indexer


Something that scans every block/txn in the blockchain and you can subscribe to events on it



Events can be things like 

1. Function has been called on a program
2. SOL has been transferred to an address
3. USDT/USDC/Custom token has been transferred to an address



Step 0 - Create a Custom token (use a launchpad or do it from the cli)

Step 1 - Bootstrap the app

npm init -y
npx tsc --init
Update tsconfig.json to add rootDir and outDir
Create src/index.ts
Install @solana/web3.js
Create a webhook to receive events from helius (Add express etc)


Starter repo - https://github.com/100xdevs-cohort-3/week-13-lst

my solana account-> 5MDgPdDXhDSpRQgYgdqVgXniCgogAWaLskzyimqof4XC


to get key->
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

Error: No longer supports installation by channel. Please specify a release version as vX.Y.Z or install from https://release.anza.xyz.

solana-keygen new --outfile ~/my-solana-wallet.json

pubkey: EGwYzAch3ghpx1CpPtQt4VL1LJ5Txcfp35V3WA8jGnBE

> spl-token create-token

Creating token 33msfynVNJNDAqhVtnn5EUgxDJGYiKrQLbZap65X7qYb under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  33msfynVNJNDAqhVtnn5EUgxDJGYiKrQLbZap65X7qYb
Decimals:  9

Signature: 2XBU9oiHp8aGaQgKkCv4rVKixhu36kmdzsfRU42WhveHi4aJHVFKvrsL774LWdaF5854HrzHJ1uHAQkXj5zQHggn

`

mintToken.ts
