Install wagmi

```bash
yarn add wagmi viem@2.x @tanstack/react-query
```

Create config.ts

- Add a wagmi provider in App.tsx
- Setup tanstack query->App.tsx
- Add functionality to connect to wallets{config.ts}
- Create `wallet-options.tsx`,`Account.tsx`,App.tsx
- we created a wallet connectivity frontend for ethereum

it gives like `You are connected 0x39D32C2c1B2ed22A4663Fff08004e28f997Bb6f9 Disconnect` upon connection

new code is for like connecting wallet, provides balance on frontend, ask for
some value to spend say 0.0001; then it opens up the wallet to ask for transfer
request

uses: indexing on blockchain;

# Writing to a contract (from the browser)

The [**`useWriteContract` Hook**](https://wagmi.sh/react/api/hooks/useWriteContract) allows you to mutate data on a smart contract, from a `payable` or `nonpayable` (write) function. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.
Create AllowUSDT.tsx

# Interacting from the server (node.js process)

```bash
cd interaction-be
npm init -y
npm install typescript
npx tsc --init
```

change rootDir and outDir
