# Anchor part 2- CPIs and PDAs

## Solana Blockchain

multiple Validator run on the Blockchain

## CPI

One contract calls someother contract, that something other

## System Program

# Revising anchor contracts

Anchor has macros that make it easier to write and deploy Solana contracts.

The following is a simple comparision b/w a native contract and a solana contract.

### Native contract

```rust
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    entrypoint,
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    msg,
};

#[derive(BorshSerialize, BorshDeserialize)]
struct CounterState {
    count: u32,
}

#[derive(BorshSerialize, BorshDeserialize)]
enum CounterInstruction {
    Double,
    Half,
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = CounterInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    let mut iter = accounts.iter();
    let data_account = next_account_info(&mut iter)?;

    if !data_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    match instruction {
        CounterInstruction::Double => {
            msg!("Doubling counter");
            let mut counter_state = CounterState::try_from_slice(&data_account.data.borrow())?;
            counter_state.count = counter_state.count.saturating_mul(2);
            counter_state.serialize(&mut *data_account.data.borrow_mut())?;
        }
        CounterInstruction::Half => {
            msg!("Halving counter");
            let mut counter_state = CounterState::try_from_slice(&data_account.data.borrow())?;
            counter_state.count = counter_state.count / 2;
            counter_state.serialize(&mut *data_account.data.borrow_mut())?;
        }
    }

    Ok(())
}
```

### Anchor contract

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgPp8eEB2hdD");

#[program]
pub mod anchor_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, value: u64) -> Result<()> {
        let data_account = &mut ctx.accounts.data_account;
        data_account.value = value;
        Ok(())
    }

    pub fn double(ctx: Context<Modify>) -> Result<()> {
        let data_account = &mut ctx.accounts.data_account;
        data_account.value *= 2;
        Ok(())
    }

    pub fn half(ctx: Context<Modify>) -> Result<()> {
        let data_account = &mut ctx.accounts.data_account;
        data_account.value /= 2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)] // 8 for discriminator, 8 for u64
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Modify<'info> {
    #[account(mut)]
    pub data_account: Account<'info, DataAccount>,
}

#[account]
pub struct DataAccount {
    pub value: u64,
}

```

### What is the one big difference b/w both of these contracts?

1. Space that the integer takes
2. Native contract expects data account to be there already (initialized on the client)
3. Native takes care of serialisation, deserialisation, have to check for other
   things too, but Anchor takes care of it by itself.

# CPI to create a new account in anchor

```rust

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

# CPIs to any contract using anchor

Ref - https://www.anchor-lang.com/docs/basics/cpi
Initialize a new anchor contract

```sh
anchor init cpi-contract
```

### Approach #1 - `Using anchor_lang::system_program`:

```rs
use anchor_lang::prelude::\*;
use anchor_lang::system_program::{transfer, Transfer};

declare_id!("C6SrAByDmBm4u5dcZLYJErYirVn4o6tf6329SpFoVbW7");

#[program]
pub mod cpi_contract {
use super::\*;

    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.sender.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();

        let cpi_context = CpiContext::new(
            program_id,
            Transfer {
                from: from_pubkey,
                to: to_pubkey,
            },
        );

        transfer(cpi_context, amount)?;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct SolTransfer<'info> { #[account(mut)]
sender: Signer<'info>, #[account(mut)]
recipient: SystemAccount<'info>,
system_program: Program<'info, System>,
}
```

​

### Tests

```ts
import \* as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CpiContract } from "../target/types/cpi_contract";
import { assert } from "chai";

describe("cpi-contract", () => {
// Configure the client to use the local cluster.
anchor.setProvider(anchor.AnchorProvider.env());
const provider = anchor.getProvider();
const recipient = anchor.web3.Keypair.generate();

const program = anchor.workspace.cpiContract as Program<CpiContract>;
console.log("Program", program);

it("Is initialized!", async () => {
// Add your test here.
const tx = await program.methods.solTransfer(new anchor.BN(1000000000)).accounts({
sender: provider.publicKey,
recipient: recipient.publicKey,
}).rpc();
console.log("Your transaction signature", tx);
const account = await provider.connection.getAccountInfo(recipient.publicKey);
assert.equal(account?.lamports, 1000000000);
});
});
```

​

### Approach #2 - More generic CPI

