# Starter code
The code contains the initial HTML and CSS structure for the token launchpad.
It also adds the solana wallet adapter to the project.

Dependencies
```bash
npm install @solana/spl-token @solana/web3.js
npm install --save-dev vite-plugin-node-polyfills
```

Add this plugins to vite.config.js
Add a onClick handler


Since we want an `end user` to create their own token, pay for gas for creating that token, we need to ask `THEIR WALLET` for approval to create a token. We `CANT` create our own `KeyPair` and create a token using it.
