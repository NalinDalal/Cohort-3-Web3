import { PublicKey } from "@solana/web3.js";

const [pda, bump] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("balances"),
    Buffer.from("INR"),
    new PublicKey("6fQytE8KQZvEVvGnSM6kfWbtVbso8j3GhFQPuZoHZCmD").toBuffer(),
  ],
  new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
);

console.log(pda.toBase58());
console.log(bump);
