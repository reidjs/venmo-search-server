import { expect } from "chai"
import { Transaction } from "../util.js"
import { hasComments, hasMentions, hasLikes } from "../txns.js"


describe("Scoring function", () => {
  it("Adds words and emojis in comments to score", () => {
    const txn = new Transaction(hasComments)
    expect(txn.commentScore).to.eq(3)
  })
  it("Adds words and emojies in note to score", () => {
    const txn = new Transaction(hasComments)
    expect(txn.noteScore).to.eq(1)
  })
  it("Adds commentScore + noteScore for final score", () => {
    const txn = new Transaction(hasComments)
    expect(txn.totalScore).to.eq(4)
  })
})