# Private Key Management

people create public-private key
Digital Signatures and Encryption

some message is there, sign it via a private key{to encode it into digital
signature}
now via a public key , add to hashed message, get the actual message like
authentication

Blockchain said, keep public-private keypair for free
one seed phrase can be used to create multiple public-private keypairs

so basically sites like tiplink do is they keep the private key, they just give
you public key, login with google

bad thing-> tiplink employee has access from their db to my private key

db has private keys, so how does they ensure that the private keys can't be
accessed, u know to prevent forgery

transactions are private and immutable

# How should the platform store private keys?

1. Store in the DB plaintext - ![github](https://github.com/code100x/cdex/blob/main/prisma/schema.prisma#L40)
2. Encrypt them before storing
3. Multisigs
4. MPCs

# Storing it in plaintext

why the fuck you wanna even try it, isn't it obvious, easy direct access to
wallets,
the transactions are not reversible

# Encrypting the private keys

Encrypt the private keys via various libraries,
If a hacker gets access to the Database, they cant do much.

But if a hacker gets access to the DB and the backend, the problem remains the same.
We’re just moving the problem up the chain.

salt the motherfucking password

# Multisigs

A `multisig` is a type of digital wallet or smart contract that requires multiple cryptographic signatures to authorize a transaction, rather than just one.

a multisig wallet is set up with multiple keys held by different parties.
to execute transactions, a predetermined number of those key holders must sign off on it
accomplished via "M-of-N" - requires M signatures out of N signatures.

Ref - https://github.com/solana-labs/solana-program-library/blob/master/governance/README.md

UI - https://github.com/Mythic-Project/governance-ui

Multisig implementation 2 - https://github.com/Cordelia-Program/Cordelia-Anchor

# MPC

- cryptographic technique that allows multiple parties to jointly compute a
  function over their inputs while keeping those inputs private.
- finally all parties know only the final result, not any-other parties input

ex: calculate their average salary without revealing their individual salary
data to each other.
MPC would allow them to compute this average while each company's salary information remains completely private.

# Threshold Signature Scheme

![Ref](https://academy.binance.com/en/articles/threshold-signatures-explained)

Multi-Party Computation (MPC) has revolutionized Ed25519 cryptography by enabling distributed private key operations without single points of failure.

This distributed MPC approach eliminates the fundamental vulnerability of single private keys while preserving the signature verification simplicity that makes Ed25519 attractive for production systems.

MPC enables n parties to jointly compute functions over private inputs without revealing anything beyond the output.

```mermaid
graph LR
    subgraph Node.js Backend
        A[db.pubKey.create({\n  data: {\n    pubKey: pubKey\n  }\n})]
    end

    subgraph MPC Server 1 (AWS)
        B[db.privateKey.create({\n  data: {\n    pv: privateKey\n  }\n})]
    end

    subgraph MPC Server 2 (DO)
        C[db.privateKey.create({\n  data: {\n    pv: privateKey\n  }\n})]
    end

    subgraph MPC Server 3 (GCP)
        D[db.privateKey.create({\n  data: {\n    pv: privateKey\n  }\n})]
    end

    A --> B
    A --> C
    A --> D

```

## Signing a txn

```graph LR
subgraph Node.js Backend
A[sign a txn →\nlet signed_txn = await Promise.twice(\n mpc1.sign(user1, txn),\n mpc2.sign(user1, txn),\n mpc3.sign(user1, txn)\n)\nreturn signed_txn;]
end

    subgraph MPC Server 1 (AWS)
        B[let pk = db.privateKey.find(user1)\npk.sign(txn)]
    end

    subgraph MPC Server 2 (DO)
        C[let pk = db.privateKey.find(user1)\npk.sign(txn)]
    end

    subgraph MPC Server 3 (GCP)
        D[let pk = db.privateKey.find(user1)\npk.sign(txn)]
    end

    A --> B
    A --> C
    A --> D
```

# solana-tts

![Ref](https://github.com/ZenGo-X/solana-tss)

- Create tts

```rust
cargo install --git https://github.com/ZenGo-X/solana-tss.git
```

- Script — What is the bug in it?
-

<aside>
💡

Make sure the aggregated key has atleast 1+ SOL that it can send to the new address. Default the code to use devnet.

`cargo run aggregate-keys DLQegXe3gWzrzL4pLrPXG8ia2r2c8kDvhGtauwQgrjhx 7weVNHN5NMNd4TUcPSyqUou5ibWnh2p47Bh9xMxHNWet`

`cargo run airdrop --to EnVGAa6uoxGheCAv6JjM357bwQnsU3xiexGvzMhXeQzP --amount 1`

</aside>

```sh

#!/bin/bash

set -e

# Generate fresh messages for both keys
cargo run agg-send-step-one 3cHsZDVSpdm8oKiawZRqvWsRExz9zRVwGYcAH8UUDa2sibyVJWt1RGBDpaXak5Gw9QeVoxPmm4EmdvqBb1PrGcyE > /tmp/step1_1.txt
cargo run agg-send-step-one NkELRYi2XLNH5645PgX4HDDH2vJi4Yy9GGekZEUDutxZwZuovnyiZ9ZVRJmNKecL82cWQRaMYx8Up6S14RxspGe > /tmp/step1_2.txt

MESSAGE_1=$(grep "Message 1:" /tmp/step1_1.txt | awk '{print $3}')
SECRET_1=$(grep "Secret state:" /tmp/step1_1.txt | awk '{print $3}')
MESSAGE_2=$(grep "Message 1:" /tmp/step1_2.txt | awk '{print $3}')
SECRET_2=$(grep "Secret state:" /tmp/step1_2.txt | awk '{print $3}')

BLOCKHASH=$(cargo run recent-block-hash | grep "recent block hash:" | awk '{print $4}')

# Generate signatures ensuring same message order for both
cargo run agg-send-step-two --keypair 3cHsZDVSpdm8oKiawZRqvWsRExz9zRVwGYcAH8UUDa2sibyVJWt1RGBDpaXak5Gw9QeVoxPmm4EmdvqBb1PrGcyE --amount 1 --to 8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857 --recent-block-hash $BLOCKHASH --keys 7weVNHN5NMNd4TUcPSyqUou5ibWnh2p47Bh9xMxHNWet DLQegXe3gWzrzL4pLrPXG8ia2r2c8kDvhGtauwQgrjhx --first-messages $MESSAGE_1 $MESSAGE_2 --secret-state $SECRET_1 > /tmp/sig1.txt

cargo run agg-send-step-two --keypair NkELRYi2XLNH5645PgX4HDDH2vJi4Yy9GGekZEUDutxZwZuovnyiZ9ZVRJmNKecL82cWQRaMYx8Up6S14RxspGe --amount 1 --to 8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857 --recent-block-hash $BLOCKHASH --keys 7weVNHN5NMNd4TUcPSyqUou5ibWnh2p47Bh9xMxHNWet DLQegXe3gWzrzL4pLrPXG8ia2r2c8kDvhGtauwQgrjhx --first-messages $MESSAGE_1 $MESSAGE_2 --secret-state $SECRET_2 > /tmp/sig2.txt

SIG_1=$(grep "Partial signature:" /tmp/sig1.txt | awk '{print $3}')
SIG_2=$(grep "Partial signature:" /tmp/sig2.txt | awk '{print $3}')

# Try aggregating with signatures in the same order as keys
cargo run aggregate-signatures-and-broadcast --signatures $SIG_1 $SIG_2 --amount 1 --to 8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857 --recent-block-hash $BLOCKHASH --net devnet --keys 7weVNHN5NMNd4TUcPSyqUou5ibWnh2p47Bh9xMxHNWet DLQegXe3gWzrzL4pLrPXG8ia2r2c8kDvhGtauwQgrjhx

rm /tmp/step1_1.txt /tmp/step1_2.txt /tmp/sig1.txt /tmp/sig2.txt
```

# Working

```sh
cargo run generate
#you get 2 secrets
```

```sh
cargo run aggregate-keys public_share_1 public_share_2
```

```sh
cargo run agg-send-step-one secret_share_1
```

```sh
cargo run agg-send-step-one secret_share_2
```

```sh
cargo run agg-send-step-two --keypair secret_share_1
```

```sh
cargo run agg-send-step-two --keypair secret_share_2
```
