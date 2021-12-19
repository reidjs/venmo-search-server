const MongoClient = require("mongodb").MongoClient;
const cors = require('cors')
const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 3080

const app = express()

app.use(cors())

// const corsOptions = {
//   origin: ['http://localhost:8000', "https://reidjs.github.io/", "https://reidjs.github.io/venmo-search-frontend/", "https://github.io"],
//   optionsSuccessStatus: 200 
// }

const createAggregate = search => {
  const agg = [
    {
      $search: {
        text: {
          // searches for "query" in the "path" field
          query: search,
          path: "note"
        },
      },
    },
    {
      $limit: 10,
    },
    {
      // to limit reponse to certain files 
      // https://docs.mongodb.com/manual/reference/operator/aggregation/project/
      $project: {
        _id: 0,
        "payment.target.user.username": 1,
        note: 1,
      },
    },
  ];
  return agg
}

// app.get('/', cors(corsOptions), (req, res) => {
app.get('/', (req, res) => {
  const queryParams = req.query
  const search =  queryParams.q
  if (!search) {
    res.json([])
    return
  }
  MongoClient.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.abbj1.mongodb.net/`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (connectErr, client) {
      if (connectErr) {
        console.error('connectErr', connectErr)
        res.status(500).send(connectErr)
        return
      }
      const coll = client.db("test").collection("venmo");
      const agg = createAggregate(search)
      let cursor = await coll.aggregate(agg);
      const results = []
      await cursor.forEach((doc) => {
        results.push(doc)
      });
      res.json(results)
      client.close();
    }
  );
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})