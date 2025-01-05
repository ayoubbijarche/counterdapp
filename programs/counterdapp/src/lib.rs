use anchor_lang::prelude::*;

declare_id!("E4hXTAxuDMABbzDU5U71xdcLSPGzZfQ4NByqMeuYNynD");

#[program]
pub mod counterdapp {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_acc = &mut ctx.accounts.count_acc;
        counter_acc.count = 0;
        Ok(())
    }

    pub fn increment(ctx : Context<Initialize>) -> Result<()>{
        let counter_acc = &mut ctx.accounts.count_acc;
        counter_acc.count += 1;
        Ok(())
    }

    pub fn decrement(ctx : Context<Initialize>) -> Result<()>{
        let counter_acc = &mut ctx.accounts.count_acc;
        counter_acc.count -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(
        init,
        payer = user,
        space = 16+16
    )]
    pub count_acc : Account<'info , Counter>,
    #[account(mut)]
    pub user : Signer<'info>,
    pub system_program : Program<'info , System>
}

#[account]
pub struct Counter{
    pub count : u64
}
