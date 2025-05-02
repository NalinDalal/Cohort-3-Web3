# Cross Program Invocation (CPI)
A Cross Program Invocation (CPI) refers to when one program invokes the instructions of another program. This allows for the composability of Solana programs.
You can think of instructions as API endpoints that a program exposes to the network and a CPI as one API
internally invoking another API.

graph LR
    A[Wallet] --> B[Middle<br/>contract]
    B --> C[Data<br/>Account (1)]
    B --> D[Double<br/>contract]

System Program- contract on Solana Blockchain
ex: Only Solana, no Data

Can create a Account-> Solana and Data

We wrote a js script to interact with the SystemProgram to create a new account which has 8 bytes of data in it


we need a program to derieve a pda cause SystemProgram don't have their own
private key to sign transaction
hence signs on behalf of pda-> CPI{Cross Program Invocation}

create from scratch->
create a new rust project-> `class-contract`
add dependencies-> `solana-program@1.18.26 `
