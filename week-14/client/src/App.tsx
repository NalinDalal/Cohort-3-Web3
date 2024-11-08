import { useState } from 'react'
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import './App.css'
import axios from 'axios';

const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/yBzlkWFR7LyZlmSKMjCBgTJEYK9LIktp")
const fromPubkey = new PublicKey("8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857")


function App() {

  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("Ezpk3Ew3Vmwp8BAVxg3FU1noJHGVE9AUAe8k3qKJ72UB"),
      lamports: 0.001 * LAMPORTS_PER_SOL,
    })  //to create a Transaction instruction

    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash
    tx.feePayer = fromPubkey

    //convert transaction to bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    console.log(serializedTx);

    await axios.post("/api/v1/txn/sign", {
      message: serializedTx, retry: false
    })
  }

  return (
    <>
      <div>
        <input type="text" placeholder='Amount' />
        <input type="text" placeholder="Address" />
        <button onClick={sendSol}>Submit</button>
      </div>
    </>
  )
}

export default App
