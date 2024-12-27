import * as React from "react";
import { useWriteContract } from "wagmi";

export function AllowUSDT() {
  const { data, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    writeContract({
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "approve",
      args: ["0x2966473D85A76A190697B5b9b66b769436EFE8e5", BigInt(1000000)],
    });
  }

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Approve</button>
      {data && <div>Transaction Hash: {data}</div>}
    </form>
  );
}
