# Solana Memo-Based Deposit & Withdrawal System

This project demonstrates how to use the **Memo program** on Solana to implement deposit and withdrawal flows with minimal indexing.
It provides a small CLI that can send transactions (SOL or SPL tokens) with memos attached, and also listen for incoming memos on specific accounts.

---

## Features

- **Send SOL with Memo**
  Attach a memo such as `deposit:USER123` or `withdraw:USER123` when sending SOL.

- **Send SPL Tokens with Memo**
  Transfer tokens (e.g. USDC) and attach a memo for indexing.

- **Listen for Memos**
  Polls the blockchain for recent transactions on a target account, extracts memos, and filters them by prefix (e.g. `deposit:`).

- **Minimal Indexing**
  No need for a validator, database, or custom indexing infra. Memos provide a simple, searchable link between transactions and off-chain user identities.

---

## Installation

1. Ensure you have **Node.js** or **Bun** installed.
2. Install dependencies in the project directory:
   - `@solana/web3.js`
   - `@solana/spl-token`
   - `bs58`

---

## Usage

```sh
bun run index.ts <command> [arguments...]
```

The script provides three main commands:

### 1. Send SOL with a Memo

- Sends SOL from a funded wallet to a target address.
- Includes a memo string (e.g. `deposit:USER42`).

### 2. Send SPL Token with a Memo

- Sends tokens (e.g. USDC) from the sender’s associated token account.
- Includes a memo string for indexing.
- Amount must be given in base units (for USDC, 1 token = 1,000,000 units).

### 3. Listen for Memos

- Watches an address for recent transactions.
- Extracts memo strings.
- Filters results by a given prefix.
- Useful for mapping incoming deposits to user accounts.

---

## Example Flows

- **Deposit flow:**
  User transfers SOL or USDC to a vault address with a memo like `deposit:userid123`.
  The listener detects the memo and credits the user in your database.

- **Withdrawal flow:**
  Backend sends SOL or USDC to the user’s wallet with a memo like `withdraw:userid123`.
  Memos ensure full off-chain traceability without custom on-chain contracts.

---

## Notes

- **Memo program ID** is fixed: `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.
- Works on **devnet** for testing and **mainnet** for production.
- The listener uses RPC polling (`getSignaturesForAddress` + `getParsedTransaction`).
  - For higher performance / real-time: use **websocket logs** or third-party services like Helius, Shyft, Parafi Geyser.

- For production, add:
  - a database to persist the latest processed signature,
  - retry logic for RPC errors,
  - user identity mapping between memos and your app.

---

## Security Considerations

- Keep your private keys safe; never commit them.
- Always test flows thoroughly on devnet before moving to mainnet.
- Memos are **public and immutable**; do not include sensitive information.
- Rate-limit your RPC calls to avoid throttling.
