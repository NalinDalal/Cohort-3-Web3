"use strict";
/*import { PRIVATE_KEY, PUBLIC_KEY } from "env";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const PUBLIC_KEY = process.env.PUBLIC_KEY || "";

// Alternatively, you can log or throw an error if these values are not defined
if (!PRIVATE_KEY || !PUBLIC_KEY) {
    console.error("Environment variables PRIVATE_KEY or PUBLIC_KEY are missing.");
    throw new Error("Missing environment variables");
}

export const TOKEN_MINT_ADDRESS = process.env.TOKEN_MINT_ADDRESS;*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAULT_ADDRESS = exports.TOKEN_MINT_ADDRESS = exports.PUBLIC_KEY = exports.PRIVATE_KEY = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.PRIVATE_KEY = process.env.PRIVATE_KEY;
exports.PUBLIC_KEY = process.env.PUBLIC_KEY;
exports.TOKEN_MINT_ADDRESS = new web3_js_1.PublicKey("8C2Lzgxftwj9NMFp2wAiHK8iRY9FqoBBS6uq5JqbdXxj");
exports.VAULT_ADDRESS = "7fbT67iUP8KXbeumYy5bfmGNqdSwkjdYkJkrR8ahn5WN";
