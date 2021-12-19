import mongodb from 'mongodb'
import { Transaction } from "./util.js"
const url = 'mongodb://127.0.0.1:27017';
mongodb.MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
      return console.log(err);
  }

  // Specify database you want to access
  const db = client.db('test');

  console.log(`MongoDB Connected: ${url}`);

  const venmo = db.collection('venmo')
  venmo.find().forEach(function(doc) {
    const txn = new Transaction(doc)
    const score = txn.totalScore
    venmo.updateOne({_id:doc._id}, {$set: {"score": score}})
  })
  // venmo.find().each((doc, err) => {
  //   console.log('doc', doc)
  // })

  // const next = async (promise) => {
  //   const doc = await promise 
  //   console.log('doc', doc)
  // }
  // next(cursor.next)
});