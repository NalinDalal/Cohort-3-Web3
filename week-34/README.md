# Program Derived Address (PDA)
Program Derived Addresses (PDAs) provide developers on Solana with two main use cases:

- **Deterministic Account Addresses**: PDAs provide a mechanism to deterministically derive an address using a combination of optional "seeds" (predefined inputs) and a specific program ID.
- **Enable Program Signing**: The Solana runtime enables programs to "sign" for PDAs which are derived from its program ID.
You can think of PDAs as a way to create hashmap-like structures on-chain from a predefined set of inputs (e.g. strings, numbers, and other account addresses).

The benefit of this approach is that it eliminates the need to keep track of an exact address. Instead, you simply need to recall the specific inputs used for its derivation.

a way to create hashmap-like structures on-chain from a predefined set of inputs

# Logic
web2 -> we have a db, then a server which fetches, then a fe
web3-> wallet is connected with contract which is connected to Associated token account (pda)

A PDA is a special type of address on Solana that:
- Is derived deterministically using seeds and a program ID.
- Cannot be owned by a private key — it’s only controlled by a specific on-chain program.
- Is used by programs to store data

Token Contract has every balance on it, be it user, new coin etc



Every row of a SQL table is a PDA on solana

Benefits - 
1. Users can pay rent for their own data
2. Deterministically arrive at their data

when u send someone something for 1st time cause that much solana is needed to
put the data on their account, cause it basically create the account on
blockchain, u pay the gas fee


Read about mint accounts on token program
(what is a mint)
Try to derive your own USDC ata(associated token account) 
Try to derive your own Trump ata
