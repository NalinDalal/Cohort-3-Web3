# Anchor vs raw contracts

a framework in solana used for creating contracts.

![Ref](https://www.anchor-lang.com/)

# Raw/Native Contracts

Let’s write a native solana contract that has a:

`anchor-cal`

1. Double
2. Half
3. Add
4. Subtract

written in `programs` folder.

then write the client -> `tests`

# Installing `Anchor`

Lets write the same program in anchor.

- Install the anchor cli - ![cli](https://www.anchor-lang.com/docs/installation)
- Initialize a fresh anchor contract

```jsx
anchor init calculator
```

**Or**

Go to ![beta-sol](https://beta.solpg.io/) and initialize a new anchor project.

# Macros

```rs
#[derive(Debug)]
struct Rect {
    width: u32,
    height: u32,
}

let rect = Rect {
    width: 10,
    height: 20,
};
println!("Rect: {:?}", rect);
```

gets converted to:

```rs

impl Debug for Rect {
    fn fmt(&self, f: &mut Formatter) -> Result {
				Formatter::debug_struct_field2_finish(
            f,
            "Rect",
            "width",
            &self.width,
            "height",
            &self.height,
        )
    }
}
```

You can do it manually as well, but it gets difficult to write this code. Macros create `generic` outputs for your structs/variables.

# Lifetimes recap

What is wrong in the following code -

```rs
#[derive(Debug)]
struct Rect {
    width: u32,
    height: u32,
    name: &String
}
```

We need to specify the lifetime of the struct and associate it to the lifetime of the individual references

```rs
#[derive(Debug)]
struct Rect<'a> {
    width: u32,
    height: u32,
    name: &'a String
}

fn main() {
    println!("Hello, world!");
    let name = String::from("rect");
    let rect = Rect { width: 10, height: 10, name: &name };
    println!("{:?}", rect);
}
```

## Struct that requires a struct that requires a lifetime

```rs
struct Shape<'a> {
    rect1: Rect<'a>,
    rect2: Rect<'a>
}
```

# Lifetimes recap

What is wrong in the following code -

```rs
#[derive(Debug)]
struct Rect {
    width: u32,
    height: u32,
    name: &String
}
```

We need to specify the lifetime of the struct and associate it to the lifetime of the individual references

```rs
#[derive(Debug)]
struct Rect<'a> {
    width: u32,
    height: u32,
    name: &'a String
}

fn main() {
    println!("Hello, world!");
    let name = String::from("rect");
    let rect = Rect { width: 10, height: 10, name: &name };
    println!("{:?}", rect);
}
```

Struct that requires a struct that requires a lifetime

```rs
struct Shape<'a> {
    rect1: Rect<'a>,
    rect2: Rect<'a>
}
```

---

# Anchor macros

The Anchor framework uses Rust macros to reduce boilerplate code and simplify the implementation of common security checks required for writing Solana programs.

The main macros found in an Anchor program include:

- `declare_id`: Specifies the program's on-chain address

```rs
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");
```

- `#[program]`: Specifies the module containing the program’s instruction logic

```rs
use anchor_lang:: prelude::*;
declare_id! ("11111111111111111111111111111111" );
#[program]
mod hello_anchor {
use super::*;
pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
ctx.accounts.new_account.data = data;
msg! ("Changed data to: {}!", data);
Ok (())
}
}
```

- `#[derive(Accounts)]`: Applied to structs to indicate a list of accounts required by an instruction
  applied to a struct to specify the accounts that must be provided when an instruction is invoked.

```rs
#[derive (Accounts) ]
pub struct Initialize<' info>{
    #[account (init, payer = signer, space = 8 + 8)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

- `#[account]`: Applied to structs to create custom account types for the program

```rs
#[account]
pub struct NewAccount {
    data: u64,
}
```

---

# Client/IDL generation

Run `anchor build` to generate an IDL for the program.

The IDL is a JSON file that describes the structure and interface of a Solana program, including:

1. Program methods (instructions)
2. Account structures
3. Data types
4. Arguments for each instruction

It similar to ABIs in Solidity contracts

You can find the abi in `target/idl`

---

# Tests

Mocha is the default library for testing anchor contracts

There is a `type` created in `target/types` folder that provides auto completion when writing tests

---

# Relating to native contracts

### 1. Instruction = Accounts macro

![Screenshot 2025-05-16 at 7.38.47 PM.png](attachment:afc6c241-b484-4765-9a12-ff4c3fc38f3b:Screenshot_2025-05-16_at_7.38.47_PM.png)

### 2. Data account struct = account macro

![Screenshot 2025-05-16 at 7.39.49 PM.png](attachment:86072a25-3591-4753-9d0a-8d6bae7aad79:Screenshot_2025-05-16_at_7.39.49_PM.png)

### 3. process_instruction function = mod

---

# Writing the calculator contract

programs/anchor-cal

run `anchor build` to build the project

next writing client
