import { Connection, PublicKey } from "@solana/web3.js";

const SOL_VAULT = "DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz";
const USDC_VAULT = "HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const connection = new Connection("https://api.mainnet-beta.solana.com");

async function getSOLBalance(vaultAddress: string) {
  try {
    const publicKey = new PublicKey(vaultAddress);
    const balance = await connection.getBalance(publicKey);

    const solBalance = balance / 1_000_000_000;

    return {
      address: vaultAddress,
      balance: solBalance,
      balanceInLamports: balance,
      token: "SOL",
    };
  } catch (error) {
    console.error("Error fetching SOL balance:", error);
    throw error;
  }
}

async function getUSDCBalance(vaultAddress: string) {
  try {
    const publicKey = new PublicKey(vaultAddress);

    const accountInfo = await connection.getParsedAccountInfo(publicKey);

    if (!accountInfo.value || !(accountInfo.value.data as any).parsed) {
      throw new Error("Invalid token account or account not found");
    }

    const parsedData = (accountInfo.value.data as any).parsed;

    if (parsedData.type !== "account") {
      throw new Error("Address is not a token account");
    }

    const balance = parsedData.info.tokenAmount.uiAmount;
    const balanceInBaseUnits = parsedData.info.tokenAmount.amount;
    const decimals = parsedData.info.tokenAmount.decimals;
    const mint = parsedData.info.mint;

    return {
      address: vaultAddress,
      balance,
      balanceInBaseUnits,
      token: mint === USDC_MINT ? "USDC" : "Unknown Token",
      mint,
      decimals,
    };
  } catch (error) {
    console.error("Error fetching USDC balance:", error);
    throw error;
  }
}

export async function getVaultBalances() {
  try {
    const [solBalance, usdcBalance] = await Promise.all([
      getSOLBalance(SOL_VAULT),
      getUSDCBalance(USDC_VAULT),
    ]);

    return {
      sol: solBalance,
      usdc: usdcBalance,
    };
  } catch (error) {
    console.error("Error in getVaultBalances:", error);
    throw error;
  }
}

// Run when executed directly
getVaultBalances()
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error);
