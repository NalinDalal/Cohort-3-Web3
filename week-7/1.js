const { PublicKey } = require('@solana/web3.js');
const { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Replace these with your actual values
const userAddress = new PublicKey('5gjLjKtBhDxWL4nwGKprThQwyzzNZ7XNAVFcEtw3rD4i');
const tokenMintAddress = new PublicKey('6NeR2StEEb6CP75Gsd7ydbiAkabdriMdixPmC2U9hcJs');

// Derive the associated token address
const getAssociatedTokenAddress = (mintAddress, ownerAddress) => {
	return PublicKey.findProgramAddressSync(
		[
			ownerAddress.toBuffer(),
			TOKEN_PROGRAM_ID.toBuffer(),
			mintAddress.toBuffer(),
		],
		ASSOCIATED_TOKEN_PROGRAM_ID
	);
};

const [associatedTokenAddress, bump] = getAssociatedTokenAddress(tokenMintAddress, userAddress);
console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}, bump: ${bump}`);
