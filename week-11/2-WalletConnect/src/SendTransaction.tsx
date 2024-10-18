

import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction()

  async function sendTx() {
    const to = document.getElementById("to").value;
    const value = document.getElementById("value").value;
    sendTransaction({ to, value: parseEther(value) });
  }

  // Todo: use refs here
  return <div>
    <input id="to" placeholder="0xA0Cf…251e" required />
    <input id="value" placeholder="0.05" required />
    <button onClick={sendTx}>Send</button>
    {hash && <div>Transaction Hash: {hash}</div>}
  </div>
}
