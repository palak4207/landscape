import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGODB_URI).then(
      (client) => client
    );
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = MongoClient.connect(MONGODB_URI).then((client) => client);
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);
  return { client, db };
}
