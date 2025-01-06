use anchor_lang::prelude::*;

declare_id!("E4hXTAxuDMABbzDU5U71xdcLSPGzZfQ4NByqMeuYNynD");

#[program]
pub mod counterdapp {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_acc = &mut ctx.accounts.counter;
        counter_acc.count = 0;
        Ok(())
    }

    pub fn increment(ctx : Context<Modify>) -> Result<()>{
        let counter_acc = &mut ctx.accounts.counter;
        counter_acc.count += 1;
        Ok(())
    }

    pub fn decrement(ctx : Context<Modify>) -> Result<()>{
        let counter_acc = &mut ctx.accounts.counter;
        counter_acc.count -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(
        init,
        payer = user,
        space = 8+8+32
    )]
    pub counter : Account<'info , Counter>,
    #[account(mut)]
    pub user : Signer<'info>,
    pub system_program : Program<'info , System>
}

#[derive(Accounts)]
pub struct Modify<'info>{
    #[account(
        mut,
    )]
    pub counter : Account<'info , Counter>,
    pub owner : Signer<'info>
}


#[account]
pub struct Counter{
    pub count : i64,
    pub owner : Pubkey
}
