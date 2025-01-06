import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counterdapp } from "../target/types/counterdapp";



describe("counterdapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Counterdapp as Program<Counterdapp>;
  const counterAccount = anchor.web3.Keypair.generate();
  const payer = provider.wallet as anchor.Wallet;

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
          counter : counterAccount.publicKey,
          user : payer.publicKey
      })
      .signers([counterAccount])
      .rpc()
    
      console.log("your transaction signature : ", tx)
  })
  
  it("increments value of the counter", async () => {
    const increment_tx = await program.methods
      .increment()
      .accounts({
        counter : counterAccount.publicKey
      })
      .rpc()
      
    console.log("Your transaction signature", increment_tx);
  })
  
  it("decrements value of the counter", async () => {
    const decrement_tx = await program.methods
      .decrement()
      .accounts({
        counter : counterAccount.publicKey,        
      })
      .rpc()
    console.log("Your transaction signature", decrement_tx);
  })

});

