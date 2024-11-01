"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNativeTokens = exports.burnTokens = exports.mintTokens = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const address_1 = require("./address");
const bs58_1 = __importDefault(require("bs58"));
// mint more tokens?
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
function base58ToKeypair(base58PrivateKey) {
    try {
        console.log(base58PrivateKey);
        const privateKeyBuffer = bs58_1.default.decode(base58PrivateKey);
        return web3_js_1.Keypair.fromSecretKey(privateKeyBuffer);
    }
    catch (error) {
        throw new Error("Invalid base58 private key.");
    }
}
console.log("PRIVATE_KEY!");
console.log(address_1.PRIVATE_KEY);
const keypair = base58ToKeypair(address_1.PRIVATE_KEY);
const mintTokens = (fromAddress, amount) => __awaiter(void 0, void 0, void 0, function*() {
    yield (0, spl_token_1.mintTo)(connection, keypair, address_1.TOKEN_MINT_ADDRESS, new web3_js_1.PublicKey(fromAddress), keypair, amount);
});
exports.mintTokens = mintTokens;
const burnTokens = (fromAddress, toAddress, amount) => __awaiter(void 0, void 0, void 0, function*() {
    console.log("Burning tokens");
});
exports.burnTokens = burnTokens;
const sendNativeTokens = (fromAddress, toAddress, amount) => __awaiter(void 0, void 0, void 0, function*() {
    console.log("Sending native tokens");
});
exports.sendNativeTokens = sendNativeTokens;
/*
import {
  createBurnCheckedInstruction,
  createMintToCheckedInstruction,
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { PRIVATE_KEY, VAULT_ADDRESS, TOKEN_MINT_ADDRESS } from "./address";
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mintAddress = new PublicKey(TOKEN_MINT_ADDRESS);
const payer = Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY));

export const mintTokens = async (fromAddress: string, amount: number) => {
  console.log("Minting tokens");
  //whats the point of toAddress here?

  //get users pubkey
  const recipientPublicKey = new PublicKey(fromAddress);

  //check if ATA exists or create
  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAddress,
    recipientPublicKey
  );

  const transaction = new Transaction().add(
    createMintToCheckedInstruction(
      mintAddress,
      recipientTokenAccount.address,
      payer.publicKey, // Auth
      amount * 1e9, // Amount in lamp
      9
    )
  );
  const txSignature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log("Minted tokens with tx:", txSignature);
};

export const burnTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Burning tokens");
  //again, what's the point of any Address here?
  const myVault = new PublicKey(VAULT_ADDRESS);

  const transaction = new Transaction().add(
    // Burn the tokens
    createBurnCheckedInstruction(
      myVault,
      mintAddress,
      payer.publicKey,
      amount * 1e9,
      9
    )
  );

  const txSignature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log("Burned tokens with tx:", txSignature);
};

export const sendNativeTokens = async (toAddress: string, amount: number) => {
  const recipientPublicKey = new PublicKey(toAddress);
  console.log("Sending native tokens");
  const transaction = new Transaction().add(
    createTransferInstruction(
      payer.publicKey,
      recipientPublicKey,
      payer.publicKey,
      amount * 1e9
    )
  );

  const txSignature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);
  console.log("Sent sol with tx:", txSignature);
};
 */
