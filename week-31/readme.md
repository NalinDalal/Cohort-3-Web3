# Solana Development

Pre-Requisites
1. Rust
2. Borsh{Serialization/Deserilization}

# Data Model on Solana
- Program data accounts
- Program accounts
- PDAs/program derived addresses
- User accounts (owned by System program)
- Data account (but not a PDA)

Today we will deploy Program Data Account and Program Account.
Data Account-> multiple acount but single logic.

we can directly read data from Data Account

Step 1:
initialise a solana project->
initialise a library-> `cargo init --lib`

we have a src/lib.rs file, notice no entry point

Step 2:
add dependency-> `cargo add solana-program@1.18.26`
provides bunch of exports

Step 3:
add output format in Cargo->
```toml
[lib]
crate-type=["cdylib","lib"]
```
`cdylib`: Produces a dynamic system library (.so on Linux, .dll on Windows, .dylib on macOS) that can be loaded by external programs. 
For Solana, this creates the compiled program that can be deployed to the blockchain.

`lib`: Creates a standard Rust library that other Rust crates can link to. This is useful during development and testing.


Step 4:
Add borsh and borsh-derive
`cargo add borsh borsh-derive`

Step 5: Write the Contract

Step 7: Build contract->
`cargo build-sbf`

Step 6: Run the test-> ``
