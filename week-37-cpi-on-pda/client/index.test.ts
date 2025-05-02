import { test, expect, beforeAll, describe } from "bun:test";
import { LiteSVM } from "litesvm";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

describe("Create pda from client", () => {
  let liveSvm: LiteSVM;
  let pda: PublicKey;
  let bump: number;
  let programId: PublicKey;
  let payer: Keypair;

  beforeAll(() => {
    liveSvm = new LiteSVM();
    programId = PublicKey.unique();
    payer = Keypair.generate();
    liveSvm.addProgramFromFile(programId, "./contract.so");
    liveSvm.airdrop(payer.publicKey, BigInt(100000000000));
    [pda, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("client1"), payer.publicKey.toBuffer()],
      programId,
    );

    let ix = new TransactionInstruction({
      keys: [
        {
          pubkey: payer.publicKey,
          isSigner: true,
          isWritable: true,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      programId,
      data: Buffer.from(""),
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = liveSvm.latestBlockhash();
    tx.sign(payer);
    let res = liveSvm.sendTransaction(tx);
    console.log(res.toString());
  });

  test("should create pda", () => {
    const balance = liveSvm.getBalance(pda);
    console.log(balance);
    expect(Number(balance)).toBeGreaterThan(0);
    expect(Number(balance)).toBe(1000000000);
  });
});
