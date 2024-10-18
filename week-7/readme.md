# Accounts

Ref - https://solana.com/docs/core/accounts

On Solana, all data is stored in what are referred to as "accounts”. The way data is organized on Solana resembles a [key-value store](https://en.wikipedia.org/wiki/Key%E2%80%93value_database), where each entry in the database is called an "account".

## Key points

- Accounts can store up to 10MB of data, which can consist of either executable program code or program state.
    - Programs (smart contracts) are stateless accounts that store executable code.
    - Data accounts are created by programs to store and manage program state.
- Accounts require a rent deposit in SOL, proportional to the amount of data stored, which is fully refundable when the account is closed.
- Every account has a program `owner`. Only the program that owns an account can modify its data or deduct its lamport balance. However, anyone can increase the balance.
- Native programs are built-in programs included with the Solana runtime.

There are 3 Types of Accounts:

## Normal - (Owner - SystemProgram)
only stores like 0.1 sol
no data

## Program - (Owner - TokenProgram)
Smart contract
Account with some data
Solana, Data(code)

## Data - (Owner - BPF Loader)
Program stores data here


# System program

Solana contains a small handful of native programs that are part of the validator implementation and provide various core functionalities for the network.

When developing custom programs on Solana, you will commonly interact with two native programs, the `System Program` and the `BPF Loader`.

## System program

