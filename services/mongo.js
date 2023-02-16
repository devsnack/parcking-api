const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function testdb() {
  await client.connect();
  await client.db("cartana").command({ ping: 1 });
  console.log("Connected successfully to server");
}

module.exports = {
  testdb,
  client,
};
