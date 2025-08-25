// memo_vault.ts
// TypeScript (works with bun or ts-node)
// Install: npm i @solana/web3.js @solana/spl-token @solana/spl-memo bs58

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  ConfirmOptions,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
} from "@solana/spl-token";
//import { MemoProgram } from "@solana/spl-memo";
import bs58 from "bs58";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";

/**
 * CONFIG
 */
const DEFAULT_RPC = "https://api.mainnet-beta.solana.com"; // change to devnet for testing
const POLL_LIMIT = 200; // number of signatures to fetch per poll
export const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

/**
 * Utility: load Keypair from base58 or from local file (you can replace this loader)
 */
function loadKeypairFromBase58(secretBase58: string): Keypair {
  const secret = bs58.decode(secretBase58);
  return Keypair.fromSecretKey(secret);
}

/**
 * Send SOL with a memo (so deposits/withdrawals can be indexed by memo)
 * memoText example: "deposit:USER123" or "withdraw:USER123"
 */
export async function sendSolWithMemo(
  connection: Connection,
  payer: Keypair,
  to: PublicKey,
  solAmount: number,
  memoText: string,
  opts?: ConfirmOptions,
) {
  const lamports = Math.round(solAmount * LAMPORTS_PER_SOL);

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: to,
      lamports,
    }),
  );

  // add memo instruction
  const memoIx = new TransactionInstruction({
    //programId: MemoProgram.programId,
    programId: MEMO_PROGRAM_ID,
    keys: [],
    data: Buffer.from(memoText),
  });
  tx.add(memoIx);

  const sig = await sendAndConfirmTransaction(connection, tx, [payer], opts);
  return sig;
}

/**
 * Send SPL token with memo
 * Assumes payer has associated token account for the mint and both sides have ATA or recipient ATA will be created separately.
 * amount is in token base units (i.e., 1 USDC = 1 * 10^6 base units if decimals=6).
 */
export async function sendSplTokenWithMemo(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  toOwner: PublicKey, // recipient wallet (owner of token account)
  amountBaseUnits: bigint,
  memoText: string,
  opts?: ConfirmOptions,
) {
  // derive ATAs
  const fromATA = await getAssociatedTokenAddress(mint, payer.publicKey);
  const toATA = await getAssociatedTokenAddress(mint, toOwner);

  // ensure 'fromATA' exists and has funds (optional check)
  const fromAccountInfo = await getAccount(connection, fromATA).catch(
    () => null,
  );
  if (!fromAccountInfo) {
    throw new Error(
      `Sender ATA ${fromATA.toBase58()} not found or not initialized`,
    );
  }

  // Build transfer instruction
  const transferIx = createTransferInstruction(
    fromATA,
    toATA,
    payer.publicKey,
    amountBaseUnits,
  );

  // memo instruction
  const memoIx = new TransactionInstruction({
    programId: MemoProgram.programId,
    keys: [],
    data: Buffer.from(memoText),
  });

  const tx = new Transaction().add(transferIx, memoIx);
  const sig = await sendAndConfirmTransaction(connection, tx, [payer], opts);
  return sig;
}

/**
 * Polling listener: fetch recent signatures for a target address (vault or user) and extract memos.
 * - addressToWatch: PublicKey to look at (could be vault address or user address)
 * - memoPrefix: the prefix you want to filter on e.g. 'deposit:' or 'withdraw:'
 * - sinceSignature: optional signature to start after (for incremental indexing)
 *
 * NOTE: This uses getSignaturesForAddress + getParsedTransaction. It's not real-time websocket
 * but is minimal-indexing and simple to run from any machine. For production real-time streaming,
 * plug into RPC websocket methods or use services like Helius / Lazerstream / Shyft / Geyser.
 */
