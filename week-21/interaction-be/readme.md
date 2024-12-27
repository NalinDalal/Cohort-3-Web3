# Interacting from the server (node.js process)

```bash
cd interaction-be
npm init -y
npm install typescript
npx tsc --init
```

change rootDir and outDir

- create `abi.ts`
- Create a `provider` instance
- Create a function called `pollBlock` that polls a specific block and gets all the USDT transfers that have happened
