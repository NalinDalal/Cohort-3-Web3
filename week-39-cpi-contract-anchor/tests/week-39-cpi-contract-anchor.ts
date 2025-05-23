import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Week39CpiContractAnchor } from "../target/types/week_39_cpi_contract_anchor";
import { assert } from "chai";
describe("week-39-cpi-contract-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const recipient = anchor.web3.Keypair.generate();

  const program = anchor.workspace
    .Week39CpiContractAnchor as Program<Week39CpiContractAnchor>;
  console.log("Program", program);

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .solTransfer(new anchor.BN())
      .account({
        sender: provider.publicKey,
        recipient: recipient.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await provider.connection.getAccountInfo(
      recipient.publicKey,
    );
    assert.equal(account?.lamports, 1000000000);
  });
});
