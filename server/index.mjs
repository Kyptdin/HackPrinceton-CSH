import "./loadEnv.mjs";

import express from "express";
import posts from "./routes/posts.mjs";
import path from 'path'
import { Server } from "http";
import { MongoClient } from 'mongodb';

const app = express();
const port = 5500 || process.env.PORT;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post('/submit', (req, res) => {
//   const data = req.body;
//   console.log(data); // log the received data
//   res.send('Data received successfully.'); // send a response to the client
// });



app.post('/submit', (req, res) => {
  MongoClient.connect(mongoUrl, (err, client) => {
    if (err) throw err;
    const db = client.db('myapp');
    const collection = db.collection('mycollection');
    collection.insertOne(req.body, (err, result) => {
      if (err) throw err;
      console.log('Data inserted');
      res.send('Data inserted');
      client.close();
    });
   });
 });

app.use(express.static(path.join("Server", 'public')))
app.use("/posts", posts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
