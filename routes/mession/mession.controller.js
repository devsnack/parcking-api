const { ObjectId } = require("mongodb");
const { client } = require("../../services/mongo");
const { check_in } = require("../../utils/dt");
const moment = require("moment");
const { calculDejeuner } = require("../../dejeuner");
const { calculDiner } = require("../../dinner");

let db = client.db("cartana").collection("mession");
let db2 = client.db("cartana").collection("iteneraire");
let db3 = client.db("cartana").collection("voitures_res");
let db4 = client.db("cartana").collection("voitures");

async function getavailablevoitures(req, res) {
  let result = [];
  let reserved = [];
  try {
    let v = await db3.find({}).toArray();

    v.forEach((e) => {
      let datepd = e.datepd.split("/").reverse().join("-");
      let datepr = e.datepr.split("/").reverse().join("-");
      let bdatepd = req.body.datepd.split("/").reverse().join("-");
      let bdatepr = req.body.datepr.split("/").reverse().join("-");

      if (
        !moment(datepd).isBetween(bdatepd, bdatepr) &&
        !moment(datepr).isBetween(bdatepd, bdatepr) &&
        !moment(datepd).isSame(bdatepd) &&
        !moment(datepd).isSame(bdatepr) &&
        !moment(datepr).isSame(bdatepd) &&
        !moment(datepr).isSame(bdatepr)
      ) {
        if (!reserved.includes(e.id_vehicule)) result.push(e.id_vehicule);
      } else {
        reserved.push(e.id_vehicule);
      }
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }

  res.status(200).send({ status: "ok", data: [...new Set(result)] });
}

//ADD NEW EMPLOYEE
async function addMession(req, res) {
  let result;
  try {
    result = await db.insertOne(req.body);
  } catch (e) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }

  res.status(200).send({ status: "ok", message: "créé avec succès" });
}

async function getItn(req, res) {
  try {
    let result = await db2.find({}).toArray();
    res.status(200).send({ status: "ok", data: result });
  } catch (error) {
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

async function calculFraisM(req, res) {
  try {
    let result = await db.find({ _id: new ObjectId(req.params.id) }).toArray();
    // console.log(result);
    let dj = await calculDejeuner(result[0], "MAITRISE AVEC CHARGE");
    let dn = await calculDiner(result[0], "MAITRISE AVEC CHARGE");
    res.status(200).send({ status: "ok", data: [dj, dn] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "failed", message: "somthing fail" });
  }
}

async function updateEmp(req, res) {
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

async function deleteEmp(req, res) {
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
  getavailablevoitures,
  getItn,
  addMession,
  calculFraisM,
  updateEmp,
  deleteEmp,
};
