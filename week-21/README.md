27.12.24

# Recap until now

Until now we

1. Understand the EVM
2. Understand solidity
3. Have written some contracts
4. Foundry and forge for running and deploying tests locally

### Today

We’ll be writing client side code (Node.js / react) to interact with these contracts.

We’ll also learn about indexing the ETH blockchain to listen on certain types of events.

# ETH RPC

To be able to interact with an ETH RPC, you can send a request via CURL/POSTMAN directly to a contract

For eg, contract - https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code

# Total Balance

Calling read only function `totalBalance`

```jsx
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
      {
        "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "data": "0x18160ddd"
      },
      "latest"
    ],
    "id": 1
  }' \
  <YOUR_RPC_ENDPOINT>

```

`data` is the first `4 bytes` of the `keccak-256` hash of the function name (totalSupply)

Ref - https://emn178.github.io/online-tools/keccak_256.html

# Balance of

`balanceOf` requires an argument (the address of the user whose balance you want). To find `data` there, you need to

1. Get first 4 bytes of hash of `balanceOf(address)`
2. Append the arguments after that (for eg. 0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f). You need to first convert this to 32 bytes before appending (0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f ⇒ `000000000000000000000000587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f`)
3. Final `data = 0x70a08231000000000000000000000000587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f`

```jsx
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
      {
        "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "data": "0x70a08231000000000000000000000000587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f"
      },
      "latest"
    ],
    "id": 1
  }' \
  <YOUR_RPC_ENDPOINT>

```

# Interacting with an existing contract (from the browser)

see interaction-fe

# Interacting from the server (node.js process)

We’ll be using the ethers library - https://docs.ethers.org/v6/

see interaction-be
