import { test, expect } from "bun:test";
import { LiteSVM } from "litesvm";
import {
  Connection,
  KeyPair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
test("CPI works as expected", async () => {
  let svm = new LiteSVM();
  let doubleContract = PublicKey.unique();
  let cpiContract = PublicKey.unique();
  svm.addProgramFromFile(doubleContract, "./double.so");
  svm.addProgramFromFile(cpiContract, "./cpi.so");

  let userAcc = new Keypair();
  svm.airdrop(userAcc.publicKey, BigInt(1000_000_000));

  createDataAccountOnChain(svm, dataAccount, userAcc, doubleContract);
  let ix = new TransactionInstruction({
    keys: [
      { pubkey: dataAcc.publicKey, isSigner: false, isWritable: true },
      { pubkey: doubleContract, isSigner: false, isWritable: false },
    ],
    programId: cpiContract,
    data: Buffer.from(""),
  });

  const blockhash = svm.latestBlockhash();
  let transaction = new Transaction().add(ix);
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = userAcc.publicKey;
  transaction.sign(userAcc);

  const dataAccount = svm.getAccount(dataAcc.publicKey);
  expect(dataAccountData?.data[0]).toBe(1);
  expect(dataAccountData?.data[1]).toBe(0);
  expect(dataAccountData?.data[2]).toBe(0);
  expect(dataAccountData?.data[3]).toBe(0);
});

function createDataAccountOnChain(
  svm: LiteSVM,
  dataAccount: Keypair,
  payer: Keypair,
  contractPubKey: PublicKey,
) {
  const blockhash = svm.latestBlockhash();
  const ixs = [
    SystemProgram.createAccount({
      fromPubkey: payer.publickey,
      newAccountPubkey: dataAccount.publicKey,
      lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
      space: 4,
      programId: contractPubkey,
    }),
  ];
  const tx = new Transaction();
  tx.recentBlockhash = blockhash;
  tx.feePayer = payer - publicKey;
  tx.add(...ixs);
  tx.sign(payer, dataAccount);
  sm.sendTransaction(tx);
}
