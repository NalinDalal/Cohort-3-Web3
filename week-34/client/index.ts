import * as dotenv from "dotenv";
dotenv.config();

import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
} from "@solana/web3.js";
import * as borsh from "borsh";

// Step 1: Encode data
class MyData {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const schema = new Map([
  [
    MyData,
    {
      kind: "struct",
      fields: [["name", "string"]],
    },
  ],
]);

const data = new MyData("harkirat");
const instructionData = borsh.serialize(schema, data);

// Step 2: Create the data account
const dataAccount = Keypair.generate();
const programId = new PublicKey("DwpnH6LDfkcaCXc7eqjDMNi9jV1UR3txXB5jmKCjmzv7");
const payer = Keypair.fromSecretKey(
  Buffer.from(JSON.parse(process.env.PRIVATE_KEY || "[]")),
  { skipValidation: true },
);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balance = await connection.getBalance(payer.publicKey);
console.log("Balance:", balance);
const lamports = await connection.getMinimumBalanceForRentExemption(
  instructionData.length,
);

const createAccountIx = SystemProgram.createAccount({
  fromPubkey: payer.publicKey,
  newAccountPubkey: dataAccount.publicKey,
  space: instructionData.length,
  lamports,
  programId,
});

const instruction = new TransactionInstruction({
  keys: [{ pubkey: dataAccount.publicKey, isSigner: false, isWritable: true }],
  programId,
  data: Buffer.from(instructionData),
});

const tx = new Transaction().add(createAccountIx, instruction);
await sendAndConfirmTransaction(connection, tx, [payer, dataAccount]);
console.log(dataAccount.publicKey.toBase58());
