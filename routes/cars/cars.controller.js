const { ObjectId } = require("mongodb");
const { client } = require("../../services/mongo");

let db = client.db("cartana").collection("voitures");

//ADD NEW EMPLOYEE
async function addCr(req, res) {
  try {
    const { file } = req;
    const data = ({ vname, immat, compteur, nserie, datea } = req.body);
    //data.lch = JSON.parse(data.lch);
    // parse chauffeur license
    data.file = file.filename;
    await db.insertOne(data);
  } catch (e) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
  res.status(200).send({ status: "ok", message: "créé avec succès" });
}

async function getAllCr(req, res) {
  try {
    let result = await db.find({}).toArray();
    res.status(200).send({ status: "ok", data: result });
  } catch (error) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

async function updateCr(req, res) {
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

async function deleteCr(req, res) {
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
  addCr,
  getAllCr,
  updateCr,
  deleteCr,
};
