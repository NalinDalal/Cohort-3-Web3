import React, { useState } from 'react';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [ethWallets, setEthWallets] = useState([]);
  const [solWallets, setSolWallets] = useState([]);

  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
  };

  const deriveEthWallets = (mnemonic: string, numWallets: number) => {
    const ethWallets = [];
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    for (let i = 0; i < numWallets; i++) {
      const path = `m/44'/60'/0'/0/${i}`; // ETH derivation path
      const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
      ethWallets.push(wallet.address);
    }
    setEthWallets(ethWallets);
  };

  const deriveSolWallets = (mnemonic: string, numWallets: number) => {
    const solWallets = [];
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
    for (let i = 0; i < numWallets; i++) {
      const path = `m/44'/501'/${i}'/0'`; // Solana derivation path
      const keypair = Keypair.fromSeed(seed);
      solWallets.push(keypair.publicKey.toBase58());
    }
    setSolWallets(solWallets);
  };

  const generateWallets = () => {
    deriveEthWallets(mnemonic, 5); // Generating 5 ETH wallets
    deriveSolWallets(mnemonic, 5); // Generating 5 SOL wallets
  };

  return (
    <div>
      <h1>Web Wallet</h1>
      <button onClick={generateMnemonic}>Generate Mnemonic</button>
      <p>{mnemonic}</p>
      <button onClick={generateWallets}>Generate Wallets</button>

      <h2>Ethereum Wallets</h2>
      <ul>
        {ethWallets.map((wallet, index) => (
          <li key={index}>{wallet}</li>
        ))}
      </ul>

      <h2>Solana Wallets</h2>
      <ul>
        {solWallets.map((wallet, index) => (
          <li key={index}>{wallet}</li>
        ))}
      </ul>
    </div>
  );
};

export default WalletGenerator;

