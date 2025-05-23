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
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender: Signer<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}
