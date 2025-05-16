import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorCalculator } from "../target/types/anchor_calculator";
import assert from "assert";

describe("anchor-calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .anchorCalculator as Program<AnchorCalculator>;
  const newAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        newAccount: newAccount.publicKey,
        signer: anchor.getProvider().wallet.publicKey,
      })
      .signers([newAccount])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is double!", async () => {
    const tx = await program.methods
      .double()
      .accounts({
        account: newAccount.publicKey,
        signer: anchor.getProvider().wallet.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.newAccount.fetch(
      newAccount.publicKey,
    );
    assert.equal(account.data, 2);
  });

  it("Is halve!", async () => {
    const tx = await program.methods
      .halve()
      .accounts({
        account: newAccount.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.newAccount.fetch(
      newAccount.publicKey,
    );
    assert.equal(account.data, 1);
  });
});
