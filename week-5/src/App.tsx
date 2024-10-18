import './App.css'
import { Airdrop } from './Airdrop'
import { ShowSolBalance } from './ShowSolBalance'
import { SignMessage } from './SignMessage'
import { SendTokens } from './SendSolana'
function App() {

  return (
    <>
      <div>
        hi there
        Airdrop:
        <Airdrop />
        <br />

        User Balanace:
        <ShowSolBalance />

        SignMessage:
        <SignMessage />

        SendSolana:
        <SendTokens />
      </div>
    </>
  )
}

export default App
