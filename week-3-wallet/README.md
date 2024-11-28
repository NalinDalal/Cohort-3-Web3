16.10.24
#### What we’re covering today

1. Keccak-256
2. RPC, JSON-RPC, Some common RPC methods on ETH/SOL
3. Try to create a simple web based wallet that shows you your balance

Keccak-256-> 
- collision-resistant, 
- meaning finding two inputs that produce the same hash output should be extremely difficult. 
- designed to be pre-image resistant, meaning it should be nearly impossible to determine the original input from the hash output.
- outputs a 256-bit hash value.

Ethereum-> 
- public key is generated using elliptic curve cryptography.
- The public key is then hashed using the Keccak-256 algorithm.
- After hashing the public key with Keccak-256, you get a 32-byte hash. The Ethereum address is derived from this hash by taking only the last 20 bytes of the hash output.
- The resulting 20-byte value is then converted into hexadecimal format and prefixed with '0x' to form the Ethereum address. This is the address that users use to send and receive ETH and interact with smart contracts.

Solana -> 
- Solana public keys are 32 bytes (5W4oGgDHqir3KNEcmiMn6tNHmbWjC7PgW11sk4AwWbpe). 
- No need for hashing/chopping

# Creating a Web Based Wallet

So a user has a Wallet to keep his/her crypto/blockchain

# RPC, JSON-RPC
JSON-RPC is a remote procedure call (RPC) protocol encoded in JSON (JavaScript Object Notation). It allows for communication between a client and
a server over a network. JSON-RPC enables a client to invoke methods on a server and receive responses, similar to traditional RPC protocols but 
using JSON for data formatting.

As a user, you interact with the blockchain for two purposes - 

1. To send a `transction`
2. To fetch some details from the blockchain (balances etc)

`the way to interact with the blockchain is using: ` `JSON-RPC`
![JSON RPC Spec](https://www.jsonrpc.org/specification)


# RPC(Remote Procedure Call) Server
provides a way for external clients to interact with the blockchain network
server exposes an API that allows clients to send requests and receive responses from the blockchain

service that listens for JSON-RPC requests from clients, processes these requests, and returns the results

grab your own RPC server from one of many providers - 

1. Quicknode
2. Alchemy
3. Helius
4. Infura

Always store data in lowest{599923 instead of 5999.23}
599923 - for blockchain/db
5999.23 - for human

# ETH

## **Wei**:

- **Definition**: Wei is the smallest unit of cryptocurrency in the Ethereum network. It's similar to how a cent is to a dollar.
- **Value**: 1 Ether (ETH) = 10^18 Wei.

## **Gwei**

- **Definition**: A larger unit of Ether commonly used in the context of gas prices.
- **Conversion**: 1 Ether = 10^9 gwei

## Lamports

- In the Solana blockchain, the smallest unit of currency is called a **lamport**. Just as wei is to Ether in Ethereum, lamports are to SOL (the native token of Solana).
- 1 SOL = 10 ^ 9 Lamports

# Creating a web based wallet
initialise a react project - `wallet`
Add node-pollyfills
Create a mnemonics state variable
Add a button that lets the user generate a fresh mnemonic phrase.
Display the `mnemonic` in an input box
Add a `SolanaWallet` component
Create ETH wallet

# Assignment
Can you add logic to show the ETH/SOL balances for these accounts?
install dependency -> `npm install vite-plugin-node-polyfills`
update vite.config.ts

Clean up App.jsx

Create a mnemonics state variable

Add a button that lets the user generate a fresh mnemonic phrase. - `npm install bip39`

Display the `mnemonic` in an input box

Add a `SolanaWallet` component

Create a `ETH Wallet`


