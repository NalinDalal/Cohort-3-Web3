import express from "express";
import { HDNodeWallet } from "ethers6";
import { mnemonicToSeedSync } from "bip39";
import { MNUENOMICS } from "./config";
import cors from "cors";
import { Client } from "pg";

const client = new Client(
  "postgres://postgres:mysecretpassword@localhost:5432/mynewdb",
);
client.connect();

const seed = mnemonicToSeedSync(MNUENOMICS);

const app = express();
app.use(express.json());

app.use(cors());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await client.query(
    "INSERT INTO binanceUsers (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [username, password, "", "", 0],
  );

  const userId = result.rows[0].id;

  const hdNode = HDNodeWallet.fromSeed(seed);
  const derivationPath = `m/44'/60'/${userId}'/0`;
  const child = hdNode.derivePath(derivationPath);
  console.log(derivationPath);

  await client.query(
    "UPDATE binanceUsers SET depositAddress=$1, privateKey=$2 WHERE id=$3",
    [child.address, child.privateKey, userId],
  );

  console.log(child.address);
  console.log(child.privateKey);
  console.log(child);
  res.json({
    userId,
  });
});

app.get("/depositAddress/:userId", (req, res) => {});

app.listen(3000);