export async function pollMemosForAddress(
  connection: Connection,
  addressToWatch: PublicKey,
  memoPrefix: string,
  sinceSignature?: string,
) {
  // fetch signatures
  const sigInfos = await connection.getSignaturesForAddress(addressToWatch, {
    limit: POLL_LIMIT,
    until: undefined,
    before: sinceSignature,
  });

  // if none, return empty
  if (!sigInfos || sigInfos.length === 0)
    return { memos: [], newestSig: sinceSignature || null };

  // fetch parsed txns for each signature in parallel
  const sigs = sigInfos.map((s) => s.signature);
  const parsedTxns = await Promise.all(
    sigs.map((s) =>
      connection.getParsedTransaction(s, { maxSupportedTransactionVersion: 0 }),
    ),
  );

  const memos: Array<{
    signature: string;
    slot: number;
    memoText: string;
    sender?: string;
    referencedAccounts?: string[]; // accounts touched in tx
  }> = [];

  for (let i = 0; i < parsedTxns.length; i++) {
    const tx = parsedTxns[i];
    const sig = sigs[i];
    if (!tx) continue;

    // parsed instructions live in tx.transaction.message.instructions for v0; for parsed we use tx.meta?.innerInstructions? but parsed Txns include 'transaction.message.instructions' as parsed
    const message = (tx.transaction as any).message || {};
    const instructions: any[] = message.instructions || [];

    // scan for memo program instructions
    for (const ix of instructions) {
      // instruction could be parsed or raw; check programId or program
      const programId = ix.programId || ix.program;
      if (!programId) continue;

      // Memo program id: MemoSq4gq..." - compare by base58
      if (
        /*programId === MemoProgram.programId.toBase58() ||
        programId === MemoProgram.programId*/
        programId === MEMO_PROGRAM_ID.toBase58()
      ) {
        // instruction data might be base58 or text depending on parsing
        let dataStr = "";
        if (ix.data) {
          // parsed instruction gives data as base58 sometimes
          try {
            // If ix.data is base58, decode then toString()
            dataStr = Buffer.from(ix.data, "base64").toString("utf8"); // some RPCs encode in base64
          } catch {
            try {
              dataStr = Buffer.from(ix.data, "hex").toString("utf8");
            } catch {
              dataStr = ix.data; // fallback
            }
          }
        } else if (
          ix.parsed &&
          ix.parsed.type === "memo" &&
          ix.parsed?.info?.memo
        ) {
          dataStr = ix.parsed.info.memo;
        }

        if (!dataStr && tx.meta?.logMessages) {
          // sometimes the memo appears in logs (rare). Scan logs for 'Memo: ' lines.
          for (const log of tx.meta.logMessages) {
            if (log.startsWith("Program log: Memo")) {
              const maybe = log.replace(/^Program log: Memo:? */, "");
              dataStr = maybe;
              break;
            }
          }
        }

        if (!dataStr) continue;

        // filter by prefix
        if (dataStr.startsWith(memoPrefix)) {
          memos.push({
            signature: sig,
            slot: tx.slot,
            memoText: dataStr,
            sender: tx.transaction.signatures?.[0] || undefined,
            referencedAccounts:
              (tx.transaction.message as any).accountKeys?.map(
                (k: any) => k.pubkey,
              ) || [],
          });
        }
      }
    }
  }

  // newest signature (most recent) is first entry in sigInfos
  const newestSig = sigInfos[0].signature;

  return { memos, newestSig };
}

/**
 * Simple CLI runner
 * Usage examples:
 *  bun run memo_vault.ts send-sol <RPC_URL?> <SENDER_SECRET_BASE58> <TO_PUBKEY> <SOL_AMOUNT> <MEMO_TEXT>
 *  bun run memo_vault.ts send-token <RPC_URL?> <SENDER_SECRET_BASE58> <MINT> <TO_OWNER_PUBKEY> <AMOUNT_BASE_UNITS> <MEMO_TEXT>
 *  bun run memo_vault.ts listen <RPC_URL?> <ADDRESS_TO_WATCH> <MEMO_PREFIX> [POLL_INTERVAL_MS]
 */
