use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct OnChainData {
    pub name: String,
}

entrypoint!(process_instruction);
pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Instruction received");

    let accounts_iter = &mut accounts.iter();
    let data_account = next_account_info(accounts_iter)?;

    let my_data = OnChainData::try_from_slice(instruction_data)?;
    my_data.serialize(&mut &mut data_account.data.borrow_mut()[..])?;

    msg!("Stored: {:?}", my_data);
    Ok(())
}
