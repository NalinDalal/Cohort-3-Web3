1. initialise the project-> `cargo init`
2. Add solana-program as a dependency -> `cargo add solana-program@1.18.26`
3. add output fotmat in Cargo.toml->
```toml
[lib]
crate-type = ["cdylib", "lib"]

//cylib- creates the compiled program that can be deployed to the blockchain.
```

4. add vorsh and borsh-derieve-> `cargo add borsh borsh-derieve`
5. write code from repo
6. deploying/testing the contract 
    1. Start solana validator locally -> `solana-test-validator`
    2. Update solana RPC url locally-> `solana config set --url http://127.0.0.1:8899`
    3. Air drop yourself something -> `solana airdrop 10`
    4. build contract -> `cargo build-sbf`
    5. dploy->`solana program deploy /target/deploy/sol-program-counter.so`

interacting from client side

1. Create a fresh bun project
2. Create an empty index.test.ts file
3. Create a class and schema for the counter
       state

4. Get the size of the counter state account

5. Initialize the admin keypair and counter acc

       keypair

6. Airdrop some SOL to the admin acc

7. Create a new counter acc

8. read the account data, ensure it is empty
