# week-42-indexing-solana

# Why would you want to index solana?

Generally, you can query the solana blockchain for any data you would like.

1. What is the solana balance of an address

```rust
curl https://api.mainnet-beta.solana.com -s -X \
  POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getBalance",
    "params": [
      "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri"
    ]
  }
'
```

1. What is the USDC balance of a user

```rust
POST - https://api.mainnet-beta.solana.com
{
    "method": "getTokenAccountsByOwner",
    "jsonrpc": "2.0",
    "id": 1,
    "params": [
      "9CgSiy1NG5G3mu9k57Dp9pdRpD3nWnL8hEtFWN33DNnY",
      {
        "mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      },
      {
        "encoding": "jsonParsed"
      }
    ]
}
```

1. Get the current price of solana on a dex (lets say raydium)

### SOL/USD Pool

Pool account - https://solscan.io/account/7SX8LvXAwgCt1XWfJv4BAjXKqfSzdEBw3nyP9QsmAjM8

A random swap - https://explorer.solana.com/tx/4BT7atNaxcAdRCDY3SuRFZWQvbrfUG7u7no36P2CXe7tgLoHerBoahVWXmrasScze3RZr3YgLQDemuGUYEQZYSGe

SOL vault - https://explorer.solana.com/address/DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz

USDC vault - https://explorer.solana.com/address/HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz

<aside>
💡

One thing you would like to do over here would be to balance pools based on the current price and make money off the arb. You need to know this information (current USDC/SOL in the respective vaults) quickly.

</aside>

---

# Assignment Approach #1 - Write a bot that tries to balance a raydium pool by polling

- Poll the price from a cex/coingecko

```rust
https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd
```

- Poll the current weights of the pools - `index.ts` : slow poll based approach

---

# Approach #2 - Webhooks

Polling has higher latency/dependency on the RPC provider. RPC provider could be down/give you incorrect data.

To reduce latency, we can use webhooks from a platform that actually indexes the blockchain.

---

# Approach #3 - Geyser and Yellowstone

Unfortunate pre-requisite - Run a validator/make friends with someone who has a validator

You can listen to account changes/block information

Free version - https://parafi.tech/solana/integration-guide#yellowstone

### **Helius has lazerstream**

![Screenshot 2025-06-20 at 5.58.24 PM.png](attachment:dfa43510-ad18-4f64-99c6-81663c034fde:Screenshot_2025-06-20_at_5.58.24_PM.png)

### Shyft has a cheaper grpc offering - ![https://shyft.to/#solana-grpc-streaming-service](https://shyft.to/#solana-grpc-streaming-service)

![Screenshot 2025-06-20 at 6.23.11 PM.png](attachment:98667401-9906-4778-969e-4d4c8796d44b:Screenshot_2025-06-20_at_6.23.11_PM.png)

---

# How would you actually find arb opportunities?

![transaction](https://solscan.io/tx/3anPmYdMzRC3yNjvdnMxsAzpM1yx9wLRkRD6SJ4FhhVaLMQxFzuTFaLqR5ZRr7beRJJSdKF9DswPa7w13QF8pXj4)

---

# Deposit withdrawal with minimal indexing

There are two approaches to do deposit and withdrawals in Solana

1. Sweeping approach
2. Memo approach

### Sweeping approach

![Screenshot 2025-06-20 at 6.27.13 PM.png](attachment:879ca746-4a08-47b8-8de8-809ac40a8723:Screenshot_2025-06-20_at_6.27.13_PM.png)

### Memo based approach

memo program - https://spl.solana.com/memo
