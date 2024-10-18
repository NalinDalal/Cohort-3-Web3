# Wallets in ETH

Wallets are tools that allow users to store, manage, and interact with their cryptocurrencies. Here’s a breakdown of the key concepts:

### Types of Wallets

1. **Hot Wallets**:
    - These are connected to the internet and are more convenient for frequent transactions. Examples include web wallets (like those on exchanges), mobile wallets, and desktop wallets.
2. **Cold Wallets**:
    - These are offline wallets, making them more secure against hacks. Examples include hardware wallets (like Ledger or Trezor) and paper wallets.

### Wallet Addresses

- A wallet address is a unique string of characters (usually starting with "0x" for Ethereum) that you can share with others to receive ETH or tokens. It’s similar to an account number.

### Seed Phrases

- A **seed phrase** (or recovery phrase) is a series of words (typically 12 to 24) that acts as a master key for your wallet. It allows you to recover access to your wallet and its contents if you lose your device or forget your password. It’s crucial to keep this phrase secure and private, as anyone with access to it can control your funds.

### Private Keys

- A **private key** is a secret number that allows you to access and manage your cryptocurrency. It’s mathematically linked to your wallet address, and anyone with access to your private key can control the funds in that wallet. Private keys should never be shared.

# Wagmi library

**Wagmi** (short for "We're All Gonna Make It") is a `React Hooks library` designed for building applications that interact with `Ethereum` and `other blockchain networks`. 

Its primary focus is to simplify the process of connecting wallets, managing user sessions, and making Ethereum calls. 

Key features of Wagmi include:

- **React Hooks**: Provides hooks for managing wallet connections, fetching data from smart contracts, and interacting with Ethereum providers.
- **Multiple Wallet Support**: Allows users to connect various wallets like MetaMask, WalletConnect, and others.
- **Automatic Reconnection**: Handles wallet reconnections seamlessly.
- **Built-in State Management**: Manages user account state, balance updates, and network changes.

TanStack, Viem, Wagmi
TanStack Query
Ref - https://tanstack.com/query/v5/docs/framework/react/overview

Initialise a react project - EthWallet
