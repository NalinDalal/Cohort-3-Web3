17.01.2025
## What we’re building

a `Staking` contract where people can come and `stake` native ETH.

1. Initialise a foundry contract
```bash
forge init staking-contract
cd staking-contract
```
2. Add openzeplin to it
```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install OpenZeppelin/openzeppelin-contracts

```
3. Add an alias/remapping for openzepilin; update remapping.txt

4. Try to write the OrcaCoin contract (it should extend ERC-20 from openzeplin)
   -> `src/OrcaCoin.sol`

5. Write test for it -> `OrcaCoin.t.sol`

6. Write staking contract -> `StakingContract.sol`,`StakingContract.t.sol`


## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
