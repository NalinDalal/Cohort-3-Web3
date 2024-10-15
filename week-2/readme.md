15.10.2024

# Public Key Cryptography

Any wallet has a public-private key-pair used to access it.
`Public Key:` string that can be shared publically

`Private Key:` string that must not be shared publically

How to create?

Byte-> 8 bit

### Assignment 1
represent bit, bytes,UInt8Array

Why use UInt8Array over native arrays ?
They use less space. Every number takes 64 bits (8 bytes). But every value in a UInt8Array takes 1 byte.
UInt8Array Enforces constraints - It makes sure every element doesn’t exceed 255.

# Encoding
Bytes are cool but highly unreadable. Imagine telling someone
```txt
Hey, my name is 00101011101010101020
```

It’s easier to encode data so it is more human readable . Some common encodings include - Ascii, Hex, Base64, Base58

## Ascii
`1 character = 7 bits`
Every byte corresponds to a text on the computer . 
Here is a complete list - 

`https://www.w3schools.com/charsets/ref_html_ascii.asp#:~:text=The%20ASCII%20Character%20Set&text=ASCII%20is%20a%207%2Dbit,are%20all%20based%20on%20ASCII`

Code ->
Bytes to Ascii - 1
Ascii to bytes - 2
UInt8Array to ascii - 3
Ascii to UInt8Array - 4


# Common Asymmetric Encryption Algorithms:
RSA - Rivest–Shamir–Adleman
ECC - Elliptic Curve Cryptography (ECDSA) - ETH and BTC
EdDSA - Edwards-curve Digital Signature Algorithm  - SOL

### Few usecases of public key cryptography - 
SSL/TLS certificates
SSH keys to connect to servers/push to github
Blockchains and cryptocurrencies

# Creating a public/private keypair

EdDSA - Edwards-curve Digital Signature Algorithm  - ED25519{@noble/ed25519} - 5.js
EdDSA - Edwards-curve Digital Signature Algorithm  - ED25519{@solana/web3.js} - 6.js
ECDSA (Elliptic Curve Digital Signature Algorithm) - secp256k1{@noble/secp256k1} - 7.js
ECDSA (Elliptic Curve Digital Signature Algorithm) - secp256k1{ethers} - 8.js

# How to transactions work on the blockchain?

user(create private/public keypair)-> transaction created->hash the transaction->isgn transaction(using private key)-> send the raw transaction , signature and their public key to a node on the blockchain.

miner(Hashes the original message to generate a hash)-> Verifies the signature(users public key & hash) -> 
Transaction validation - The miner/validator checks additional aspects of the transaction, such as ensuring the user has sufficient funds
If everything checks out, adds the transaction to the block


# Assignment
Adding support for ETH
Given we just derived a few public keys in SOL, can you try doing the same for ETH?
Again for reference, this is how backpack does it - `https://github.com/coral-xyz/backpack/blob/master/packages/secure-background/src/services/evm/util.ts#L3`
Creating a web based wallet
Create a simple web based wallet where someone can come and create a pneumonic, add multiple wallets and see the public key associated with each wallet

I think in week-3
