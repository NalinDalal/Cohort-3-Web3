use anchor_lang::prelude::*;

#[derive(Debug)]
struct Rect {
    width: u32,
    height: u32,
}

impl Rect {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
declare_id!("5rqu2sh1JNGCCemBfJNDvctZfnNcDLZFR5GQ2M96MGHU");

#[program]
pub mod anchor_calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_account.data = 1;
        let rect = Rect {
            width: 10,
            height: 20,
        };
        println!("Rect: {:?}", rect);
        Ok(())
    }

    pub fn double(ctx: Context<Double>) -> Result<()> {
        //ctx.accounts.account.data = ctx.accounts.account.data * 2;
        ctx.accounts.account.data *= 2;
        Ok(())
    }

    pub fn halve(ctx: Context<Halve>) -> Result<()> {
        //ctx.accounts.account.data = ctx.accounts.account.data / 2;
        ctx.accounts.account.data /= 2;

        Ok(())
    }

    pub fn add(ctx: Context<Add>, amount: u32) -> Result<()> {
        //ctx.accounts.account.data = ctx.accounts.account.data + amount;
        ctx.accounts.account.data += amount;

        Ok(())
    }

    pub fn sub(ctx: Context<Sub>, amount: u32) -> Result<()> {
        // ctx.accounts.account.data = ctx.accounts.account.data - amount;
        ctx.accounts.account.data -= amount;

        Ok(())
    }
}

#[account]
pub struct NewAccount {
    data: u32,
}
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Double<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Halve<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Sub<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}
