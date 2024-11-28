/*require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();


app.post('/helius', async(req, res) => {
    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    const type = "received_native_sol";
console.log(`Received transaction from ${fromAddress} to ${toAddress} of ${amount} SOL`);
    if (type === "received_native_sol") {
        await mintTokens(fromAddress, amount);
    } else {
        // What could go wrong here?
        // //any other event could be sent to this endpoint and you'll still burn tokens and send sol.
        await burnTokens(fromAddress, toAddress, amount);
        await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});*/
import dotenv from 'dotenv';
require('dotenv').config();
console.log(process.env.PUBLIC_KEY)
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();

const HELIUS_RESPONSE = {
    "nativeTransfers": [{
        "amount": 10000000,
        "fromUserAccount": "F1hLtC1BCc3FuATdBfHrAfxE4eJbXH2o3R54izrii1Fi",
        "toUserAccount": "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"
    }]
}

const VAULT = "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"

app.post('/helius', async (req, res) => {
    const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(x => x.toUserAccount === VAULT)
    if (!incomingTx) {
        res.json({ message: "processed" })
        return
    }
    const fromAddress = incomingTx.fromUserAccount;
    const toAddress = VAULT;
    const amount = incomingTx.amount;
    const type = "received_native_sol";
    await mintTokens(fromAddress, amount);

    // if (type === "received_native_sol") {
    // } else {
    //     // What could go wrong here?
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }

    res.send('Transaction successful');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
