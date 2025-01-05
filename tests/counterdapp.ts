import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counterdapp } from "../target/types/counterdapp";

anchor.setProvider(anchor.AnchorProvider.env());
const program = anchor.workspace.Counterdapp as Program<Counterdapp>;
describe("counterdapp", () => {

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});

describe("increment value", () => {
  it("increments value of the counter", async () => {
    const increment_tx = await program.methods.increment().rpc();
    console.log("Your transaction signature", increment_tx);
  })
})


describe("decrement value", () => {
  it("decrements value of the counter", async () => {
    const decrement_tx = await program.methods.increment().rpc();
    console.log("Your transaction signature", decrement_tx);
  })
})
