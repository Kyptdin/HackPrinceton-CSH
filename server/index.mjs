import "./loadEnv.mjs";

import express from "express";
import posts from "./routes/posts.mjs";
import path from 'path'
import { Server } from "http";
const app = express();
const port = 5500 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(path.join("Server", 'public')))
app.use("/posts", posts);