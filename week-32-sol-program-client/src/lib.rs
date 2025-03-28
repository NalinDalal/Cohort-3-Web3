
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    entrypoint
};


#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    count: u32, // 10
}

#[derive(BorshSerialize, BorshDeserialize)]
enum CounterInstruction {
    Increment(u32),
    Decrement(u32),
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8], // 0 , 0 0 0 1
) -> ProgramResult { // Ok, Err(ProgramError)
    let account = next_account_info(&mut accounts.iter())?;
    let mut counter = Counter::try_from_slice(&account.data.borrow())?; // 10

    match CounterInstruction::try_from_slice(instruction_data)? {
        CounterInstruction::Increment(amount) => {
            counter.count += amount; // 11
        }
        CounterInstruction::Decrement(amount) => {
            counter.count -= amount;
        }
    }

    counter.serialize(&mut *account.data.borrow_mut())?;

    msg!("Counter updated to {}", counter.count);

    Ok(())
}