import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";
import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.token);

const USERS: Record<string, Keypair> = {};
interface PendingRequestType {
  type: "SEND_SOL" | "SEND_TOKEN";
  amount?: number;
  to?: string;
}
const PENDING_REQUESTS: Record<string, PendingRequestType> = {};

const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback("🔑 Generate Wallet", "generate_wallet"),
    Markup.button.callback("Show public key", "show_public_key"),
  ],
]);

const onlyGenerateBoard = Markup.inlineKeyboard([
  [Markup.button.callback("🔑 Generate Wallet", "generate_wallet")],
]);

const postWalletCreationKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback("Send SOL", "send_sol"),
    Markup.button.callback("Show public key", "show_public_key"),
  ],
]);

bot.start(async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  let welcomeMessage = `Hi there`;

  return ctx.reply(welcomeMessage, {
    parse_mode: "Markdown",
    ...keyboard,
  });
});

bot.action("generate_wallet", (ctx) => {
  ctx.answerCbQuery("Generating new wallet...");
  const keypair = Keypair.generate();
  const userId = ctx.from?.id;
  USERS[userId] = keypair;

  ctx.sendMessage(
    `New wallet created for you with public key ${keypair.publicKey.toBase58()}`,
    {
      parse_mode: "Markdown",
      ...postWalletCreationKeyboard,
    },
  );
});

bot.action("show_public_key", (ctx) => {
  ctx.answerCbQuery("Getting your public key...");
  const userId = ctx.from?.id;
  const keypair = USERS[userId];

  if (!keypair) {
    ctx.sendMessage(
      `You dont have a wallet with us yet, please click generate wallet to create one`,
      {
        parse_mode: "Markdown",
        ...onlyGenerateBoard,
      },
    );
    return;
  }

  ctx.sendMessage(`This is your public key ${keypair.publicKey.toBase58()}`, {
    parse_mode: "Markdown",
    ...postWalletCreationKeyboard,
  });
});

bot.action("send_sol", (ctx) => {
  const userId = ctx.from?.id;
  ctx.answerCbQuery();
  ctx.sendMessage("Can u share the address to send to");
  PENDING_REQUESTS[userId] = {
    type: "SEND_SOL",
  };
});

bot.on(message("text"), (ctx) => {
  const userId = ctx.from?.id;
  if (PENDING_REQUESTS[userId]?.type == "SEND_SOL") {
    if (PENDING_REQUESTS[userId] && !PENDING_REQUESTS[userId].to) {
      // TODO: Check here if it is a valid public key
      PENDING_REQUESTS[userId].to = ctx.message.text;
      ctx.sendMessage("How much SOL do you want to send");
    } else {
      const amount = ctx.message.text;
      //TODO: Check if this is a valid amount
      // TODO: Check if user has this much SOL in their wallet.
      // TODO: Create a txn and forward it to the blockchain
      ctx.sendMessage(
        `Initiated a txn for ${amount} SOL to ${PENDING_REQUESTS[userId].to}`,
        {
          parse_mode: "Markdown",
          ...postWalletCreationKeyboard,
        },
      );
      delete PENDING_REQUESTS[userId];
    }
  }
});

await bot.launch();
