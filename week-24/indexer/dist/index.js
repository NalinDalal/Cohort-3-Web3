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
const ethers_1 = require("ethers");
const axios_1 = __importDefault(require("axios"));
let CURRENT_BLOCK_NUMBER = 21695414;
const provider = new ethers_1.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/e3fUoPqdyoLlCGWNHdY2lEOaovOsKddu");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // get the interested addresses from the DB
        const interestedAddress = [
            "0xb73664d81129150964b07c6447b2949cf5f11619",
            "0x0Ec5A4Ec916E241797dA89a66e25C231bb4150F8",
            "0x8407490c88667c1c5ca2910f95dd4027c84e1804",
        ];
        const transactions = yield getTransactionReceipt(CURRENT_BLOCK_NUMBER.toString());
        const interestedTransactions = transactions === null || transactions === void 0 ? void 0 : transactions.result.filter((x) => interestedAddress.includes(x.to));
        const fullTxns = yield Promise.all(interestedTransactions.map((_a) => __awaiter(this, [_a], void 0, function* ({ transactionHash }) {
            const txn = yield provider.getTransaction(transactionHash);
            return txn;
        })));
        console.log(fullTxns);
        // Bad approach => Update the balance in the database.
    });
}
function getTransactionReceipt(blockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "eth_getBlockReceipts",
            params: [
                "0x14B0BB7", // TODO: add block number here
            ],
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://eth-mainnet.g.alchemy.com/v2/e3fUoPqdyoLlCGWNHdY2lEOaovOsKddu",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Cookie: "_cfuvid=Qn1QTPgL8vHUo0A_cayd0JmLEtgJy5VQKGI5IFuem44-1737735399258-0.0.1.1-604800000",
            },
            data: data,
        };
        const response = yield axios_1.default.request(config);
        return response.data;
    });
}
main();
