import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counterdapp } from "../target/types/counterdapp";



describe("counterdapp", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.Counterdapp as Program<Counterdapp>;
  const counterAccount = anchor.web3.Keypair.generate();
  
  it("Is initialized!", async () => {
    const tx = await program.rpc.initialize({
      accounts : {
        countAcc : counterAccount.publicKey,
        user : provider.wallet.publicKey,
        systemProgram : anchor.web3.SystemProgram.programId,
      },
      signers : [counterAccount]
    }as any);
  })
  
  it("increments value of the counter", async () => {
    const increment_tx = await program.rpc.increment({
      accounts : {
        countAcc : counterAccount
      }
    } as any);
    console.log("Your transaction signature", increment_tx);
  })
  
  it("decrements value of the counter", async () => {
    const decrement_tx = await program.rpc.decrement({
      accounts : {
        countAcc : counterAccount
      }
    } as any);
    console.log("Your transaction signature", decrement_tx);
  })

});

