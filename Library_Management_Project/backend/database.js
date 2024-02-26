const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

let db;

const client = new MongoClient(uri);
async function connectToDB() {
  try {
    await client.connect();
    db = client.db("LibraryManagement");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error Occurred");
  }
}

function getDb() {
  if (db) {
    console.log("db available");
    return db;
  } else {
    throw new Error("No database found");
  }
}

module.exports = { getDb, connectToDB };
