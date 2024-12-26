26.12.2024

1. Lock contract for native eth
2. Lock contract for custom token
3. What are bridges
4. Bridge contract
5. Nounces, guardians

# Bridges:

We have till now dealt with Sol and Eth, both have USDT
Say USDC exist on both

There is a central authority called Tether, they have wallet on both, issued a custom token(gave metadata of USDC)

Say Shiba Inu doesn't exist on Solana, exist on Eth

Bridge- Bridges token from 1 evm chain{Ethereum} to other{Polygon}
EVM Chain- they are forks of actual ethereum but they are diff blockchain

Bridge- transfer asset from 1 Blockchain to other

## Create a EVM Bridge that lets you send USDT from one EVM chain to another

for every token1 on solana which is locked, a custom token is created/minted on
other blockchain

custom contract can have 2 function-> function deposit, function withdraw,
transerFrom(called on some other wallet, need approval), function transfer(own wallet)
