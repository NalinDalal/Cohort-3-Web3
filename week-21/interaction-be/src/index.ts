import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/nnY0qPUQLYsUvb5BKJM5bh81sI6O0PQG",
);

async function pollBlock(blockNumber: number) {
  const logs = await provider.getLogs({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    fromBlock: blockNumber, //from which address usdt was transferred
    toBlock: blockNumber + 2, //to which address it was transferred
    topics: [id("Transfer(address,address,uint256)")],
  });

  console.log(logs);
}

pollBlock(21493826);
