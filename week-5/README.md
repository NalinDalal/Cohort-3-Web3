# Creating our own wallet adapter
Once a user connects to your `dapp`, you usually ask the user to do a few things with their wallet balance - 

1. Request Airdrop
2. Show SOL balances (GET data from the blockchain)
3. Send a transaction (Send a transaction to the blockchain)
4. Sign a message (Verify the ownership of the wallet)

# Requesting airdrop (Creating a faucet)

Create something like - https://solfaucet.com/

**Hints**

- `@solana/web3.js` provides you with a `requestAirdrop` function.
- You can get the `current users` public key using the `useWallet` hook

- Show balance of the users

# Sign a message
## Usage

Prove ownership of a wallet to a centralised backend. For eg - `https://www.tensor.trade/rewards`
Ref - `https://github.com/anza-xyz/wallet-adapter/blob/3761cd8cc867da39da7c0b070bbf8779402cff36/packages/starter/example/src/components/SignMessage.tsx#L9`

# How to sign messages
- Install `@noble/curves` - 
```bash
npm install @noble/curves
```

- Coding the `SignMessage` component

# Sending Solana

In this section, we’ll learn about transactions and sending them on the solana blockchain

We need to write code that lets users `send` native SOL over to a different solana address. 

This should `require approval`

# Assignment

1. Show user token balances
2. Let user transfer tokens

### Challenges/Things to learn

1. Extract metadata and show the user the `ticker` and the `logo`  of the token.
2. Use the `@solana/spl-token` library, make it work purely from the frontend.

### Very hard assignment

Add payments to https://github.com/code100x/muzer