By default, all new accounts are owned by the [System Program](https://github.com/solana-labs/solana/tree/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src). The System Program performs several key tasks such as:

- [New Account Creation](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L145): Only the System Program can create new accounts.
- [Space Allocation](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L70): Sets the byte capacity for the data field of each account.
- [Assign Program Ownership](https://github.com/solana-labs/solana/blob/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/system/src/system_processor.rs#L112): Once the System Program creates an account, it can reassign the designated program owner to a different program account. This is how custom programs take ownership of new accounts created by the System Program.

On Solana, a `wallet` is simply an account owned by the System Program. The lamport balance of the wallet is the amount of SOL owned by the account.


## Using  `@solana/web3.js` to interact with the System program

- Create a new account with data and rent
    
    ```jsx
    const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');
    
    const payer = Keypair.fromSecretKey(Uint8Array.from([222,61,190,103,38,70,4,221,24,242,44,86,66,111,102,52,87,41,83,45,166,179,184,79,208,91,20,66,142,36,147,236,30,84,33,77,227,36,159,27,27,53,27,249,230,207,30,83,42,51,3,225,70,41,44,85,54,31,198,80,45,49,208,39]));
    
    const mintAthority = payer;
    
    const connection = new Connection("https://api.devnet.solana.com");
    async function main() {
        const newAccount = Keypair.generate();
        const TOTAL_BYTES = 165;
        const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
        const transaction = new Transaction();
        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: newAccount.publicKey,
                lamports: lamports,
                space: TOTAL_BYTES,
                programId: SystemProgram.programId,
            }),
        );
    
        await connection.sendTransaction(transaction, [payer, newAccount]);
        console.log(`New account created at ${newAccount.publicKey.toBase58()}`);
    }
    
    main();
    ```
    
    ![Screenshot 2024-09-13 at 5.52.14 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/fc013295-93c0-4d65-a5ff-43a5c7dedc69/Screenshot_2024-09-13_at_5.52.14_PM.png)
    
- Transfer lamports from your account to another account
    
    ```jsx
    const { createMint } = require('@solana/spl-token');
    const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');
    
    const payer = Keypair.fromSecretKey(Uint8Array.from([222,61,190,103,38,70,4,221,24,242,44,86,66,111,102,52,87,41,83,45,166,179,184,79,208,91,20,66,142,36,147,236,30,84,33,77,227,36,159,27,27,53,27,249,230,207,30,83,42,51,3,225,70,41,44,85,54,31,198,80,45,49,208,39]));
    
    const mintAthority = payer;
    
    const connection = new Connection("https://api.devnet.solana.com");
    async function main() {
        const newAccount = Keypair.generate();
        const TOTAL_BYTES = 165;
        const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
        const transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: newAccount.publicKey,
                lamports,
            }),
        );
    
        await connection.sendTransaction(transaction, [payer, newAccount]);
        console.log(`Transferred to  ${newAccount.publicKey.toBase58()}`);
    }
    
    main();
    
    ```
    
    ![Screenshot 2024-09-13 at 5.51.06 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/4970fd63-b214-4a52-acda-c898f7d9ec10/Screenshot_2024-09-13_at_5.51.06_PM.png)
    
- Change the owner of an account
    
```jsx
    const { createMint } = require('@solana/spl-token');
    const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');
    
    const payer = Keypair.fromSecretKey(Uint8Array.from([222,61,190,103,38,70,4,221,24,242,44,86,66,111,102,52,87,41,83,45,166,179,184,79,208,91,20,66,142,36,147,236,30,84,33,77,227,36,159,27,27,53,27,249,230,207,30,83,42,51,3,225,70,41,44,85,54,31,198,80,45,49,208,39]));
    
    const connection = new Connection("https://api.devnet.solana.com");
    async function main() {
        const newAccount = Keypair.generate();
        const owner = Keypair.generate();
        const TOTAL_BYTES = 165;
        const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
        const transaction = new Transaction();
        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: newAccount.publicKey,
                lamports: lamports,
                space: TOTAL_BYTES,
                programId: owner.publicKey,
            }),
        );
    
        await connection.sendTransaction(transaction, [payer, newAccount]);
        console.log(`New account created at ${newAccount.publicKey.toBase58()}`);
    }
    
    main();
```

# BPF Loader Program

The [BPF Loader](https://github.com/solana-labs/solana/tree/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/bpf_loader/src) is the program designated as the "owner" of all other programs on the network, excluding Native Programs. It is responsible for deploying, upgrading, and executing custom programs.

A program I deployed just before todays class - ![Transaction History](https://explorer.solana.com/address/8rpHNPsyEJQEJjC2waWvUXyvCkYghCZndACoXs9sNKZg?cluster=devnet)

# Authority in solana programs

In Solana programs, `authorities` are entities or accounts that have the right to perform certain actions or make changes within the program.

For example

- Token mint authority - Can mint new tokens
    1. Token with mint auth - https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    2. Token with No mint auth - https://explorer.solana.com/address/8FQvjBxFdR51wbZfQVaWbkjR2sNNxDLyabNePPmsyou9
- Token freeze authority - Can freeze tokens in an account
    
    Token with a freeze auth - https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    
- Upgrade authority - Can `upgrade` the code of a program.
    
    https://explorer.solana.com/address/8rpHNPsyEJQEJjC2waWvUXyvCkYghCZndACoXs9sNKZg?cluster=devnet

## Creating and revoking mint authority

- Create a new token

```jsx
spl-token create-token
```

- Create an ata

```jsx
spl-token create-account <token_mint_address> 
```

- Try minting some tokens

```jsx
spl-token mint <token_mint_address> 10000000000
```

- Check if `mint authority` exists on explorer

- Revoke `mint authority`

```jsx
spl-token authorize  <token_id>  mint --disable
```

- Try to mint again/check the explorer

# Program derived addresses

![Screenshot 2024-09-13 at 7.12.22 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/fc9ec62d-8dd7-4d60-a246-ea6bb546408e/Screenshot_2024-09-13_at_7.12.22_PM.png)

Ref - https://solana.com/docs/core/pda

Video - https://www.youtube.com/watch?v=p0eD29d8JCM

Program Derived Addresses (PDAs) provide developers on Solana with two main use cases:

- **Deterministic Account Addresses**: PDAs provide a mechanism to deterministically derive an address using a combination of optional "seeds" (predefined inputs) and a specific program ID.
- **Enable Program Signing**: The Solana runtime enables programs to "sign" for PDAs which are derived from its program ID.

## Properties

- PDAs are addresses derived deterministically using
    - a combination of user-defined seeds
    - a bump seed
    - and a program's ID.
- PDAs are addresses that fall off the Ed25519 curve and have no corresponding private key.
- Solana programs can programmatically "sign" for PDAs that are derived using its program ID.
- Deriving a PDA does not automatically create an on-chain account.
- An account using a PDA as its address must be explicitly created through a dedicated instruction within a Solana program.

## Find the associated token account for a user and a mint
1.js

`createProgramAddress` vs `findProgramAddress` -> 2.js

```jsx

