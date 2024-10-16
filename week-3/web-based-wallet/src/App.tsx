import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import SolanaWallet from "./SolanaWallet";
import EthWallet from "./EthWallet";

function App() {
  const [count, setCount] = useState(0)
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <button onClick={async function() {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>

      {/* display mnemonic in input box */}
      <input type="text" value={mnemonic}></input>

      <SolanaWallet />
      <EthWallet />

    </>
  )
}

export default App

