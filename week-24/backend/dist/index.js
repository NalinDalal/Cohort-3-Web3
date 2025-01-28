"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ethers6_1 = require("ethers6");
const bip39_1 = require("bip39");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const client = new pg_1.Client("postgres://postgres:mysecretpassword@localhost:5432/mynewdb");
client.connect();
const seed = (0, bip39_1.mnemonicToSeedSync)(config_1.MNUENOMICS);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const result = yield client.query("INSERT INTO binanceUsers (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id", [username, password, "", "", 0]);
    const userId = result.rows[0].id;
    const hdNode = ethers6_1.HDNodeWallet.fromSeed(seed);
    const derivationPath = `m/44'/60'/${userId}'/0`;
    const child = hdNode.derivePath(derivationPath);
    console.log(derivationPath);
    yield client.query("UPDATE binanceUsers SET depositAddress=$1, privateKey=$2 WHERE id=$3", [child.address, child.privateKey, userId]);
    console.log(child.address);
    console.log(child.privateKey);
    console.log(child);
    res.json({
        userId,
    });
}));
app.get("/depositAddress/:userId", (req, res) => { });
app.listen(3000);
