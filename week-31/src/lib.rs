//1. Imports, importing the library and dependencies
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

//2. define the entrypoint
entrypoint!(process_instruction);

//3. Defining the state
#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    count: u32,
}

//4. Defining the instruction state
#[derive(BorshSerialize, BorshDeserialize)]
enum CounterInstruction {
    Increment(u32),
    Decrement(u32),
}
//5. Defining process_instruction function
pub fn process_instruction(
    _program_id: &Pubkey,
    account: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account = next_account_info(&mut account.iter())?; //Get the first account the user specified when calling the instruction (counter data acc)
    let mut counter = Counter::try_from_slice(&account.data.borrow())?; //Try to deserialize the data in this account to the counter struct

    //Update the count in the struct based on the instruction type (specified in the instruction_data byte array)
    match CounterInstruction::try_from_slice(instruction_data)? {
        CounterInstruction::Increment(amount) => {
            counter.count += amount;
        }
        CounterInstruction::Decrement(amount) => {
            counter.count -= amount;
        }
    }
    counter.serialize(&mut *account.data.borrow_mut())?; //serialise data back to account
    msg!("Counter updated to {}", counter.count); //Log
    Ok(())
}

//alter but same logic
/*pub fn counter_contract(
instruction_data: &[u8] // 1 0 0 0 1
) -> ProgramResult {
let acc= next_account_info(&mut accounts.iter())?;
let instruction_type = InstructionType::try_from_slice(instruction _data)?;
let mut counter_data = Counter::try_from_slice(&acc.data.borrow())?;
match instruction_type {
InstructionType:: Increment (value) => {
counter_data.count += value;
},
InstructionType::Decrement (value) => {
counter_data.count -= value;}}
counter_data.serialize(&mut acc.data.borrow_mut());
OK(())}
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}*/

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = 2.add(2);

        assert_eq!(result, 4);
    }
}
