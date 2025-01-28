import { JsonRpcProvider } from "ethers";
import axios from "axios";
let CURRENT_BLOCK_NUMBER = 21695414;

const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/e3fUoPqdyoLlCGWNHdY2lEOaovOsKddu",
);

async function main() {
  // get the interested addresses from the DB

  const interestedAddress = [
    "0xb73664d81129150964b07c6447b2949cf5f11619",
    "0x0Ec5A4Ec916E241797dA89a66e25C231bb4150F8",
    "0x8407490c88667c1c5ca2910f95dd4027c84e1804",
  ];

  const transactions = await getTransactionReceipt(
    CURRENT_BLOCK_NUMBER.toString(),
  );

  const interestedTransactions = transactions?.result.filter((x) =>
    interestedAddress.includes(x.to),
  );

  const fullTxns = await Promise.all(
    interestedTransactions.map(async ({ transactionHash }) => {
      const txn = await provider.getTransaction(transactionHash);
      return txn;
    }),
  );

  console.log(fullTxns);

  // Bad approach => Update the balance in the database.
}

interface TransactionReceipt {
  transactionHash: string;
  from: string;
  to: string;
}

interface TransactionReceiptResponse {
  result: TransactionReceipt[];
}

async function getTransactionReceipt(
  blockNumber: string,
): Promise<TransactionReceiptResponse> {
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
      Cookie:
        "_cfuvid=Qn1QTPgL8vHUo0A_cayd0JmLEtgJy5VQKGI5IFuem44-1737735399258-0.0.1.1-604800000",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
}

main();
