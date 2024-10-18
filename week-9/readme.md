# What is DEX
A DEX (Decentralized Exchange) is a cryptocurrency trading platform that operates without a central authority, allowing users to trade assets 
directly with one another (peer-to-peer) using smart contracts.

## DEX
1. You have the private key of your wallet
2. No one can censor you/take your assets (not true for centralized tokens like USDC)
3. You have to do private key management yourself

## CEX
1. You delegate your assets to a central entity
2. You dont have to do private key managenent
3. Govt can censor you, you have to KYC
4. Exchange can get hacked

### CEX Jargon
Orderbooks - An order book is a digital list that displays all buy and sell order placed by traders for a particular asset, such as cryptocurrencies,stocks
- Example: Buying a house, Solana orderbook on Backpack exchange
Bids - Purchase
Asks - Sell
Spread - Difference b/w Bids and Asks
Liquidity -  how easily or quickly an asset can be bought or sold in a market without affecting its price
Market Makers -  participates in the market at all times, buying securities from sellers and selling securities to buyers.

### Liquidity Pool
In the orderbook method, there are two types of people
1. Bidders - Who have a lot of USDC
2. Askers - Who have a lot of SOL

### Constant product algorithm
In decentralized exchanges (DEXS), a constant product formula is the pricing algorithm used in Automated Market Makers (AMMS)
The formula is:
x * y= k
Where:
• x is the reserve of Token A.
• y is the reserve of Token B. +
• k is a constant, meaning it does not change as trades are executed.

Similarly, if people are buying Solana, the price of Solana will go up
This is what is called `automated market making`

### DEX Jargon
1. Markets
2. Swap
3. Quote
4. Slippage - difference between the expected price of a trade and the actual price at which the trade is executed.It occurs due to - 
    Market Volatility
    Order size
    Market Conditions - During periods of low trading volume or high demand for a specific asset, slippage is more likely to occur.
    Slippage can be positive or negative:

    Positive Slippage: When a trade is executed at a better price than expected.
    Negative Slippage: When a trade is executed at a worse price than expected.

5. Slippage tollerance

### DEX Aggreagator

A DEX aggregator is a platform or protocol that sources liquidity from multiple decentralized exchanges to provide users with the best possible price for their trades.

# Assignment - ![Coding a Swap website](https://station.jup.ag/docs/apis/swap-api)
Use the wallet adapter to allow a user to come to your website and swap one asset for another.
Create a TG bot like BonkBot where user can come and swap. Use JUp APls under the hood.

To create a Telegram bot like BonkBot where users can swap one asset for another using JUp (Jupiter Aggregator) APIs under the hood, you'll need to follow these general steps:

### 1. **Set Up Wallet Adapter (for Web Swap)**
   - Use a wallet adapter like `@solana/wallet-adapter` for Solana, or similar for Ethereum.
   - Integrate it into your website for users to connect their wallets.
   - Once connected, allow them to select assets (like SOL to USDC) and interact with the Jupiter API to swap.

   Here’s a basic flow:
   - **Install the wallet adapter**:
     ```bash
     yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
     ```

   - **Wallet Connection** (in React):
     ```jsx
     import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
     import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
     import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

     const wallets = [new PhantomWalletAdapter()];

     function App() {
       return (
         <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
           <WalletProvider wallets={wallets} autoConnect>
             <WalletModalProvider>
               {/* Swap Component here */}
             </WalletModalProvider>
           </WalletProvider>
         </ConnectionProvider>
       );
     }
     ```

   - **Use Jupiter Aggregator for Swaps**:
     You can follow Jupiter's documentation to fetch the best routes and perform a swap between tokens.
     ```bash
     yarn add @jup-ag/core
     ```

     Here’s a simplified example to fetch swap routes:
     ```js
     import { Jupiter } from '@jup-ag/core';

     const jupiter = await Jupiter.load({
       connection,
       cluster: 'mainnet-beta',
       user: wallet,
     });

     const routes = await jupiter.computeRoutes({
       inputMint, 
       outputMint,
       amount,
     });
     ```

### 2. **Create a Telegram Bot**
   - Use `node-telegram-bot-api` or `python-telegram-bot` to create the bot.

   - **Node.js Example**:
     ```bash
     yarn add node-telegram-bot-api
     ```

     Basic Telegram bot setup:
     ```js
     const TelegramBot = require('node-telegram-bot-api');
     const bot = new TelegramBot('<YOUR TELEGRAM BOT TOKEN>', { polling: true });

     bot.onText(/\/swap/, (msg) => {
       const chatId = msg.chat.id;
       bot.sendMessage(chatId, "Please provide the details for the swap (e.g., SOL to USDC)");
     });

     // More functionality to interact with the JUp API and perform swaps...
     ```

### 3. **Integrating JUp API in the Bot**
   - Use the JUp APIs for swap functionality. When a user triggers a swap, the bot will interact with Jupiter API for asset swap, handle the wallet connection, and send them transaction details.

### 4. **User Interaction Flow**
   - User initiates `/swap` command in the Telegram bot.
   - Bot prompts for the input and output tokens, along with the amount.
   - Bot fetches swap rates using JUp APIs.
   - User confirms swap, and the bot triggers the transaction through the wallet adapter.

This setup allows users to swap assets both through the website and Telegram bot, with JUp APIs facilitating the actual swaps under the hood.
