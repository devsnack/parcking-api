const { ObjectId } = require("mongodb");
const { client } = require("../../services/mongo");

let db = client.db("cartana").collection("chaffeur");
//ADD NEW EMPLOYEE
async function addCh(req, res) {
  let result;
  try {
    result = await db.insertOne(req.body);
  } catch (e) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
  console.log(req.body);
  res.status(200).send({ status: "ok", message: "créé avec succès" });
}

async function getAllCh(req, res) {
  try {
    let result = await db.find({}).toArray();
    res.status(200).send({ status: "ok", data: result });
  } catch (error) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

async function updateCh(req, res) {
  try {
    let data = req.body;
    var myquery = { _id: new ObjectId(req.params.id) };
    var newvalues = { $set: data };

    let result = await db.updateOne(myquery, newvalues);
    res.status(200).send({ status: "ok", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

async function deleteCh(req, res) {
  try {
    var myquery = { _id: new ObjectId(req.params.id) };
    let result = await db.deleteOne(myquery);
    res.status(200).send({ status: "ok", message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

module.exports = {
  addCh,
  getAllCh,
  updateCh,
  deleteCh,
};
