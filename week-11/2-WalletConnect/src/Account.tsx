
import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    address
  })

  return (
    <div>
      {address && <div>
        Your address - {address}
        Your balance - {balance.data?.formatted}
      </div>}

      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
