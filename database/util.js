const calculateScoreFromComments = (comments) => {
  let score = 0
  for(let i = 0; i < comments.length; i++) {
    const comment = comments[i]
    score += comment.message.split(" ").length
  }
  return score
}

const calculateScoreFromNote = (transaction) => {
  return transaction.note.split(" ").length
}

export class Transaction {
  constructor(transaction) {
    this.commentScore = calculateScoreFromComments(transaction.comments.data)
    this.noteScore = calculateScoreFromNote(transaction)
    this.totalScore = this.commentScore + this.noteScore
  }
}