```rs
pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
let from_pubkey = ctx.accounts.sender.to_account_info();
let to_pubkey = ctx.accounts.recipient.to_account_info();
let program_id = ctx.accounts.system_program.to_account_info();

    // Prepare instruction AccountMetas
    let account_metas = vec![
        AccountMeta::new(from_pubkey.key(), true),
        AccountMeta::new(to_pubkey.key(), false),
    ];

    // SOL transfer instruction discriminator
    let instruction_discriminator: u32 = 2;

    // Prepare instruction data
    let mut instruction_data = Vec::with_capacity(4 + 8);
    instruction_data.extend_from_slice(&instruction_discriminator.to_le_bytes());
    instruction_data.extend_from_slice(&amount.to_le_bytes());

    // Create instruction

    let instruction = Instruction {
        program_id: program_id.key(),
        accounts: account_metas,
        data: instruction_data,
    };

    // Invoke instruction

    invoke(&instruction, &[from_pubkey, to_pubkey, program_id])?;
    Ok(())

}

#[derive(Accounts)]
pub struct SolTransfer<'info> { #[account(mut)]
sender: Signer<'info>, #[account(mut)]
recipient: SystemAccount<'info>,
system_program: Program<'info, System>,
}
```

# Assignment #1

1. Create a native contract that takes a data account and
   1. Initializes it
   2. Doubles the value inside it
   3. Halves the value inside it
2. Create an anchor account that takes the `initialize` and `double` instructions and forwards the request to the native contract using a CPI

# Writing the native contract

**Contract #1**

```rs
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    entrypoint,
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    msg,
    rent::Rent,
    sysvar::Sysvar,
    system_instruction,
    program::invoke,
};

#[derive(BorshSerialize, BorshDeserialize)]
struct CounterState {
    count: u32,
}

#[derive(BorshSerialize, BorshDeserialize)]
enum CounterInstruction {
    Initialize,
    Double,
    Half,
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = CounterInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        CounterInstruction::Initialize => {
            msg!("Initializing counter");

            let mut iter = accounts.iter();
            let data_account = next_account_info(&mut iter)?;
            let payer = next_account_info(&mut iter)?;
            let system_program = next_account_info(&mut iter)?;

            // Check if payer is signer
            if !payer.is_signer {
                return Err(ProgramError::MissingRequiredSignature);
            }

            // Calculate space needed for CounterState
            let space = 4;

            // Calculate rent exemption amount
            let rent = Rent::get()?;
            let lamports = rent.minimum_balance(space);

            // Create the account
            let create_account_ix = system_instruction::create_account(
                payer.key,
                data_account.key,
                lamports,
                space as u64,
                program_id,
            );

            invoke(
                &create_account_ix,
                &[
                    payer.clone(),
                    data_account.clone(),
                    system_program.clone(),
                ],
            )?;

            // Initialize the account data
            let counter_state = CounterState { count: 1 };
            counter_state.serialize(&mut *data_account.data.borrow_mut())?;
        }
        CounterInstruction::Double => {
            msg!("Doubling counter");

            let mut iter = accounts.iter();
            let data_account = next_account_info(&mut iter)?;

            // Check if the account is owned by this program
            if data_account.owner != program_id {
                return Err(ProgramError::IncorrectProgramId);
            }

            let mut counter_state = CounterState::try_from_slice(&data_account.data.borrow())?;
            counter_state.count = counter_state.count * 2;
            counter_state.serialize(&mut *data_account.data.borrow_mut())?;
        }
        CounterInstruction::Half => {
            msg!("Halving counter");

            let mut iter = accounts.iter();
            let data_account = next_account_info(&mut iter)?;

            // Check if the account is owned by this program
            if data_account.owner != program_id {
                return Err(ProgramError::IncorrectProgramId);
            }

            let mut counter_state = CounterState::try_from_slice(&data_account.data.borrow())?;
            counter_state.count = counter_state.count / 2;
            counter_state.serialize(&mut *data_account.data.borrow_mut())?;
        }
    }

    Ok(())
}
```

# Tests

