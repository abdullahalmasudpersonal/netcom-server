const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

// Mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3bn33mw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


async function run() {
  try {
    await client.connect();
    const postCollection = client.db('netcom').collection('posts');

    // get userpost api
    app.get('/posts', async(req, res) =>{
      const query = {};
      const cursor = postCollection.find(query);
      const newPost = await cursor.toArray();
      res.send(newPost);
    })
  
    // post userPost api
    app.post('/posts', async(req, res) =>{
      const newPost = req.body;
      const result = await postCollection.insertOne(newPost);
      res.send(result);
    });
  }
  finally {

  }
}


 run().catch(console.dir); 


app.get('/', (req, res) => {
  res.send('Hello from netcom.')
})

app.listen(port, () => {
  console.log(`Netcom app listening on port ${port}`)
})
