import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = "mongodb+srv://bloopified:OSfTLDwFndr0uwuU@cluster0.jolwbvp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;