```ts
import * as path from "path";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { LiteSVM } from "litesvm";
import { expect, test, describe, beforeAll } from "bun:test";
import { deserialize } from "borsh";
import * as borsh from "borsh";

describe("Counter Program Tests", () => {
  let svm: LiteSVM;
  let programId: PublicKey;
  let dataAccount: Keypair;
  let userAccount: Keypair;

  const programPath = path.join(import.meta.dir, "double.so");

  beforeAll(() => {
    svm = new LiteSVM();

    programId = PublicKey.unique();

    svm.addProgramFromFile(programId, programPath);

    dataAccount = new Keypair();

    userAccount = new Keypair();

    svm.airdrop(userAccount.publicKey, BigInt(LAMPORTS_PER_SOL));
  });

  test("initialize counter", () => {
    const instruction = new TransactionInstruction({
      programId,
      keys: [
        { pubkey: dataAccount.publicKey, isSigner: true, isWritable: true },
        { pubkey: userAccount.publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: Buffer.from([0]),
    });

    const transaction = new Transaction().add(instruction);
    transaction.recentBlockhash = svm.latestBlockhash();
    transaction.feePayer = userAccount.publicKey;
    transaction.sign(dataAccount, userAccount);
    let txn = svm.sendTransaction(transaction);
    svm.expireBlockhash();
    const updatedAccountData = svm.getAccount(dataAccount.publicKey);
    if (!updatedAccountData) {
      throw new Error("Account not found");
    }

    expect(updatedAccountData.data[0]).toBe(1);
    expect(updatedAccountData.data[1]).toBe(0);
    expect(updatedAccountData.data[2]).toBe(0);
    expect(updatedAccountData.data[3]).toBe(0);
  });

  test("double counter value makes it 16 after 4 times", async () => {
    function doubleCounter() {
      // Create an instruction to call our program
      const instruction = new TransactionInstruction({
        programId,
        keys: [
          { pubkey: dataAccount.publicKey, isSigner: true, isWritable: true },
        ],
        data: Buffer.from([1]),
      });

      // Create and execute the transaction
      let transaction = new Transaction().add(instruction);
      transaction.recentBlockhash = svm.latestBlockhash();

      transaction.feePayer = userAccount.publicKey;
      transaction.sign(userAccount, dataAccount);
      svm.sendTransaction(transaction);
      svm.expireBlockhash();
    }

    doubleCounter();
    doubleCounter();
    doubleCounter();
    doubleCounter();

    const updatedAccountData = svm.getAccount(dataAccount.publicKey);
    if (!updatedAccountData) {
      throw new Error("Account not found");
    }

    expect(updatedAccountData.data[0]).toBe(16);
    expect(updatedAccountData.data[1]).toBe(0);
    expect(updatedAccountData.data[2]).toBe(0);
    expect(updatedAccountData.data[3]).toBe(0);
  });
});
```

# Writing the CPI contract (anchor)

- Initialize the contract

```rust
anchor init cpi_contract
```

- Write the contract to CPI into the native counter contract

```rust
use anchor_lang::prelude::*;

declare_id!("C6SrAByDmBm4u5dcZLYJErYirVn4o6tf6329SpFoVbW7");

#[program]
pub mod cpi_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let accounts = vec![
            AccountMeta::new(*ctx.accounts.data_account.key, false),
            AccountMeta::new(*ctx.accounts.user_account.key, true),
            AccountMeta::new_readonly(anchor_lang::system_program::ID, false),
        ];

        let instruction = anchor_lang::solana_program::instruction::Instruction {
            program_id: ctx.accounts.cpi_program.key(),
            accounts,
            data: vec![0],
        };

        // CPI to the native counter program
        anchor_lang::solana_program::program::invoke(
            &instruction,
            &[
                ctx.accounts.cpi_program.to_account_info(),
                ctx.accounts.user_account.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn double(ctx: Context<Initialize>) -> Result<()> {

        let accounts = vec![
            AccountMeta::new(*ctx.accounts.data_account.key, true),
        ];

        let instruction = anchor_lang::solana_program::instruction::Instruction {
            program_id: ctx.accounts.cpi_program.key(),
            accounts,
            data: vec![1],
        };

        // CPI to the native counter program
        // CPI to the native counter program
        anchor_lang::solana_program::program::invoke(
            &instruction,
            &[ctx.accounts.data_account.to_account_info()],
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub data_account: AccountInfo<'info>,
    #[account(mut)]
    pub user_account: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub cpi_program: AccountInfo<'info>,
}

```

# Assignment #2

Write the tests for the anchor contract. How would you include/deploy the native contract while testing the anchor contract?
