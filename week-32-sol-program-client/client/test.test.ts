import { expect, test } from "bun:test";
import * as borsh from "borsh";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { CounterInstruction, CounterInstructionSchema, CounterInstructionType, createIncrementInstructionData, createDecrementInstructionData } from "./instruction";
class CounterAccount {
    count = 0;

    constructor({count}: {count: number}) {
        this.count = count;
    }
}

const schema:borsh.Schema = { struct: { count: 'u32'}};

const GREETING_SIZE = borsh.serialize(
    schema,
    new CounterAccount({count: 0})
).length;

const counter = new CounterAccount({count: 1});
console.log(borsh.serialize(schema, counter));

let counterAccountKeypair: Keypair;
let adminKeypair: Keypair;
const connection = new Connection("http://localhost:8899", "confirmed");
const programId = new PublicKey("EuJ5vi7DPenKMk9BBzbtya3cNjnavTmUCYvfqX7pYa15");

test("counter setup", async () => {
    adminKeypair = Keypair.generate();
    counterAccountKeypair = new Keypair();

    const res = await connection.requestAirdrop(adminKeypair.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(res);

    const lamports = await connection.getMinimumBalanceForRentExemption(
        GREETING_SIZE
    );

    const createCounterAccIx = SystemProgram.createAccount({
        fromPubkey: adminKeypair.publicKey,
        lamports,
        newAccountPubkey: counterAccountKeypair.publicKey,
        programId: programId,
        space: GREETING_SIZE,
    });

    const tx = new Transaction();
    tx.add(createCounterAccIx);

    const txHash = await connection.sendTransaction(tx, [adminKeypair, counterAccountKeypair]);
    await connection.confirmTransaction(txHash);

    const counterAccount = await connection.getAccountInfo(counterAccountKeypair.publicKey);
    if (!counterAccount) {
        throw new Error("Counter account not found");
    }
    const counter = borsh.deserialize(schema, counterAccount.data) as CounterAccount;
    console.log(counter.count);
    expect(counter.count).toBe(0);
});


test("counter does increase", async () => {
    const tx = new Transaction();

    tx.add(new TransactionInstruction({
        keys: [{
            pubkey: counterAccountKeypair.publicKey,
            isSigner: true,
            isWritable: true,
        }],
        programId: programId,
        data: Buffer.from([0, 1, 0, 0, 0, 1, 0, 0, 0]),
    }));

    tx.add(new TransactionInstruction({
        keys: [{
            pubkey: counterAccountKeypair.publicKey,
            isSigner: true,
            isWritable: true,
        }],
        programId: programId,
        data: Buffer.from([1, 1, 0, 0, 0,]),
    }));

    // Send and confirm the transaction
    const txHash = await connection.sendTransaction(tx, [adminKeypair, counterAccountKeypair]);
    await connection.confirmTransaction(txHash);
    console.log(txHash);

    const counterAccount = await connection.getAccountInfo(counterAccountKeypair.publicKey);
    if (!counterAccount) {
        throw new Error("Counter account not found");
    }
    const counter = borsh.deserialize(schema, counterAccount.data) as CounterAccount;
    console.log(counter.count);
    expect(counter.count).toBe(1);
});