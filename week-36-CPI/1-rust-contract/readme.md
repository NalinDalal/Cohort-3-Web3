# CPI
# Cross Program Invocation
A Cross Program Invocation (CPI) refers to when one program invokes the instructions of another program. This allows for the composability of Solana programs.
You can think of instructions as API endpoints that a program exposes to the network and a CPI as one API
internally invoking another API.

well only 4 layers of cpi exist on solana for now

Consider a Double Contract-> it takes a data account and doubles it.

1. create a cargo project-> take a data account, call a contract and it will double
the number
only if it's owned by contract account

2. add solana-> `cargo add solana-program@1.18.26`

3. Add output formats in Cargo.toml
```toml
[lib]
crate-type = ["cdylib", "lib"]
```

4. Add borsh and borsh-derieve

5. start writing contract-> simply double the data account on account

6. start writing test to test it-> use `liteSVM`
    - initialise a client folder with bun and typescript
    - add litesvm as dependency

7. copy over the rust contract, go to beta.solpg and build a bin from there via
   the rust code; export the program bin to client folder, rename to double.so