async function mainCli() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];

  if (!cmd) {
    console.log("Commands: send-sol | send-token | listen");
    process.exit(1);
  }

  const rpc = argv[1] || DEFAULT_RPC;
  const connection = new Connection(rpc, { commitment: "confirmed" });

  if (cmd === "send-sol") {
    const secret = argv[2];
    const toStr = argv[3];
    const solAmount = Number(argv[4]);
    const memoText = argv.slice(5).join(" ") || `deposit:unknown`;

    if (!secret || !toStr || isNaN(solAmount)) {
      console.error(
        "Usage: send-sol <secretBase58> <toPubkey> <solAmount> <memoText...>",
      );
      process.exit(1);
    }

    const payer = loadKeypairFromBase58(secret);
    const to = new PublicKey(toStr);

    console.log(
      `Sending ${solAmount} SOL -> ${to.toBase58()} with memo "${memoText}"`,
    );
    const sig = await sendSolWithMemo(
      connection,
      payer,
      to,
      solAmount,
      memoText,
    );
    console.log("tx:", sig);
    process.exit(0);
  }

  if (cmd === "send-token") {
    const secret = argv[2];
    const mintStr = argv[3];
    const toOwnerStr = argv[4];
    const amtBaseUnits = BigInt(argv[5]);
    const memoText = argv.slice(6).join(" ") || `deposit:unknown`;

    if (!secret || !mintStr || !toOwnerStr || !amtBaseUnits) {
      console.error(
        "Usage: send-token <secretBase58> <mint> <toOwner> <amountBaseUnits> <memoText...>",
      );
      process.exit(1);
    }

    const payer = loadKeypairFromBase58(secret);
    const mint = new PublicKey(mintStr);
    const toOwner = new PublicKey(toOwnerStr);

    console.log(
      `Sending ${amtBaseUnits} (base units) of ${mint.toBase58()} to ${toOwner.toBase58()} with memo "${memoText}"`,
    );
    const sig = await sendSplTokenWithMemo(
      connection,
      payer,
      mint,
      toOwner,
      amtBaseUnits,
      memoText,
    );
    console.log("tx:", sig);
    process.exit(0);
  }

  if (cmd === "listen") {
    const addressStr = argv[2];
    const memoPrefix = argv[3] || "deposit:";
    const pollInterval = Number(argv[4]) || 10_000;

    if (!addressStr) {
      console.error(
        "Usage: listen <addressToWatch> <memoPrefix?> <pollIntervalMs?>",
      );
      process.exit(1);
    }

    const addressToWatch = new PublicKey(addressStr);
    console.log(
      `Listening (poll) for memos with prefix="${memoPrefix}" on address ${addressToWatch.toBase58()}`,
    );
    let sinceSig: string | undefined = undefined;

    // initial quick fetch to set sinceSig
    try {
      const sigs = await connection.getSignaturesForAddress(addressToWatch, {
        limit: 1,
      });
      sinceSig = sigs?.[0]?.signature;
    } catch (e) {
      console.warn("Could not fetch initial signature:", e);
    }

    setInterval(async () => {
      try {
        const { memos, newestSig } = await pollMemosForAddress(
          connection,
          addressToWatch,
          memoPrefix,
          sinceSig,
        );
        if (memos.length > 0) {
          for (const m of memos.reverse()) {
            console.log(
              `[${new Date().toISOString()}] FOUND MEMO: sig=${m.signature} slot=${m.slot} memo=${m.memoText}`,
            );
          }
        }
        if (newestSig) sinceSig = newestSig;
      } catch (err) {
        console.error("Poll error:", err);
      }
    }, pollInterval);
    // keep process alive
  }

  // unknown command
  console.error("Unknown command:", cmd);
  process.exit(1);
}

// run CLI when executed directly
if (require.main === module) {
  mainCli().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
  });
}
