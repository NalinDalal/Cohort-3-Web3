# What is Bonkbot

Its a telegram bot you can use to buy/sell/trade solana tokens. It generates a private key for you and lets you buy and sell tokens using the TG interface.

They made ~$100Mn last year

![revenue](https://defillama.com/protocol/fees/bonkbot)

# Step 1 - Get bot creds

- Open Telegram and search for @BotFather
- Start a chat and send `/newbot`
- Choose a name and username for your bot
- Save the bot token you receive (format: `123456789:ABCdefGhIjKlMnOpQrStUvWxYz`)

# Step 2 - Create your bot using telegraph

![Ref](https://github.com/telegraf/telegraf)

It lets you do 3 things

- Get a raw message and reply back to it

```jsx
bot.on(message("text"), async (ctx) => {
  // Explicit usage
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    `Hello ${ctx.state.role}`,
  );

  // Using context shortcut
  await ctx.reply(`Hello ${ctx.state.role}`);
});
```

- Reply to buttons on the TG UI

![Screenshot 2025-09-06 at 12.32.28 AM.png](attachment:d0e711fe-e78c-4fa6-8cd1-0b3669942519:Screenshot_2025-09-06_at_12.32.28_AM.png)

```jsx
bot.on("callback_query", async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  await ctx.answerCbQuery();
});
```

<aside>
💡

### **Always answer callback queries:**

- If you don't answer, the button will show a loading spinner forever
- You have **up to 30 seconds** to answer
</aside>

- Inline queries - Not needed for bonkbot

# Step 3 - Creating a TG Bot UI

When the user sends a `hi` or `hello` or `reset` on the chat, we should send them GUI buttons to interact with.

```jsx
bot.start((ctx) => {
  // This code runs when user clicks START button
  console.log("User clicked START button!");

  // You control the response
  const welcomeKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback("Create Wallet", "create_wallet")],
    [Markup.button.callback("Get balance", "get_balance")],
  ]);

  ctx.reply("🤖 Welcome! Please chose what to do!", welcomeKeyboard);
});
```

# Step 4 - Create the Wallet

Lets start a Node.js server that is supposed to respond back to the start command.

- Initialise a node.js project

```jsx
bun init
```

- Add dependencies

```jsx
bun add telegraf
```

- Add a start command handler
  `index.ts`

# Step 5 - Handling UI button clicks

```jsx
bot.action();
```

# Step 6 - Add @solana/web3.js
