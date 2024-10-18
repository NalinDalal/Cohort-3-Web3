// components in react, are very similar to creating your own HTML tag
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
// The useWallet 'Hook' 'provides' the wallet variable inside the Airdrop 'Component'
// because I wrapped the Airdrop component inside the WalletProvider
export function Airdrop() {
  // hooks in react
  const wallet = useWallet();
  const { connection } = useConnection();
  // define the function inside the component body
  function sendAirdropToUser() {
    connection.requestAirdrop(wallet.publickey, 10)
  }
  return <div>
    <input type="text" placeholder="Amount"></ input>
    <button onClick={sendAirdropToUser}>Send Airdrop</button>
  </div>
}
